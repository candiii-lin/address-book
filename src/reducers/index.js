import { combineReducers } from 'redux';
import ContactsReducer from './contacts'
import ActiveContactReducer from './active_contact'

const rootReducer = combineReducers({
	contacts: ContactsReducer,
	activeContact: ActiveContactReducer
});

export default rootReducer;
