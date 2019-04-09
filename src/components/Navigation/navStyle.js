import { fade } from '@material-ui/core/styles/colorManipulator'

const drawerWidth = 220

const navStyles = theme => ({
  title: {
    flexGrow: 1,
    visibility: 'visible',
    textAlign: 'center',
    [theme.breakpoints.up('sm')]: {
      textAlign: 'left',
    },
    [theme.breakpoints.down('sm')]: {
      fontWeight: '900',
      fontSize: '15px',
    },
  },
  iconHeader: {
    marginLeft: '5px',
    marginRight: '5px',
  },
  dividerLogo: {
    height: '1px',
    margin: '0',
    border: 'none',
    flexShrink: '0',
    backgroundColor: 'rgb(255, 255, 255)',
    marginLeft: '15px',
    marginRight: '15px',
    marginBottom: '10px',
  },
  titleContent: {
    display: 'none',
    visibility: 'visible',
    marginTop: '60px',
    height: '100%',
    [theme.breakpoints.up('sm')]: {
      visibility: 'hidden',
    },
  },
  titleStyle: {
    // [theme.breakpoints.down('sm')]: {
    //   paddingTop: '40px',
    // },
    height: '100%',
    paddingTop: '40px',
    paddingBottom: '30px',
    [theme.breakpoints.up('sm')]: {
      paddingTop: '70px',
    },
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
  appbarAndContentContainer: {
    display: 'flex',
  },
  appBar: {
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    // [theme.breakpoints.down('xs')]: {
    //   backgroundColor: "#0dacc4",
    // },
    // boxShadow: "0 0 10px #eee",
    backgroundColor: '#fff',
    borderBottom: '1px solid #eee',
  },
  menuButton: {
    color: '#0dacc4',
    // marginLeft: 12,
    marginRight: 10,
    [theme.breakpoints.up('sm')]: {
      marginLeft: '75px',
      // marginRight: 22,
    },
    [theme.breakpoints.down('sm')]: {
      marginLeft: '10px',
      // marginRight: 22,
    },
    transition: theme.transitions.create(['margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
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

    color: '#fff !important',
    backgroundColor: '#0dacc4',
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
    backgroundColor: '#0dacc4',
    overflowX: 'visible',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing.unit * 9,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing.unit * 9,
      overflow: 'hidden',
    },
    [theme.breakpoints.down('xs')]: {
      width: '0px',
      marginLeft: '-1px',
    },
    [theme.breakpoints.down('sm')]: {
      width: '0px',
      marginLeft: '-1px',
    },
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    backgroundColor: 'transparent',
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
    padding: theme.spacing.unit * 3,
    // height: '100vh',
    width: '100%',
    // overflowX: 'hidden',
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
    margin: '0 auto',
  },
  itemSearch: {
    display: 'flex',
    [theme.breakpoints.down('sm')]: {
      position: 'absolute',
      left: '50%',
      top: '50%',
      transform: 'translate(-50%, -50%)',
    },
    [theme.breakpoints.down('xs')]: {
      position: 'absolute',
      left: '50%',
      top: '50%',
      transform: 'translate(-50%, -50%)',
      width: '90%',
    },
  },
  search: {
    position: 'relative',
    marginRight: '15px',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade('#f6f6f6', 1),
    '&:hover': {
      backgroundColor: fade('#eee', 1),
    },
    marginLeft: 0,
    width: '100%',
    display: 'block',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing.unit,
      width: 'auto',
      display: 'block',
    },
  },
  searchIcon: {
    color: '#ccc',
    width: theme.spacing.unit * 9,
    height: '100%',
    position: 'absolute',
    top: 4,
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
    color: '#fff',
  },
  selected: {
    backgroundColor: 'rgba(255,255,255,0.2) !important',
    color: 'white !important',
    fontWeight: 600,
  },
  iconMenu: {
    color: '#fff',
  },
  bottom: {
    display: 'flex',
    width: '100%',
    // minHeight: '100vh',
    // flexDirection: 'column',
    // [theme.breakpoints.up('sm')]: {
    //   display: 'none',
    // },
    borderTop: '1px solid #eee',
    position: 'fixed',
    bottom: '0',
  },
  label: {
    ' span': {
      display: 'none',
    },
  },
  white: {
    color: '#fff',
  },
})

export default navStyles
