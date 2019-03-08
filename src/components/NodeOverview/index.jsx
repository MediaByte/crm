import React from 'react'

import ButtonBase from '@material-ui/core/ButtonBase'
import Divider from '@material-ui/core/Divider'
import Grid from '@material-ui/core/Grid'
import IconButton from '@material-ui/core/IconButton'
import Typography from '@material-ui/core/Typography'
import withWidth from '@material-ui/core/withWidth'
import { withStyles } from '@material-ui/core/styles'

import Add from '@material-ui/icons/Add'

import TitleShortTextTuple from 'components/TitleShortTextTuple'
import { nameToIconMap } from 'common/NameToIcon'
import { typeToIconName, typeToReadableName } from 'common/PropTypeToMetadata'

/**
 * @typedef {object} Props
 * @prop {string} iconName
 * @prop {string} identifier
 * @prop {string} label
 * @prop {string} name
 * @prop {(() => void)=} onClickAddProperty
 * @prop {(() => void)=} onClickAddRelationship
 * @prop {((index: number) => void)=} onClickProperty
 * @prop {((index: number) => void)=} onClickRelationship
 * @prop {{name: string, propType: string}[]} properties
 * @prop {{icon?: string, name: string, relatedNodeName: string}[]} relationships
 */

/**
 * @augments React.PureComponent<Required<Props> & { classes: Classes, width: Width }, never, never>
 */
class NodeOverview extends React.PureComponent {
  /** @type {Partial<Props>} */
  static defaultProps = {
    onClickAddProperty() {},
    onClickAddRelationship() {},
    onClickProperty() {},
    onClickRelationship() {},
  }

  /**
   * @param {React.ComponentType<import('@material-ui/core/SvgIcon').SvgIconProps>|undefined|false|null|''} icon
   * @param {string} text
   * @param {string} title
   * @param {number} index
   * @param {boolean=} isRelationship
   * @returns {JSX.Element}
   */
  renderPropOrRel(icon, text, title, index, isRelationship = false) {
    const { classes, properties, relationships, width } = this.props

    const content = (
      <Grid
        aria-label={
          isRelationship ? `relationship ${title}` : `property ${title}`
        }
        className={classes.propOrRel}
        item
        key={index}
        // TODO: optimize away function literal
        onClick={() => {
          if (isRelationship) {
            this.props.onClickRelationship(index)
          } else {
            this.props.onClickProperty(index)
          }
        }}
        sm={3} // little boxes
        xs={12} // resemble menu items in mobile OSs
      >
        <TitleShortTextTuple
          icon={icon || undefined}
          text={text}
          title={isRelationship ? ':' + title : title}
        />
        {(() => {
          const len = isRelationship ? relationships.length : properties.length

          if (width === 'xs' && index !== len - 1) {
            return <Divider />
          } else {
            return null
          }
        })()}
      </Grid>
    )

    return width === 'xs' ? <ButtonBase>{content}</ButtonBase> : content
  }

  render() {
    const {
      classes,
      iconName,
      identifier,
      label,
      name,
      onClickAddProperty,
      onClickAddRelationship,
      properties,
      relationships,
      width,
    } = this.props
    const iconExists = !!nameToIconMap[iconName]
    const Icon = iconExists && nameToIconMap[iconName].filled

    return (
      <Grid
        alignContent="stretch"
        className={classes.root}
        container
        direction="column"
        justify="center"
        spacing={32}
      >
        {iconExists && <Icon className={classes.backgroundIcon} />}

        <Grid alignItems="flex-end" container direction="row" item>
          <Typography color="inherit" variant="h2">
            {label}
          </Typography>
          {width === 'xs' && (
            <Typography color="primary" variant="subtitle2">
              Node
            </Typography>
          )}
        </Grid>

        <Grid container item spacing={24}>
          <Grid item sm={6} xs={12}>
            <Typography align="center" paragraph variant="h4">
              Identifier
            </Typography>
            <Typography align="center" variant="h6">
              {identifier}
            </Typography>
          </Grid>

          <Grid item sm={6} xs={12}>
            <Typography align="center" paragraph variant="h4">
              Name
            </Typography>
            <Typography align="center" variant="h6">
              {name}
            </Typography>
          </Grid>
        </Grid>

        <Grid
          alignContent="center"
          alignItems="center"
          container
          item
          justify="space-between"
        >
          <Grid item>
            <Typography color="inherit" variant="h4">
              Properties
            </Typography>
          </Grid>

          <Grid className={classes.addButton} item>
            <IconButton onClick={onClickAddProperty}>
              <Add aria-label="add node property" color="primary" />
            </IconButton>
          </Grid>
        </Grid>

        <Grid
          alignContent={width === 'xs' ? 'stretch' : 'flex-start'}
          alignItems="stretch"
          className={classes.propsOrRelsContainer}
          container
          direction={width === 'xs' ? 'column' : 'row'}
          item
          spacing={width === 'xs' ? 0 : 32} // TODO: spacing isn't working
        >
          {properties.map(({ name, propType }, i) => {
            const icon = nameToIconMap[typeToIconName[propType]]
            const iconExists = !!icon

            return this.renderPropOrRel(
              iconExists && icon.twoTone,
              typeToReadableName[propType],
              name,
              i,
            )
          })}
        </Grid>

        <Grid
          alignContent="center"
          alignItems="center"
          container
          item
          justify="space-between"
        >
          <Grid item>
            <Typography color="inherit" variant="h4">
              Relationships
            </Typography>
          </Grid>

          <Grid className={classes.addButton} item>
            <IconButton onClick={onClickAddRelationship}>
              <Add aria-label="add node relationship" color="primary" />
            </IconButton>
          </Grid>
        </Grid>

        <Grid
          alignContent={width === 'xs' ? 'stretch' : 'flex-start'}
          alignItems="stretch"
          className={classes.propsOrRelsContainer}
          container
          direction={width === 'xs' ? 'column' : 'row'}
          item
          spacing={width === 'xs' ? 0 : 32} // TODO: spacing isn't working
        >
          {relationships.map(({ icon, name, relatedNodeName }, i) => {
            return this.renderPropOrRel(
              icon && nameToIconMap[icon].twoTone,
              relatedNodeName,
              name,
              i,
              true,
            )
          })}
        </Grid>
      </Grid>
    )
  }
}

const PADDING_MULTIPLIER = 2

/**
 * @param {import('@material-ui/core/styles').Theme} theme
 */
const styles = theme => {
  const iconDimensions = 320
  const spacing = theme.spacing.unit * PADDING_MULTIPLIER

  // Background color depending on size breakpoints:
  // There's some visual bug that prevents me from removing padding from
  // the parent container. When we are in XS size, this padding makes the
  // ripple (ripple should only be present in XS) in each prop/rel 'collide'
  // against a white border up and above, which frankly doesn't look as
  // aesthetic.
  return {
    addButton: {
      color: theme.palette.primary.main,
      [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing.unit * 1,
        marginRight: 'auto', // put it near the title on big screens
      },
    },
    backgroundIcon: {
      height: iconDimensions,
      left: '50%', // center horizontally
      marginLeft: -(iconDimensions / 2), // center horizontally
      right: 30,
      opacity: 0.1,
      position: 'absolute',
      top: 10,
      width: iconDimensions,
      zIndex: -1, // it draws on top of the everything otherwise ??
    },
    propOrRel: {
      cursor: 'pointer',
      paddingLeft: spacing,
      paddingRight: spacing,
      paddingTop: theme.spacing.unit * 2,
      [theme.breakpoints.only('xs')]: {
        backgroundColor: 'white',
      },
    },
    propsOrRelsContainer: {
      marginLeft: -spacing,
      marginRight: -spacing,
      width: 'auto',
      [theme.breakpoints.up('sm')]: {
        backgroundColor: 'white',
      },
    },
    root: {
      // force grey background, certain parent containers hardcode background
      // colors so the grey-white contrast gets lost
      backgroundColor: theme.palette.grey[200],
      padding: spacing,
    },
  }
}

/**
 * @typedef {keyof ReturnType<typeof styles>} ClassNames
 * @typedef {Record<ClassNames, string>} Classes
 * @typedef {import('@material-ui/core/styles/createBreakpoints').Breakpoint} Width
 */

export default withStyles(
  // Cast: no way to pass in generic arguments in JSDOC+Typescript
  /** @type {import('@material-ui/core/styles').StyleRulesCallback<ClassNames>} */ (styles),
)(withWidth()(NodeOverview))
