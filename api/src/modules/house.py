
from flask import Blueprint, request, jsonify
from src.models import House
from .. import db

house = Blueprint("house", __name__, url_prefix="/api")

@house.route("/add-house", methods=["POST"])
def add_house():
    house_data = request.json
    house = House(**house_data)
    db.session.add(house)
    db.session.commit()

    return jsonify({"message": "car added"}), 200

@house.route("/get-houses", methods=["GET"])
def get_houses():
    house = House.query.filter_by(owner="Andrew").all()
    house_list = create_house(house)
    return jsonify(house_list), 200

def create_house(results):
    house_list = []
    for house in results:
        house_data = {
            "id": house.id,
            "price": house.price,
            "bedrooms": house.bedrooms,
            "streetName": house.streetName,
            "owner": house.owner,
        }
        house_list.append(house_data)
    return house_list

