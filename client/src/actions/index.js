import axios from 'axios';


export function getCharacters(){
    return async function(dispatch){
        var json = await axios.get('http://localhost:3001/dogs/',);
        return dispatch({
            type: 'GET_CHARACTERS',
            payload: json.data //traigo la info del back
        })
    }
}

export function filterCharactersByTemperament(payload){
    return{
        type: 'FILTER_BY_TEMPERAMENT',
        payload
    }
}


/* filtrar por db y api */

export function filterCreated(payload){
    return {
        type: 'FILTER_CREATED',
        payload
    }
}

/* ordenar alfabeticamente */

export function orderByName(payload){
    return {
        type: 'ORDER_BY_NAME',
        payload
    }
}