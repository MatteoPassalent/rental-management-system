from flask import Blueprint, jsonify, request
from src.models import Car
from .. import db

cars = Blueprint("cars", __name__, url_prefix="/api")

@cars.route("/add-car", methods=["POST"])
def add_car():
    car_data = request.json
    car = Car(
        **car_data,
        status="inventory",
        rentedTo=None,
        daysRemaining=None,
    )
    db.session.add(car)
    db.session.commit()
    return jsonify({"message": "car added"})

@cars.route("/delete-car", methods=["DELETE"])
def delete_car():
    car_id = request.json.get("id")
    car = Car.query.get(car_id)
    db.session.delete(car)
    db.session.commit()
    return jsonify({"message": "car deleted"}), 200

@cars.route("/get-cars")
def get_cars():
    inventory = Car.query.filter_by(status="inventory").all()
    maintenance = Car.query.filter_by(status="maintenance").all()
    rented = Car.query.filter_by(status="rented").all()
    car_lists = {
        "inventory": create_list(inventory),
        "maintenance": create_list(maintenance),
        "rented": create_list(rented),
    }
    return jsonify(car_lists), 200

def create_list(results):
    car_list = []
    for car in results:
        car_data = {
            "id": car.id,
            "make": car.make,
            "model": car.model,
            "year": car.year,
            "color": car.color,
            "licensePlate": car.licensePlate,
            "status": car.status,
            "daysRemaining": car.daysRemaining,
            "rentedTo": car.rentedTo,
        }
        car_list.append(car_data)
    return car_list
