import React, { useContext, useState, useEffect } from "react";
import { context } from "./context/Context";
import { Header } from "./Header";
import "./Plant.css";
import axios from "axios";
import { PLANT_API_KEY } from "./API_key";
import { SET_VISIBLE_SECTION } from "./context/ActionTypes";
import noImage from "./images/noImage.jpg";

export const Plant = () => {
    const { state, dispatch } = useContext(context);
    const [plant, setPlant] = useState(null);
    const { plantInf } = state;

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await axios.get(
                    `https://perenual.com/api/species/details/${plantInf.id}?key=${PLANT_API_KEY}`
                );
                setPlant(response.data);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        }

        fetchData();
    }, []);

    const difficultyLevel = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];
    const plantHardinessLevel = plant?.hardiness?.max;

    console.log(plant);

    return (
        <div className="plant-container">
            <Header />

            <button
                className="button-return-to-search heading-6"
                onClick={() =>
                    dispatch({
                        type: SET_VISIBLE_SECTION,
                        payload: "searchSection",
                    })
                }
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    fill="currentColor"
                    className="bi bi-arrow-left-circle"
                    viewBox="0 0 16 16"
                >
                    <path
                        fill-rule="evenodd"
                        d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8m15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0m-4.5-.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5z"
                    />
                </svg>{" "}
                Return to search
            </button>

            <div className="main-plant-details-container">
                <img
                    className="plant-image-size"
                    src={
                        plantInf?.default_image?.regular_url
                            ? plantInf?.default_image?.regular_url
                            : noImage
                    }
                />
                <div className="plant-names-and-description-container">
                    <div className="plant-names-container">
                        <h2 className="heading-3 plant-common-name">
                            {plant?.common_name}
                        </h2>
                        <h3 className="heading-5 plant-scientific-name">
                            {plant?.scientific_name}
                        </h3>

                        <p className="paragraph plant-description">
                            {plant?.description}
                        </p>
                    </div>
                </div>
            </div>
            <div className="plant-description-for-1000px-width-container">
                <p className="paragraph plant-description-for-1000px-width">
                    {plant?.description}
                </p>
            </div>

            <div className="details-container">
                <div className="information-details-container">
                    <h3 className="heading-4-Montserrat">
                        General Information
                    </h3>
                    <div className="pair-of-information-details-container">
                        {plant?.sunlight && (
                            <div className="icon-description-plant-information">
                                <div className="circle-div-background-sunlight">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="32"
                                        height="32"
                                        fill="#f59e0b"
                                        class="bi bi-sun-fill circle-div"
                                        viewBox="0 0 16 16"
                                    >
                                        <path d="M8 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8M8 0a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 0m0 13a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 13m8-5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2a.5.5 0 0 1 .5.5M3 8a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2A.5.5 0 0 1 3 8m10.657-5.657a.5.5 0 0 1 0 .707l-1.414 1.415a.5.5 0 1 1-.707-.708l1.414-1.414a.5.5 0 0 1 .707 0m-9.193 9.193a.5.5 0 0 1 0 .707L3.05 13.657a.5.5 0 0 1-.707-.707l1.414-1.414a.5.5 0 0 1 .707 0m9.193 2.121a.5.5 0 0 1-.707 0l-1.414-1.414a.5.5 0 0 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .707M4.464 4.465a.5.5 0 0 1-.707 0L2.343 3.05a.5.5 0 1 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .708" />
                                    </svg>
                                </div>
                                <h6 className="heading-6">{plant?.sunlight}</h6>
                            </div>
                        )}
                        {plant?.watering && (
                            <div className="icon-description-plant-information">
                                <div className="circle-div-background-watering">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="32"
                                        height="32"
                                        fill="#0ea5e9"
                                        class="bi bi-droplet-fill circle-div"
                                        viewBox="0 0 16 16"
                                    >
                                        <path d="M8 16a6 6 0 0 0 6-6c0-1.655-1.122-2.904-2.432-4.362C10.254 4.176 8.75 2.503 8 0c0 0-6 5.686-6 10a6 6 0 0 0 6 6M6.646 4.646l.708.708c-.29.29-1.128 1.311-1.907 2.87l-.894-.448c.82-1.641 1.717-2.753 2.093-3.13" />
                                    </svg>
                                </div>

                                <h6 className="heading-6">{plant?.watering}</h6>
                            </div>
                        )}
                    </div>
                    <div className="pair-of-information-details-container">
                        {plant?.care_level && (
                            <div
                                div
                                className="icon-description-plant-information"
                            >
                                <div className="circle-div-background-care-level">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="32"
                                        height="32"
                                        fill="#84cc16"
                                        class="bi bi-reception-4"
                                        viewBox="0 0 16 16"
                                    >
                                        <path d="M0 11.5a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5zm4-3a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 .5.5v5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5zm4-3a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 .5.5v8a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5zm4-3a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 .5.5v11a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5z" />
                                    </svg>
                                </div>
                                <h6 className="heading-6">
                                    Care level: {plant?.care_level}
                                </h6>
                            </div>
                        )}
                        {plant?.cycle && (
                            <div className="icon-description-plant-information">
                                <div className="circle-div-background-cycle">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="32"
                                        height="32"
                                        fill="#ec4899"
                                        class="bi bi-arrow-repeat"
                                        viewBox="0 0 16 16"
                                    >
                                        <path d="M11.534 7h3.932a.25.25 0 0 1 .192.41l-1.966 2.36a.25.25 0 0 1-.384 0l-1.966-2.36a.25.25 0 0 1 .192-.41m-11 2h3.932a.25.25 0 0 0 .192-.41L2.692 6.23a.25.25 0 0 0-.384 0L.342 8.59A.25.25 0 0 0 .534 9" />
                                        <path
                                            fill-rule="evenodd"
                                            d="M8 3c-1.552 0-2.94.707-3.857 1.818a.5.5 0 1 1-.771-.636A6.002 6.002 0 0 1 13.917 7H12.9A5 5 0 0 0 8 3M3.1 9a5.002 5.002 0 0 0 8.757 2.182.5.5 0 1 1 .771.636A6.002 6.002 0 0 1 2.083 9z"
                                        />
                                    </svg>
                                </div>
                                <h6 className="heading-6">{plant?.cycle}</h6>
                            </div>
                        )}
                    </div>
                    <div className="pair-of-information-details-container">
                        {plant?.medicinal === true && (
                            <div className="icon-description-plant-information">
                                <div className="circle-div-background-medicinal">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="32"
                                        height="32"
                                        fill="#10b981"
                                        class="bi bi-heart-pulse-fill circle-div"
                                        viewBox="0 0 16 16"
                                    >
                                        <path d="M1.475 9C2.702 10.84 4.779 12.871 8 15c3.221-2.129 5.298-4.16 6.525-6H12a.5.5 0 0 1-.464-.314l-1.457-3.642-1.598 5.593a.5.5 0 0 1-.945.049L5.889 6.568l-1.473 2.21A.5.5 0 0 1 4 9z" />
                                        <path d="M.88 8C-2.427 1.68 4.41-2 7.823 1.143q.09.083.176.171a3 3 0 0 1 .176-.17C11.59-2 18.426 1.68 15.12 8h-2.783l-1.874-4.686a.5.5 0 0 0-.945.049L7.921 8.956 6.464 5.314a.5.5 0 0 0-.88-.091L3.732 8z" />
                                    </svg>
                                </div>
                                <h6 className="heading-6">
                                    Medicinal Properties
                                </h6>
                            </div>
                        )}
                        {plant?.poisonous_to_humans === 1 && (
                            <div className="icon-description-plant-information">
                                <div className="circle-div-background-dangerous">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="32"
                                        height="32"
                                        fill="#DC2626"
                                        class="bi bi-exclamation-triangle"
                                        viewBox="0 0 16 16"
                                    >
                                        <path d="M7.938 2.016A.13.13 0 0 1 8.002 2a.13.13 0 0 1 .063.016.15.15 0 0 1 .054.057l6.857 11.667c.036.06.035.124.002.183a.2.2 0 0 1-.054.06.1.1 0 0 1-.066.017H1.146a.1.1 0 0 1-.066-.017.2.2 0 0 1-.054-.06.18.18 0 0 1 .002-.183L7.884 2.073a.15.15 0 0 1 .054-.057m1.044-.45a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767z" />
                                        <path d="M7.002 12a1 1 0 1 1 2 0 1 1 0 0 1-2 0M7.1 5.995a.905.905 0 1 1 1.8 0l-.35 3.507a.552.552 0 0 1-1.1 0z" />
                                    </svg>
                                </div>
                                <h6 className="heading-6">
                                    Poisonous to humans
                                </h6>
                            </div>
                        )}
                        {plant?.poisonous_to_pets === 1 && (
                            <div className="icon-description-plant-information">
                                <div className="circle-div-background-dangerous">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="32"
                                        height="32"
                                        fill="#DC2626"
                                        class="bi bi-exclamation-triangle"
                                        viewBox="0 0 16 16"
                                    >
                                        <path d="M7.938 2.016A.13.13 0 0 1 8.002 2a.13.13 0 0 1 .063.016.15.15 0 0 1 .054.057l6.857 11.667c.036.06.035.124.002.183a.2.2 0 0 1-.054.06.1.1 0 0 1-.066.017H1.146a.1.1 0 0 1-.066-.017.2.2 0 0 1-.054-.06.18.18 0 0 1 .002-.183L7.884 2.073a.15.15 0 0 1 .054-.057m1.044-.45a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767z" />
                                        <path d="M7.002 12a1 1 0 1 1 2 0 1 1 0 0 1-2 0M7.1 5.995a.905.905 0 1 1 1.8 0l-.35 3.507a.552.552 0 0 1-1.1 0z" />
                                    </svg>
                                </div>
                                <h6 className="heading-6">Poisonous to pets</h6>
                            </div>
                        )}
                    </div>
                </div>
            </div>
            <div className="hardiness-level-container">
                <h5 className="heading-5-Montserrat hardiness-level-text">
                    Hardiness level:
                </h5>
                <div className="difficulty-level-circle-position">
                    {difficultyLevel.map((circleNumber) => (
                        <div
                            className={
                                circleNumber <= plantHardinessLevel
                                    ? "circle green"
                                    : "circle"
                            }
                        ></div>
                    ))}
                </div>
            </div>
            <h5 className="heading-5-Montserrat hardiness-location-text">
                Incidence
            </h5>
            <iframe
                className="hardiness_location"
                scrolling="no"
                src={plant?.hardiness_location.full_url}
            ></iframe>
        </div>
    );
};
