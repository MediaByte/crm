/**
 * @param {import('@material-ui/core/styles').Theme} theme
 */

const styles = theme => ({
  overlay: {
    background: 'rgba(255,255,255,0.5)',
  },

  iconsRight: {
    float: 'right',
  },

  paper: {},

  root: {
    borderRadius: 0,
    //boxShadow: 'none',
    borderTop: '1px solid #ddd',
    borderBottom: '1px solid #ddd',
  },

  root3: {
    borderRadius: 0,
    //boxShadow: 'none',
    borderBottom: '1px solid #ddd',
  },

  input: {
    marginBottom: -10,
    width: 215,
  },

  gridMainPanel: {
    flexGrow: 1,
    width: '100%',
  },

  mainPanel: {
    flexGrow: 1,
    paddingTop: 10,
    // paddingRight: 20,
    paddingBottom: 20,
    paddingLeft: 20,
    marginTop: 0,
    marginBottom: 0,
    width: '100%',
    height: '100%',
  },

  item: {
    border: '1px solid black',
    padding: 10,
    marginTop: 0,
  },

  itemSubContent: {
    paddingLeft: '25px',
  },

  grid: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 5,
  },

  userProfileGrid: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },

  gridContainer: {
    flexGrow: 1,
    height: '100%',
  },

  renderUsers: {
    overflow: 'auto',
    height: '600px',
  },

  content: {},
  demo: {
    backgroundColor: '#f6f6f6',
    // width: "100%",
    height: '100%',
    overflow: 'scroll',
  },

  RecordListContainer: {
    backgroundColor: '#fff',
    marginLeft: '0%',
    height: '100%',
    borderRight: '1px solid #ddd',
  },

  demoContent: {
    padding: 10,
    [theme.breakpoints.up('sm')]: {
      padding: 0,
    },
    [theme.breakpoints.up('md')]: {
      padding: 0,
    },
  },

  list: {
    width: '100%',
    borderRadius: 0,
  },

  noRecordSelected: {
    textAlign: 'center',
    padding: '180px 0',
    direction: 'row',
    align: 'center',
    justify: 'center',
  },

  noRecordsIcon: {
    fontSize: '50px',
    display: 'block',
    margin: '0 auto',
    color: '#999',
  },

  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },

  selected: {
    backgroundColor: '#f00',
  },

  subtitle: {
    fontSize: '0.9rem',
    fontWeight: 'bold',
  },

  title: {
    marginBottom: 10,
    color: '#aaa',
    fontSize: '0.85rem',
    marginLeft: 15,
    [theme.breakpoints.up('lg')]: {
      marginLeft: 30,
    },
  },

  titleBold: {
    fontWeight: 'bold',
  },

  titlePadding: {
    marginBottom: 10,
    paddingLeft: 25,
  },

  icons: {
    cursor: 'pointer',
    '&:hover': {
      color: '#0dacc4',
    },
    [theme.breakpoints.down('md')]: {
      padding: 5,
    },
    [theme.breakpoints.down('sm')]: {
      padding: 12,
    },
  },

  padding: {
    paddingLeft: 25,
  },

  appBar: {},

  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
  grow: {
    flexGrow: 1,
  },
  noShadow: {
    dropShadow: 'none',
    backgroundColor: '#fff',
    borderBottom: '1px solid #ddd',
  },
  newTitle: {
    [theme.breakpoints.up('md')]: {
      margin: '0 auto',
      left: '70px',
      position: 'absolute',
      width: '75%',
      textAlign: 'center',
    },
  },
  Title: {
    fontWeight: '900',
    textAlign: 'center',
    fontSize: '15px',
    textTransform: 'capitalize',
  },
  paddingFull: {
    padding: 15,
    [theme.breakpoints.up('md')]: {
      padding: '20px 30px',
    },
  },

  root2: {
    color: '#2db8b8',
    '&$checked': {
      color: '#2db8b8',
      backgroundColor: '#fff',
    },
  },
  checked: {},
  inputGrid: {
    flexGrow: 1,
  },
  textField: {
    [theme.breakpoints.up('md')]: {
      marginLeft: '-20px',
    },
    [theme.breakpoints.up('lg')]: {
      marginLeft: '-40px',
    },
  },
})

export default styles
