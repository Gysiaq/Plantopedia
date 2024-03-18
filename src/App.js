import "./App.css";
import { Home } from "./Home.jsx";
import { Plant } from "./Plant.jsx";
import { context } from "./context/Context.js";
import { SearchSection } from "./SearchSection.jsx";
import { useContext } from "react";

function App() {
    const { state } = useContext(context);
    const { visibleSection } = state;

    const renderVisibleSection = () => {
        switch (visibleSection) {
            case "plantDetails":
                return (
                    <div>
                        <Plant />
                    </div>
                );
            case "searchSection":
                return <SearchSection />;
            case "home":
            default:
                return <SearchSection />;
        }
    };

    return <div className="App">{renderVisibleSection()}</div>;
}

export default App;
