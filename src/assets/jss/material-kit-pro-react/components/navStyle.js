const drawerWidth = 267;

const navStyles = theme => ({
  title: {
    flexGrow: 1,
    [theme.breakpoints.down('xs')]: {
      marginTop: '50px',
    },
  },
  titleStyle: {
    [theme.breakpoints.up('sm')]: {
      paddingTop: '40px',
    },
    [theme.breakpoints.down('xs')]: {
      paddingTop: '20px',
      paddingBottom: '30px',
    }
  },
  headerInput: {
    marginTop: -7,
  },
  menuDividerOpened: {
    backgroundColor: 'white',
  },
  drawerList: {
    color: theme.palette.common.white,
  },
  root: {
    display: 'flex',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 2,
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
  menuDivider: {
    backgroundColor: 'white',
    marginBottom: theme.spacing.unit * 1.8,
    margin: 'auto',
    width: '85%',
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
    [theme.breakpoints.down('xs')]: {
      color: theme.palette.primary.main,
      marginLeft: theme.spacing.unit / 2
    },
    [theme.breakpoints.up('sm')]: {
      color: theme.palette.common.white
    },
    backgroundColor: 'transparent',
    marginLeft: 13,
    position: 'fixed',
  },
  hide: {
    display: 'none',
  },
  drawerPaper: {
    position: 'relative',
    [theme.breakpoints.down('xs')]: {
      position: 'fixed',
    },
    paddingTop: theme.spacing.unit * 7,
    fontWeight: '400',
    boxShadow: theme.shadows[24],
    fontSize: '1.5em',
    backgroundColor: '#0DACC4',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    minWidth: 0,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    position: 'relative',
    minHeight: '100vh',
    boxShadow: theme.shadows[20],
    backgroundColor: '#0DACC4',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing.unit * 9,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing.unit * 9,
    },
    [theme.breakpoints.down('xs')]: {
      width: '0px',
      marginLeft: '-1px'
    },
  },
  toolbar: {
    [theme.breakpoints.down('xs')]: {
      backgroundColor: theme.palette.common.white,
      height: '58px',
      boxShadow: theme.shadows[5],
    }
  },
  toolbarIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  children: {
    [theme.breakpoints.down('xs')]: {
      position: 'absolute',
      paddingBottom: '20px',
    },
    padding: theme.spacing.unit * 3,
    height: '100vh',
    width: '100%',
    overflowX: 'hidden',
    paddingBottom: '20px',
  },
});
export default navStyles;