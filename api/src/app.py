from flask import jsonify
from src.models import Car
from . import db

def register_routes(app):
    @app.route("/")
    def hello_world():
        return "<p>Hello, World test change!</p>"

    @app.route("/test")
    def test():
        return jsonify({"message": "test from api"})
    
    @app.route("/add-car", methods=["POST"])
    def add_car():
        car = Car(carName="test")
        db.session.add(car)
        db.session.commit()
        return jsonify({"message": "car added"})
    
    @app.route("/get-cars")
    def get_cars():
        cars = Car.query.all()
        return jsonify([car.carName for car in cars])
        




