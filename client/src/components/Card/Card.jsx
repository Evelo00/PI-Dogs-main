import React from "react";
import "./Card.css";


export default function Card({ name, image, temperament, weight }) { // se le pasa como props el name, image, temperament y weight
    // console.log(image)
    return (
        // ! se crea una card con los datos que se le pasan como props
        <div className="card"> 
            <img  src={image} alt="imagen" className="Card-img" />
            <h3 className="Card-name">{name}</h3>
            <h5 className="Card-temp">{temperament}</h5>
            <h5 className="Card-peso">Weight: {weight}</h5>
        </div>
    )
}