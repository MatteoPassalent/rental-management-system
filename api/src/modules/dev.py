from flask import Blueprint, jsonify
from src.models import Car, Customer
from .. import db

dev = Blueprint("dev", __name__, url_prefix="/api")

@dev.route("/drop-db")
def drop_db():
    db.drop_all()
    db.create_all()
    return jsonify({"message": "db dropped"}), 200


@dev.route("/seed-db")
def seed_db():
    db.drop_all()
    db.create_all()

    john_doe = Customer(name="John Doe", cars=[])
    jane_smith = Customer(name="Jane Doe", cars=[])
    alice_smith = Customer(name="Alice Smith", cars=[])
    alex_smith = Customer(name="Alex Smith", cars=[])

    db.session.add_all([john_doe, jane_smith, alice_smith, alex_smith])
    db.session.commit()

    cars = [
        Car(
            make="Toyota",
            model="Corolla",
            year="2021",
            color="Black",
            licensePlate="ABC123",
            status="inventory",
            currCustomerName="",
            currCustomerId=None,
            daysRemaining=None,
        ),
        Car(
            make="Honda",
            model="Accord",
            year="2020",
            color="Blue",
            licensePlate="JKL012",
            status="inventory",
            currCustomerName="",
            currCustomerId=None,
            daysRemaining=None,
        ),
        Car(
            make="Chevrolet",
            model="Malibu",
            year="2019",
            color="Silver",
            licensePlate="MNO345",
            status="inventory",
            currCustomerName="",
            currCustomerId=None,
            daysRemaining=None,
        ),
        Car(
            make="Honda",
            model="Civic",
            year="2021",
            color="White",
            licensePlate="DEF456",
            status="maintenance",
            currCustomerName="",
            currCustomerId=None,
            daysRemaining=8,
        ),
        Car(
            make="Nissan",
            model="Altima",
            year="2020",
            color="Gray",
            licensePlate="PQR678",
            status="maintenance",
            currCustomerName="",
            currCustomerId=None,
            daysRemaining=6,
        ),
        Car(
            make="Mazda",
            model="3",
            year="2019",
            color="Blue",
            licensePlate="STU901",
            status="maintenance",
            currCustomerName="",
            currCustomerId=None,
            daysRemaining=5,
        ),
        Car(
            make="Ford",
            model="Fusion",
            year="2021",
            color="Red",
            licensePlate="GHI789",
            status="rented",
            currCustomerName=john_doe.name,
            currCustomerId=john_doe.id,
            daysRemaining=5,
        ),
        Car(
            make="BMW",
            model="3 Series",
            year="2020",
            color="Black",
            licensePlate="VWX234",
            status="rented",
            currCustomerName=jane_smith.name,
            currCustomerId=jane_smith.id,
            daysRemaining=4,
        ),
        Car(
            make="Audi",
            model="A4",
            year="2019",
            color="White",
            licensePlate="YZA567",
            status="rented",
            currCustomerName=alice_smith.name,
            currCustomerId=alice_smith.id,
            daysRemaining=7,
        ),
    ]

    john_doe.cars.append(cars[6])
    jane_smith.cars.append(cars[7])
    alice_smith.cars.append(cars[8])

    db.session.add_all(cars)
    db.session.commit()

    return jsonify({"message": "db seeded"}), 200
 