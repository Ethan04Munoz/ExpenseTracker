import { combineReducers } from 'redux';
import languageReducer from './languageReducer';
import currencyReducer from './currencyReducer';
import firstTimeReducer from './firstTimeReducer';

const rootReducer = combineReducers({
  language: languageReducer,
  currency: currencyReducer,
  primeraVez: firstTimeReducer,
});

export default rootReducer;
