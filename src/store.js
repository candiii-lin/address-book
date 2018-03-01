import { createStore, combineReducers, applyMiddleware } from 'redux';
import ContactsReducer from './reducers/contacts';
import ActiveContactReducer from './reducers/active_contact';
import thunk from 'redux-thunk';


const reducer = combineReducers({
  contacts: ContactsReducer,
 	activeContact: ActiveContactReducer
})

const store = createStore(
 reducer,
 applyMiddleware(thunk)
)
export default store;
