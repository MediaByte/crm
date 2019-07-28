/**
 * @param {import('@material-ui/core/styles').Theme} theme
 */

const dashboardStyles = theme => ({
  root: {},
  layout: {
    margin: theme.spacing.unit,
    marginTop: theme.spacing.unit * 8,
    marginLeft: theme.spacing.unit * 4, 
    marginRight: theme.spacing.unit * 4,
    width: 'auto',
    display: 'flex',
    justifyContent: 'space-between',
    [theme.breakpoints.down('xs')]: {
      marginTop: theme.spacing.unit * 6,
      marginLeft: theme.spacing.unit * 3, 
      marginRight: theme.spacing.unit * 3,
      display: 'flex',
      justifyContent: 'space-between',
  },
  content: {
    display: 'flex',
    justifyContent: 'center',
    [theme.breakpoints.up('sm')]: {
      marginTop: '0px',
    },
    [theme.breakpoints.down('xs')]: {
      marginTop: theme.spacing.unit * 2,
    },
  },
},
})

export default dashboardStyles
