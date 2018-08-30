import { 
	NEW_USER_FIRST_NAME,
	NEW_USER_LAST_NAME,
	NEW_USER_HOME_PHONE,
	NEW_USER_MOBILE_PHONE,
	NEW_USER_WORK_PHONE,
	NEW_USER_EMAIL,
 } from './constants.js';
const newUser = {
	first: '',
	last: '',
	homePhone: '(  )    -    ',
	mobilePhone: '(  )    -    ',
	workPhone: '(  )    -    ',
	email: '',

}
export const newUser = (state=newUser, action={}) => {
	switch(action.type) {
		case NEW_USER_FIRST_NAME:
			return Object.assign({}, state, { first: action.payload });
		case NEW_USER_LAST_NAME:
			return Object.assign({}, state, { last: action.payload });
		case NEW_USER_HOME_PHONE:
			return Object.assign({}, state, { homePhone: action.payload });
		case NEW_USER_MOBILE_PHONE:
			return Object.assign({}, state, { mobilePhone: action.payload });
		case NEW_USER_WORK_PHONE:
			return Object.assign({}, state, { mobilePhone: action.payload });
		case NEW_USER_EMAIL:
			return Object.assign({}, state, { email: action.payload });
		default: 
			return state;
	}
}
