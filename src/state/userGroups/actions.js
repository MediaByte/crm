import { 
	OPEN,
	LOAD_USER,
	ADD_USER,
	REMOVE_USER,
	FILTER,
	DUPLICATE_USER,
} from './constants.js';

export const drawerState = (event) => ({ type: OPEN, payload: event });

export const loadUser = (userId) => ({
	type: LOAD_USER, payload: userId
});

export const saveUser = (user) => ({
	type: ADD_USER, payload: user
});

export const removeUser = (userId) => ({
	type: REMOVE_USER, payload: userId
});

export const filter = (status) => ({
	type: FILTER, payload: status
});

export const duplicateUser = (user) => ({
	type: DUPLICATE_USER, payload: user
});