from database import db

class Server(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100))
    ip_address = db.Column(db.String(100))
    created = db.Column(db.String(100))
    tag = db.Column(db.String(50))
    provider = db.Column(db.String(50))


class Metric(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    server_id = db.Column(db.Integer, db.ForeignKey('server.id'))
    cpu = db.Column(db.Float)
    ram = db.Column(db.Float)
    disk = db.Column(db.Float)
    app = db.Column(db.Float)
    timestamp = db.Column(db.DateTime)


class Alert(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    severity = db.Column(db.String(10))  # critical, medium, low
    message = db.Column(db.String(200))
    server_id = db.Column(db.Integer, db.ForeignKey('server.id'))
