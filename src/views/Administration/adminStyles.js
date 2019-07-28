/**
 * @param {import('@material-ui/core/styles').Theme} theme
 */

const adminStyles = theme => ({

// Administration Page Styles
SpacingBetweenLists: {
  marginTop: theme.spacing.unit * 4,
},

AdminContent: {
  [theme.breakpoints.down('xs')]: {
    marginTop: theme.spacing.unit * 4,
    marginButtom: theme.spacing.unit * 4,
    padding: theme.spacing.unit,
    paddingTop: theme.spacing.unit,
    overflow: 'scroll',
  },
  [theme.breakpoints.up('sm')]: {
    marginTop: theme.spacing.unit * 6,
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
