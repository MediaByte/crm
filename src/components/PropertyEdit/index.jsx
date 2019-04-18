import React, { Component, Fragment } from 'react'
import { Grid, List, ListSubheader, Typography } from '@material-ui/core'
import PropertyEditParam from '../PropertyEditParam'
import PropertyEditBooleanItem from './PropertyEditBooleanItem'
import PropertyEditSimpleItem from './PropertyEditSimpleItem'

class PropertyEdit extends Component {
  state = {
    checked: [],
    editingParam: '',
  }

  handleToggle = value => {
    const { checked: checkedState } = this.state
    const checked = [...checkedState]
    const valueIndex = checked.indexOf(value)

    if (valueIndex !== -1) {
      checked.splice(valueIndex, 1)
    } else {
      checked.push(value)
    }

    this.setState({ checked })
  }

  renderAppearanceItems = () => {
    const {
      editItem: { type },
    } = this.props

    if (type === 'picklist' || type === 'phone') {
      return (
        <PropertyEditSimpleItem
          primaryText="Options"
          secondaryText="Yes, No"
          onClick={() => this.setState({ editingParam: 'options' })}
        />
      )
    } else if (type === 'textfield') {
      return (
        <PropertyEditSimpleItem
          primaryText="Character Limit"
          actionText="155"
          onClick={() => this.setState({ editingParam: 'string' })}
        />
      )
    } else if (type === 'name' || type === 'address' || type === 'multiline') {
      return (
        <PropertyEditSimpleItem
          primaryText="Display Fields"
          secondaryText="Prifix, First Name, LastName, Suffix"
          onClick={() => this.setState({ editingParam: 'displayfields' })}
        />
      )
    } else if (type === 'time') {
      return (
        <PropertyEditSimpleItem
          primaryText="Format"
          actionText="155"
          onClick={() => this.setState({ editingParam: 'string' })}
        />
      )
    } else if (type === 'currency') {
      return (
        <PropertyEditSimpleItem
          primaryText="Type"
          actionText="USD"
          onClick={() => this.setState({ editingParam: 'optionsstatic' })}
        />
      )
    }
    return ''
  }

  renderAdditionalEdits = () => {
    const {
      editItem: { type },
    } = this.props

    if (type === 'decimal' || type === 'percent' || type === 'currency') {
      return (
        <Fragment>
          <List>
            <PropertyEditSimpleItem
              primaryText="Digits After Decimal"
              actionText="2"
              onClick={() => this.setState({ editingParam: 'string' })}
            />
            <li>
              <Typography align="center" variant="body1" color="textSecondary">
                This property will appear in Universal Search results
              </Typography>
            </li>
          </List>
          <List>
            <PropertyEditSimpleItem
              primaryText="Maximum Digits"
              actionText="5"
              onClick={() => this.setState({ editingParam: 'string' })}
            />
          </List>
        </Fragment>
      )
    } else if (type === 'http') {
      return (
        <List>
          <PropertyEditSimpleItem
            primaryText="URL"
            actionText="https://www.pudahealth.org"
            onClick={() => this.setState({ editingParam: 'string' })}
          />
          <PropertyEditSimpleItem
            primaryText="Display"
            actionText="DuHuge Health Department"
            onClick={() => this.setState({ editingParam: 'string' })}
          />
        </List>
      )
    }
    return ''
  }

  render() {
    const { editItem } = this.props
    const { checked, editingParam } = this.state

    return (
      <div style={{ padding: '20px' }}>
        {editingParam.length ? (
          <PropertyEditParam editItem={editItem} editingParam={editingParam} />
        ) : (
          <Grid container direction="column" spacing={40}>
            <List
              subheader={
                <ListSubheader disableSticky>APPEARANCE</ListSubheader>
              }
            >
              <PropertyEditSimpleItem
                primaryText="Label"
                actionText="elit"
                onClick={() => this.setState({ editingParam: 'string' })}
                divider
              />
              {this.renderAppearanceItems()}
            </List>

            <List>
              <PropertyEditSimpleItem
                primaryText="Help Text"
                actionText="enabled"
                onClick={() => this.setState({ editingParam: 'helptext' })}
              />
            </List>

            {this.renderAdditionalEdits()}

            <PropertyEditBooleanItem
              primaryText="Required"
              helpText="Users will not be able to save if this property is empty"
              helpTextChecked="Users wll be able to save if this property is empty"
              onChange={() => this.handleToggle('required')}
              checked={checked.includes('required')}
            />

            <PropertyEditBooleanItem
              primaryText="Index"
              helpText="This property will appear in Universal Search results"
              helpTextChecked="This property will appear in Universal Search results when checked"
              onChange={() => this.handleToggle('index')}
              checked={checked.includes('index')}
            />

            <List subheader={<ListSubheader disableSticky>ICON</ListSubheader>}>
              <PropertyEditSimpleItem
                iconName={editItem.iconName}
                onClick={() => this.setState({ editingParam: 'icon' })}
              />
            </List>
          </Grid>
        )}
      </div>
    )
  }
}

export default PropertyEdit
