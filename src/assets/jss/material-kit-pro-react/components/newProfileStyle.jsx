const styles = theme => ({
  buttonOption:{
	marginLeft: -10
  },
  container:{
    
  },
  button:{
	minWidth: '20%'
  },
  avatar: {
	marginTop: 80,
  },
  cardFooter:{
	display: 'flex',
	justifyContent: 'flex-end',
  },
  description: {
  	display: 'flex',
  	justifyContent: 'center',
  	marginTop: '5px',
  	cursor: 'pointer',
  },
  cardCategoryWhite: {
    color: "rgba(255,255,255,.62)",
    margin: "0",
    fontSize: "14px",
    marginTop: "0",
    marginBottom: "0"
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none"
  },
  phoneField: {
    marginTop: theme.spacing.unit * 3
  },
  phoneFlex: {
    display: 'flex',
    justifyContent: 'flex-start',
  },
  addPhone: {
    marginTop: theme.spacing.unit * 2,
    display: 'flex',
    flexWrap: 'wrap'
  },
  addressFlex: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'flex-end',
  },
  addressType: {
    margin: 'auto',
    paddingLeft: '60px !important',
    paddingRight: '60px !important',
  },
  profileContent: {
    flexGrow: 1,
    overflow: 'auto',
    height: '550px',
    width: '100%',
    [theme.breakpoints.down('sm')]: {
      height: '400px',
    }
  },
});

export default styles;