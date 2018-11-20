import { 
	OPEN,
	LOAD_USER,
	REMOVE_USER,
	FILTER,
	DUPLICATE_USER,
	SAVE_USER,
	ADD_USER,
} from './constants.js';

export const drawerState = (event) => ({ type: OPEN, payload: event });

export const loadUser = (user) => ({
	type: LOAD_USER, payload: user
});

export const addUser = (user) => ({
	type: ADD_USER, payload: user
});

export const saveUser = (user) => ({
	type: SAVE_USER, payload: user
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
