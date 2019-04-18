import React from 'react'
import { nameToIconMap } from 'common/NameToIcon'
import {
  Grid,
  Typography,
  Paper,
  IconButton,
  Badge,
  withStyles,
} from '@material-ui/core'
import PcIcon from 'components/PcIcon'

const styles = {
  badge: {
    top: '0',
    right: -3,
    width: '15px',
    height: '15px',
  },
  badgeIcon: {
    color: '#fff',
  },
}
const PropertyEditParamIcon = ({ editItem, classes }) => {
  return (
    <Grid container direction="column" spacing={40}>
      <Grid item alignContent="flex-end">
        <Typography align="center">
          Selected Icon will appear next to the property
        </Typography>
      </Grid>
      <Grid item>
        <Paper>
          <Grid container>
            {Object.keys(nameToIconMap).map(iconName =>
              editItem.iconName === iconName ? (
                <IconButton>
                  <Badge
                    classes={{ badge: classes.badge }}
                    color="primary"
                    badgeContent={
                      <PcIcon
                        fontSize="small"
                        name="done"
                        theme="outlined"
                        className={classes.badgeIcon}
                      />
                    }
                  >
                    <PcIcon
                      fontSize="large"
                      name={iconName}
                      theme="outlined"
                      color="primary"
                    />
                  </Badge>
                </IconButton>
              ) : (
                <IconButton>
                  <PcIcon
                    fontSize="large"
                    name={iconName}
                    theme="outlined"
                    color="default"
                  />
                </IconButton>
              ),
            )}
          </Grid>
        </Paper>
      </Grid>
    </Grid>
  )
}

export default withStyles(styles)(PropertyEditParamIcon)
