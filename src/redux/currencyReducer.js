// currencyReducer.js
const initialState = {
  currencySymbol: '$', // Valor por defecto
};

function currencyReducer(state = initialState, action) {
  switch (action.type) {
    case 'SET_CURRENCY':
      return {
        ...state,
        currencySymbol: action.payload,
      };
    default:
      return state;
  }
}

export default currencyReducer;
