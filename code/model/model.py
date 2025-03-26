import ollama
import pandas as pd

spending = "technology, travel, luxury goods"
social_media_posts = "emerging technologies, sustainability"
user_details = "32-year-old professional based in Los Angeles with a moderate risk appetite"
products_list = ["Personal Loan", "Credit Card", "Home Loan", "Auto Loan", "Fixed Deposit", "Gold Loan"]
financial_products_catalogue = pd.read_csv("financial_products_catalog.csv")
# fin_products_individual = financial_products_catalogue["Target_Audience" == "Individual"]
# fin_products_organisation = financial_products_catalogue["Target_Audience" == "Organisation"]

def get_llm_recommendations_individual(customer_data):
    prompt = f"You are an expert in product recommendation. \
        You have access to detailed data from the user monthly transaction history, like amount I spend in different catagories. \
        which includes purchases in areas like {customer_data["spending"]} \
        alongside my social media posts that reflect strong interests in {social_media_posts}. \
        The user is a {str(customer_data[user_details])} \
        Considering these factors - spending patterns, risk tolerance, and interests - provide a list of \
        financial products from {customer_data["products_list"]} that would best match \
        the users financial goals and interests? It is very important to also give a score for how each product aligns with the profile.\
        For example give it in json format: \
        Personal Loan: #number, Credit Card: #number, Home Loan: #number, Auto Loan:#number, Fixed Deposit: #number, Gold Loan: #number"

    response = ollama.generate(model="jjansen/adapt-finance-llama2-7b", prompt=prompt)
    print(response)
    return response
    
def get_llm_recommendations_organisation(customer_data):
    prompt = f"You are an expert in product recommendation. \
        You have access to detailed data from the user monthly transaction history, like amount I spend in different catagories. \
        which includes purchases in areas like {customer_data["spending"]} \
        alongside my social media posts that reflect strong interests in {social_media_posts}. \
        The user is a {str(customer_data[user_details])} \
        Considering these factors - spending patterns, risk tolerance, and interests - provide a list of \
        financial products from {customer_data["products_list"]} that would best match \
        the users financial goals and interests? It is very important to also give a score for how each product aligns with the profile.\
        For example give it in json format: \
        Personal Loan: #number, Credit Card: #number, Home Loan: #number, Auto Loan:#number, Fixed Deposit: #number, Gold Loan: #number"

    response = ollama.generate(model="jjansen/adapt-finance-llama2-7b", prompt=prompt)
    print(response)
    return response