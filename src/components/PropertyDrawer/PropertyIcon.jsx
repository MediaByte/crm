import React from 'react'
import {
  TextFields,
  Phone,
  LocationOn,
  FormatListNumbered,
  SelectAll,
  Search,
  CheckBox,
  AccessTime,
  DateRange,
  DataUsage,
  WrapText,
  ControlCamera,
  ExposurePlus2,
  Http,
  Send,
  AttachMoney,
} from '@material-ui/icons'

const PropertyIcon = ({ type, ...props }) => {
  if (type === 'textfield') return <TextFields {...props} />
  if (type === 'phone') return <Phone {...props} />
  if (type === 'address') return <LocationOn {...props} />
  if (type === 'picklist') return <FormatListNumbered {...props} />
  if (type === 'multiselect') return <SelectAll {...props} />
  if (type === 'lookup') return <Search {...props} />
  if (type === 'checkbox') return <CheckBox {...props} />
  if (type === 'time') return <AccessTime {...props} />
  if (type === 'date') return <DateRange {...props} />
  if (type === 'percent') return <DataUsage {...props} />
  if (type === 'memo') return <WrapText {...props} />
  if (type === 'decimal') return <ControlCamera {...props} />
  if (type === 'number') return <ExposurePlus2 {...props} />
  if (type === 'url') return <Http {...props} />
  if (type === 'email') return <Send {...props} />
  if (type === 'currency') return <AttachMoney {...props} />
  return null
}

export default PropertyIcon
