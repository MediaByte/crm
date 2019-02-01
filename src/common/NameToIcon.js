/**
 * @template P
 * @typedef {import('react').ComponentType<P>} ComponentType
 */
/**
 * @typedef {import('@material-ui/core/SvgIcon').SvgIconProps} SvgIconProps
 * @typedef {ComponentType<SvgIconProps>} IconComponent
 */

import CalendarFilled from '@material-ui/icons/CalendarToday'
import CalendarOutlined from '@material-ui/icons/CalendarTodayOutlined'
import CalendarTwoTone from '@material-ui/icons/CalendarTodayTwoTone'

import CheckboxFilled from '@material-ui/icons/CheckBox'
import CheckboxOutlined from '@material-ui/icons/CheckBoxOutlined'
import CheckboxTwoTone from '@material-ui/icons/CheckBoxTwoTone'

import ClockFilled from '@material-ui/icons/AccessTime'
import ClockOutlined from '@material-ui/icons/AccessTimeOutlined'
import ClockTwoTone from '@material-ui/icons/AccessTimeTwoTone'

import FilmFilled from '@material-ui/icons/Theaters'
import FilmOutlined from '@material-ui/icons/TheatersOutlined'
import FilmTwoTone from '@material-ui/icons/TheatersTwoTone'

import ListFilled from '@material-ui/icons/FormatListNumbered'
import ListOutlined from '@material-ui/icons/FormatListNumberedOutlined'
import ListTwoTone from '@material-ui/icons/FormatListNumberedTwoTone'

import PersonFilled from '@material-ui/icons/Person'
import PersonOutlined from '@material-ui/icons/PersonOutlined'
import PersonTwoTone from '@material-ui/icons/PersonTwoTone'

import PhoneFilled from '@material-ui/icons/LocalPhone'
import PhoneOutlined from '@material-ui/icons/LocalPhoneOutlined'
import PhoneTwoTone from '@material-ui/icons/LocalPhoneTwoTone'

import PinDropFilled from '@material-ui/icons/PinDrop'
import PinDropOutlined from '@material-ui/icons/PinDropOutlined'
import PinDropTwoTone from '@material-ui/icons/PinDropTwoTone'

import PuzzleFilled from '@material-ui/icons/Extension'
import PuzzleOutlined from '@material-ui/icons/ExtensionOutlined'
import PuzzleTwoTone from '@material-ui/icons/ExtensionTwoTone'

import RadioButtonFilled from '@material-ui/icons/RadioButtonChecked'
import RadioButtonOutlined from '@material-ui/icons/RadioButtonCheckedOutlined'
import RadioButtonTwoTone from '@material-ui/icons/RadioButtonCheckedTwoTone'

import TextFilled from '@material-ui/icons/TextFields'
import TextOutlined from '@material-ui/icons/TextFieldsOutlined'
import TextTwoTone from '@material-ui/icons/TextFieldsTwoTone'

import WrapTextFilled from '@material-ui/icons/WrapText'
import WrapTextOutlined from '@material-ui/icons/WrapTextOutlined'
import WrapTextTwoTone from '@material-ui/icons/WrapTextTwoTone'

/**
 * @typedef {object} IconTriple
 * @prop {IconComponent} filled
 * @prop {IconComponent} outlined
 * @prop {IconComponent} twoTone
 */

/**
 * Maps an icon name (an string) to triple of Svg Icon React Components. Three
 * icon varieties are provided inside that triple: filled, outlined and
 * two-tone.
 * This is kept here as it's not serializable so it cannot be put into the data
 * layer. The string names themselves must be obtained from the data layer
 * though, by the consumer.
 * @type {Record<string, IconTriple>}
 */
export const nameToIconMap = {
  calendar: {
    filled: CalendarFilled,
    outlined: CalendarOutlined,
    twoTone: CalendarTwoTone,
  },
  checkbox: {
    filled: CheckboxFilled,
    outlined: CheckboxOutlined,
    twoTone: CheckboxTwoTone,
  },
  clock: {
    filled: ClockFilled,
    outlined: ClockOutlined,
    twoTone: ClockTwoTone,
  },
  film: {
    filled: FilmFilled,
    outlined: FilmOutlined,
    twoTone: FilmTwoTone,
  },
  list: {
    filled: ListFilled,
    outlined: ListOutlined,
    twoTone: ListTwoTone,
  },
  longText: {
    filled: WrapTextFilled,
    outlined: WrapTextOutlined,
    twoTone: WrapTextTwoTone,
  },
  person: {
    filled: PersonFilled,
    outlined: PersonOutlined,
    twoTone: PersonTwoTone,
  },
  phone: {
    filled: PhoneFilled,
    outlined: PhoneOutlined,
    twoTone: PhoneTwoTone,
  },
  pindrop: {
    filled: PinDropFilled,
    outlined: PinDropOutlined,
    twoTone: PinDropTwoTone,
  },
  puzzle: {
    filled: PuzzleFilled,
    outlined: PuzzleOutlined,
    twoTone: PuzzleTwoTone,
  },
  radiobutton: {
    filled: RadioButtonFilled,
    outlined: RadioButtonOutlined,
    twoTone: RadioButtonTwoTone,
  },
  text: {
    filled: TextFilled,
    outlined: TextOutlined,
    twoTone: TextTwoTone,
  },
}
