from flask import Blueprint, jsonify, request
from src.models import Customer
from .. import db

customers = Blueprint("customers", __name__)

@customers.route("/add-new-customer", methods=["POST"])
def add_new_customer():
    name = request.json.get("name")
    customer = Customer(name=name)
    db.session.add(customer)
    db.session.commit()
    return jsonify({"name": customer.name, "id": customer.id}), 201
    
@customers.route("/get-customers")
def get_customers():
    customers = Customer.query.all()
    customer_list = []
    for customer in customers:
        customer_data = {
            "id": customer.id,
            "name": customer.name,
        }
        customer_list.append(customer_data)
    return jsonify(customer_list), 200