
const initialState = {
  characters: [],
  allCharacters: [],
  temperament: [],
  
}

function rootReducer(state = initialState, action) {
  switch (action.type) {
    case 'GET_CHARACTERS':
      return {
        ...state, //traigo el estado anterior
        characters: action.payload, //traigo la info del back
        allCharacters: action.payload
      }
    case 'FILTER_BY_TEMPERAMENT':
      const allCharacters = state.allCharacters;
      const charactersFilter = action.payload === 'All' ? allCharacters : allCharacters.filter(el => el.temperament?.includes(action.payload))
      return {
        ...state,
        characters: charactersFilter //traigo la info del back
      }
      case 'FILTER_CREATED':
        const allCharacters2 = state.allCharacters;
        const createdFilter2 = action.payload === 'created' ? allCharacters2.filter(el => el.createdInDb) : allCharacters2.filter(el => !el.createdInDb)
        return {
          ...state,
          characters: action.payload === 'All' ? state.allCharacters : createdFilter2
        }
        case 'ORDER_BY_NAME':
          let sortedArr = action.payload === 'asc' ? state.characters.sort(function (a, b) {
            if (a.name > b.name) { //  ordenamiendo de manera ascendente
              return 1;
            }
            if (b.name > a.name) {
              return -1; 
            }
            return 0;
          }) :
            state.characters.sort(function (a, b) {  // ordenamiento de manera descendente
              if (a.name > b.name) {
                return -1;
              }
              if (b.name > a.name) {
                return 1;
              }
              return 0;
            });
          return {
            ...state,
            characters: sortedArr
          }
        default:
        return state;
      }
    }

          export default rootReducer;