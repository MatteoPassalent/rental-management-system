from . import db

class Car(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    carName = db.Column(db.String(50))