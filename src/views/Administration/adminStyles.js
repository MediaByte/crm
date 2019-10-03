/**
 * @param {import('@material-ui/core/styles').Theme} theme
 */

const adminStyles = theme => ({
  // Administration Page Styles
  SpacingBetweenLists: {
    [theme.breakpoints.down('xs')]: {
      paddingTop: '8px',
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

  AdminContent: {
    [theme.breakpoints.down('xs')]: {
      marginTop: theme.spacing.unit * 8,
      paddingBottom: theme.spacing.unit * 7.5,
    },
    [theme.breakpoints.up('sm')]: {
      marginTop: theme.spacing.unit * 8,
      padding: theme.spacing.unit,
      paddingBottom: theme.spacing.unit * 5,
    },
    [theme.breakpoints.up('md')]: {
      marginTop: theme.spacing.unit * 8,
      padding: theme.spacing.unit,
      paddingBottom: theme.spacing.unit * 5,
    },
    [theme.breakpoints.up('lg')]: {
      marginTop: theme.spacing.unit * 7,
      padding: theme.spacing.unit * 2,
      paddingBottom: theme.spacing.unit * 5,
    },
    [theme.breakpoints.up('xl')]: {
      marginTop: theme.spacing.unit * 7,
      padding: theme.spacing.unit * 4,
      paddingBottom: theme.spacing.unit * 5,
    },
  },

  UserAvatar: {
    margin: theme.spacing.unit,
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
})

export default adminStyles
