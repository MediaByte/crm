import _ from 'lodash'
import {
  OPEN,
  LOAD_USER,
  REMOVE_USER,
  FILTER,
  DUPLICATE_USER,
  SAVE_USER,
  ADD_USER,
} from './constants.js'
import { userGroupsList, user } from './user_data.js'

const initialState = {
  open: false,
  users: _.filter(
    userGroupsList,
    user => user.status.toLowerCase() === 'active',
  ),
  usersCopy: userGroupsList,
  selected: false,
  filter: 'active',
}

export const userGroups = (state = initialState, action = {}) => {
  switch (action.type) {
    case OPEN:
      return { ...state, open: action.payload }
    case LOAD_USER:
      return { ...state, selected: action.payload }
    case ADD_USER:
      let users = state.users
      let usersCopy3 = state.usersCopy
      users.push(action.payload)
      usersCopy3.push(action.payload)
      return { ...state, users, usersCopy: usersCopy3, selected: user }
    case SAVE_USER:
      let payload = action.payload
      // if (!payload.id) {
      // 	payload.id = Math.random().toFixed(4)*10000
      // }
      let newUsers = state.users
      let newUsersCopy = state.usersCopy
      let userIndex = _.findIndex(newUsers, { id: payload.id })
      newUsers[userIndex] = payload
      newUsersCopy[userIndex] = payload
      return {
        ...state,
        users: newUsers,
        usersCopy: newUsersCopy,
        selected: action.payload,
      }
    case REMOVE_USER:
      return {
        ...state,
        users: _.filter(state.users, user => user.id !== action.payload),
        usersCopy: _.filter(
          state.usersCopy,
          user => user.id !== action.payload,
        ),
        selected: false,
      }
    case FILTER:
      let status = action.payload.toLowerCase()
      let usersCopy = state.usersCopy
      if (status === 'active' || status === 'inactive') {
        usersCopy = _.filter(
          usersCopy,
          user => user.status.toLowerCase() === status,
        )
      }
      return { ...state, filter: status, users: usersCopy }
    case DUPLICATE_USER:
      let duplicatedUser = {
        ...action.payload,
        id: Math.random(0, 1000),
        name: `Copy of ${action.payload.name}`,
      }
      return {
        ...state,
        users: [...state.users, duplicatedUser],
        usersCopy: [...state.usersCopy, duplicatedUser],
      }
    default:
      return state
  }
}
