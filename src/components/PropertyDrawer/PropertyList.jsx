import React, { Fragment } from 'react'
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline'
import EditOutlinedIcon from '@material-ui/icons/EditOutlined'
import HistoryIcon from '@material-ui/icons/History'

import {
  List,
  ListItem,
  Divider,
  ListItemText,
  ListItemSecondaryAction,
  ListSubheader,
  IconButton,
  withStyles,
} from '@material-ui/core'

import PcIcon from '../PcIcon'

const styles = ({ custom: { smallIconButton } }) => ({
  smallIconButton,
  listItem: {
    background: '#fff',
  },
})

const PropertyList = ({
  propertyItems,
  classes,
  onEdit,
  onDelete,
  unusedList,
  onRevertUnused,
  subheader,
}) => (
  <List
    subheader={
      subheader && <ListSubheader component="div">{subheader}</ListSubheader>
    }
  >
    {propertyItems.map((item, index) => (
      <Fragment key={item.id}>
        <ListItem className={classes.listItem}>
          <PcIcon name={item.iconName} theme="outlined" />
          <ListItemText primary={item.label} secondary={item.name} />
          <ListItemSecondaryAction>
            {unusedList ? (
              <IconButton
                aria-label="History"
                className={classes.smallIconButton}
                onClick={() => onRevertUnused(item.id)}
              >
                <HistoryIcon />
              </IconButton>
            ) : (
              <Fragment>
                <IconButton
                  aria-label="Edit"
                  className={classes.smallIconButton}
                  onClick={() => onEdit(item)}
                >
                  <EditOutlinedIcon />
                </IconButton>
                <IconButton
                  aria-label="Delete"
                  color="secondary"
                  className={classes.smallIconButton}
                  onClick={() => onDelete(item.id)}
                >
                  <DeleteOutlineIcon />
                </IconButton>
              </Fragment>
            )}
          </ListItemSecondaryAction>
        </ListItem>
        {index !== propertyItems.length - 1 && (
          <li>
            <Divider />
          </li>
        )}
      </Fragment>
    ))}
  </List>
)

export default withStyles(styles)(PropertyList)
