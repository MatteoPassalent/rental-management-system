from flask import jsonify, request
from src.models import Car
from . import db


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
            status="maintenance",
            rentedTo=None,
            daysRemaining=None,
        )
        db.session.add(car)
        db.session.commit()
        return jsonify({"message": "car added"})

    @app.route("/get-cars")
    def get_cars():
        logger.info("Getting all cars")
        status = request.args.get("status")
        cars = Car.query.filter_by(status=status).all()
        car_list = []
        for car in cars:
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
        return jsonify(car_list), 200
