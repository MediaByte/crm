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

import FilmFilled from '@material-ui/icons/Theaters'
import FilmOutlined from '@material-ui/icons/TheatersOutlined'
import FilmTwoTone from '@material-ui/icons/TheatersTwoTone'

import PuzzleFilled from '@material-ui/icons/Extension'
import PuzzleOutlined from '@material-ui/icons/ExtensionOutlined'
import PuzzleTwoTone from '@material-ui/icons/ExtensionTwoTone'

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
  film: {
    filled: FilmFilled,
    outlined: FilmOutlined,
    twoTone: FilmTwoTone,
  },
  puzzle: {
    filled: PuzzleFilled,
    outlined: PuzzleOutlined,
    twoTone: PuzzleTwoTone,
  },
}
