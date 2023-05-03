import React, { Fragment } from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCharacters } from "../../actions";
import { Link } from "react-router-dom";
import Card from "../Card/Card";
import "./Home.css";

export default function Home() {
    const dispatch = useDispatch();
    const allCharacters = useSelector((state) => state.characters); //similar a hacer el map.state to props

    useEffect(() => {
        dispatch(getCharacters()); //reemplaza todo lo del mapdispatch to props y el use effect hace que se ejecute una sola vez   
    }, [dispatch]);

    function handleClick(e) {  //funcion para volver a cargar todos los personajes
        e.preventDefault();
        dispatch(getCharacters());
    }

    return (
        <div>
            <Link to="/character">Crear personaje</Link>
            <h1>Titulo generico por el momento</h1>
            <button onClick={e => { handleClick(e) }}>
                Volver a cargar todos los personajes
            </button>
            <select>
                <option value="asc">Ordenar de forma ascendente</option>
                <option value="desc">Ordenar de forma descendente</option>
            </select>
            <select name="" id="">
                <option value="all">Mostrar todos los personajes</option>
                <option value="temp">Filtrar por temperamento</option>
                <option value="origen">Filtrar por origen</option>
                <option value="nombre">Ordenar por nombre</option>
                <option value="peso">Ordenar por peso</option>
            </select>
            <select>
                <option value="all">Mostrar todos los personajes</option>
                <option value="api">Mostrar personajes de la API</option>
                <option value="db">Mostrar personajes de la base de datos</option>
            </select>
            <div className="cards-container">

            {
                allCharacters?.map((character) => {
                    return (
                        <Link  to={`/character/${character.id}`} key={character.id}>
                            <Fragment>
                                <Card
                                    name={character.name}
                                    image={character.image} 
                                    temperament={character.temperament}
                                    weight={character.peso}
                                    />
                            </Fragment>
                        </Link>
                    );
                })
            }

            </div>
        </div>
    )
}
