import React, { useState, useEffect } from "react";
import axios from "axios";
import { dogOptions } from "../options";

export const DogAPI = () => {
    const [dogData, setDogData] = useState(null);

    const fetchData = () => {
        axios.get(
            "https://api.thedogapi.com/v1/images/search?format=json&limit=1",
            dogOptions
        )
        .then((response) => setDogData(response.data))
        .catch((error) => console.error("Error fetching dog data"));
    };

    const handleBanAttribute = (attribute) => {
        setBannedAttributes((prevBanned) => [...prevBanned, attribute]);
    };

    useEffect(() => {
        fetchData();
    }, [])
 
    console.log("Data:", dogData);
    return (
        <div>
            
            <h1>Discover Dog Images 🐶</h1>
            <button onClick={fetchData}>Get Dog Image</button>
            {dogData && <img className="screenshot" src={dogData[0].url} alt="Dog"/>}
        </div>
    );
};

export default DogAPI;