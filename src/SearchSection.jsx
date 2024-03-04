import React, { useState, useEffect } from "react";
import axios from "axios";
export const SearchSection = () => {
    const [data, setData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [word, setWord] = useState(null);
    const [search, setSearch] = useState(null);

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await axios.get(
                    `https://perenual.com/api/species-list?key=sk-aiPx65e35af7d61034398&page=${currentPage}`
                );

                setData(response.data);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        }

        fetchData();
    }, [currentPage]);
    console.log(data);

    const handleSubmitSearch = (e) => {
        e.preventDefault();
    };

    const handleWordChange = () => {
        setWord();
        console.log(word);
    };
    const alphabet = [
        "a",
        "b",
        "c",
        "d",
        "e",
        "f",
        "g",
        "h",
        "i",
        "k",
        "j",
        "l",
        "m",
        "n",
        "o",
        "p",
        "q",
        "r",
        "s",
        "t",
        "u",
        "v",
        "w",
        "x",
        "y",
        "z",
    ];
    return (
        <div>
            <div>
                <input
                    onChange={(e) => {
                        return setSearch(e.target.value);
                    }}
                />
                <button type="submit" onSubmit={handleSubmitSearch}></button>
            </div>

            {alphabet.map((letterOfAlphabet) => (
                <button onClick={handleWordChange}>{letterOfAlphabet}</button>
            ))}

            <div>
                <p>Total result: {data?.total}</p>
                {/* 
TODO: WARUNEK DLA PRZYCISKU Z LICZBĄ: JEŚLI JEST NACIŚNIETY TO WTEDY FILTRUJE PO ALFABECIE JAK NIE JEST TO POAKZUJE WSZYTSKO
TODO: SEARCH DODAĆ   
*/}
                {data.data?.map((plants) => {
                    return (
                        <div key={plants.id}>
                            {/* <img
                                className=""
                                src={plants.default_image?.original_url}
                            /> */}
                            <p className="">{plants.common_name}</p>
                            <p className="">{plants.scientific_name}</p>
                        </div>
                    );
                })}
                <input
                    onChange={(e) => {
                        return setCurrentPage(e.target.value);
                    }}
                ></input>
            </div>
        </div>
    );
};
