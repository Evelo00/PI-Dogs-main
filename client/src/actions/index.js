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