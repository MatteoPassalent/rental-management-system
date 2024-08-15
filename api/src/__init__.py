from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from dotenv import load_dotenv
import os
from os import path

db = SQLAlchemy()
load_dotenv()


def create_app():
    app = Flask(__name__)
    app.config["SQLALCHEMY_DATABASE_URI"] = os.getenv("DATABASE_URL")
    app.config["SECRET_KEY"] = os.getenv("SECRET_KEY")
    db.init_app(app)

    from src.modules.cars import cars
    from src.modules.customers import customers
    from src.modules.status_catergory import status_catergory
    from src.modules.dev import dev

    app.register_blueprint(cars)
    app.register_blueprint(customers)
    app.register_blueprint(status_catergory)
    app.register_blueprint(dev)

    with app.app_context():
        if not path.exists("/api/instance/database.db"):
            db.create_all()

    return app
