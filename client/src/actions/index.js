import axios from 'axios';


export function getCharacters(){
    return async function(dispatch){
        let json = await axios.get('http://localhost:3001/dogs/',);
        return dispatch({
            type: 'GET_CHARACTERS',
            payload: json.data //traigo la info del back
        })
    }
}
export function getNameCharacters(name){
    return async function(dispatch){
        try{
            let json = await axios.get(`http://localhost:3001/dogs?name=${name}`);
            return dispatch({
                type: 'GET_NAME_CHARACTERS',
                payload: json.data //traigo la info del back
            }) 
        }catch(error){
            console.log(error)
        }
    }
}

export function filterCharactersByTemperament(payload){
    console.log(payload)
    return{
        type: 'FILTER_BY_TEMPERAMENT',
        payload: payload
    }
}

export function getDetail(id) {
    return async function (dispatch) {
        try {
            let json = await axios.get(`http://localhost:3001/dogs/${id}`);
            console.log(json.data)
            return dispatch({
                type: 'GET_DETAIL',
                payload: json.data
            })
        }
        catch (error) {
            console.log(error)
        }
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



/* traer temperamentos POST */

export function getTemperaments() {
    return async function(dispatch) {
        let info = await axios.get('http://localhost:3001/temperaments', {

        });
    return dispatch({ type: "GET_TEMPERAMENTS", payload: info.data });
}
}

export function postCharacter(payload){
    return async function(dispatch){
        const response = await axios.post('http://localhost:3001/dogs', payload);
        console.log(response)
        return response;
    }
}

