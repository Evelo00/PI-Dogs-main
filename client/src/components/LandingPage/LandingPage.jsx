import React from "react";
import { Link } from "react-router-dom";

export default function LandingPage() {
    return (
        <div className="landing-page">
            <h1>WELCOME TO THE LANDING PAGE</h1>
            <Link to='/home'>
                <button className="btn-LP">Ingresar</button>
            </Link>
            </div>
    )
}

// landing con un mensaje inicial y el boton de ingreso a /home