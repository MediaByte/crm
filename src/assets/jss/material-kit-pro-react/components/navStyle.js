const drawerWidth = 280;

const navStyles = theme => ({
  headerInput:{
    marginTop: -17,
    [theme.breakpoints.up('md')]: {
      marginLeft: 40,
    }
  },
  drawerList: {
    color: theme.palette.common.white,
  },
  root: {
    flexGrow: 1,
    height: '100%',
    zIndex: 1,
    overflow: 'hidden',
    position: 'relative',
    display: 'flex',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
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
    [theme.breakpoints.down('xs')]: {
      marginLeft: theme.spacing.unit / 2
    }
  },
  hide: {
    display: 'none',
  },
  drawerPaper: {
    fontWeight: '400',
    boxShadow: theme.shadows[24],
    fontSize: '1.5em',
    border: '1px solid black',
    position: 'relative',
    backgroundColor: '#00A7F8',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    minHeight: "100%",
    maxHeight: "100%",
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
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,

  },
});

export default navStyles;