import { ON_LOAD_ACTION } from '../types/contacts';

export default function (state = null, action) {
  switch (action.type) {
		case ON_LOAD_ACTION:
			return action.payload
	}
  return state;
}
