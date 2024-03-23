import React, { useState, useEffect } from "react";
import axios from "axios";
import { dogOptions } from "../options";

export const DogAPI = () => {
    const [dogData, setDogData] = useState(null);
    const [bannedAttributes, setBannedAttributes] = useState([]);

    const fetchData = () => {
        axios.get(
            "https://api.thedogapi.com/v1/images/search?format=json&limit=1&has_breeds=1",
            dogOptions
        )
        .then((response) => setDogData(response.data))
        .catch((error) => console.error("Error fetching dog data"));
    };

    const handleBanAttribute = (attribute) => {
        let attrWithUnit;
        if (attribute === dogData[0].breeds[0].weight.imperial) {
            attrWithUnit = `${attribute} pounds`;
        } else if (attribute === dogData[0].breeds[0].height.imperial) {
            attrWithUnit = `${attribute} inches`;
        } else {
            attrWithUnit = attribute;
        }
        setBannedAttributes((prevBanned) => [...prevBanned, attrWithUnit]);
    };

    useEffect(() => {
        fetchData();
    }, [])
 
    console.log("Data:", dogData);
    return (
        <div>
            
            <h1>Dog Shuffle 🐶</h1>
            <button onClick={fetchData}>↻ Click for New Dog Image ↺</button>
            {dogData && (
                <div>
                    <img className="screenshot" src={dogData[0].url} alt="Dog"/>
                    <ul className="attrButtons">
                        {dogData[0].breeds[0] && (
                            <>
                                <li>
                                    <button onClick={() => handleBanAttribute(dogData[0].breeds[0].name)}>
                                        Ban {dogData[0].breeds[0].name}
                                    </button>
                                </li>
                                <li>
                                    <button onClick={() => handleBanAttribute(dogData[0].breeds[0].life_span)}>
                                        Ban {dogData[0].breeds[0].life_span}
                                    </button>
                                </li>
                                <li>
                                    <button onClick={() => handleBanAttribute(dogData[0].breeds[0].weight.imperial)}>
                                        Ban {dogData[0].breeds[0].weight.imperial} pounds
                                    </button>
                                </li>
                                <li>
                                    <button onClick={() => handleBanAttribute(dogData[0].breeds[0].height.imperial)}>
                                        Ban {dogData[0].breeds[0].height.imperial} inches
                                    </button>
                                </li>
                            </>
                        )}
                    </ul>
                </div>
            )}
            <div>
                <h2>Ban List:</h2>
                <ul>
                    {bannedAttributes.map((attribute, index) => (
                        <li key={index}>{attribute}</li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default DogAPI;