/**
 * @prettier
 */
import React from 'react'
import { SortableHandle } from 'react-sortable-hoc'

import Grid from '@material-ui/core/Grid'
import IconButton from '@material-ui/core/IconButton'
import Radio from '@material-ui/core/Radio'
import Typography from '@material-ui/core/Typography'
import { withStyles } from '@material-ui/core/styles'

import RemoveCircleOutline from '@material-ui/icons/RemoveCircleOutline'
import Reorder from '@material-ui/icons/Reorder'

const SortHandle = SortableHandle(Reorder)

/**
 * @typedef {object} Props
 * @prop {Record<Classes, string>} classes
 * @prop {string} displayValue
 * @prop {string} id
 * @prop {(id: string) => void} onClickRadio
 * @prop {(id: string) => void} onClickRemove
 * @prop {boolean} radioChecked
 * @prop {boolean} renderRadio
 * @prop {boolean} renderSortHandle
 */

/**
 * @augments React.PureComponent<Props>
 */
class Option extends React.PureComponent {
  onClickRadio = () => {
    this.props.onClickRadio(this.props.id)
  }

  onClickRemove = () => {
    this.props.onClickRemove(this.props.id)
  }

  render() {
    const {
      classes,
      displayValue,
      radioChecked,
      renderRadio,
      renderSortHandle,
    } = this.props

    return (
      <Grid
        alignItems="center"
        className={classes.root}
        container
        item
        justify="space-between"
        wrap="nowrap"
      >
        <Grid alignItems="center" container>
          {renderRadio && (
            <Grid item>
              <Radio
                checked={radioChecked}
                color="primary"
                onClick={this.onClickRadio}
              />
            </Grid>
          )}

          <Grid item>
            <Typography>{displayValue}</Typography>
          </Grid>
        </Grid>

        <Grid alignItems="center" container item justify="flex-end">
          <Grid item>
            <IconButton onClick={this.onClickRemove}>
              <RemoveCircleOutline color="secondary" />
            </IconButton>
          </Grid>
          {renderSortHandle && (
            <Grid item>
              <SortHandle />
            </Grid>
          )}
        </Grid>
      </Grid>
    )
  }
}

/**
 * @param {import('@material-ui/core/styles').Theme} theme
 */
const styles = theme => ({
  root: {
    padding: theme.spacing.unit * 2,
  },
})

/**
 * @typedef {keyof ReturnType<typeof styles>} Classes
 */

export default withStyles(styles)(Option)
