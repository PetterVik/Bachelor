import { useEffect, useState } from "react";

function App() {
    const [message, setMessage] = useState("");

    useEffect(() => {
        fetch("http://localhost:5123/api/example") // Bruk backend-porten du ser i Swagger
            .then((res) => res.json())
            .then((data) => setMessage(data.message))
            .catch((err) => console.error("Error fetching data:", err));
    }, []);

    return (
        <div>
            <h1>React + .NET</h1>
            <p>{message}</p>
        </div>
    );
}

export default App;
