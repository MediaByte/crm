const drawerWidth = 280;

const navStyles = theme => ({
  title: {
    flexGrow: 1,
  },
  headerInput: {
    marginTop: -7,
  },
  drawerList: {
    color: theme.palette.common.white,
  },
  root: {
    display: 'flex',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    backgroundColor: 'transparent',
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButtonOpened: {
    color: theme.palette.common.white,
    marginTop: -70,
    backgroundColor: 'transparent',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing.unit * 27
    },
    [theme.breakpoints.down('xs')]: {
      marginLeft: theme.spacing.unit * 27
    }
  },
  menuButton: {
    color: theme.palette.common.white,
    backgroundColor: 'transparent',
    marginLeft: 13,
    marginRight: 36,
    [theme.breakpoints.down('xs')]: {
      marginLeft: theme.spacing.unit / 2
    }
  },
  hide: {
    display: 'none',
  },
  drawerPaper: {
    position: 'relative',
    paddingTop: theme.spacing.unit * 7,
    fontWeight: '400',
    boxShadow: theme.shadows[24],
    fontSize: '1.5em',
    border: '1px solid black',
    backgroundColor: '#00A7F8',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    boxShadow: theme.shadows[20],
    overflowX: 'hidden',
    backgroundColor: '#00A7F8',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing.unit * 7,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing.unit * 9,
    },
  },
  toolbar: {
    paddingRight: 24,
  },
  toolbarIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },

  children: {
    flexGrow: 1,
    padding: theme.spacing.unit * 3,
    height: '100vh',
    overflow: 'auto',
  }
});

export default navStyles;