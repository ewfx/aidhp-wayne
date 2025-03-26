import pandas as pd
import numpy as np

class FinancialProductRecommender:
    def __init__(self, individual_data_path, posts_data_path, 
                 transaction_data_path, financial_products_path):
        """
        Initialize the recommender with data from CSV files
        
        Args:
            individual_data_path (str): Path to individual customer data
            posts_data_path (str): Path to social media posts data
            transaction_data_path (str): Path to transaction data
            financial_products_path (str): Path to financial products catalog
        """
        # Load data
        self.individuals = pd.read_csv(individual_data_path)
        self.posts = pd.read_csv(posts_data_path)
        self.transactions = pd.read_csv(transaction_data_path)
        self.financial_products = pd.read_csv(financial_products_path)
        
        # Preprocess financial products
        self.financial_products_individual = self.financial_products[
            (self.financial_products['Target_Audience'].isin(['Individual', 'Both']))
        ]
    
    def extract_customer_signals(self, customer_id):
        """
        Extract relevant signals for a customer to inform product recommendations
        
        Args:
            customer_id (str): Unique identifier for the customer
        
        Returns:
            dict: Customer signals including income, interests, recent posts, etc.
        """
        # Get individual customer data
        customer_info = self.individuals[self.individuals['Customer_ID'] == customer_id]
        
        if customer_info.empty:
            raise ValueError(f"Customer {customer_id} not found")
        
        # Extract basic customer signals
        income = float(customer_info['Income'].values[0].replace('$', '').replace(',', ''))
        interests = customer_info['Interests'].values[0]
        occupation = customer_info['Occupation'].values[0]
        
        # Analyze recent posts
        customer_posts = self.posts[self.posts['Customer_ID'] == customer_id]
        post_keywords = ' '.join(customer_posts['Content']).lower()
        
        # Analyze transaction history
        customer_transactions = self.transactions[self.transactions['Customer_ID'] == customer_id]
        total_transaction_amount = customer_transactions['Amount'].sum()
        
        return {
            'income': income,
            'interests': interests,
            'occupation': occupation,
            'post_keywords': post_keywords,
            'total_transaction_amount': total_transaction_amount
        }
    
    def score_financial_products(self, customer_signals):
        """
        Score financial products based on customer signals
        
        Args:
            customer_signals (dict): Customer-specific signals
        
        Returns:
            pd.DataFrame: Scored financial products
        """
        # Create a copy of individual financial products
        scored_products = self.financial_products_individual.copy()
        
        # Income-based scoring
        income = customer_signals['income']
        scored_products['income_score'] = self.calculate_income_score(income, scored_products)
        
        # Interest-based scoring
        interests = customer_signals['interests']
        scored_products['interest_score'] = self.calculate_interest_score(interests, scored_products)
        
        # Occupation-based scoring
        occupation = customer_signals['occupation']
        scored_products['occupation_score'] = self.calculate_occupation_score(occupation, scored_products)
        
        # Post keyword scoring
        post_keywords = customer_signals['post_keywords']
        scored_products['keyword_score'] = self.calculate_keyword_score(post_keywords, scored_products)
        
        # Transaction amount scoring
        total_transaction = customer_signals['total_transaction_amount']
        scored_products['transaction_score'] = self.calculate_transaction_score(total_transaction, scored_products)
        
        # Calculate total score
        scored_products['total_score'] = (
            scored_products['income_score'] * 0.3 +
            scored_products['interest_score'] * 0.2 +
            scored_products['occupation_score'] * 0.2 +
            scored_products['keyword_score'] * 0.15 +
            scored_products['transaction_score'] * 0.15
        )
        
        return scored_products.sort_values('total_score', ascending=False)
    
    def calculate_income_score(self, income, products):
        """
        Score products based on customer's income
        
        Args:
            income (float): Customer's income
            products (pd.DataFrame): Financial products
        
        Returns:
            pd.Series: Income-based scores
        """
        # Example scoring logic (can be customized)
        categories_map = {
            'Investment': (50000, 200000),
            'Loan': (30000, 150000),
            'Banking Service': (20000, 100000),
            'Insurance': (25000, 120000)
        }
        
        def score_by_category(category):
            min_income, max_income = categories_map.get(category, (0, float('inf')))
            if income >= min_income and income <= max_income:
                return 1.0
            elif income < min_income:
                return 0.3
            else:
                return 0.5
        
        return products['Category'].apply(score_by_category)
    
    def calculate_interest_score(self, interests, products):
        """
        Score products based on customer's interests
        
        Args:
            interests (str): Customer's interests
            products (pd.DataFrame): Financial products
        
        Returns:
            pd.Series: Interest-based scores
        """
        interest_keywords = {
            'Investment': ['finance', 'money', 'stocks', 'investment'],
            'Loan': ['purchase', 'finance', 'money'],
            'Banking Service': ['digital', 'technology', 'service'],
            'Insurance': ['protection', 'safety', 'security']
        }
        
        def score_by_interest(category):
            keywords = interest_keywords.get(category, [])
            return sum(keyword.lower() in interests.lower() for keyword in keywords) / len(keywords) if keywords else 0
        
        return products['Category'].apply(score_by_interest)
    
    def calculate_occupation_score(self, occupation, products):
        """
        Score products based on customer's occupation
        
        Args:
            occupation (str): Customer's occupation
            products (pd.DataFrame): Financial products
        
        Returns:
            pd.Series: Occupation-based scores
        """
        occupation_keywords = {
            'Investment': ['analyst', 'manager', 'consultant'],
            'Loan': ['engineer', 'designer', 'developer'],
            'Banking Service': ['tech', 'engineer', 'professional'],
            'Insurance': ['healthcare', 'professional', 'trainer']
        }
        
        def score_by_occupation(category):
            keywords = occupation_keywords.get(category, [])
            return sum(keyword.lower() in occupation.lower() for keyword in keywords) / len(keywords) if keywords else 0
        
        return products['Category'].apply(score_by_occupation)
    
    def calculate_keyword_score(self, keywords, products):
        """
        Score products based on post keywords
        
        Args:
            keywords (str): Customer's post keywords
            products (pd.DataFrame): Financial products
        
        Returns:
            pd.Series: Keyword-based scores
        """
        post_keywords = {
            'Investment': ['money', 'finance', 'stocks', 'growth'],
            'Loan': ['purchase', 'finance', 'budget'],
            'Banking Service': ['digital', 'technology', 'service'],
            'Insurance': ['protection', 'safety', 'secure']
        }
        
        def score_by_keywords(category):
            category_keywords = post_keywords.get(category, [])
            return sum(keyword.lower() in keywords.lower() for keyword in category_keywords) / len(category_keywords) if category_keywords else 0
        
        return products['Category'].apply(score_by_keywords)
    
    def calculate_transaction_score(self, total_transaction, products):
        """
        Score products based on transaction amount
        
        Args:
            total_transaction (float): Customer's total transaction amount
            products (pd.DataFrame): Financial products
        
        Returns:
            pd.Series: Transaction-based scores
        """
        transaction_thresholds = {
            'Investment': (5000, 50000),
            'Loan': (2000, 30000),
            'Banking Service': (1000, 20000),
            'Insurance': (1500, 25000)
        }
        
        def score_by_transaction(category):
            min_thresh, max_thresh = transaction_thresholds.get(category, (0, float('inf')))
            if total_transaction >= min_thresh and total_transaction <= max_thresh:
                return 1.0
            elif total_transaction < min_thresh:
                return 0.3
            else:
                return 0.5
        
        return products['Category'].apply(score_by_transaction)
    
    def get_top_n_recommendations(self, customer_id, n=3):
        """
        Get top N financial product recommendations for a customer
        
        Args:
            customer_id (str): Unique customer identifier
            n (int): Number of recommendations to return
        
        Returns:
            pd.DataFrame: Top N recommended financial products
        """
        # Extract customer signals
        customer_signals = self.extract_customer_signals(customer_id)
        
        # Score financial products
        scored_products = self.score_financial_products(customer_signals)
        
        # Return top N products
        return scored_products.head(n)[['Product_ID', 'Product_Name', 'Category', 'total_score']]

# Example usage
if __name__ == "__main__":
    recommender_individual = FinancialProductRecommender(
        'individual_data.csv', 
        'posts_data.csv', 
        'transaction_data.csv', 
        'financial_products_ind.csv'
    )
    recommender_org = FinancialProductRecommender(
        'organisation_data.csv', 
        'posts_data.csv', 
        'transaction_data.csv', 
        'fin_products_org.csv'
    )
    
    # Example: Get recommendations for a specific customer
    customer_id = 'IND005'
    recommendations = recommender.get_top_n_recommendations(customer_id)
    print(f"Top 3 Financial Product Recommendations for Customer {customer_id}:{recommendations} ")
    recommendations.to_json(orient='records')