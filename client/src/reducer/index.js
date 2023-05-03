const initialState = {
  characters: [],
}

function rootReducer(state = initialState, action) {
  switch (action.type) {
    case 'GET_CHARACTERS':
      return {
        ...state, //traigo el estado anterior
        characters: action.payload //traigo la info del back
      }
    default:
      return state;
  }
}

export default rootReducer;