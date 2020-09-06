export const record = {
  name: '',
  description: '',
  status: 'Active',
  permissions: [
    {
      title: 'Agency Details',
      view: false,
      create: false,
      edit: false,
      delete: false,
    },
    {
      title: 'Employees',
      view: false,
      create: false,
      edit: false,
      delete: false,
    },
    {
      title: 'Filters',
      view: false,
      create: false,
      edit: false,
      delete: false,
    },
    {
      title: 'User Groups',
      view: false,
      create: false,
      edit: false,
      delete: false,
    },
  ],
}
export const recordList = [
  {
    ...record,
    id: 1,
    name: 'Administrator',
    status: 'Active',
    description: 'Description 1',
  },
  {
    ...record,
    id: 2,
    name: 'User',
    status: 'Inactive',
    description: 'Description 2',
  },
  {
    ...record,
    id: 3,
    name: 'User 3',
    status: 'Inactive',
    description: 'Description 3',
  },
  {
    ...record,
    id: 4,
    name: 'User 4',
    status: 'Inactive',
    description: 'Description 4',
  },
  {
    ...record,
    id: 5,
    name: 'User 5',
    status: 'Inactive',
    description: 'Description 5',
  },
  {
    ...record,
    id: 6,
    name: 'User 6',
    status: 'Active',
    description: 'Description 6',
  },
  { ...record, id: 7, name: 'User 7', status: 'Inactive' },
  { ...record, id: 8, name: 'User 8', status: 'Inactive' },
  { ...record, id: 9, name: 'User 9', status: 'Inactive' },
  { ...record, id: 10, name: 'User 10', status: 'Inactive' },
  { ...record, id: 11, name: 'User 11', status: 'Inactive' },
  { ...record, id: 12, name: 'User 12', status: 'Inactive' },
]