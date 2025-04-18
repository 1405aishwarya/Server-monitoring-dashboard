# mock_data.py

from models import Server, Metric, Alert
from database import db
from faker import Faker
import random
from datetime import datetime, timedelta

fake = Faker()

def populate_mock_data():
    print("🛠️  Inserting mock data...")

    # Insert Servers
    servers = []
    for _ in range(5):
        server = Server(
            name=fake.name(),
            ip_address=fake.ipv4_private(),
            created=f"{random.randint(1, 12)} months ago",
            tag=random.choice(['Web Server', 'Desky', 'Software', 'Database', 'API Gateway']),
            provider=random.choice(['Indioserver', 'Jenriorde', 'Walikarsi', 'CloudSpark', 'NodeFusion'])
        )
        db.session.add(server)
        servers.append(server)

    db.session.commit()

    # Insert Metrics
    for server in servers:
        for i in range(12):
            metric = Metric(
                server_id=server.id,
                cpu=round(random.uniform(10, 95), 2),
                ram=round(random.uniform(20, 95), 2),
                disk=round(random.uniform(10, 100), 2),
                app=round(random.uniform(5, 70), 2),
                timestamp=datetime.now() - timedelta(minutes=i * 5)
            )
            db.session.add(metric)

    # Insert Alerts
    for _ in range(10):
        alert = Alert(
            severity=random.choice(['critical', 'medium', 'low']),
            message=fake.sentence(nb_words=6),
            server_id=random.choice(servers).id
        )
        db.session.add(alert)

    db.session.commit()
    print("✅ Random mock data inserted.")
