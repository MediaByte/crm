import { 
	NEW_USER_FIRST_NAME,
	NEW_USER_LAST_NAME,
	NEW_USER_HOME_PHONE,
	NEW_USER_MOBILE_PHONE,
	NEW_USER_WORK_PHONE,
	NEW_USER_EMAIL,
 } from './constants.js';
 
export const firstName = (event) => ({ type: NEW_USER_FIRST_NAME, payload: event });
export const lastName = (event) => ({ type: NEW_USER_LAST_NAME, payload: event });
export const homePhone = (event) => ({ type: NEW_USER_HOME_PHONE, payload: event });
export const mobilePhone = (event) => ({ type: NEW_USER_MOBILE_PHONE, payload: event });
export const workPhone = (event) => ({ type: NEW_USER_WORK_PHONE, payload: event });
export const email = (event) => ({ type: NEW_USER_EMAIL, payload: event });
