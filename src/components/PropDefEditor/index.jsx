import React from 'react'

import Grid from '@material-ui/core/Grid'
import List from '@material-ui/core/List'
import ListSubheader from '@material-ui/core/ListSubheader'
import Typography from '@material-ui/core/Typography'
/**
 * @typedef {import('@material-ui/core/SvgIcon').SvgIconProps} SvgIconProps
 */

import DrawerButton from 'components/DrawerButton'

const APPEARANCE_SUBHEADER = (
  <ListSubheader disableSticky>APPEARANCE</ListSubheader>
)

const ICON_SUBHEADER = <ListSubheader disableSticky>ICON</ListSubheader>

/**
 * @typedef {object} Argument
 * @prop {string|string[]} argValueOrValues
 * @prop {string} id
 * @prop {string} paramName
 */

/**
 * @typedef {object} Props
 * @prop {Argument[]} args
 * @prop {string|null} helpText
 * @prop {React.ComponentType<SvgIconProps>|null} icon
 * @prop {boolean} isIndexed
 * @prop {string} label
 * @prop {(() => void)=} onClickHelpTextBtn (Optional)
 * @prop {(() => void)=} onClickIconBtn (Optional)
 * @prop {(() => void)=} onClickLabelBtn (Optional)
 * @prop {(() => void)=} onClickRequired (optional)
 * @prop {boolean} required
 */

/**
 * @augments React.PureComponent<Props>
 */
class PropDefEditor extends React.PureComponent {
  render() {
    const {
      args,
      helpText,
      icon,
      label,
      onClickHelpTextBtn,
      onClickLabelBtn,
      required,
    } = this.props

    return (
      <Grid container direction="column" spacing={40}>
        <Grid item>
          <List subheader={APPEARANCE_SUBHEADER}>
            <DrawerButton
              onClick={onClickLabelBtn}
              primaryText="Label"
              secondaryText={label}
            />
            {args.map(argument => (
              <DrawerButton
                key={argument.id}
                primaryText={argument.paramName}
                secondaryText={
                  Array.isArray(argument.argValueOrValues)
                    ? argument.argValueOrValues.join(', ')
                    : argument.argValueOrValues
                }
                secTextAtBottom={Array.isArray(argument.argValueOrValues)}
              />
            ))}
          </List>
        </Grid>

        <Grid item>
          <DrawerButton
            onClick={onClickHelpTextBtn}
            primaryText="Help Text"
            secondaryText={!!helpText ? 'Enabled' : 'Disabled'}
          />
        </Grid>

        <Grid item>
          <DrawerButton isSwitch primaryText="Required" switchOn={required} />
        </Grid>

        <Grid item>
          <Typography align="center" color="textSecondary" variant="body1">
            Users will not be able to save if this property is empty
          </Typography>
        </Grid>

        <Grid item>
          <DrawerButton isSwitch primaryText="Index" switchOn={required} />
        </Grid>

        <Grid item>
          <Typography align="center" color="textSecondary" variant="body1">
            This property will appear in Universal Search results
          </Typography>
        </Grid>

        <Grid item>
          <List subheader={ICON_SUBHEADER}>
            <DrawerButton
              icon={icon}
              primaryText={icon ? undefined : 'No Icon Selected'}
            />
          </List>
        </Grid>
      </Grid>
    )
  }
}

export default PropDefEditor
