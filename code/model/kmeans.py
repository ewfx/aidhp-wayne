import pandas as pd
import ast
from nltk.sentiment.vader import SentimentIntensityAnalyzer
import nltk
from sentence_transformers import SentenceTransformer
import numpy as np
from sklearn.preprocessing import LabelEncoder
from sklearn.cluster import KMeans, AgglomerativeClustering, DBSCAN
from sklearn.ensemble import VotingClassifier
from sklearn.metrics import silhouette_score


# Download VADER lexicon
# nltk.download('vader_lexicon')
product_catalog_path = r"c:\Users\mshas\OneDrive\Desktop\llama\financial_products_catalog.csv"
product_catalog_df = pd.read_csv(product_catalog_path)

# Initialize VADER Sentiment Analyzer
sia = SentimentIntensityAnalyzer()

# Load the dataset
file_path = r"c:\Users\mshas\OneDrive\Desktop\llama\processed_dataset.csv"
df = pd.read_csv(file_path)

# Function to combine non-empty posts as a list of strings
def combine_posts(posts):
    if posts == "[]":  # Handle empty lists
        return []
    return ast.literal_eval(posts)  # Convert string representation of list to actual list

# Function to calculate sentiment scores for each post
def calculate_sentiment(posts):
    if not posts:  # Handle empty lists
        return []
    sentiment_scores = [float(sia.polarity_scores(post)['compound']) for post in posts]
    return sentiment_scores

# Combine posts as a list of strings
df['combined_posts'] = df['list_of_posts'].apply(combine_posts)

# Load pre-trained Sentence-BERT model
model = SentenceTransformer('all-MiniLM-L6-v2')

# Compute sentence embeddings for each post
df['post_embeddings'] = df['combined_posts'].apply(lambda x: model.encode(' '.join(x) if isinstance(x, list) else ''))

# Convert to a matrix for K-Means
# X_embeddings = np.vstack(df['post_embeddings'].values)
# print(X_embeddings)
# Calculate sentiment scores for each post
# df['sentiment_scores'] = df['combined_posts'].apply(calculate_sentiment)

# Drop the 'list_of_posts' column
df.drop(columns=['list_of_posts'], inplace=True)
df.drop(columns=['combined_posts'], inplace=True)

X = np.vstack(df['post_embeddings'].values)  # Combine embeddings into a matrix
X = np.hstack((X, df[['revenue/income']].values))  # Add revenue/income as a feature

kmeans = KMeans(n_clusters=20, random_state=42)
kmeans_labels = kmeans.fit_predict(X)

# Add cluster labels to the DataFrame
df['kmeans_cluster'] = kmeans_labels
print(df['kmeans_cluster'].value_counts())
# Map clusters to financial products
product_names = product_catalog_df['Product_Name'].values
num_clusters = len(np.unique(kmeans_labels))

# Calculate confidence scores for each product in each cluster
cluster_product_counts = df.groupby(['kmeans_cluster']).size().reset_index(name='total')
cluster_to_product = {i: product_names[i % len(product_names)] for i in range(num_clusters)}

# Assign products to customers based on clusters
df['predicted_product_kmeans'] = df['kmeans_cluster'].map(cluster_to_product)

# Calculate confidence scores for each product in each cluster
cluster_product_counts = df.groupby(['kmeans_cluster', 'predicted_product_kmeans']).size().reset_index(name='count')
cluster_totals = df.groupby('kmeans_cluster').size().reset_index(name='total')
confidence_scores = pd.merge(cluster_product_counts, cluster_totals, on='kmeans_cluster')
confidence_scores['confidence'] = confidence_scores['count'] / confidence_scores['total']

# Recommend top N products for each customer
# Recommend top N products for each customer
def recommend_top_products(cluster, n=10):
    # Filter confidence scores for the given cluster
    cluster_confidence = confidence_scores[confidence_scores['kmeans_cluster'] == cluster]
    
    # Sort products by confidence score in descending order
    top_products = cluster_confidence.sort_values(by='confidence', ascending=False).head(n)
    
    # If there are fewer than N products, return all available products for the cluster
    return list(zip(top_products['predicted_product_kmeans'], top_products['confidence']))

# Apply the recommendation function to each customer's cluster
df['top_products'] = df['kmeans_cluster'].apply(lambda cluster: recommend_top_products(cluster, n=3))

# Print the results
print(df[['customerid', 'top_products']])
# # Clustering methods
# kmeans = KMeans(n_clusters=5, random_state=42)
# agglo = AgglomerativeClustering(n_clusters=5)
# dbscan = DBSCAN(eps=0.5, min_samples=2)

# # Fit clustering models
# kmeans_labels = kmeans.fit_predict(X)
# agglo_labels = agglo.fit_predict(X)
# dbscan_labels = dbscan.fit_predict(X)

# df['kmeans_cluster'] = kmeans_labels
# df['agglo_cluster'] = agglo_labels
# df['dbscan_cluster'] = dbscan_labels

# # Map clusters to financial products
# product_names = product_catalog_df['Product_Name'].values
# num_clusters = len(np.unique(kmeans_labels))
# cluster_to_product = {i: product_names[i % len(product_names)] for i in range(num_clusters)}

# # Assign products to customers based on clusters
# df['predicted_product_kmeans'] = df['kmeans_cluster'].map(cluster_to_product)
# df['predicted_product_agglo'] = df['agglo_cluster'].map(cluster_to_product)
# df['predicted_product_dbscan'] = df['dbscan_cluster'].map(cluster_to_product)

# # Print the results
# print(df[['customerid', 'predicted_product_kmeans', 'predicted_product_agglo', 'predicted_product_dbscan']])
# Save the updated DataFrame to a new CSV file
# output_file = r"c:\Users\mshas\OneDrive\Desktop\llama\final_data.csv"
# df.to_csv(output_file, index=False)
# df.info()
# print(f"Processed dataset with combined posts and sentiment scores saved to {output_file}")