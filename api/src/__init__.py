from flask import Flask
from flask_sqlalchemy import SQLAlchemy
import os
from flask_cors import CORS

db = SQLAlchemy()

def create_app():
    app = Flask(__name__)
    CORS(app, orgins=os.getenv("CORS_ORIGINS"))
    app.config["SQLALCHEMY_DATABASE_URI"] = os.getenv("DATABASE_URL")
    app.config["SECRET_KEY"] = os.getenv("SECRET_KEY")
    db.init_app(app)

    from src.modules.cars import cars
    from src.modules.customers import customers
    from src.modules.status_catergory import status_catergory

    app.register_blueprint(cars)
    app.register_blueprint(customers)
    app.register_blueprint(status_catergory)

    if os.getenv("FLASK_ENV") == "development":
        from src.modules.dev import dev
        app.register_blueprint(dev)

    with app.app_context():
        db_path = os.path.join(app.instance_path, 'database.db')
        if not os.path.exists(db_path):
            db.create_all()

    from src.cron import scheduler
    scheduler.api_enabled = True
    scheduler.init_app(app)
    scheduler.start()

    return app
