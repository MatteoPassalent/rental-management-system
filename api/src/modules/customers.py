from flask import Blueprint, jsonify, request
from src.models import Customer
from .. import db

customers = Blueprint("customers", __name__, url_prefix="/api")

@customers.route("/add-new-customer", methods=["POST"])
def add_new_customer():
    name = request.json.get("name")
    if not name:
        return jsonify({"message": "Name is required"}), 400
    customer = Customer(name=name)
    db.session.add(customer)
    db.session.commit()
    return jsonify({"name": customer.name, "id": customer.id}), 201
    
@customers.route("/get-customers")
def get_customers():
    customers = Customer.query.all()
    customer_list = [{"id": customer.id, "name": customer.name} for customer in customers]
    return jsonify(customer_list), 200