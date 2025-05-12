import psycopg2
from psycopg2 import OperationalError

def test_insert_projects():
    try:
        # Koble til databasen
        connection = psycopg2.connect(
            host="purelogicdb.postgres.database.azure.com",
            database="purelogicdb",
            user="purelogicdb",
            password="PLpassword123",
            sslmode="require"
        )
        cursor = connection.cursor()

        # Prosjektene som skal settes inn
        projects = [
            ("Project 1", "Description for project 1", "frontend/public/images/fredrikshald-brygge.png", "Keyword1,Keyword2", "Long description for project 1", "Short description for project 1", True),
            ("Project 2", "Description for project 2", "frontend/public/images/fredrikshald-brygge.png", "Keyword2,Keyword3", "Long description for project 2", "Short description for project 2", False),
            ("Project 3", "Description for project 3", "frontend/public/images/fredrikshald-brygge.png", "Keyword3,Keyword4", "Long description for project 3", "Short description for project 3", True),
        ]

        # SQL-spørring for å sette inn prosjektene
        insert_query = """
        INSERT INTO public."Projects" ("Title", "Description", "image_url", "Keywords", "LongDescription", "ShortDescription", "visibleOnWebsite")
        VALUES (%s, %s, %s, %s, %s, %s, %s)
        RETURNING "Id";
        """
        
        # Sett inn prosjektene
        cursor.executemany(insert_query, projects)
        connection.commit()

        # Bekreft at prosjektene ble lagt til
        print("Prosjektene ble lagt til i databasen.")

        # Hent de nylig lagrede prosjektene
        cursor.execute('SELECT * FROM public."Projects" WHERE "Title" IN (%s, %s, %s);', ("Project 1", "Project 2", "Project 3"))
        rows = cursor.fetchall()

        # Skriv ut dataene som ble hentet
        for row in rows:
            print("Project:", row)

        # Lukk cursor og tilkobling
        cursor.close()
        connection.close()

    except OperationalError as e:
        print("Feil ved tilkobling:", e)

# Kjør testen
test_insert_projects()
