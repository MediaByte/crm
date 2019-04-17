import { ComponentType } from 'react'
import { SvgIconProps } from '@material-ui/core/SvgIcon'

interface FreeValue {
  valueIfBoolean: boolean | null
  valueIfNumber: number | null
  valueIfString: string | null
  valuesIfMultipleNumber: Record<string, number>
  valuesIfMultipleBoolean: Record<string, boolean>
  valuesIfMultipleString: Record<string, string>
}

interface PropTypeParam {
  name: string
  type: 'number' | 'string' | 'boolean'
  multiple: boolean
}

interface PropDefArgument {
  param: PropTypeParam
  /**
   * Look at the param reference, and based on the combination of param.type and
   * param.multiple, you'll know whether to access value.valueIfboolean or
   * value.valuesIfMultipleString, etc.
   */
  value: FreeValue
}

interface PropertyEditProps {
  arguments: PropDefArgument[]
  /**
   * Used initial value for the label.
   */
  label: string
  /**
   * Used as initial value for the help text.
   */
  helpText: string
  /**
   * Used as initial value for the required status.
   */
  required: boolean
  /**
   * Pull in the icon component from `common/nameToIconMap`.
   */
  iconName: string
  /**
   * Used as initial index for the required status
   */
  index: boolean
  onClickCancel: () => void
  /**
   * Gets called with the current values for these, independently of whether the
   * user changed them from the initial values (gotten through props) or not.
   */
  onClickSave: (
    label: string,
    helpText: string,
    required: boolean,
    index: boolean,
    arguments: PropDefArgument[],
  ) => void
}

// use the icon in render like this:
// it doesn't work if you don't rename to an uppercase identifier

/*
render() {
  const {icon: Icon} = this.props

  return (
    // ...
      <Icon />
    // ...
  )
}

*/
