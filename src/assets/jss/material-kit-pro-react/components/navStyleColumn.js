import { fade } from '@material-ui/core/styles/colorManipulator';

const drawerWidth = 220;

const navStyles = theme => ({
  title: {
    flexGrow: 1,
    // visibility: 'hidden',
    textAlign: 'center',
    [theme.breakpoints.up('sm')]: {
      textAlign: 'left',
    },
    [theme.breakpoints.down('sm')]: {
      fontWeight: '900',
      fontSize: '15px',
    },
  },
  titleContent: {
    display: 'none',
    visibility: 'visible',
    marginTop: '60px',
    height: "100%",
    [theme.breakpoints.up('sm')]: {
      visibility: 'hidden',
    },
  },
  titleStyle: {
    // [theme.breakpoints.down('sm')]: {
    //   paddingTop: '40px',
    // },
    // width: "100%",
    height: "100%",
    paddingTop: '44px',
    // paddingBottom: '30px',
    [theme.breakpoints.up('sm')]: {
      // position: "fixed",
      // paddingTop: '70px',
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
    zIndex: theme.zIndex.drawer - 1,
    [theme.breakpoints.up('sm')]: {
      zIndex: theme.zIndex.drawer + 1,
    },
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    // [theme.breakpoints.down('xs')]: {
    //   backgroundColor: "#0dacc4",
    // },
    // boxShadow: "0 0 10px #eee",
    backgroundColor: "#fff",
    borderBottom: "1px solid #eee",
  },
  appBarShift: {
    // marginLeft: drawerWidth,
    // width: `calc(100% - ${drawerWidth}px)`,
    // transition: theme.transitions.create(['width', 'margin'], {
    //   easing: theme.transitions.easing.sharp,
    //   duration: theme.transitions.duration.enteringScreen,
    // }),
  },
  menuButton: {
    color: "#0dacc4",
    // marginLeft: 12,
    marginRight: 10,
    [theme.breakpoints.up('sm')]: {
      marginLeft: '75px',
      // marginRight: 22,
    },
    transition: theme.transitions.create(['margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    })
  },
  menuButtonOpened: {
    transition: theme.transitions.create(['margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    [theme.breakpoints.up('sm')]: {
      marginLeft: 230,
    },
    // marginLeft: '50px'
  },
  menuButtonMobile: {
    display: 'block',
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
  hide: {
    display: 'none',
  },
  drawerPaper: {
    width: drawerWidth,
    

    color: "#fff !important",
    backgroundColor: "#0dacc4",
    [theme.breakpoints.up('sm')]: {
      position: 'relative',
      // backgroundColor: "#fff",
    },
    whiteSpace: 'nowrap',
    zIndex: theme.zIndex.drawer + 2,
    // width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    backgroundColor: "#0dacc4",
    overflowX: 'visible',
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
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    backgroundColor: "transparent",
    // backgroundColor: "#eee",
    ...theme.mixins.toolbar,
  },
  toolbarLink: {
    display: 'block',
    textAlign: 'center',
    width: '100%',
  },
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing.unit * 3,
  },
  children: {
    [theme.breakpoints.down('xs')]: {
      position: 'absolute',
      paddingBottom: '20px',
    },
    // padding: theme.spacing.unit * 3,
    width: '100%',
    paddingBottom: '20px',
    [theme.breakpoints.up('sm')]: {
      height: '100vh',
      overflowX: 'hidden',
    },
    // flexGrow: 1,
    // backgroundColor: theme.palette.background.default,
    // padding: theme.spacing.unit * 3,
    // minWidth: 0,
  },
  imgLogo: {
    margin: "0 auto"
  },

  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade('#f6f6f6', 1),
    '&:hover': {
      backgroundColor: fade('#eee', 1),
    },
    marginLeft: 0,
    width: '100%',
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing.unit,
      width: 'auto',
      display: 'block',
  },
  },
  searchIcon: {
    width: theme.spacing.unit * 9,
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: '100%',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
    width: '100%',
  },
  inputInput: {
    paddingTop: theme.spacing.unit,
    paddingRight: theme.spacing.unit,
    paddingBottom: theme.spacing.unit,
    paddingLeft: theme.spacing.unit * 10,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: 120,
      '&:focus': {
        width: 200,
      },
    },
  },
  active: {
    color: '#fff'
  },
  selected: {
    backgroundColor: "rgba(255,255,255,0.2) !important",
    color: "white !important",
    fontWeight: 600
  },
  iconMenu: {
    color: '#fff'
  },
  bottom: {
    display: 'flex',
    width: '100%',
    // minHeight: '100vh',
    // flexDirection: 'column',
    // [theme.breakpoints.up('sm')]: {
    //   display: 'none',
    // },
    borderTop: "1px solid #eee",
    position: "fixed",
    bottom: '0',
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
  label: {
    ' span': {
      display: 'none'
    }
  },
  white: {
    color: "#fff"
  }
});
export default navStyles;