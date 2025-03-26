from flask import Flask, request, jsonify
# from model import get_llm_recommendations
import pandas as pd
from recommender import FinancialProductRecommender

recommender_individual = FinancialProductRecommender(
    'individual_data.csv', 
    'posts_data.csv', 
    'transaction_data.csv', 
    'fin_products_ind.csv'
)
recommender_org = FinancialProductRecommender(
    'organisation_data.csv', 
    'posts_data.csv', 
    'transaction_data.csv', 
    'fin_products_org.csv'
)

app = Flask(__name__)

@app.route('/get_recommendations_indivisual', methods=['GET'])
def get_recommendations_indivisual():
    customer_id = request.args.get('customer_id')  # Get the customer_id from the query string
    if customer_id:
        # transaction_data = pd.read_csv("transaction_data.csv")
        # posts_data = pd.read_csv("posts_data.csv")
        # posts = posts_data[posts_data['Customer_ID']== customer_id] 
        # Here you can implement your logic to handle the customer ID
        # For example, fetch customer data from a database or do some processing
        # get_llm_recommendations(customer_data=customer_data)
        recommendations = recommender_individual.get_top_n_recommendations(customer_id)
        print(f"Top 3 Financial Product Recommendations for Customer {customer_id}:{recommendations} ")
        print(recommendations.to_dict(orient='records'))
        return recommendations.to_json(orient='records') # jsonify({"recommendations": f"Customer {customer_id} found!"})
    else:
        return jsonify({"error": "Customer ID is required"})

@app.route('/get_recommendations_organisation', methods=['GET'])
def get_recommendations_organisation():
    customer_id = request.args.get('customer_id')  # Get the customer_id from the query string
    if customer_id:
        # Here you can implement your logic to handle the customer ID
        # For example, fetch customer data from a database or do some processing
        # get_llm_recommendations(customer_data=customer_data)
        recommendations = recommender_individual.get_top_n_recommendations(customer_id)
        print(f"Top 3 Financial Product Recommendations for Customer {customer_id}:{recommendations} ")
        print(recommendations.to_dict(orient='records'))
        return recommendations.to_json(orient='records')
    else:
        return jsonify({"error": "Customer ID is required"})

if __name__ == '__main__':
    app.run(debug=True,port=8888)
