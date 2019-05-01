import React from 'react'
import {
  Drawer,
  AppBar,
  Toolbar,
  withStyles,
  Typography,
  Grid,
} from '@material-ui/core'

const styles = theme => ({
  drawerWidth: {
    [theme.breakpoints.down('xs')]: {
      width: '100vw',
    },
    width: '480px',
    borderLeft: '1px solid #eee',
    background: '#fafafa',
  },
  title: {
    color: '#fff',
  },
})

const PcDrawer = ({
  leftAction,
  rightAction,
  title,
  children,
  classes,
  ...props
}) => (
  <Drawer
    {...props}
    anchor="right"
    ModalProps={{
      hideBackdrop: true,
    }}
    classes={{
      paper: classes.drawerWidth,
    }}
    elevation={1}
  >
    <Grid container direction="column">
      <AppBar position="static">
        <Toolbar>
          <Grid container justify="space-between" alignItems="center">
            <Grid item xs>
              {leftAction && leftAction}
            </Grid>
            <Grid item xs={6}>
              <Typography
                align="center"
                className={classes.title}
                variant="title"
              >
                {title}
              </Typography>
            </Grid>
            <Grid item xs container justify="flex-end">
              {rightAction && rightAction}
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
      {children}
    </Grid>
  </Drawer>
)

export default withStyles(styles)(PcDrawer)
