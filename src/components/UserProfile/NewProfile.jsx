import React from "react";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from "@material-ui/core/FormControl";
import MenuItem from "@material-ui/core/MenuItem";
// core components
import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import CustomInput from "components/CustomInput/CustomInput.jsx";
import Button from "components/CustomButtons/Button.jsx";
import CardAvatar from "components/Card/CardAvatar.jsx";
import CardBody from "components/Card/CardBody.jsx";
// material-ui icons
import AddCircle from '@material-ui/icons/AddCircle';
import avatar from "assets/img/faces/marc.jpg";

const styles = {
  labelRoot: {
    color: "#AAAAAA !important",
    fontWeight: "400",
    fontSize: "14px",

    "& + $underline": {
      marginTop: "0px"
    }
  },

  buttonOption:{
	marginLeft: -10
  },
  container:{
	display: 'flex',
	justifyContent: 'center',
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
  whiteUnderline: {
    "&:hover:not($disabled):before,&:before": {
      borderBottomColor: "#FFFFFF"
    },
    "&:after": {
      borderBottomColor: "#FFFFFF"
    }
  },
};

class NewProfile extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			displayPhone: false,
			displayAddress: false,
		}
	}
	render() {
	  const { classes } = this.props;
	  return (
	    <div>
	      <GridContainer className={classes.container}>
			<GridItem xs={12} sm={12} md={4} direction='column'>
				<GridContainer>
				<GridItem xs={12} sm={12} md={12} direction='column' className={classes.avatar}>
					<div>
				        <CardAvatar profile>
				          <a onClick={e => e.preventDefault()}>
				            <img src={avatar} alt="..." />
				          </a>
				        </CardAvatar>
				          <p className={classes.description}>Edit</p>
				    </div>
			    </GridItem>
		        </GridContainer>
		    </GridItem>
	        <GridItem xs={12} sm={12} md={8} direction='column'>
	            <CardBody>
	              <GridContainer>
	                <GridItem xs={12} sm={12} md={12}>
	                  <CustomInput
	                    labelText="First Name"
	                    id="first-name"
	                    formControlProps={{
	                      fullWidth: true
	                    }}
	                  />
	                </GridItem>
	                <GridItem xs={12} sm={12} md={12}>
	                  <CustomInput
	                    labelText="Last Name"
	                    id="last-name"
	                    formControlProps={{
	                      fullWidth: true
	                    }}
	                  />
	                </GridItem>
	                <GridItem xs={12} sm={12} md={12}>
					<FormControl
                      fullWidth
                      className={classes.selectFormControl}
                    >
                      <InputLabel
                        htmlFor="simple-select"
                        className={classes.labelRoot}
                      >
                        Group
                      </InputLabel>
                      <Select
                        MenuProps={{
                          className: classes.selectMenu
                        }}
                        classes={{
                          select: classes.select
                        }}
                        value={this.state.simpleSelect}
                        onChange={this.handleSimple}
                        inputProps={{
                          name: "simpleSelect",
                          id: "simple-select"
                        }}
                      >
                        <MenuItem
                          disabled
                          classes={{
                            root: classes.selectMenuItem
                          }}
                        >
                          Single Select
                        </MenuItem>
                        <MenuItem
                          classes={{
                            root: classes.selectMenuItem,
                            selected: classes.selectMenuItemSelected
                          }}
                          value="2"
                        >
                          Paris
                        </MenuItem>
                        <MenuItem
                          classes={{
                            root: classes.selectMenuItem,
                            selected: classes.selectMenuItemSelected
                          }}
                          value="3"
                        >
                          Bucharest
                        </MenuItem>
                        <MenuItem
                          classes={{
                            root: classes.selectMenuItem,
                            selected: classes.selectMenuItemSelected
                          }}
                          value="4"
                        >
                          Rome
                        </MenuItem>
                      </Select>
                    </FormControl>
	                </GridItem>
	              </GridContainer>
	                <GridContainer>
						<GridItem xs={12} sm={12} md={12}>
							<GridContainer>
								<GridItem xs={12} sm={12} md={12}>
									<Typography className={classes.buttonOption}>
										<IconButton>
											<AddCircle style={{fontSize: 32, color: 'green'}}/>
										</IconButton>
										add phone
									</Typography>
								</GridItem>
								<GridItem xs={12} sm={12} md={8}>
									<CustomInput
					                    labelText="Email"
					                    id="email-address"
					                    formControlProps={{
					                      fullWidth: true
					                    }}
					                 />
								</GridItem>
								<GridItem xs={12} sm={12} md={12}>
									<Typography className={classes.buttonOption}>
										<IconButton>
											<AddCircle style={{fontSize: 32, color: 'green'}}/>
										</IconButton>
										add address
									</Typography>
								</GridItem>
							</GridContainer>
						</GridItem>
					</GridContainer>
	            </CardBody>
	        </GridItem>
	      </GridContainer>
	        <div className={classes.cardFooter}>
	          <Button className={classes.button} onClick={this.props.toggleViews} color="white">Cancel</Button>
	          <Button className={classes.button} color="info">Save</Button>
	        </div>
	    </div>
	  );
	}
}
export default withStyles(styles)(NewProfile);
