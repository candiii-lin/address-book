import { CONTACT_SELECTED } from '../types/contacts';

export default function(state = null, action) {
	switch (action.type) {
		case CONTACT_SELECTED:
			return action.payload
	}
	return state
}
