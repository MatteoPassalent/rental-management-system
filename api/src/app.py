from flask import jsonify, request
from src.models import Car
from . import db

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

def register_routes(app, logger):
    @app.route("/")
    def hello_world():
        logger.info("Hello, World!")
        return "<p>Hello, World test change!</p>", 200

    @app.route("/test")
    def test():
        logger.info("Test")
        return "<p>Test</p>", 200

    @app.route("/add-car", methods=["POST"])
    def add_car():
        car = Car(
            make="Toyota",
            model="Corolla",
            year="2021",
            color="Black",
            licensePlate="ABC123",
            status="rented",
            rentedTo=None,
            daysRemaining=None,
        )
        db.session.add(car)
        db.session.commit()
        return jsonify({"message": "car added"})

    @app.route("/get-cars")
    def get_cars():
        inventory = Car.query.filter_by(status="inventory").all()
        maintenance = Car.query.filter_by(status="maintenance").all()
        rented = Car.query.filter_by(status="rented").all()
        inventory_list = create_list(inventory)
        maintenance_list = create_list(maintenance)
        rented_list = create_list(rented)
        car_lists = {
            "inventory": inventory_list,
            "maintenance": maintenance_list,
            "rented": rented_list,
        }
        return jsonify(car_lists), 200
    
    @app.route("/update-status", methods=["PUT"])
    def update_status():
        car_id = request.json.get("id")
        status = request.json.get("status")
        car = Car.query.get(car_id)
        car.status = status
        db.session.commit()
        return jsonify({"message": "status updated"}), 200
    
    @app.route("/drop-db")
    def drop_db():
        db.drop_all()
        db.create_all()
        return jsonify({"message": "db dropped"}), 200
    
    
    @app.route("/seed-db")
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