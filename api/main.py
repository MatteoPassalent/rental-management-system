from src import create_app
from dotenv import load_dotenv
import os

load_dotenv()
app = create_app()

if __name__ == "__main__":
    debug_mode = os.getenv("FLASK_ENV") == "development"
    app.run(debug=debug_mode)
