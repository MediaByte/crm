import _ from 'lodash'
import {
  OPEN,
  LOAD_RECORD,
  REMOVE_RECORD,
  FILTER,
  SAVE_RECORD,
  ADD_RECORD,
} from './constants.js'
import { recordList, record } from './record_data.js'

const initialState = {
  open: false,
  records: recordList,
  selected: false,
  filter: '',
}

export const records = (state = initialState, action = {}) => {
  switch (action.type) {
    case OPEN:
      return { ...state, open: action.payload }
    case LOAD_RECORD:
      return { ...state, selected: action.payload }
    case ADD_RECORD:
      let records = state.records
      let recordsCopy3 = state.recordsCopy
      records.push(action.payload)
      recordsCopy3.push(action.payload)
      return { ...state, records, recordCopy: recordCopy3, selected: record }
    case SAVE_RECORD:
      let payload = action.payload
      // if (!payload.id) {
      // 	payload.id = Math.random().toFixed(4)*10000
      // }
      let newRecords = state.records
      let newRecordsCopy = state.recordsCopy
      let recordIndex = _.findIndex(newRecords, { id: payload.id })
      newRecords[recordIndex] = payload
      newRecordsCopy[recordIndex] = payload
      return {
        ...state,
        records: newRecord,
        recordsCopy: newRecordCopy,
        selected: action.payload,
      }
    case REMOVE_RECORD:
      return {
        ...state,
        record: _.filter(state.records, record => record.id !== action.payload),
        recordCopy: _.filter(
          state.recordsCopy,
          user => user.id !== action.payload,
        ),
        selected: false,
      }
    case FILTER:
      const filter = action.payload.toLowerCase()
      if (filter === '') return { ...state, filter, records: state.recordsCopy }
      const filteredRecords = _.filter(
        state.recordsCopy,
        user => user.status.toLowerCase() === filter,
      )
      return { ...state, filter: filter, records: filteredRecords }

    default:
      return state
  }
}
