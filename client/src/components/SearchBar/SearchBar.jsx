import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { getNameCharacters } from "../../actions";
import "./SearchBar.css";



export default function SearchBar() {
    const dispatch = useDispatch();
    const [name, setName] = useState("");

    function handleInputChange(e) {
        e.preventDefault();
        setName(e.target.value);
    }

    function handleSubmit(e) {
        e.preventDefault();
        dispatch(getNameCharacters(name));
        setName("");
    }

    return (
        <div className="searchBarContainer">
            <input type="text" className="searchBar"
                placeholder="Search by name..."
                onChange={(e) => handleInputChange(e)}
            />

            <button type="submit" className="searchButton" onClick={(e) => handleSubmit(e)}>
                Search
            </button>
        </div>
    )

}