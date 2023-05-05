import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getDetail } from "../../actions";
import { useEffect } from "react";

export default function Detail(props) {
    console.log(props)
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getDetail(props.match.params.id));
    }, [dispatch, props.match.params.id]);

    const myCharacter = useSelector((state) => state.detail);
    return (
        <div>
            <h1>Detail</h1>
            <div>
                <h2>{myCharacter.name}</h2>
                <img src={myCharacter.image} alt="Not found" />
                <h3>Temperaments:</h3>
                <ul>
                    {myCharacter.temperaments?.map((t) => (
                        <li>{t.name}</li>
                    ))}
                </ul>
                <h3>Height:</h3>
                <p>{myCharacter.height}</p>
                <h3>Weight:</h3>
                <p>{myCharacter.weight}</p>
                <h3>Life span:</h3>
                <p>{myCharacter.life_span}</p>

            </div> : <h1>Loading...</h1>
            <Link to="/home">
                <button>Back</button>
            </Link>
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