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

import PinDropFilled from '@material-ui/icons/PinDrop'
import PinDropOutlined from '@material-ui/icons/PinDropOutlined'
import PinDropTwoTone from '@material-ui/icons/PinDropTwoTone'

import PuzzleFilled from '@material-ui/icons/Extension'
import PuzzleOutlined from '@material-ui/icons/ExtensionOutlined'
import PuzzleTwoTone from '@material-ui/icons/ExtensionTwoTone'

import RadioButtonFilled from '@material-ui/icons/RadioButtonChecked'
import RadioButtonOutlined from '@material-ui/icons/RadioButtonCheckedOutlined'
import RadioButtonTwoTone from '@material-ui/icons/RadioButtonCheckedTwoTone'

import PersonFilled from '@material-ui/icons/Person'
import PersonOutlined from '@material-ui/icons/PersonOutlined'
import PersonTwoTone from '@material-ui/icons/PersonTwoTone'

import TextFieldsFilled from '@material-ui/icons/TextFields'
import TextFieldsOutlined from '@material-ui/icons/TextFieldsOutlined'
import TextFieldsTwoTone from '@material-ui/icons/TextFieldsTwoTone'

import PhoneFilled from '@material-ui/icons/Phone'
import PhoneOutlined from '@material-ui/icons/PhoneOutlined'
import PhoneTwoTone from '@material-ui/icons/PhoneTwoTone'

import LocationOnFilled from '@material-ui/icons/LocationOn'
import LocationOnOutlined from '@material-ui/icons/LocationOnOutlined'
import LocationOnTwoTone from '@material-ui/icons/LocationOnTwoTone'

import FormatListNumberedFilled from '@material-ui/icons/FormatListNumbered'
import FormatListNumberedOutlined from '@material-ui/icons/FormatListNumberedOutlined'
import FormatListNumberedTwoTone from '@material-ui/icons/FormatListNumberedTwoTone'

import SelectAllFilled from '@material-ui/icons/SelectAll'
import SelectAllOutlined from '@material-ui/icons/SelectAllOutlined'
import SelectAllTwoTone from '@material-ui/icons/SelectAllTwoTone'

import SearchFilled from '@material-ui/icons/Search'
import SearchOutlined from '@material-ui/icons/SearchOutlined'
import SearchTwoTone from '@material-ui/icons/SearchTwoTone'

import CheckBoxFilled from '@material-ui/icons/CheckBox'
import CheckBoxOutlined from '@material-ui/icons/CheckBoxOutlined'
import CheckBoxTwoTone from '@material-ui/icons/CheckBoxTwoTone'

import AccessTimeFilled from '@material-ui/icons/AccessTime'
import AccessTimeOutlined from '@material-ui/icons/AccessTimeOutlined'
import AccessTimeTwoTone from '@material-ui/icons/AccessTimeTwoTone'

import DateRangeFilled from '@material-ui/icons/DateRange'
import DateRangeOutlined from '@material-ui/icons/DateRangeOutlined'
import DateRangeTwoTone from '@material-ui/icons/DateRangeTwoTone'

import DataUsageFilled from '@material-ui/icons/DataUsage'
import DataUsageOutlined from '@material-ui/icons/DataUsageOutlined'
import DataUsageTwoTone from '@material-ui/icons/DataUsageTwoTone'

import WrapTextFilled from '@material-ui/icons/WrapText'
import WrapTextOutlined from '@material-ui/icons/WrapTextOutlined'
import WrapTextTwoTone from '@material-ui/icons/WrapTextTwoTone'

import ControlCameraFilled from '@material-ui/icons/ControlCamera'
import ControlCameraOutlined from '@material-ui/icons/ControlCameraOutlined'
import ControlCameraTwoTone from '@material-ui/icons/ControlCameraTwoTone'

import ExposurePlus2Filled from '@material-ui/icons/ExposurePlus2'
import ExposurePlus2Outlined from '@material-ui/icons/ExposurePlus2Outlined'
import ExposurePlus2TwoTone from '@material-ui/icons/ExposurePlus2TwoTone'

import HttpFilled from '@material-ui/icons/Http'
import HttpOutlined from '@material-ui/icons/HttpOutlined'
import HttpTwoTone from '@material-ui/icons/HttpTwoTone'

import SendFilled from '@material-ui/icons/Send'
import SendOutlined from '@material-ui/icons/SendOutlined'
import SendTwoTone from '@material-ui/icons/SendTwoTone'

import AttachMoneyFilled from '@material-ui/icons/AttachMoney'
import AttachMoneyOutlined from '@material-ui/icons/AttachMoneyOutlined'
import AttachMoneyTwoTone from '@material-ui/icons/AttachMoneyTwoTone'

import DoneFilled from '@material-ui/icons/Done'
import DoneOutlined from '@material-ui/icons/DoneOutlined'
import DoneTwoTone from '@material-ui/icons/DoneTwoTone'

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
  person: {
    filled: PersonFilled,
    outlined: PersonOutlined,
    twoTone: PersonTwoTone,
  },
  text_fields: {
    filled: TextFieldsFilled,
    outlined: TextFieldsOutlined,
    twoTone: TextFieldsTwoTone,
  },
  phone: {
    filled: PhoneFilled,
    outlined: PhoneOutlined,
    twoTone: PhoneTwoTone,
  },
  location_on: {
    filled: LocationOnFilled,
    outlined: LocationOnOutlined,
    twoTone: LocationOnTwoTone,
  },
  format_list_numbered: {
    filled: FormatListNumberedFilled,
    outlined: FormatListNumberedOutlined,
    twoTone: FormatListNumberedTwoTone,
  },
  select_all: {
    filled: SelectAllFilled,
    outlined: SelectAllOutlined,
    twoTone: SelectAllTwoTone,
  },
  search: {
    filled: SearchFilled,
    outlined: SearchOutlined,
    twoTone: SearchTwoTone,
  },
  check_box: {
    filled: CheckBoxFilled,
    outlined: CheckBoxOutlined,
    twoTone: CheckBoxTwoTone,
  },
  access_time: {
    filled: AccessTimeFilled,
    outlined: AccessTimeOutlined,
    twoTone: AccessTimeTwoTone,
  },
  date_range: {
    filled: DateRangeFilled,
    outlined: DateRangeOutlined,
    twoTone: DateRangeTwoTone,
  },
  data_usage: {
    filled: DataUsageFilled,
    outlined: DataUsageOutlined,
    twoTone: DataUsageTwoTone,
  },
  wrap_text: {
    filled: WrapTextFilled,
    outlined: WrapTextOutlined,
    twoTone: WrapTextTwoTone,
  },
  control_camera: {
    filled: ControlCameraFilled,
    outlined: ControlCameraOutlined,
    twoTone: ControlCameraTwoTone,
  },
  exposure_plus_2: {
    filled: ExposurePlus2Filled,
    outlined: ExposurePlus2Outlined,
    twoTone: ExposurePlus2TwoTone,
  },
  http: {
    filled: HttpFilled,
    outlined: HttpOutlined,
    twoTone: HttpTwoTone,
  },
  send: {
    filled: SendFilled,
    outlined: SendOutlined,
    twoTone: SendTwoTone,
  },
  attach_money: {
    filled: AttachMoneyFilled,
    outlined: AttachMoneyOutlined,
    twoTone: AttachMoneyTwoTone,
  },
  done: {
    filled: DoneFilled,
    outlined: DoneOutlined,
    twoTone: DoneTwoTone,
  },
}
