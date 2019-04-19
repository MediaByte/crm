import React from 'react'
import PropertyEditParamIcon from './PropertyEditParamIcon'
import PropertyEditParamBoolean from './PropertyEditParamBoolean'
import PropertyEditParamOptions from './PropertyEditParamOptions'
import PropertyEditParamString from './PropertyEditParamString'
// import PropertyEditParamOptionsStatic from './PropertyEditParamOptionsStatic'
// import PropertyEditParamDisplayFields from './PropertyEditParamDisplayFields'

// const currencyOptions = [
//   {
//     name: 'USD',
//   },
//   { name: 'EURO' },
// ]

// const properties = [
//   {
//     type: 'picklist',
//     params: [
//       {
//         primaryText: 'Label',
//         actionText: 'Prefix',
//       },
//       {
//         primaryText: 'Options',
//         secondaryText: 'Mr, Mrs, Miss, Dr',
//       },
//     ],
//   },
//   {
//     type: 'textfield',
//     unhidable: 'The first textfield has to be displayed',
//     params: [
//       {
//         primaryText: 'Label',
//         actionText: 'First Name',
//       },
//       {
//         primaryText: 'Character Limit',
//         secondaryText: '155',
//       },
//     ],
//   },
//   {
//     type: 'textfield',
//     params: [
//       {
//         primaryText: 'Label',
//         actionText: 'Middle Name',
//       },
//       {
//         primaryText: 'Character Limit',
//         secondaryText: '155',
//       },
//     ],
//   },
// ]

const PropertyEditParam = ({ activePropDef, activeArgumentId }) => {
  if (activeArgumentId === 'icon') {
    return (
      <PropertyEditParamIcon activePropDef={activePropDef} onPick={() => {}} />
    )
  }

  const activeArgument = activePropDef.arguments[activeArgumentId]
  const {
    param: { type, multiple, name },
  } = activeArgument
  if (!multiple) {
    if (type === 'boolean') {
      return (
        <PropertyEditParamBoolean
          name={name}
          // helpText={param.helpText}
          // booleanInfo={param.info} // this thing is missing
          onToggle={() => {}}
        />
      )
    } else {
      // string or number
      const value =
        type === 'number'
          ? activeArgument.value.valueIfNumber
          : activeArgument.value.valueIfString

      return (
        <PropertyEditParamString
          value={value}
          type={type}
          onChange={() => {}}
          onClear={() => {}}
        />
      )
    }
  }
  const sampleOptions = [
    { name: 'home', label: 'Home' },
    { name: 'mobile', label: 'Mobile' },
  ]
  // if (type === 'string' || type === 'number' || type === 'boolean') {
  return (
    <PropertyEditParamOptions
      options={sampleOptions}
      onSortEnd={() => {}}
      onPick={() => {}}
    />
  )
  // }

  // else if (activeArgumentId === 'helptext') {
  //   return (
  //     <PropertyEditParamBoolean
  //       activePropDef={activePropDef}
  //       booleanInfo="This is a help text"
  //       onToggle={() => {}}
  //     />
  //   )
  // } else if (activeArgumentId === 'options') {
  //   return <PropertyEditParamOptions activePropDef={activePropDef} />
  // } else if (activeArgumentId === 'string') {
  //   return (
  //     <PropertyEditParamString
  //       activePropDef={activePropDef}
  //       activeArgumentId={activeArgumentId}
  //     />
  //   )
  // } else if (activeArgumentId === 'optionsstatic') {
  //   return (
  //     <PropertyEditParamOptionsStatic
  //       options={currencyOptions}
  //       checked="USD"
  //       info="Currency symbol will appear next to the value"
  //     />
  //   )
  // } else if (activeArgumentId === 'displayfields') {
  //   return (
  //     <PropertyEditParamDisplayFields
  //       properties={properties}
  //       info="Name property is something that's never seen before"
  //       avatar
  //     />
  //   )
}

export default PropertyEditParam
