import { ON_LOAD_ACTION } from '../types/contacts';

function loadContacts(contacts) {
  return {
    type: ON_LOAD_ACTION,
    payload: contacts
  }
}
export default loadContacts;
