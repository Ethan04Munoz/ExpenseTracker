import { combineReducers } from 'redux';
import languageReducer from './languageReducer';
import currencyReducer from './currencyReducer';

const rootReducer = combineReducers({
  language: languageReducer,
  currency: currencyReducer
});

export default rootReducer;
