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
                    <h2 className="name-detail">{myCharacter.name}</h2>
                    <div className="hexagon">
                        <img src={myCharacter.image} alt="Not found" className="detail-img" />
                    </div>
                </div>
                <div className="detail-left">
                    <h3 className="temperament-detail-T">Temperaments</h3>
                    {/* // transformar de string en un array y separar por comas quitandole la coma al primer elemento */}
                    <ul className="temperament-detail">
                        {myCharacter.temperament?.map((t) => (
                            <li key={t}>{t}</li>
                        ))}
                    </ul>
                    <span className="span-detail">
                        <span className="span-detail-C">
                            <h3 className="height-detail">Height:</h3>
                            <p className="height-detail-p">{myCharacter.altura}</p>
                        </span>
                        <span className="span-detail-C">
                            <h3 className="height-detail">Weight:</h3>
                            <p className="height-detail-p">{myCharacter.peso}</p>
                        </span>
                    </span>
                    <h3 className="height-detail">Life span:</h3>
                    <p className="height-detail-p">{myCharacter.anos_de_vida}</p>
                </div>
            </div>
        </div>
    )
}


// {
//     myCharacter.length > 0 ?
//         <div>
//             <h1>Soy {myCharacter[0].nombre}</h1>
//             <img src={myCharacter[0].image ? myCharacter[0].image : myCharacter[0].imagen} alt="Not found" />
//             <h3>Altura: {myCharacter[0].altura}</h3>
//             <h3>Peso: {myCharacter[0].peso}</h3>
//             <h3>Años de vida: {myCharacter[0].anos_de_vida}</h3>
//             <h4>Temperamentos: {myCharacter[0].createdInDb ? myCharacter[0].temperaments.map((t) => t.nombre + ' ,') : myCharacter[0].temperamentos.map((t) => t + ' ,')}</h4>
//         </div> : <h1>Character not found</h1>
// }
// <Link to="/home"> <button>Go back</button> </Link>