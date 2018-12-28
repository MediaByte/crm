import React from 'react'

import _ from 'lodash'

import Divider from '@material-ui/core/Divider'
import List from '@material-ui/core/List'

import ListToolbar from '../../components/ListToolbar'
import TitleSubtitleListItem from '../../components/TitleSubtitleListItem'
/**
 * @typedef {import('../../components/ListToolbar').Props} ListToolbarProps
 * @typedef {import('../../components/StatusFilterMenu').Status} Filter
 */

/**
 * @template T
 * @typedef {object} Props
 * @prop {((item: T) => Filter)=} extractFilterable (Optional) Must be provided
 * for the filter mechanism to work, this function should return an object with
 * `displayValue` and `value` props for each item of the list. `displayValue` is
 * what will be shown in the UI, and `value` is what will be actually used for
 * filtering. This function should be pure, as an initial map over the items
 * will be used for getting all possible filtering values.
 * @prop {((item: T) => number)=} extractID (Optional) Extract the id from the
 * item, this will be passed as the first argument to the `onClickItem` prop.
 * @prop {((item: T) => string)} extractSubtitle (Optional) Extract the subtitle
 * from the item. If not provided, no subtitle will be rendered.
 * @prop {(item: T) => string} extractTitle Extract the title to be rendered.
 * @prop {T[]} items The items that will be rendered.
 * @prop {((nextSearchTerm: string) => void)=} onChangeSearchTerm (Optional) If
 * provided, gets called with the next search term inputted into the search
 * field.
 * @prop {ListToolbarProps['onClickAdd']} onClickAdd
 * @prop {ListToolbarProps['onClickDownload']} onClickDownload
 * @prop {((itemID: number) => void)=} onClickItem (Optional) Gets called with
 * the ID of the item (if the `extractID` prop is defined), otherwise the
 * function will be passed the index of the item.
 * @prop {number[]=} selectedIDs (Optional) If provided, the items with these
 * IDs will be highlighted.
 * @prop {(boolean|null)=} showToolbar (Optional) If set to true, an utility
 * toolbar will be provided, it includes some add and download action icons, a
 * toggeable search field and a toggeable pop-over filter menu.
 */

export {} // stop jsdoc comments from merging

/**
 * @typedef {object} State
 * @prop {string|null} currentFilter If null, the list is not filtered, if it's
 * an string, the list will be filtered according to the `extractFilterable`
 * prop.
 * @prop {boolean} filterMenuOpen
 * @prop {boolean} searchActive
 */

export {} // stop jsdoc comments from merging

/**
 * @template T
 * @augments React.PureComponent<Props<T>, State>
 */
class TitleSubtitleList extends React.Component {
  /**
   * @type {State}
   */
  state = {
    currentFilter: null,
    filterMenuOpen: false,
    searchActive: false,
  }

  /**
   * @private
   * @type {Filter[]}
   */
  possibleFilters = []

  /**
   * A ref for the filter icon button, this ref is used for attaching the filter
   * pop-over menu to it, (that is, it will appear alongside it when open).
   * @type {React.RefObject<SVGSVGElement>}
   */
  filterIconRef = React.createRef()

  constructor(props) {
    super(props)

    this.refreshPossiblefilters()
  }

  /**
   * @param {Props<T>} prevProps
   */
  componentDidUpdate(prevProps) {
    if (prevProps.items !== this.props.items) {
      this.refreshPossiblefilters()
    }
  }

  /**
   * @private
   * @param {string} nextFilter
   */
  onFilterChange = nextFilter => {
    if (nextFilter === '') {
      this.setState({
        currentFilter: null,
      })
    } else {
      this.setState({
        currentFilter: nextFilter,
      })
    }
  }

  /**
   * @private
   */
  refreshPossiblefilters() {
    const { extractFilterable, items } = this.props

    if (extractFilterable) {
      const filters = items.map(extractFilterable)
      // avoid repeated filters
      const uniqueFilters = _.uniqBy(filters, 'value')

      this.possibleFilters = uniqueFilters
    } else {
      this.possibleFilters = []
    }
  }

  /**
   * @private
   */
  toggleFilterMenu = () => {
    this.setState(({ filterMenuOpen }) => ({
      filterMenuOpen: !filterMenuOpen,
    }))
  }

  /**
   * @private
   */
  toggleSearch = () => {
    this.setState(({ searchActive }) => ({
      searchActive: !searchActive,
    }))
  }

  render() {
    const {
      extractID,
      extractFilterable,
      extractSubtitle,
      extractTitle,
      items: unfiltered,
      onChangeSearchTerm,
      onClickAdd,
      onClickDownload,
      onClickItem,
      selectedIDs,
      showToolbar,
    } = this.props

    const { currentFilter, filterMenuOpen, searchActive } = this.state

    const items = currentFilter
      ? unfiltered.filter(
          item => extractFilterable(item).value === currentFilter,
        )
      : unfiltered

    return (
      <React.Fragment>
        {showToolbar && (
          <ListToolbar
            filterIconRef={this.filterIconRef}
            filterMenuAnchorEl={this.filterIconRef.current}
            filterMenuCurrentStatusValue={currentFilter}
            filterMenuOpen={filterMenuOpen}
            numberOfRecords={items.length}
            onChangeSearchValue={onChangeSearchTerm}
            onClickAdd={onClickAdd}
            onClickDownload={onClickDownload}
            onClickFilterButton={this.toggleFilterMenu}
            onClickSearch={this.toggleSearch}
            onCloseFilterMenu={this.toggleFilterMenu}
            onFilterMenuStatusChange={this.onFilterChange}
            possibleStatuses={this.possibleFilters}
            showSearch={searchActive}
          />
        )}
        <Divider />
        <List component="nav">
          {items.map((item, idx) => {
            const id = extractID ? extractID(item) : idx
            const subtitle = extractSubtitle ? extractSubtitle(item) : undefined
            const title = extractTitle(item)
            const selected = selectedIDs && selectedIDs.includes(id)

            return (
              <TitleSubtitleListItem
                id={id}
                key={id}
                onClick={onClickItem}
                selected={selected}
                subtitle={subtitle}
                title={title}
              />
            )
          })}
        </List>
      </React.Fragment>
    )
  }
}

export default TitleSubtitleList
