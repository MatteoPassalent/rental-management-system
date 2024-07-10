from flask import Flask, jsonify

app = Flask(__name__)

@app.route("/")
def hello_world():
    return "<p>Hello, World test change!</p>"

@app.route("/test")
def test():
    return jsonify({"message": "test from api!"})

if __name__ == "__main__":
    app.run(debug=True)

