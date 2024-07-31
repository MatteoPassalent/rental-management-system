from flask import Blueprint, jsonify
from src.models import Car
from .. import db

dev = Blueprint("dev", __name__)

@dev.route("/drop-db")
def drop_db():
    db.drop_all()
    db.create_all()
    return jsonify({"message": "db dropped"}), 200


@dev.route("/seed-db")
def seed_db():
    db.drop_all()
    db.create_all()

    cars = [
        Car(
            make="Toyota",
            model="Corolla",
            year="2021",
            color="Black",
            licensePlate="ABC123",
            status="inventory",
            rentedTo=None,
            daysRemaining=None,
        ),
        Car(
            make="Honda",
            model="Accord",
            year="2020",
            color="Blue",
            licensePlate="JKL012",
            status="inventory",
            rentedTo=None,
            daysRemaining=None,
        ),
        Car(
            make="Chevrolet",
            model="Malibu",
            year="2019",
            color="Silver",
            licensePlate="MNO345",
            status="inventory",
            rentedTo=None,
            daysRemaining=None,
        ),
        Car(
            make="Honda",
            model="Civic",
            year="2021",
            color="White",
            licensePlate="DEF456",
            status="maintenance",
            rentedTo=None,
            daysRemaining=None,
        ),
        Car(
            make="Nissan",
            model="Altima",
            year="2020",
            color="Gray",
            licensePlate="PQR678",
            status="maintenance",
            rentedTo=None,
            daysRemaining=None,
        ),
        Car(
            make="Mazda",
            model="3",
            year="2019",
            color="Blue",
            licensePlate="STU901",
            status="maintenance",
            rentedTo=None,
            daysRemaining=None,
        ),
        Car(
            make="Ford",
            model="Fusion",
            year="2021",
            color="Red",
            licensePlate="GHI789",
            status="rented",
            rentedTo="John Doe",
            daysRemaining=5,
        ),
        Car(
            make="BMW",
            model="3 Series",
            year="2020",
            color="Black",
            licensePlate="VWX234",
            status="rented",
            rentedTo="Jane Smith",
            daysRemaining=3,
        ),
        Car(
            make="Audi",
            model="A4",
            year="2019",
            color="White",
            licensePlate="YZA567",
            status="rented",
            rentedTo="Alice Johnson",
            daysRemaining=7,
        ),
    ]

    db.session.add_all(cars)
    db.session.commit()

    return jsonify({"message": "db seeded"}), 200   