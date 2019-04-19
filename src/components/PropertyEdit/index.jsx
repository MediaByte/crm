import React, { Component } from 'react'
import { Grid, List, ListSubheader } from '@material-ui/core'
import PropertyEditParam from '../PropertyEditParam'
import PropertyEditBooleanItem from './PropertyEditBooleanItem'
import PropertyEditSimpleItem from './PropertyEditSimpleItem'

class PropertyEdit extends Component {
  showSecondaryText = argument => {
    const { param } = argument

    if (!param.multiple) return null
    return null

    // switch (param.type) {
    //   case 'string':
    //     return value.valueIfString
    //   case 'number':
    //     return value.valueIfNumber
    //   case 'boolean':
    //     return value.valueIfboolean
    //   default:
    //     return ''
    // }
  }

  showArgumentValue = argument => {
    const { param, value } = argument

    if (param.multiple) return null

    switch (param.type) {
      case 'string':
        return value.valueIfString
      case 'number':
        return value.valueIfNumber
      case 'boolean':
        return value.valueIfboolean
      default:
        return ''
    }
  }

  render() {
    const {
      activePropDef,
      activeArgumentId,
      handleToggleArgument,
      handleEditArgument,
    } = this.props

    return (
      <div style={{ padding: '20px' }}>
        {activeArgumentId ? (
          <PropertyEditParam
            activePropDef={activePropDef}
            activeArgumentId={activeArgumentId}
          />
        ) : (
          <Grid container direction="column" spacing={40}>
            <List
              subheader={
                <ListSubheader disableSticky>APPEARANCE</ListSubheader>
              }
            >
              {activePropDef.arguments &&
                Object.entries(activePropDef.arguments).map(
                  ([key, argument], index, list) => {
                    const { param } = argument
                    return (
                      <PropertyEditSimpleItem
                        primaryText={param.name}
                        secondaryText={this.showSecondaryText(argument)}
                        actionText={this.showArgumentValue(argument)}
                        onClick={() => handleEditArgument(key)}
                        divider={index + 1 !== list.length}
                      />
                    )
                  },
                )}
            </List>

            <PropertyEditBooleanItem
              primaryText="Required"
              helpText="Users will not be able to save if this property is empty"
              helpTextChecked="Users wll be able to save if this property is empty"
              onChange={() => handleToggleArgument('required')}
              checked={activePropDef.required}
            />

            <PropertyEditBooleanItem
              primaryText="Index"
              helpText="This property will appear in Universal Search results"
              helpTextChecked="This property will appear in Universal Search results when checked"
              onChange={() => handleToggleArgument('index')}
              checked={activePropDef.index}
            />

            <List subheader={<ListSubheader disableSticky>ICON</ListSubheader>}>
              <PropertyEditSimpleItem
                iconName={activePropDef.iconName}
                onClick={() => handleEditArgument('icon')}
              />
            </List>
          </Grid>
        )}
      </div>
    )
  }
}

export default PropertyEdit
