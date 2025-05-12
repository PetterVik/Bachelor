import psycopg2
from psycopg2 import OperationalError

def test_connection():
    try:
        # Koble til databasen
        connection = psycopg2.connect(
            host="purelogicdb.postgres.database.azure.com",
            database="purelogicdb",
            user="purelogicdb",
            password="PLpassword123",
            sslmode="require"
        )

        # Opprett en cursor for å kjøre SQL-spørringer
        cursor = connection.cursor()

        # Kjør en enkel spørring
        cursor.execute("SELECT version();")
        db_version = cursor.fetchone()
        print("Database version:", db_version)

        # Lukk cursor og tilkobling
        cursor.close()
        connection.close()

        print("Tilkobling til databasen er vellykket.")

    except OperationalError as e:
        print("Feil ved tilkobling:", e)

# Kjør test
test_connection()
