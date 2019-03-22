import * as Utils from '../Utils'

export const User = {
  [Utils.SCHEMA_NAME]: 'User',
  name: {
    type: 'string',
    onChange: jest.fn((self, nextVal) => {
      // signals not an error
      return false
    }),
  },
}

export const Car = {
  [Utils.SCHEMA_NAME]: 'Car',
  make: {
    type: 'string',
    onChange: jest.fn((self, nextVal) => {
      // signals not an error
      return false
    }),
  },
}

export const Root = {
  [Utils.SCHEMA_NAME]: 'Root',
  cars: {
    type: [Car],
    onChange: jest.fn((self, nextVal, key) => {
      return Promise.resolve(false)
    }),
  },
  companyName: {
    type: 'string',
    onChange: jest.fn((self, nextVal) => {
      return Promise.resolve(false)
    }),
  },
  numberOfUsers: {
    type: 'number',
    onChange: jest.fn((self, nextVal) => {
      // signals not an error
      return Promise.resolve(false)
    }),
  },
  mainUser: {
    type: User,
    onChange: jest.fn((self, nextVal) => {
      // signals not an error
      return Promise.resolve(false)
    }),
  },
  users: {
    type: [User],
    onChange: jest.fn((self, nextVal, key) => {
      return Promise.resolve(false)
    }),
  },
}
