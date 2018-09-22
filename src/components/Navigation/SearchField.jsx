import React from 'react';
//Material-UI re-usable component
import Drawer from '@material-ui/core/Drawer';
import { withStyles } from '@material-ui/core/styles';
import InputAdornment from "@material-ui/core/InputAdornment";
//Material-UI Icons
import IconButton from '@material-ui/core/IconButton';
import Search from '@material-ui/icons/Search';
import Close from '@material-ui/icons/Close';
//Custom Project Components
import CustomInput from "components/CustomInput/CustomInput.jsx";
import Button from 'components/CustomButtons/Button.jsx';

const content = ( 
    <CustomInput
      id="search"
      labelText="Search"
	  formControlProps={{
	    fullWidth: true,
	  }}
      inputProps={{
        type: "text",
        autoFocus: true,
        onChange: (e) => console.log(e.target.value),
		endAdornment: (
          <InputAdornment position="end">
            <IconButton disableRipple color="inherit">
              <Close style={{fontSize: 15  }}/>
            </IconButton>
          </InputAdornment>
        )
      }}
    />
   );

const styles = theme => ({
	drawerStyle:{
		height: '8vh',
	},
	drawerContent: {
		display: 'flex',
		justifyContent: 'center',
		marginTop: '-9px',
		width: '40%',
		[theme.breakpoints.up('md')]: {
			width: '30%'
		},
		[theme.breakpoints.down('sm')]: {
			width: '60%',
		},
		[theme.breakpoints.down('xs')]: {
			width: '90%',
		},
	},
})
class SearchField extends React.Component {
	constructor() {
		super();
		this.state = {
			openSearch: false
		}
		this.toggleSearchField = this.toggleSearchField.bind(this);
	}
	toggleSearchField() {
		this.setState({ openSearch: !this.state.openSearch })
	}
	render(){
		const { classes } = this.props
		return (
			<div>
		        <div>
			        <IconButton disableRipple onClick={this.toggleSearchField} color="inherit">
			          <Search style={{marginTop: '2px', fontSize: 24, color: 'grey'}}/>
			        </IconButton>
			    </div>
				<Drawer variant={'persistent'} elevation={0} classes={{paper: classes.drawerStyle}} anchor="top" open={this.state.openSearch} onClose={this.toggleSearchField}>
		          <div tabIndex={0} className={classes.drawerContent}>
		            <div style={{  marginTop: '5px'}}>
		            	{content}
		            </div>
					<Button onClick={this.toggleSearchField} size={'large'} disableRipple color="primary" simple>CANCEL</Button>
		          </div>
		        </Drawer>
		    </div>
		)
	}
}

export default withStyles(styles, { withTheme: true })(SearchField)