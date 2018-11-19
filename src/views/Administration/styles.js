const styles = theme => ({
  overlay: {
    background: 'rgba(255,255,255,0.5)',
  },
  iconsRight: {
    float: 'right',
  },
  paper: {
    boxShadow: 'none'
  },
  root: {
    borderRadius: 0,
    boxShadow: 'none',
    borderTop: "1px solid #ddd",	
    borderBottom: "1px solid #ddd",
  },
root3: {
    borderRadius: 0,
    boxShadow: 'none',
    borderBottom: "1px solid #ddd",
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
		height: '100%'
	},
	item: {
		border: '1px solid black',
		padding: 10,
		marginTop: 0,
	},
	itemSubContent: {
		paddingLeft: '25px'
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
		// display: 'flex',
    // justifyContent: 'center',
    // alignItems: "stretch",
    height: "100%",
	},
	renderUsers: {
    	overflow: 'auto',

    	height: '600px'
	},
	content: {
	},
	demo: {
		backgroundColor: "#f6f6f6",
		// width: "100%",
		height: "100%",
    overflow: 'scroll'
  },
	demoLeft: {
		backgroundColor: "#fff",
		// width: "100%",
    height: "100%",
    borderRight: '1px solid #ddd',
    overflow: 'scroll'
	},
	demoContent: {
    // backgroundColor: '#fff',
    padding: 10,
    [theme.breakpoints.up('sm')]: {
      padding: 0,
    },
    [theme.breakpoints.up('md')]: {
      padding: 0,
    }
	},
	list: {
    width: "100%",
    borderRadius: 0,
  },
  noGroups: {
    textAlign: 'center',
    padding: "40px 0"
  },
  icon: {
    fontSize: "50px",
    display: 'block',
    margin: "0 auto",
    color: "#999"
  },
  toolbar: {
    padding: '0 15px 15px 25px',
    [theme.breakpoints.up('sm')]: {
      padding: '15px 15px 15px 25px',
    }
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
  selected: {
    backgroundColor: "#f00"
  },
  subtitle: {
    fontSize: '0.9rem',
    fontWeight: 'bold',
  },
  title: {
    marginBottom: 10,
    color: "#aaa",
    fontSize: '0.85rem',
    marginLeft: 15,
    [theme.breakpoints.up('lg')]: {
      marginLeft: 30,
    }
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
    paddingLeft: 25
  },
  appBar: {
    // flexGrow: 1,
    dropShadow: 'none'
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
  grow: {
    flexGrow: 1,
  },
  noShadow: {
    dropShadow: 'none'
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
    }
  },
  filters: {
    display: 'flex',
    justifyContent: 'space-between',
		alignItems: 'center',
  },
  records: {
    textAlign: 'center',
    paddingTop: 0,
    [theme.breakpoints.up('sm')]: {
      paddingTop: 10,
    }
  },
  filterBox: {
    padding: 15
  },
  filterButton: {
    fontWeight: 'bold',
    cursor: 'pointer',
  },
  resetButton: {
    color: '#0dacc4',
    marginTop: '-10px'
  },
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 120,
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
      marginLeft: '-20px'
    },
    [theme.breakpoints.up('lg')]: {
      marginLeft: '-40px'
    }
  }
})

export default styles;