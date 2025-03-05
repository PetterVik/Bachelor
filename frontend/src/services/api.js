const API_URL = "http://localhost:5001"; // The frontend gets information from the backend at the port 5001. 

export const fetchProjects = async () => {
  try {
    const response = await fetch(`${API_URL}/api/projects`);
    if (!response.ok) {
      throw new Error("Kunne ikke hente prosjektene");
    }
    return await response.json();
  } catch (error) {
    console.error("Feil ved henting av prosjekter:", error);
    return [];
  }
};
