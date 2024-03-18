import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { PLANT_API_KEY } from "./API_key";
import "./SearchSection.css";
import { Header } from "./Header";
import { useDebounce } from "./hooks/useDebounce";
import { context } from "./context/Context";
import {
    SET_VISIBLE_SECTION,
    SET_PLANT_INFORMATION,
} from "./context/ActionTypes";

export const SearchSection = () => {
    const [data, setData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchPlantFromInput, setSearchPlantFromInput] = useState([]);

    const { dispatch } = useContext(context);

    // const N = 337;
    // const totalNumberOfPage = Array.from(
    //     { length: N },
    //     (_, index) => index + 1
    // );
    async function fetchData() {
        try {
            const response = await axios.get(
                `https://perenual.com/api/species-list?key=${PLANT_API_KEY}&page=${currentPage}&q=${searchPlantFromInput}`
            );

            setData(response.data);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    }
    const debouncedFetchData = useDebounce(fetchData, 500);

    useEffect(() => {
        debouncedFetchData();
    }, [currentPage, searchPlantFromInput]);

    const handleOpenInformationAboutPlant = (plant) => {
        dispatch({ type: SET_VISIBLE_SECTION, payload: "plantDetails" });
        dispatch({ type: SET_PLANT_INFORMATION, payload: plant });
    };

    return (
        <div className="main-container">
            <Header />
            <div className="search-container">
                <input
                    className="input-search paragraph"
                    placeholder="Search..."
                    onChange={(e) => {
                        return setSearchPlantFromInput(e.target.value);
                    }}
                />
            </div>

            <div className="search-component-container">
                {data.data?.map((plant) => {
                    return (
                        <button
                            className="search-component"
                            key={plant.id}
                            onClick={() =>
                                handleOpenInformationAboutPlant(plant)
                            }
                        >
                            <img
                                className="plant-image"
                                src={plant?.default_image?.regular_url}
                            />
                            <p className="plant-common-name heading-6">
                                {plant.common_name}
                            </p>
                            <p className="plant-scientific-name paragraph">
                                {plant.scientific_name}
                            </p>
                        </button>
                    );
                })}
            </div>
            {/* <div>
                <button></button>
                <button></button>
            </div> */}
        </div>
    );
};
