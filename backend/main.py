from flask import Flask, jsonify
from flask_cors import CORS
from database import db
from models import Server, Metric, Alert
import os

app = Flask(__name__)
CORS(app)

# ✅ Use environment variable for database URL
app.config['SQLALCHEMY_DATABASE_URI'] = os.environ.get('DATABASE_URL', 'sqlite:///fallback.db')  # fallback for local testing
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db.init_app(app)

@app.route("/")
def home():
    return {"status": "API is running ✅"}

@app.route("/servers")
def get_servers():
    servers = Server.query.all()
    return jsonify([{
        "id": s.id,
        "name": s.name,
        "ip_address": s.ip_address,
        "created": s.created,
        "tag": s.tag,
        "provider": s.provider
    } for s in servers])

@app.route("/metrics")
def get_metrics():
    metrics = Metric.query.all()
    return jsonify([{
        "cpu": m.cpu,
        "ram": m.ram,
        "disk": m.disk,
        "app": m.app,
        "timestamp": m.timestamp.strftime("%Y-%m-%d %H:%M:%S")
    } for m in metrics])

@app.route("/alerts")
def get_alerts():
    alerts = Alert.query.all()
    counts = {"critical": 0, "medium": 0, "low": 0}
    for a in alerts:
        counts[a.severity] += 1
    return jsonify(counts)

# ✅ Required for Render deployment
if __name__ == "__main__":
    app.run(host="0.0.0.0", port=10000)
