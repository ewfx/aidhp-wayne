import pandas as pd
import numpy as np
from sklearn.preprocessing import LabelEncoder
from sklearn.cluster import KMeans, AgglomerativeClustering, DBSCAN
from sklearn.ensemble import VotingClassifier
from sklearn.metrics import silhouette_score

# Load datasets
customer_data_path = r"c:\Users\mshas\OneDrive\Desktop\llama\final_data.csv"
product_catalog_path = r"c:\Users\mshas\OneDrive\Desktop\llama\financial_products_catalog.csv"

customer_df = pd.read_csv(customer_data_path)
product_catalog_df = pd.read_csv(product_catalog_path)

# Encode customer IDs
label_encoder = LabelEncoder()
customer_df['customerid_encoded'] = label_encoder.fit_transform(customer_df['customerid'])

# Prepare features for clustering
X = np.vstack(customer_df['post_embeddings'].apply(eval).values)  # Convert embeddings from strings to arrays
X = np.hstack((X, customer_df[['revenue/income']].values))  # Add revenue/income as a feature

# Clustering methods
kmeans = KMeans(n_clusters=10, random_state=42)
agglo = AgglomerativeClustering(n_clusters=10)
dbscan = DBSCAN(eps=0.5, min_samples=5)

# Fit clustering models
kmeans_labels = kmeans.fit_predict(X)
agglo_labels = agglo.fit_predict(X)
dbscan_labels = dbscan.fit_predict(X)

# Add cluster labels to the DataFrame
customer_df['kmeans_cluster'] = kmeans_labels
customer_df['agglo_cluster'] = agglo_labels
customer_df['dbscan_cluster'] = dbscan_labels

# Map clusters to financial products
# For simplicity, assign products randomly to clusters (you can refine this based on domain knowledge)
product_names = product_catalog_df['Product_Name'].values
num_clusters = len(np.unique(kmeans_labels))
cluster_to_product = {i: product_names[i % len(product_names)] for i in range(num_clusters)}

# Assign products to customers based on clusters
customer_df['predicted_product_kmeans'] = customer_df['kmeans_cluster'].map(cluster_to_product)
customer_df['predicted_product_agglo'] = customer_df['agglo_cluster'].map(cluster_to_product)
customer_df['predicted_product_dbscan'] = customer_df['dbscan_cluster'].map(cluster_to_product)

# Save the results
output_file = r"c:\Users\mshas\OneDrive\Desktop\llama\customer_product_predictions.csv"
customer_df.to_csv(output_file, index=False)

print(f"Predicted financial products saved to {output_file}")