//import { fade } from '@material-ui/core/styles/colorManipulator'
/**
 * @param {import('@material-ui/core/styles').Theme} theme
 */

const nodeStyles = theme => ({

  toRight: {
    marginLeft: 'auto',
  },

  itemOption: {
    display: 'flex !important',
    flexDirection: 'column !important',
    right: '10px !important',
  },

  listItem: {
    paddingLeft: '15px',
  },

  nodeEditorContainer: {
    paddingLeft: theme.spacing.unit * 2,
    paddingRight: theme.spacing.unit * 2,
  },

  pointerCursor: {
    cursor: 'pointer',
  },
  
  card: {
    display: 'flex',
  },

  details: {
    display: 'flex',
  },

  avatar: {
    width: 151,
  },

  nodesContainer: {
    paddingBottom: '30px',
    paddingTop: '10px',
  },

  content: {
    flex: '1 0 auto',
  },

  root: {
    margin: theme.spacing.unit,
    marginTop: theme.spacing.unit * 8,
    marginLeft: theme.spacing.unit * 4, 
    marginRight: theme.spacing.unit * 4,
    width: 'auto',
    [theme.breakpoints.down('xs')]: {
      marginTop: theme.spacing.unit * 6,
      marginLeft: theme.spacing.unit * 3, 
      marginRight: theme.spacing.unit * 3,
    },
  },

  smallIconButton: {},

  spinner: {
    position: 'absolute',
  },
  textField: {
    marginLeft: theme.spacing.unit * 2,
    marginRight: theme.spacing.unit * 2,
  },
})


export default nodeStyles
