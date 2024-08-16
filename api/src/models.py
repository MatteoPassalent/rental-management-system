from . import db

class Car(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    make = db.Column(db.String(50))
    model = db.Column(db.String(50))
    year = db.Column(db.String(50))
    color = db.Column(db.String(50))
    licensePlate = db.Column(db.String(50))
    status = db.Column(db.String(50))
    daysRemaining = db.Column(db.String(50))
    rentedTo = db.Column(db.Integer, db.ForeignKey("customer.id"))


class Customer(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50))
    cars = db.relationship("Car")
