import { 
	NEW_USER_FIRST_NAME,
	NEW_USER_LAST_NAME,
	NEW_USER_HOME_PHONE,
	NEW_USER_MOBILE_PHONE,
	NEW_USER_WORK_PHONE,
	NEW_USER_EMAIL,
	NEW_USER_HOME_ADDRESS1,
	NEW_USER_HOME_ADDRESS2,
	NEW_USER_HOME_ADDRESS_CITY,
	NEW_USER_HOME_ADDRESS_STATE,
	NEW_USER_HOME_ADDRESS_ZIP,
	NEW_USER_HOME_ADDRESS_COUNTRY,
	NEW_USER_MAIL_ADDRESS1,
	NEW_USER_MAIL_ADDRESS2,
	NEW_USER_MAIL_ADDRESS_CITY,
	NEW_USER_MAIL_ADDRESS_STATE,
	NEW_USER_MAIL_ADDRESS_ZIP,
	NEW_USER_MAIL_ADDRESS_COUNTRY,
	NEW_USER_WORK_ADDRESS1,
	NEW_USER_WORK_ADDRESS2,
	NEW_USER_WORK_ADDRESS_CITY,
	NEW_USER_WORK_ADDRESS_STATE,
	NEW_USER_WORK_ADDRESS_ZIP,
	NEW_USER_WORK_ADDRESS_COUNTRY,
 } from './constants.js';
const newUser = {
	first: '',
	last: '',
	email: '',
	homePhone: '(  )    -    ',
	mobilePhone: '(  )    -    ',
	workPhone: '(  )    -    ',
	homeAddress1: '',
	homeAddress2: '',
	homeAddressCity: '',
	homeAddressState: '',
	homeAddressZip: '',
	homeAddressCountry: '',
	mailAddress1: '',
	mailAddress2: '',
	mailAddressCity: '',
	mailAddressState: '',
	mailAddressZip: '',
	mailAddressCountry: '',
	workAddress1: '',
	workAddress2: '',
	workAddressCity: '',
	workAddressState: '',
	workAddressZip: '',
	workAddressCountry: '',
	groups: {
		view: false,
		edit: true,
		create: true
	}

}
export const newUser = (state=newUser, action={}) => {
	switch(action.type) {
		case NEW_USER_FIRST_NAME:
			return Object.assign({}, state, { first: action.payload });
		case NEW_USER_LAST_NAME:
			return Object.assign({}, state, { last: action.payload });
		case NEW_USER_EMAIL:
			return Object.assign({}, state, { email: action.payload });
		case NEW_USER_HOME_PHONE:
			return Object.assign({}, state, { homePhone: action.payload });
		case NEW_USER_MOBILE_PHONE:
			return Object.assign({}, state, { mobilePhone: action.payload });
		case NEW_USER_WORK_PHONE:
			return Object.assign({}, state, { workPhone: action.payload });
		case NEW_USER_HOME_ADDRESS1:
			return Object.assign({}, state, { homeAddress1: action.payload });
		case NEW_USER_HOME_ADDRESS2:
			return Object.assign({}, state, { homeAddress2: action.payload });
		case NEW_USER_HOME_ADDRESS_CITY:
			return Object.assign({}, state, { homeAddressCity: action.payload });
		case NEW_USER_HOME_ADDRESS_STATE:
			return Object.assign({}, state, { homeAddressState: action.payload });
		case NEW_USER_HOME_ADDRESS_ZIP:
			return Object.assign({}, state, { homeAddressZip: action.payload });
		case NEW_USER_HOME_ADDRESS_COUNTRY:
			return Object.assign({}, state, { homeAddressCountry: action.payload });
		case NEW_USER_MAIL_ADDRESS1:
			return Object.assign({}, state, { mailAddress1: action.payload });
		case NEW_USER_MAIL_ADDRESS2:
			return Object.assign({}, state, { mailAddress2: action.payload });
		case NEW_USER_MAIL_ADDRESS_CITY:
			return Object.assign({}, state, { mailAddressCity: action.payload });
		case NEW_USER_MAIL_ADDRESS_STATE:
			return Object.assign({}, state, { mailAddressState: action.payload });
		case NEW_USER_MAIL_ADDRESS_ZIP:
			return Object.assign({}, state, { mailAddressZip: action.payload });
		case NEW_USER_MAIL_ADDRESS_COUNTRY:
			return Object.assign({}, state, { mailAddressCountry: action.payload });
		case NEW_USER_WORK_ADDRESS1:
			return Object.assign({}, state, { workAddress1: action.payload });
		case NEW_USER_WORK_ADDRESS2:
			return Object.assign({}, state, { workAddress2: action.payload });
		case NEW_USER_WORK_ADDRESS_CITY:
			return Object.assign({}, state, { workAddressCity: action.payload });
		case NEW_USER_WORK_ADDRESS_STATE:
			return Object.assign({}, state, { workAddressState: action.payload });
		case NEW_USER_WORK_ADDRESS_ZIP:
			return Object.assign({}, state, { workAddressZip: action.payload });
		case NEW_USER_WORK_ADDRESS_COUNTRY:
			return Object.assign({}, state, { workAddressCountry: action.payload });
		default: 
			return state;
	}
}
