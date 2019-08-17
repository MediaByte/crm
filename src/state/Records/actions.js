import {
  OPEN,
  LOAD_RECORD,
  REMOVE_RECORD,
  FILTER,
  SAVE_RECORD,
  ADD_RECORD,
} from './constants.js'

export const drawerState = event => ({ type: OPEN, payload: event })

export const loadRecord = record => ({
  type: LOAD_RECORD,
  payload: record,
})

export const addRecord = record => ({
  type: ADD_RECORD,
  payload: record,
})

export const saveRecord = record => ({
  type: SAVE_RECORD,
  payload: record,
})

export const removeRecord = recordId => ({
  type: REMOVE_RECORD,
  payload: recordId,
})

export const filter = status => ({
  type: FILTER,
  payload: status,
})
