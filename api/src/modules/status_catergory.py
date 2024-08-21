from flask import Blueprint, jsonify, request
from src.models import Car, Customer
from .. import db

status_catergory = Blueprint("status_catergory", __name__, url_prefix="/api")

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
    customer_id = request.json.get("customerId")
    days = request.json.get("days")
    car = Car.query.get(car_id)
    customer = Customer.query.get(customer_id)

    car.currCustomerId = customer.id
    car.currCustomerName = customer.name
    car.daysRemaining = days
    customer.cars.append(car)
    db.session.commit()
    return jsonify({"message": "car rented"}), 200

@status_catergory.route("/car-maintenance", methods=["PUT"])
def car_maintenance():
    car_id = request.json.get("carId")
    days = request.json.get("days")
    car = Car.query.get(car_id)
    car.daysRemaining = days
    db.session.commit()
    return jsonify({"message": "car in maintenance"}), 200

@status_catergory.route("/return-car", methods=["PUT"])
def return_car():
    car_id = request.json.get("id")
    car = Car.query.get(car_id)
    if car.currCustomerId is None:
        return jsonify({"message": "car is not rented"}), 400
    customer = Customer.query.get(car.currCustomerId)
    customer.cars.remove(car)
    car.currCustomerId = None
    car.curreCustomerName = ""
    car.daysRemaining = None
    db.session.commit()
    return jsonify({"message": "car returned"}), 200