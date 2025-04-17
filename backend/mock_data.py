from main import app, db
from models import Server, Metric, Alert
from datetime import datetime, timedelta
from faker import Faker
import random

fake = Faker()

with app.app_context():
    # 🧼 Clean slate
    db.drop_all()
    db.create_all()

    # 🌐 Server seeding
    tag_options = ['Web Server', 'Desky', 'Software', 'Database', 'API Gateway']
    provider_options = ['Indioserver', 'Jenriorde', 'Walikarsi', 'CloudSpark', 'NodeFusion']

    servers = []
    for _ in range(5):  # 5 random servers
        server = Server(
            name=fake.name(),
            ip_address=fake.ipv4_private(),
            created=f"{random.randint(1, 12)} months ago",
            tag=random.choice(tag_options),
            provider=random.choice(provider_options)
        )
        db.session.add(server)
        servers.append(server)

    db.session.commit()

    # 📈 Metrics per server
    for server in servers:
        for i in range(20):  # 20 metrics per server
            metric = Metric(
                server_id=server.id,
                cpu=round(random.uniform(10, 95), 2),
                ram=round(random.uniform(20, 95), 2),
                disk=round(random.uniform(10, 100), 2),
                app=round(random.uniform(5, 70), 2),
                timestamp=datetime.now() - timedelta(minutes=i * 5)
            )
            db.session.add(metric)

    # 🚨 Alerts seeding
    alert_severities = ['critical', 'medium', 'low']
    alert_count = 10  # You can increase this if needed

    for _ in range(alert_count):
        alert = Alert(
            severity=random.choice(alert_severities),
            message=fake.sentence(nb_words=6),
            server_id=random.choice(servers).id
        )
        db.session.add(alert)
        print(f"[+] Alert seeded: {alert.severity.upper()} - {alert.message}")

    db.session.commit()
    print("✅ Random mock data inserted.")
