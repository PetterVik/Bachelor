import psycopg2
import sys

# Koble til databasen
try:
    connection = psycopg2.connect(
        host="purelogicdb.postgres.database.azure.com",
        database="purelogicdb",
        user="purelogicdb",
        password="PLpassword123",
        sslmode="require"
    )
    cursor = connection.cursor()

    # Hent prosjekter fra databasen
    cursor.execute("SELECT Id, Title, image_url, ShortDescription, LongDescription FROM Projects WHERE VisibleOnWebsite = TRUE")
    projects = cursor.fetchall()

    # Valider prosjektene
    for project in projects:
        project_id, title, image_url, short_desc, long_desc = project
        
        if not title:
            print(f"Error: Project {project_id} has no title.")
            sys.exit(1)  # Avbryt pipeline hvis tittel mangler
        
        if not image_url:
            print(f"Error: Project {project_id} has no image URL.")
            sys.exit(1)  # Avbryt pipeline hvis bilde mangler
        
        if not short_desc or not long_desc:
            print(f"Error: Project {project_id} is missing a description.")
            sys.exit(1)  # Avbryt pipeline hvis beskrivelse mangler

    print("All projects are valid.")
except Exception as e:
    print(f"Error: {e}")
    sys.exit(1)  # Avbryt pipeline hvis det skjer en feil med databasetilgangen
finally:
    if connection:
        cursor.close()
        connection.close()
