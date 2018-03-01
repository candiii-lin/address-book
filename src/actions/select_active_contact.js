import { CONTACT_SELECTED } from '../types/contacts';

function selectContact(contact) {
  return {
    type: CONTACT_SELECTED,
    payload: contact
  }
}
export default selectContact;
