import React from "react";
import { Link } from "react-router-dom";
import "./LandingPage.css";

export default function LandingPage() {
    return (
        <div className="lp-div">
            <h1 className="lp-title">Henry Dogs</h1>
            <Link to='/home'>
                <button className="lp-button">Ingresar</button>
            </Link>      
        </div>
    )
}

// landing con un mensaje inicial y el boton de ingreso a /home