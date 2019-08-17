/**
 * @param {import('@material-ui/core/styles').Theme} theme
 */

const groupStyles = theme => ({
  // User Group Page Styles
  Icon: {
    [theme.breakpoints.down('xs')]: {
      marginTop: theme.spacing.unit * 5,
      padding: theme.spacing.unit,
      marginLeft: '5px',
      marginRight: '5px',
      overflow: 'scroll',
    },
    [theme.breakpoints.up('sm')]: {
      marginTop: theme.spacing.unit * 5,
      paddingTop: theme.spacing.unit,
      marginLeft: '5px',
      marginRight: '5px',
      overflow: 'scroll',
    },
    [theme.breakpoints.up('md')]: {
      marginTop: theme.spacing.unit * 4.5,
      paddingTop: theme.spacing.unit,
      marginLeft: '5px',
      marginRight: '5px',
      overflow: 'scroll',
    },
  },

  list: {
    [theme.breakpoints.down('xs')]: {
      marginTop: theme.spacing.unit,
      paddingBottom: theme.spacing.unit * 7.5,
    },
    [theme.breakpoints.up('sm')]: {
      marginTop: theme.spacing.unit,
      padding: theme.spacing.unit,
      paddingBottom: theme.spacing.unit * 5,
    },
    [theme.breakpoints.up('md')]: {
      marginTop: theme.spacing.unit,
      padding: theme.spacing.unit,
      paddingBottom: theme.spacing.unit * 5,
    },
    [theme.breakpoints.up('lg')]: {
      marginTop: theme.spacing.unit,
      padding: theme.spacing.unit * 2,
      paddingBottom: theme.spacing.unit * 5,
    },
    [theme.breakpoints.up('xl')]: {
      marginTop: theme.spacing.unit,
      padding: theme.spacing.unit * 4,
      paddingBottom: theme.spacing.unit * 5,
    },
  },

  listItem: {
    backgroundColor: theme.palette.background.paper,
    [theme.breakpoints.down('sm')]: {
      paddingTop: 7,
      paddingBottom: 7,
      marginBottom: 1,
    },
    [theme.breakpoints.up('md')]: {
      paddingTop: 8,
      paddingBottom: 8,
      marginBottom: 2,
    },
  },

  groupEditorContainer: {
    paddingLeft: theme.spacing.unit * 2,
    paddingRight: theme.spacing.unit * 2,
  },

  textField: {
    marginLeft: theme.spacing.unit * 2,
    marginRight: theme.spacing.unit * 2,
  },
})

export default groupStyles
