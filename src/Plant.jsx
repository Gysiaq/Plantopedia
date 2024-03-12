import React, { useContext } from "react";
import { context } from "./Context";

export const Plant = () => {
    const { state, dispatch } = useContext(context);
    const { plantInf } = state;

    console.log(plantInf);
    return (
        <div>
            <button
                onClick={() =>
                    dispatch({
                        type: "set_visible_section",
                        payload: "searchSection",
                    })
                }
            >
                {<i className="bi bi-arrow-left-circle"></i>} Return to search
            </button>
            <div>
                <img
                    className="plant_image_size"
                    src={plantInf?.default_image.regular_url}
                />
                <h2 className="heading-2">{plantInf?.common_name}</h2>
                <h3 className="heading-3">{plantInf?.scientific_name}</h3>
            </div>
        </div>
    );
};
