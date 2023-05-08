import React from "react";
import "./Card.css";


export default function Card({ name, image, temperament, weight }) { // se le pasa como props el name, image, temperament y weight
    console.log(temperament)
    return (
        // ! se crea una card con los datos que se le pasan como props
            //name para la APi y nombre para la base de datos
            //temperament para la API y temperamentos para la base de datos
            //weight para la API y peso para la base de datos
        // validaciones para los 2 casos, si es de la API o de la base de datos
        <div className="card"> 
            <img src={image} alt="imagen" className="Card-img" />
            <h3 className="Card-name">{name}</h3>
            <h5 className="Card-temp">{temperament}</h5>
            <h5 className="Card-peso">Weight: {weight}</h5>
        </div>
    )
}