from flask_apscheduler import APScheduler
from . import db
from .models import Car, Customer

scheduler = APScheduler()

@scheduler.task('cron', id='update_days_remaining', day='*')
def update_days_remaining():
    with scheduler.app.app_context():
        cars = Car.query.all()
        for car in cars:
            if not car.daysRemaining:
                continue

            car.daysRemaining -= 1
            if car.daysRemaining > 0:
                continue

            if car.currCustomerId:
                customer = Customer.query.get(car.currCustomerId)
                customer.cars.remove(car)

            car.status = 'inventory'
            car.currCustomerName = ''
            car.currCustomerId = None
            car.daysRemaining = None
    
        db.session.commit()