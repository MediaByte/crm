import React from 'react'
import PropertyEditParamIcon from './PropertyEditParamIcon'
import PropertyEditParamBoolean from './PropertyEditParamBoolean'
import PropertyEditParamOptions from './PropertyEditParamOptions'
import PropertyEditParamString from './PropertyEditParamString'
import PropertyEditParamOptionsStatic from './PropertyEditParamOptionsStatic'
import PropertyEditParamDisplayFields from './PropertyEditParamDisplayFields'

const currencyOptions = [
  {
    name: 'USD',
  },
  { name: 'EURO' },
]

const properties = [
  {
    type: 'picklist',
    params: [
      {
        primaryText: 'Label',
        actionText: 'Prefix',
      },
      {
        primaryText: 'Options',
        secondaryText: 'Mr, Mrs, Miss, Dr',
      },
    ],
  },
  {
    type: 'textfield',
    unhidable: 'The first textfield has to be displayed',
    params: [
      {
        primaryText: 'Label',
        actionText: 'First Name',
      },
      {
        primaryText: 'Character Limit',
        secondaryText: '155',
      },
    ],
  },
  {
    type: 'textfield',
    params: [
      {
        primaryText: 'Label',
        actionText: 'Middle Name',
      },
      {
        primaryText: 'Character Limit',
        secondaryText: '155',
      },
    ],
  },
]

const PropertyEditParam = ({ editItem, editingParam }) => {
  if (editingParam === 'icon') {
    return <PropertyEditParamIcon editItem={editItem} />
  } else if (editingParam === 'helptext') {
    return (
      <PropertyEditParamBoolean
        editItem={editItem}
        booleanInfo="This is a help text"
      />
    )
  } else if (editingParam === 'options') {
    return <PropertyEditParamOptions editItem={editItem} />
  } else if (editingParam === 'string') {
    return <PropertyEditParamString editItem={editItem} />
  } else if (editingParam === 'optionsstatic') {
    return (
      <PropertyEditParamOptionsStatic
        options={currencyOptions}
        checked="USD"
        info="Currency symbol will appear next to the value"
      />
    )
  } else if (editingParam === 'displayfields') {
    return (
      <PropertyEditParamDisplayFields
        properties={properties}
        info="Name property is something that's never seen before"
        avatar
      />
    )
  } else {
    return null
  }
}

export default PropertyEditParam
