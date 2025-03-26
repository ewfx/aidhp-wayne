import pandas as pd
from datetime import datetime

# Load your datasets
individual_data = pd.read_csv('individual_data.csv')  # Updated path
organisation_data = pd.read_csv('organisation_data.csv')  # Updated path
posts_data = pd.read_csv('posts_data.csv')  # Updated path
transaction_data = pd.read_csv('transaction_data.csv')  # Updated path

# Add a column to distinguish individuals and organizations
individual_data['type'] = 'individual'
organisation_data['type'] = 'organization'

# Standardize column names for merging
individual_data.rename(columns={'Customer_ID': 'customerid', 'Preferences': 'preferences', 'Interests': 'interests'}, inplace=True)
organisation_data.rename(columns={'Customer_ID': 'customerid', 'Preferences': 'preferences'}, inplace=True)

# Combine individual and organization data
customer_data = pd.concat([individual_data[['customerid', 'preferences', 'type']],
                           organisation_data[['customerid', 'preferences', 'type']]], ignore_index=True)

# Process transaction data
transaction_data['timestamp'] = pd.to_datetime(transaction_data['Purchase_Date'], errors='coerce')
transaction_data['month_start'] = transaction_data['timestamp'].dt.to_period('M').apply(lambda r: r.start_time)

# Aggregate monthly revenue
monthly_revenue = transaction_data.groupby(['Customer_ID', 'month_start'])['Amount'].sum().reset_index()
monthly_revenue.rename(columns={'Amount': 'revenue/income', 'Customer_ID': 'customerid'}, inplace=True)

# Process posts data
posts_data['timestamp'] = pd.to_datetime(posts_data['Timestamp'], errors='coerce')
posts_data['month_start'] = posts_data['timestamp'].dt.to_period('M').apply(lambda r: r.start_time)
grouped_posts = posts_data.groupby(['Customer_ID', 'month_start'])['Content'].apply(list).reset_index()
grouped_posts.rename(columns={'Customer_ID': 'customerid', 'Content': 'list_of_posts'}, inplace=True)

# Create a comprehensive monthly dataset for each customer
# First, get unique months from revenue and posts data
unique_months = pd.concat([monthly_revenue['month_start'], grouped_posts['month_start']]).drop_duplicates()

# Create a cross join of unique customers and months
customer_months = pd.MultiIndex.from_product([customer_data['customerid'].unique(), unique_months]).to_frame(index=False)
customer_months.columns = ['customerid', 'month_start']

# Merge with customer data to get customer types and preferences
customer_months = pd.merge(customer_months, customer_data, on='customerid', how='left')

# Merge with monthly revenue (left join to keep all customer-month combinations)
comprehensive_data = pd.merge(customer_months, monthly_revenue, on=['customerid', 'month_start'], how='left')

# Merge with grouped posts (left join to keep all customer-month combinations)
comprehensive_data = pd.merge(comprehensive_data, grouped_posts, on=['customerid', 'month_start'], how='left')

# Fill missing values
comprehensive_data['revenue/income'] = comprehensive_data['revenue/income'].fillna(0)
comprehensive_data['list_of_posts'] = comprehensive_data['list_of_posts'].fillna(comprehensive_data['list_of_posts'].apply(lambda x: []))
comprehensive_data['preferences'] = comprehensive_data['preferences'].fillna('Unknown')

# Sort the data
comprehensive_data = comprehensive_data.sort_values(['customerid', 'month_start'])

# Save the comprehensive dataset
comprehensive_data.to_csv('combined_dataset_monthly.csv', index=False)

print("Comprehensive customer monthly dataset saved to './code/model/combined_dataset_monthly.csv'")

# Display some basic information about the dataset
# print("\nDataset Information:")
# print(f"Total unique customers: {comprehensive_data['customerid'].nunique()}")
# print(f"Total unique months: {comprehensive_data['month_start'].nunique()}")
# print(f"Total rows: {len(comprehensive_data)}")

# Display a sample of the data
# print("\nSample of Comprehensive Data:")
# print(comprehensive_data.head())