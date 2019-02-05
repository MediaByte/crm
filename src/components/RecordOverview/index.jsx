import React from 'react'

import Divider from '@material-ui/core/Divider'
import Grid from '@material-ui/core/Grid'
import IconButton from '@material-ui/core/IconButton'
import Tooltip from '@material-ui/core/Tooltip'
import Typography from '@material-ui/core/Typography'
import withWidth from '@material-ui/core/withWidth'
import { withStyles } from '@material-ui/core/styles'
/**
 * @typedef {import('@material-ui/core/Grid').GridProps} GridProps
 */

import Pencil from '@material-ui/icons/Edit'
import Plus from '@material-ui/icons/Add'

import TitleShortTextTuple from 'components/TitleShortTextTuple'
import { nameToIconMap } from 'common/NameToIcon'

/**
 * @typedef {object} RecordProperty
 * @prop {string} name The name of the property itself (e.g. 'Last Name').
 * @prop {string} type The type of the property (e.g. 'textfield').
 * @prop {string} value The value for this property in this particular record
 * (e.g. 'Smith').
 */

/**
 * @typedef {object} RecordRelationship
 * @prop {string} displayValue Pick a property from the related record, and
 * put its value here.
 * @prop {string=} icon
 * @prop {string} name
 * @prop {string=} subheader (Optional) Text to render below the display value.
 * You probably want to display the related node's name.
 */

/**
 * @typedef {object} Props
 * @prop {boolean=} forceHeader (Optional) If provided and set to `true`, the
 * header will be rendered on bigger screens. Defaults to `false`.
 * @prop {boolean=} forceNodeName (Optional) If provided and set to `true`, the
 * node name will be rendered on bigger screens. Defaults to `false`.
 * @prop {string=} header (Optional) If provided, will be rendered at the top of
 * the overview on small screens.
 * @prop {string=} nodeIconName (Optional) If provided, the node's icon will be
 * rendered alongside the node name.
 * @prop {string=} nodeName (Optional) If provided, will render the node name on
 * small screens.
 * @prop {((index: number) => void)=} onClickAddRelationship (Optional) If
 * provided will be called with the index of the corresponding relationship
 * when the user clicks on its 'add' button. The index comes from its place
 * inside the `relationships` array prop.
 * @prop {(() => void)=} onClickEditProps (Optional) If provided, it will be
 * called when the edit props button is clicked.
 * @prop {((index: number) => void)=} onClickRelationship (Optional) If
 * provided, will be called with the index of the corresponding relationship
 * when the user clicks on it. The index comes from its place on the
 * `relationships` array prop.
 * @prop {RecordProperty[]=} properties (Optional) If provided, the properties
 * will be rendered for the user to see. Please refer to the `RecordProperty`
 * interface in this component's file for the shape of the objects in this array
 * that this component expects.
 * @prop {RecordRelationship[]} relationships (Optional) If provided, the
 * relationships in this record will be rendered for the user to see. Please
 * refer to the `RecordRelationship` interface in this component's file for the
 * shape of the objects in this array that this component expects.
 */

/**
 * @augments React.PureComponent<Required<Props> & { classes: Classes, width: Width }, never, never>
 */
export class RecordOverview extends React.PureComponent {
  /** @type {Required<Props>} */
  static defaultProps = {
    forceHeader: false,
    forceNodeName: false,
    header: '', // empty string should be coerced to false in render()
    nodeIconName: '', // empty string should be coerced to false in render()
    nodeName: '', // empty string should be coerced to false in render()
    onClickAddRelationship() {},
    onClickEditProps() {},
    onClickRelationship() {},
    properties: [], // render() should check the array's length
    relationships: [], // render() should check the array's length
  }

  /**
   * @private
   * @type {React.DOMAttributes<HTMLDivElement>['onClick']}
   */
  onClickAddRelationship = ({ target }) => {
    /** @type {Record<string, string|undefined>} */
    // @ts-ignore
    const dataset = target.dataset
    const { onClickAddRelationship } = this.props
    const maybeIndex = dataset['recordOverviewIndex']

    console.log(typeof onClickAddRelationship)

    onClickAddRelationship &&
      typeof maybeIndex === 'string' &&
      onClickAddRelationship(Number(maybeIndex))
  }

  /**
   * @private
   * @type {React.DOMAttributes<HTMLDivElement>['onClick']}
   */
  onClickRelationship = ({ currentTarget }) => {
    /** @type {Record<string, string|undefined>} */
    // @ts-ignore
    const dataset = currentTarget.dataset
    const { onClickRelationship } = this.props
    const maybeIndex = dataset['recordOverviewIndex']

    onClickRelationship &&
      typeof maybeIndex === 'string' &&
      onClickRelationship(Number(maybeIndex))
  }

  /**
   * @private
   * @param {RecordProperty} recordProperty
   * @param {number} index
   * @param {{ length: number }} recordProperties
   * @returns {JSX.Element}
   */
  renderRecordProperty = ({ name, value }, index, { length }) => {
    const { classes, width } = this.props

    const renderDivider = (() => {
      if (width === 'xs') {
        return index !== length - 1
      }
      return true
    })()

    return (
      <Grid
        aria-label={`property ${name}`}
        className={classes.prop}
        item
        key={index}
        sm={3} // small boxes
        xs={12} // resemble menu items in mobile OSs
      >
        <TitleShortTextTuple title={name} text={value} />
        {renderDivider && <Divider />}
      </Grid>
    )
  }

  /**
   * @private
   * @param {RecordRelationship} recordRelationship
   * @param {number} index
   * @returns {React.ReactElement<GridProps>}
   */
  renderRecordRelationship = ({ displayValue, name, subheader }, index) => {
    const { classes, width } = this.props

    return (
      <Grid
        className={classes.relationship}
        container
        direction="column"
        item
        key={index}
        justify="center"
        sm={6}
        xs={12}
      >
        <Grid
          alignContent="center"
          alignItems="center"
          className={classes.relTitle}
          container
          item
          justify={width === 'xs' ? 'space-between' : 'flex-start'}
        >
          <Grid item>
            <Typography color="inherit" variant="h5">
              {name}
            </Typography>
          </Grid>

          <Grid item>
            <IconButton
              data-record-overview-index={index}
              onClick={this.onClickAddRelationship}
            >
              <Plus aria-label={`add ${name} relationship`} color="primary" />
            </IconButton>
          </Grid>
        </Grid>

        <Grid
          className={classes.relBody}
          data-record-overview-index={index}
          item
          onClick={this.onClickRelationship}
        >
          <Typography className={classes.boldFont} variant="body1">
            {displayValue}
          </Typography>
          {subheader && <Typography variant="body2">{subheader}</Typography>}
        </Grid>
      </Grid>
    )
  }

  render() {
    const {
      classes,
      forceHeader,
      forceNodeName,
      header,
      nodeIconName,
      nodeName,
      onClickEditProps,
      properties,
      relationships,
      width,
    } = this.props

    const renderHeader = (() => {
      if (header.length === 0) return false
      return width === 'xs' || forceHeader
    })()

    const renderNodeName = (() => {
      if (nodeName.length === 0) return false
      return width === 'xs' || forceNodeName
    })()

    const NodeIcon = (() => {
      const maybeIcon = nameToIconMap[nodeIconName]
      if (typeof maybeIcon === 'undefined') return false

      return maybeIcon.twoTone
    })()

    return (
      <Grid
        alignContent="stretch"
        className={classes.root}
        container
        direction="column"
        justify="center"
        spacing={32}
      >
        {renderHeader && (
          <Grid item>
            <Typography color="inherit" variant="h2">
              {header}
            </Typography>
            {renderNodeName && (
              <Grid container item>
                <Grid item>
                  <Typography color="primary">{nodeName}</Typography>
                </Grid>

                {NodeIcon && <NodeIcon color="primary" />}
              </Grid>
            )}
          </Grid>
        )}

        <Grid
          alignContent={width === 'xs' ? 'stretch' : 'flex-start'}
          alignItems="stretch"
          className={classes.propsContainer}
          container
          direction={width === 'xs' ? 'column' : 'row'}
          item
          spacing={width === 'xs' ? 0 : 32} // TODO: spacing isn't working
        >
          {properties.map(this.renderRecordProperty)}

          {properties.length > 0 && (
            <Tooltip title="edit properties">
              <IconButton
                className={classes.editPropsButton}
                color="primary"
                onClick={onClickEditProps}
              >
                <Pencil aria-label="edit properties" color="primary" />
              </IconButton>
            </Tooltip>
          )}
        </Grid>

        <Grid
          alignContent={width === 'xs' ? 'stretch' : 'flex-start'}
          alignItems="stretch"
          className={classes.relsContainer}
          container
          direction={width === 'xs' ? 'column' : 'row'}
          item
          // Spacing adds horizontal padding, which we already have on the
          // parent container, so it interferes with our negative margin hack
          // in xs sizeHouse
          spacing={width === 'xs' ? 0 : 40}
        >
          {relationships.map(this.renderRecordRelationship)}
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
  const editPropsButtonSize = 50
  const iconDimensions = 320
  const spacing = theme.spacing.unit * PADDING_MULTIPLIER

  // Background color depending on size breakpoints:
  // There's some visual bug that prevents me from removing padding from
  // the parent container. When we are in XS size, this padding makes the
  // ripple (ripple should only be present in XS) in each relationship 'collide'
  // against a white border up and above, which frankly doesn't look as
  // aesthetic.
  return {
    alignToEnd: {
      alignSelf: 'flex-end',
    },
    addButton: {
      color: theme.palette.primary.main,
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
    boldFont: {
      fontWeight: 'bold',
    },
    editPropsButton: {
      backgroundColor: 'white',
      borderRadious: '50%',
      height: editPropsButtonSize,
      position: 'absolute',
      right: theme.spacing.unit * 7,
      top: -(editPropsButtonSize / 2),
      width: editPropsButtonSize,
    },
    prop: {
      paddingLeft: spacing,
      paddingRight: spacing,
      paddingTop: theme.spacing.unit * 2,
    },
    propsContainer: {
      backgroundColor: 'white',
      marginLeft: -spacing,
      marginRight: -spacing,
      // allow the btn to be rendered if there's nothing above, such as the
      // header not being rendered
      marginTop: Math.max(editPropsButtonSize / 2, theme.spacing.unit * 5),
      // allow the edit properties button to be absolutely positioned
      position: 'relative',
      width: 'auto',
    },
    relationship: {
      marginTop: theme.spacing.unit * 5,
    },
    relBody: {
      backgroundColor: 'white',
      padding: theme.spacing.unit * 2,
    },
    relsContainer: {
      marginLeft: -spacing,
      marginRight: -spacing,
      marginTop: theme.spacing.unit * 5,
      width: 'auto',
    },
    relTitle: {
      [theme.breakpoints.only('xs')]: {
        paddingLeft: spacing,
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
 * @typedef {keyof ReturnType<typeof styles>} ClassKey
 * @typedef {Record<ClassKey, string>} Classes
 * @typedef {import('@material-ui/core/styles/createBreakpoints').Breakpoint} Width
 */

export default withStyles(
  // Cast: no way to pass in generic arguments in JSDOC+Typescript
  /** @type {import('@material-ui/core/styles').StyleRulesCallback<ClassKey>} */ (styles),
)(withWidth()(RecordOverview))
