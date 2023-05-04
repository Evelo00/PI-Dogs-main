import React, { Fragment } from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCharacters, filterCharactersByTemperament, orderByName, filterCreated } from "../../actions";
import { Link } from "react-router-dom";
import Card from "../Card/Card";
import "./Home.css";
import Paginado from "../Paginado/Paginado.jsx";




export default function Home() {
    const dispatch = useDispatch();
    const [orden, setOrden] = useState(''); //para mostrar el orden en el que se estan mostrando los personajes
    const allCharacters = useSelector((state) => state.characters); //similar a hacer el map.state to props
    // const temperament = useSelector((state) => state.temperament); //similar a hacer el map.state to props


    /* Paginado */

    const [currentPage, setCurrentPage] = useState(1); //para la paginacion
    const [charactersPerPage, setCharactersPerPage] = useState(8); //para la paginación
    const indexOfLastCharacter = currentPage * charactersPerPage; //indice del ultimo perro de la pagina //5
    const indexOfFirstCharacter = indexOfLastCharacter - charactersPerPage; //indice del primer perro de la pagina //0
    const currentCharacters = allCharacters.slice(indexOfFirstCharacter, indexOfLastCharacter); //array de perros de la pagina actual //0-5

    const paginado = (pageNumber) => {
        setCurrentPage(pageNumber);
    };
    /* Paginado */


    useEffect(() => {
        dispatch(getCharacters()); //reemplaza todo lo del mapdispatch to props y el use effect hace que se ejecute una sola vez   
    }, [dispatch]);

    function handleClick(e) {  //funcion para volver a cargar todos los personajes
        e.preventDefault();
        dispatch(getCharacters());
    }

    function handleFilterTemperament(e) { // funcion para filtrar por temperamento
        dispatch(filterCharactersByTemperament(e.target.value));
    }

    function handleFilterCreated(e) { // funcion para filtrar por creado o no creado
        dispatch(filterCreated(e.target.value));
    }

    function handleOrder(e) { // funcion para ordenar de forma ascendente o descendente 
        dispatch(orderByName(e.target.value))
        setCurrentPage(1);
        setOrden(`Ordenado ${e.target.value}`)
    };

    return (
        <div className="home">
            <Link to="/character">Crear personaje</Link>
            <h1 className="home-title">Dogs api</h1>
            <button className="home-btn" onClick={e => { handleClick(e) }}>
                Volver a cargar todos los personajes
            </button>
            {/* Seccion de filtros y ordenamientos 
            el primero es por orden alfabetico, el segundo es por temperamento y el tercero es por creado o no creado */}
            <select className="home-select" onChange={e => handleOrder(e)}>
                <option value="asc">Ascendente</option>
                <option value="desc">Descendente</option>
            </select>
            <select className="home-select" onChange={e => handleFilterTemperament(e)}>
                <option disabled value="">Ord por temperamento</option>
                <option value="all">Mostrar todos los temperamentos</option>
                {/* {
                    temperament.length > 0 &&
                    temperament.map((t, index) => <option key={index} value={t.nombre}>{t.nombre}</option>)
                } */}
            </select>
            <select className="home-select" onChange={e => handleFilterCreated(e)}>
                <option value="all">Mostrar todos los personajes</option>
                <option value="api">Personajes de la API</option>
                <option value="created">Personajes de la base de datos</option>
            </select>
            <Paginado
                charactersPerPage={charactersPerPage}
                allCharacters={allCharacters.length}
                paginado={paginado}
            />
            <div className="cards-container">

                {
                    currentCharacters?.map((character) => {
                        return (
                            <Link to={`/character/${character.id}`} key={character.id}>
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
