from flask import Blueprint, jsonify, request
from src.models import Car, Customer
from .. import db

status_catergory = Blueprint("status_catergory", __name__)

@status_catergory.route("/update-status", methods=["PUT"])
def update_status():
    car_id = request.json.get("id")
    status = request.json.get("status")
    car = Car.query.get(car_id)
    car.status = status
    db.session.commit()
    return jsonify({"message": "status updated"}), 200

@status_catergory.route("/rent-car", methods=["PUT"])
def rent_car():
    car_id = request.json.get("carId")
    customer = request.json.get("customerId")
    car = Car.query.get(car_id)
    customer = Customer.query.get(customer)
    car.status = "rented"
    car.rentedTo = customer.id
    customer.cars.append(car)
    db.session.commit()
    return jsonify({"message": "car rented"}), 200