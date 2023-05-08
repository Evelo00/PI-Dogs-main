import React from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector, } from "react-redux";
import { getDetail } from "../../actions";
import { useEffect } from "react";
import './Detail.css'

export default function Detail() {
    const dispatch = useDispatch();

    const { id } = useParams()
    const myCharacter = useSelector((state) => state.detail);

    useEffect(() => {
        dispatch(getDetail(id));
    }, [dispatch, id]);

    return (
        <div className="detail">
            <h1 className="title-detail">Detail</h1>
            <Link to="/home">
                <button className="buttonD">Back</button>
            </Link>
            <div className="detail-container">
                <div className="detail-right">
                    <h2 className="name-detail">{myCharacter.name ? myCharacter.name : myCharacter.nombre ? myCharacter.nombre : "No name"}</h2>
                    <div className="hexagon">
                        <img src={myCharacter.image ? myCharacter.image : myCharacter.imagen ? myCharacter.imagen : "https://www.publicdomainpictures.net/pictures/280000/velka/not-found-image-15383864787lu.jpg"}
                            alt = "Not found" className="detail-img" />
                    </div>
                </div>
                <div className="detail-left">
                    <h3 className="temperament-detail-T">Temperaments</h3>
                    {/* // transformar de string en un array y separar por comas quitandole la coma al primer elemento 
                    // los temperament en la base de datos se llaman temperamentos, debe mostrar ambas opciones o un mensaje de no temperament
                    */}
                    <ul className="temperament-detail">
                        {myCharacter.temperament ? myCharacter.temperament.map((t) => {
                            return <li key={t} className="temperament-detail-li">{t}</li>
                        }) : myCharacter.temperamentos ? myCharacter.temperamentos.map((t) => {
                            return <li key={t} className="temperament-detail-li">{t}</li>
                        }) : <li className="temperament-detail-li">No temperament</li>}
                    </ul>
                    <span className="span-detail">
                        <span className="span-detail-C">
                            <h3 className="height-detail">Height:</h3>
                            <p className="height-detail-p">{myCharacter.altura ? myCharacter.altura : myCharacter.alturaMin && myCharacter.alturaMax ? myCharacter.alturaMin && myCharacter.alturaMax : "No height"}</p>

                        </span>
                        <span className="span-detail-C">
                            <h3 className="height-detail">Weight:</h3>
                            <p className="height-detail-p">{myCharacter.peso ? myCharacter.peso : myCharacter.pesoMin && myCharacter.pesoMax ? myCharacter.pesoMin && myCharacter.pesoMax : "No weight"}</p>
                        </span>
                    </span>
                    <h3 className="height-detail">Life span:</h3>
                    <p className="height-detail-p">{myCharacter.anos_de_vida}</p>
                </div>
            </div>
        </div>
    )
}

