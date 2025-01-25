from flask import Flask, jsonify, request, send_from_directory
import os
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# Sample product data
cakes = [
    {"id": 1, "name": "Chocolate Cake", "price": 28.99, "image": "src/cake1"},
    {"id": 2, "name": "Vanilla Cake", "price": 22.99, "image": "/placeholder.svg?height=200&width=200"},
    {"id": 3, "name": "Red Velvet Cake", "price": 27.99, "image": "/placeholder.svg?height=200&width=200"},
    {"id": 4, "name": "Carrot Cake", "price": 23.99, "image": "/placeholder.svg?height=200&width=200"}
]

@app.route('/api/cakes', methods=['GET'])
def get_cakes():
    return jsonify(cakes)

@app.route('/api/order', methods=['POST'])
def place_order():
    order = request.json
    # Here you would typically process the order, save it to a database, etc.
    # For this example, we'll just return a success message
    return jsonify({"message": "Order placed successfully!", "order": order}), 201

@app.route('/')
def serve_html():
    return send_from_directory('.', 'index.html')

@app.route('/<path:path>')
def serve_static(path):
    return send_from_directory('.', path)

if __name__ == '__main__':
    app.run(debug=True)

