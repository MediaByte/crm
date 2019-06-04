import React from 'react'

import { SortableContainer, SortableElement } from 'react-sortable-hoc'
/**
 * @typedef {import('react-sortable-hoc').SortEndHandler} SortEndHandler
 */

import PropDefItem from './PropDefItem'

/**
 * @typedef {import('.').SimplePropDef} SimplePropDef
 */

/**
 * @param {{ item: SimplePropDef }} param0
 */
const ReorderItem = ({ item: propDef }) => (
  <PropDefItem
    icon={propDef.icon}
    id={propDef.id}
    key={propDef.id}
    label={propDef.label}
    typeName={propDef.typeName}
    isActive
    isReordering
  />
)

const SortableItem = SortableElement(ReorderItem)

/**
 * @type {React.SFC}
 */
const SortableListRenderer = ({ children }) => <div>{children}</div>

const SortableList = SortableContainer(SortableListRenderer)

/**
 * @typedef {object} Props
 * @prop {SimplePropDef[]} propDefs
 * @prop {SortEndHandler} onSortEnd
 */

/**
 * @augments React.PureComponent<Props>
 */
class ReorderList extends React.PureComponent {
  render() {
    const { propDefs, onSortEnd } = this.props

    return (
      <SortableList onSortEnd={onSortEnd} useDragHandle>
        {propDefs.map((propDef, index) => (
          <SortableItem key={propDef.id} index={index} item={propDef} />
        ))}
      </SortableList>
    )
  }
}

export default ReorderList
