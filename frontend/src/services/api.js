const API_BASE_URL = "http://localhost:5001/api/projects"; // Bruk riktig backend-port

export const fetchProjects = async () => {
    try {
        const response = await fetch(API_BASE_URL);
        if (!response.ok) {
            throw new Error("Kunne ikke hente prosjektene");
        }
        return await response.json();
    } catch (error) {
        console.error("Feil ved henting av prosjekter:", error);
        return [];
    }
};
