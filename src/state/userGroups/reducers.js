import _ from 'lodash';
import { 
	OPEN,
	LOAD_USER,
	ADD_USER,
	REMOVE_USER,
	FILTER,
	DUPLICATE_USER,
} from './constants.js';

const userGroupsList = [
  { id: 1, name: "Administrator", status: "Active"},
  { id: 2, name: "User", status: "Inactive"},
  { id: 3, name: "User 3", status: "Inactive"},
  { id: 4, name: "User 4", status: "Inactive"},
  { id: 5, name: "User 5", status: "Inactive"},
  { id: 6, name: "User 6", status: "Active"},
  { id: 7, name: "User 7", status: "Inactive"},
  { id: 8, name: "User 8", status: "Inactive"},
  { id: 9, name: "User 9", status: "Inactive"},
  { id: 10, name: "User 10", status: "Inactive"},
  { id: 11, name: "User 11", status: "Inactive"},
  { id: 12, name: "User 12", status: "Inactive"},
]

const initialState = {
	open: false,
	users: _.filter(userGroupsList, (user) => user.status.toLowerCase() === 'active'),
	usersCopy: userGroupsList,
	selected: null,
	filter: 'active'
}

export const userGroups = (state=initialState, action={}) => {
	switch(action.type) {
		case OPEN:
			return { ...state, open: action.payload }
		case LOAD_USER:
			return { ...state, selected: parseInt(action.payload) }
		case ADD_USER:
			let users = state.users;
			users.push(action.payload)
			return { ...state, users }
		case REMOVE_USER:
			return { ...state, users: _.filter(state.users, (user) => user.id !== action.payload), usersCopy: _.filter(state.usersCopy, (user) => user.id !== action.payload) }
		case FILTER:
			let status = action.payload.toLowerCase()
			let usersCopy = state.usersCopy
			if (status === 'active' || status === 'inactive') {
				usersCopy = _.filter(usersCopy, (user) => user.status.toLowerCase() === status)
			}
			return { ...state, filter: status, users: usersCopy }
		case DUPLICATE_USER:
			let duplicatedUser = {
				...action.payload,
				id: Math.random(0, 1000),
				name: `Copy of ${action.payload.name}`
			}
			return { ...state, users: [...state.users, duplicatedUser], usersCopy: [...state.usersCopy, duplicatedUser] }
		default: 
			return state;
	}
}
