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
  NEW_USER_GROUPS,
  NEW_USER_PHONE,
} from './constants.js';
export const first = event => ({ type: NEW_USER_FIRST_NAME, payload: event });
export const last = event => ({ type: NEW_USER_LAST_NAME, payload: event });
export const email = event => ({ type: NEW_USER_EMAIL, payload: event });
export const phone = event => ({ type: NEW_USER_PHONE, payload: event });
export const homePhone = event => ({
  type: NEW_USER_HOME_PHONE,
  payload: event,
});
export const mobilePhone = event => ({
  type: NEW_USER_MOBILE_PHONE,
  payload: event,
});
export const workPhone = event => ({
  type: NEW_USER_WORK_PHONE,
  payload: event,
});
export const homeAddress1 = event => ({
  type: NEW_USER_HOME_ADDRESS1,
  payload: event,
});
export const homeAddress2 = event => ({
  type: NEW_USER_HOME_ADDRESS2,
  payload: event,
});
export const homeAddressCity = event => ({
  type: NEW_USER_HOME_ADDRESS_CITY,
  payload: event,
});
export const homeAddressState = event => ({
  type: NEW_USER_HOME_ADDRESS_STATE,
  payload: event,
});
export const homeAddressZip = event => ({
  type: NEW_USER_HOME_ADDRESS_ZIP,
  payload: event,
});
export const homeAddressCountry = event => ({
  type: NEW_USER_HOME_ADDRESS_COUNTRY,
  payload: event,
});
export const mailAddress1 = event => ({
  type: NEW_USER_MAIL_ADDRESS1,
  payload: event,
});
export const mailAddress2 = event => ({
  type: NEW_USER_MAIL_ADDRESS2,
  payload: event,
});
export const mailAddressCity = event => ({
  type: NEW_USER_MAIL_ADDRESS_CITY,
  payload: event,
});
export const mailAddressState = event => ({
  type: NEW_USER_MAIL_ADDRESS_STATE,
  payload: event,
});
export const mailAddressZip = event => ({
  type: NEW_USER_MAIL_ADDRESS_ZIP,
  payload: event,
});
export const mailAddressCountry = event => ({
  type: NEW_USER_MAIL_ADDRESS_COUNTRY,
  payload: event,
});
export const workAddress1 = event => ({
  type: NEW_USER_WORK_ADDRESS1,
  payload: event,
});
export const workAddress2 = event => ({
  type: NEW_USER_WORK_ADDRESS2,
  payload: event,
});
export const workAddressCity = event => ({
  type: NEW_USER_WORK_ADDRESS_CITY,
  payload: event,
});
export const workAddressState = event => ({
  type: NEW_USER_WORK_ADDRESS_STATE,
  payload: event,
});
export const workAddressZip = event => ({
  type: NEW_USER_WORK_ADDRESS_ZIP,
  payload: event,
});
export const workAddressCountry = event => ({
  type: NEW_USER_WORK_ADDRESS_COUNTRY,
  payload: event,
});
export const groups = event => ({ type: NEW_USER_GROUPS, payload: event });
