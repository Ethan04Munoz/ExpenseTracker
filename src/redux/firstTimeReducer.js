const initialState = {
  primeraVez: JSON.parse(localStorage.getItem('primeraVezBool')) || true, 
};

function firstTimeReducer(state = initialState, action) {
  switch (action.type) {
    case 'CHANGE_FIRSTTIME':
      localStorage.setItem('primeraVezBool', false);
      return {
        ...state,
        primeraVez: false, 
      };
    default:
      return state;
  }
}

export default firstTimeReducer;
