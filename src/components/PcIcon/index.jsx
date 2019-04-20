import React from 'react'
import { nameToIconMap } from 'common/NameToIcon'

const PcIcon = ({ name, theme, ...props }) => {
  let Icon = nameToIconMap[name]

  if (!Icon) return null

  if (theme) {
    Icon = Icon[theme]
  } else {
    Icon = Icon.filled
  }

  if (!Icon) return null

  return <Icon {...props} />
}

export default PcIcon
