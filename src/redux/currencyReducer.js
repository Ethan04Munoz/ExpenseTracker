const initialState = {
  currencySymbol: localStorage.getItem('currencySymbol') || '$', 
};

function currencyReducer(state = initialState, action) {
  switch (action.type) {
    case 'SET_CURRENCY':
      localStorage.setItem('currencySymbol', action.payload); 
      return {
        ...state,
        currencySymbol: action.payload,
      };
    default:
      return state;
  }
}

export default currencyReducer;
