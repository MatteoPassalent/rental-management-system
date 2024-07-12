from . import db

class Car(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    carName = db.Column(db.String(50))
    # make
    # model
    # year
    # color
    # license plate
    # status (available, rented, maintenance)
    # Rented to (if rented)
    # Days remaining (if rented)

class Customer(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50))
    # email
    # phone
    # address
    # car rented (if any)
    
    