/**
 * @prettier
 */
import React from 'react'
import { SortableContainer, SortableElement } from 'react-sortable-hoc'

import Container from './Container'
import Option from './Option'

const SortableOption = SortableElement(Option)

const SortableOptionsList = SortableContainer(Container)

/**
 * @typedef {object} Props
 * @prop {string=} defaultOptionID The id of the option marked as default, this
 * option will have its radio button filled, no other options will have their
 * radio buttons filled. Must have `enableDefaultSelection` set to true.
 * @prop {boolean=} enableDefaultSelection If set to true, a radio button will be
 * rendered for each option allowing the user to select a default option.
 * @prop {boolean=} enableRemoving If set to true, a remove button will be
 * @prop {boolean=} enableReordering If set to true, reorder handles will appear
 * to the right of each option allowing the user to reorder them through drag
 * and drop.
 * @prop {((id: string) => void)=} onClickRadio Must
 * @prop {((id: string) => void)=} onClickRemove
 * @prop {((oldIndex: number, newIndex: number) => void)=} onReorderEnd
 * (Optional) If provided, and `enableReordering` is set to true, this callback
 * will be called when the user performs a reorder operation.
 * @prop {[ string , string ][]} options The texts to show as options in this
 * editor. ID and value pairs.
 */

/**
 * @augments React.PureComponent<Props>
 */
export default class OptionsEditor extends React.PureComponent {
  /**
   * @private
   * @type {import('react-sortable-hoc').SortEndHandler}
   */
  onReorderEnd = ({ newIndex, oldIndex }) => {
    const { onReorderEnd } = this.props

    onReorderEnd && onReorderEnd(oldIndex, newIndex)
  }

  /**
   * @private
   * @param {string} id
   */
  onClickRadio = id => {
    const { onClickRadio } = this.props

    onClickRadio && onClickRadio(id)
  }

  /**
   * @private
   * @param {string} id
   */
  onClickRemove = id => {
    const { onClickRemove } = this.props

    onClickRemove && onClickRemove(id)
  }

  render() {
    const {
      defaultOptionID,
      enableDefaultSelection,
      enableReordering,
      options,
    } = this.props

    return (
      <SortableOptionsList onSortEnd={this.onReorderEnd} useDragHandle>
        {options.map(([id, opt], i) => (
          <SortableOption
            renderRadio={!!enableDefaultSelection}
            displayValue={opt}
            index={i}
            id={id}
            key={id}
            onClickRadio={this.onClickRadio}
            onClickRemove={this.onClickRemove}
            radioChecked={defaultOptionID === id}
            renderSortHandle={!!enableReordering}
          />
        ))}
      </SortableOptionsList>
    )
  }
}
