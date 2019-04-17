import React from 'react'

import ButtonBase from '@material-ui/core/ButtonBase'
import Divider from '@material-ui/core/Divider'
import Grid from '@material-ui/core/Grid'
import IconButton from '@material-ui/core/IconButton'
import Typography from '@material-ui/core/Typography'
import withWidth from '@material-ui/core/withWidth'
import { withStyles } from '@material-ui/core/styles'

import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'
import ListItemText from '@material-ui/core/ListItemText'
import Avatar from '@material-ui/core/Avatar'

import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline'
import EditOutlineIcon from '@material-ui/icons/EditOutlined'
import PersonIcon from '@material-ui/icons/Person'
import PhoneIcon from '@material-ui/icons/Phone'
import EmailIcon from '@material-ui/icons/Email'
import HomeIcon from '@material-ui/icons/Home'
import TagFacesIcon from '@material-ui/icons/TagFaces'
import AddIcon from '@material-ui/icons/Add'

import Add from '@material-ui/icons/Add'

import TitleShortTextTuple from 'components/TitleShortTextTuple'
import { nameToIconMap } from 'common/NameToIcon'

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
 * @prop {{name: string, type: string}[]} properties
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
      <Grid container>
        <Grid item xs={12} md={12}>
          <a href="" className={classes.buttomReorder}>
            Reorder
          </a>
          <List className={classes.contentList}>
            <ListItem className={classes.itemList}>
              <ListItemAvatar>
                <Avatar className={classes.avatarIcon}>
                  <PersonIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary="First Name" secondary="Text" />
              <ListItemSecondaryAction className={classes.itemOption}>
                <IconButton aria-label="Edit" className={classes.buttomOption}>
                  <EditOutlineIcon />
                </IconButton>
                <IconButton
                  aria-label="Delete"
                  color="secondary"
                  className={classes.buttomOption}
                >
                  <DeleteOutlineIcon />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
            <ListItem className={classes.itemList}>
              <ListItemAvatar>
                <Avatar className={classes.avatarIcon}>
                  <PersonIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary="Last Name" secondary="Text" />
              <ListItemSecondaryAction className={classes.itemOption}>
                <IconButton
                  aria-label="Delete"
                  className={classes.buttomOption}
                >
                  <EditOutlineIcon />
                </IconButton>
                <IconButton
                  aria-label="Delete"
                  color="secondary"
                  className={classes.buttomOption}
                >
                  <DeleteOutlineIcon />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
            <ListItem className={classes.itemList}>
              <ListItemAvatar>
                <Avatar className={classes.avatarIcon}>
                  <PhoneIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary="Phone" secondary="Phone" />
              <ListItemSecondaryAction className={classes.itemOption}>
                <IconButton
                  aria-label="Delete"
                  className={classes.buttomOption}
                >
                  <EditOutlineIcon />
                </IconButton>
                <IconButton
                  aria-label="Delete"
                  color="secondary"
                  className={classes.buttomOption}
                >
                  <DeleteOutlineIcon />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
            <ListItem className={classes.itemList}>
              <ListItemAvatar>
                <Avatar className={classes.avatarIcon}>
                  <EmailIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary="Email" secondary="Email" />
              <ListItemSecondaryAction className={classes.itemOption}>
                <IconButton
                  aria-label="Delete"
                  className={classes.buttomOption}
                >
                  <EditOutlineIcon />
                </IconButton>
                <IconButton
                  aria-label="Delete"
                  color="secondary"
                  className={classes.buttomOption}
                >
                  <DeleteOutlineIcon />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
            <ListItem className={classes.itemList}>
              <ListItemAvatar>
                <Avatar className={classes.avatarIcon}>
                  <HomeIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary="Address" secondary="Address" />
              <ListItemSecondaryAction className={classes.itemOption}>
                <IconButton
                  aria-label="Delete"
                  className={classes.buttomOption}
                >
                  <EditOutlineIcon />
                </IconButton>
                <IconButton
                  aria-label="Delete"
                  color="secondary"
                  className={classes.buttomOption}
                >
                  <DeleteOutlineIcon />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
            <ListItem className={classes.itemList}>
              <ListItemAvatar>
                <Avatar className={classes.avatarIcon}>
                  <TagFacesIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary="Nice Person" secondary="Picklist" />
              <ListItemSecondaryAction className={classes.itemOption}>
                <IconButton
                  aria-label="Delete"
                  className={classes.buttomOption}
                >
                  <EditOutlineIcon />
                </IconButton>
                <IconButton
                  aria-label="Delete"
                  color="secondary"
                  className={classes.buttomOption}
                >
                  <DeleteOutlineIcon />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          </List>
        </Grid>
        <IconButton
          onClick={this.toggleAddNodeDialog}
          color="secondary"
          className={classes.buttonAdd}
          style={{
            position: 'absolute',
            bottom: '40px',
            right: '50px',
            backgroundColor: '#f34930',
            color: '#fff',
            transition:
              'background-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,box-shadow 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,border 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
            boxShadow:
              '0px 3px 5px -1px rgba(0,0,0,0.2), 0px 6px 10px 0px rgba(0,0,0,0.14), 0px 1px 18px 0px rgba(0,0,0,0.12)',
          }}
        >
          <AddIcon />
        </IconButton>
      </Grid>
      // <Grid
      //   alignContent="stretch"
      //   className={classes.root}
      //   container
      //   direction="column"
      //   justify="center"
      //   spacing={32}
      // >
      //   {iconExists && <Icon className={classes.backgroundIcon} />}

      //   <Grid alignItems="flex-end" container direction="row" item>
      //     <Typography color="inherit" variant="h2">
      //       {label}
      //     </Typography>
      //     {width === 'xs' && (
      //       <Typography color="primary" variant="subtitle2">
      //         Node
      //       </Typography>
      //     )}
      //   </Grid>

      //   <Grid container item spacing={24}>
      //     <Grid item sm={6} xs={12}>
      //       <Typography align="center" paragraph variant="h4">
      //         Identifier
      //       </Typography>
      //       <Typography align="center" variant="h6">
      //         {identifier}
      //       </Typography>
      //     </Grid>

      //     <Grid item sm={6} xs={12}>
      //       <Typography align="center" paragraph variant="h4">
      //         Name
      //       </Typography>
      //       <Typography align="center" variant="h6">
      //         {name}
      //       </Typography>
      //     </Grid>
      //   </Grid>

      //   <Grid
      //     alignContent="center"
      //     alignItems="center"
      //     container
      //     item
      //     justify="space-between"
      //   >
      //     <Grid item>
      //       <Typography color="inherit" variant="h4">
      //         Properties
      //       </Typography>
      //     </Grid>

      //     <Grid className={classes.addButton} item>
      //       <IconButton onClick={onClickAddProperty}>
      //         <Add aria-label="add node property" color="primary" />
      //       </IconButton>
      //     </Grid>
      //   </Grid>

      //   <Grid
      //     alignContent={width === 'xs' ? 'stretch' : 'flex-start'}
      //     alignItems="stretch"
      //     className={classes.propsOrRelsContainer}
      //     container
      //     direction={width === 'xs' ? 'column' : 'row'}
      //     item
      //     spacing={width === 'xs' ? 0 : 32} // TODO: spacing isn't working
      //   >
      //     {properties.map(({ name, type }, i) => {
      //       const icon = nameToIconMap[typeToIconName[type]]
      //       const iconExists = !!icon

      //       return this.renderPropOrRel(
      //         iconExists && icon.twoTone,
      //         typeToReadableName[type],
      //         name,
      //         i,
      //       )
      //     })}
      //   </Grid>

      //   <Grid
      //     alignContent="center"
      //     alignItems="center"
      //     container
      //     item
      //     justify="space-between"
      //   >
      //     <Grid item>
      //       <Typography color="inherit" variant="h4">
      //         Relationships
      //       </Typography>
      //     </Grid>

      //     <Grid className={classes.addButton} item>
      //       <IconButton onClick={onClickAddRelationship}>
      //         <Add aria-label="add node relationship" color="primary" />
      //       </IconButton>
      //     </Grid>
      //   </Grid>

      //   <Grid
      //     alignContent={width === 'xs' ? 'stretch' : 'flex-start'}
      //     alignItems="stretch"
      //     className={classes.propsOrRelsContainer}
      //     container
      //     direction={width === 'xs' ? 'column' : 'row'}
      //     item
      //     spacing={width === 'xs' ? 0 : 32} // TODO: spacing isn't working
      //   >
      //     {relationships.map(({ icon, name, relatedNodeName }, i) => {
      //       return this.renderPropOrRel(
      //         icon && nameToIconMap[icon].twoTone,
      //         relatedNodeName,
      //         name,
      //         i,
      //         true,
      //       )
      //     })}
      //   </Grid>
      // </Grid>
    )
  }
}

// const PADDING_MULTIPLIER = 2

/**
 * @param {import('@material-ui/core/styles').Theme} theme
 */
const styles = theme => {
  //const iconDimensions = 320
  //const spacing = theme.spacing.unit * PADDING_MULTIPLIER

  // Background color depending on size breakpoints:
  // There's some visual bug that prevents me from removing padding from
  // the parent container. When we are in XS size, this padding makes the
  // ripple (ripple should only be present in XS) in each prop/rel 'collide'
  // against a white border up and above, which frankly doesn't look as
  // aesthetic.
  return {
    root: {
      margin: theme.spacing.unit,
    },
    itemOption: {
      display: 'flex !important',
      flexDirection: 'column !important',
      right: '10px !important',
    },
    buttomOption: {
      padding: '5px !important',
    },
    contentList: {
      padding: theme.spacing.unit * 3,
    },
    itemList: {
      borderBottom: '1px solid #d4d4d4 !important',
      padding: theme.spacing.unit * 2,
    },
    avatarIcon: {
      backgroundColor: '#0dacc4',
    },
    buttomReorder: {
      float: 'right',
      position: 'relative',
      right: '30px',
      top: '-10px',
      color: '#0babc6',
      fontWeight: 400,
      textDecoration: 'underline',
      '&:hover': {
        textDecoration: 'none',
        color: '#0babc6',
      },
    },
    // addButton: {
    //   color: theme.palette.primary.main,
    //   [theme.breakpoints.up('sm')]: {
    //     marginLeft: theme.spacing.unit * 1,
    //     marginRight: 'auto', // put it near the title on big screens
    //   },
    // },
    // backgroundIcon: {
    //   height: iconDimensions,
    //   left: '50%', // center horizontally
    //   marginLeft: -(iconDimensions / 2), // center horizontally
    //   right: 30,
    //   opacity: 0.1,
    //   position: 'absolute',
    //   top: 10,
    //   width: iconDimensions,
    //   zIndex: -1, // it draws on top of the everything otherwise ??
    // },
    // propOrRel: {
    //   cursor: 'pointer',
    //   paddingLeft: spacing,
    //   paddingRight: spacing,
    //   paddingTop: theme.spacing.unit * 2,
    //   [theme.breakpoints.only('xs')]: {
    //     backgroundColor: 'white',
    //   },
    // },
    // propsOrRelsContainer: {
    //   marginLeft: -spacing,
    //   marginRight: -spacing,
    //   width: 'auto',
    //   [theme.breakpoints.up('sm')]: {
    //     backgroundColor: 'white',
    //   },
    // },
    // root: {
    //   // force grey background, certain parent containers hardcode background
    //   // colors so the grey-white contrast gets lost
    //   backgroundColor: theme.palette.grey[200],
    //   padding: spacing,
    // },
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
