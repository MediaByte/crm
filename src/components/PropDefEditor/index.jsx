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
 * @typedef {object} Setting
 * @prop {boolean|string|string[]} settingValueOrValues
 * @prop {string} id
 * @prop {string} paramName
 */

/**
 * @typedef {object} Props
 * @prop {string|null} helpText
 * @prop {React.ComponentType<SvgIconProps>|null} icon
 * @prop {boolean} isIndexed
 * @prop {string} label
 * @prop {(() => void)=} onClickHelpTextBtn (Optional)
 * @prop {(() => void)=} onClickIconBtn (Optional)
 * @prop {(() => void)=} onClickIndex (optional)
 * @prop {(() => void)=} onClickLabelBtn (Optional)
 * @prop {(() => void)=} onClickRequired (optional)
 * @prop {((id: string) => void)=} onClickSetting (Optional)
 * @prop {boolean} required
 * @prop {Setting[]} settings
 */

/**
 * @augments React.PureComponent<Props>
 */
class PropDefEditor extends React.PureComponent {
  /**
   * @private
   * @param {string=} id
   */
  onClickSetting = id => {
    const { onClickSetting } = this.props

    // CAST: We are supplying the ID to the drawer button so it will be defined
    onClickSetting && onClickSetting(/** @type {string} */ (id))
  }

  render() {
    const {
      helpText,
      icon,
      isIndexed,
      label,
      onClickHelpTextBtn,
      onClickIndex,
      onClickLabelBtn,
      onClickRequired,
      required,
      settings,
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
            {settings.map(setting => (
              <DrawerButton
                key={setting.id}
                id={setting.id}
                onClick={this.onClickSetting}
                primaryText={setting.paramName}
                secondaryText={(() => {
                  if (Array.isArray(setting.settingValueOrValues)) {
                    return setting.settingValueOrValues.join(', ')
                  }

                  if (typeof setting.settingValueOrValues === 'boolean') {
                    return undefined
                  }

                  return setting.settingValueOrValues
                })()}
                secTextAtBottom={Array.isArray(setting.settingValueOrValues)}
                isSwitch={typeof setting.settingValueOrValues === 'boolean'}
                switchOn={
                  typeof setting.settingValueOrValues === 'boolean'
                    ? setting.settingValueOrValues
                    : undefined
                }
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
          <DrawerButton
            isSwitch
            onClick={onClickRequired}
            primaryText="Required"
            switchOn={required}
          />
        </Grid>

        <Grid item>
          <Typography align="center" color="textSecondary" variant="body1">
            Users will not be able to save if this property is empty
          </Typography>
        </Grid>

        <Grid item>
          <DrawerButton
            isSwitch
            onClick={onClickIndex}
            primaryText="Index"
            switchOn={isIndexed}
          />
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
