import React from "react";
//a stateless react component that toggles the display of it's children
import ToggleDisplay from 'react-toggle-display';
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
// core components
import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import CustomInput from "components/CustomInput/CustomInput.jsx";
import Button from "components/CustomButtons/Button.jsx";
import CardAvatar from "components/Card/CardAvatar.jsx";
import CardBody from "components/Card/CardBody.jsx";
import GroupsSelect from "components/UserProfile/GroupsSelect.jsx";
import PhoneInput from 'components/UserProfile/PhoneInput.jsx';
import PhoneType from 'components/UserProfile/PhoneType.jsx';
import AddressSelect from 'components/UserProfile/AddressSelect.jsx';
// material-ui icons
import AddCircle from '@material-ui/icons/AddCircle';
import avatar from "assets/img/faces/marc.jpg";
//gundb
import Gun from 'gun/gun';
const gun = Gun('https://crm-server.herokuapp.com/gun');
const db = gun.get('users');

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

class NewProfile extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
      id: 0, 
      first: '',
      last: '',
      group: '',
      phone: '(  )    -    ',
      email: '',
      address: '',
      password: '',
      address1: '',
      address2: '',
      city: '',
      state: '',
      zip: '',
      country: '',
      showPhone1: false,
      showPhone2: false,
      showPhone3: false,
      showAddress1: false,
      showAddress2: false,
      showAddress3: false,
		}
    this.phoneField = this.phoneField.bind(this);
    this.onChangeValues = this.onChangeValues.bind(this);
    this.addressField = this.addressField.bind(this);
	}
  componentDidMount() {
    // db.map()
  }
  saveData() {
    const { id, first, last, group, homePhone, cellPhone, workPhone, email, address, password } = this.state;
    let newEmployee = {
      [id]: {
        name: {
          first: first,
          last: last,
        },
        group: group,
        contactInfo: {
          phone: {
            home: homePhone.toString(),
            mobile: cellPhone.toString(),
            work: workPhone.toString(),
          },
          email: email,
          address: address
        },
        password: password
      }
    };

    db.put(newEmployee, (ack) => {
      ack.err 
        ? console.log(ack.err)
        : console.log(ack.ok)
    });
  }

  addressField() {
    if (!this.state.showAddress1) {
      this.setState({
        showAddress1: true
      }); 
    } else if (this.state.showAddress1 && !this.state.showAddress2) {
      this.setState({
        showAddress2: true
      }); 
    } else if (this.state.showAddress1 && this.state.showAddress2 && !this.state.showAddress3) {
      this.setState({
        showAddress3: true
      });
    }
  }

  phoneField() {
    if (!this.state.showPhone1) {
      this.setState({
        showPhone1: true
      }); 
    } else if (this.state.showPhone1 && !this.state.showPhone2) {
      this.setState({
        showPhone2: true
      }); 
    } else if (this.state.showPhone1 && this.state.showPhone2 && !this.state.showPhone3) {
      this.setState({
        showPhone3: true
      });
    }
  }

  onChangeValues(event, key) {
    this.setState({
      [key]: event.target.value
    });
    console.log(key)
  }

	render() {
	  const { classes } = this.props;
    const { showPhone1, showPhone2, showPhone3, showAddress1, showAddress2, showAddress3 } = this.state
	  return (
	    <div>
	      <GridContainer className={classes.container}>
    			<GridItem xs={12} sm={12} md={4}>
    				<GridContainer>
    				  <GridItem xs={12} sm={12} md={12} className={classes.avatar}>
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
	          <GridItem xs={12} sm={12} md={8} className={classes.profileContent}>
	            <CardBody>
	              <GridContainer>
	                <GridItem xs={12} sm={12} md={12}>
	                  <CustomInput
	                    labelText="First Name"
	                    id="first-name"
                      inputProps={{
                        onChange: (e) => this.onChangeValues(e, 'first'),
                      }}
	                    formControlProps={{
	                      fullWidth: true
	                    }}
	                  />
	                </GridItem>
	                <GridItem xs={12} sm={12} md={12}>
	                  <CustomInput
	                    labelText="Last Name"
	                    id="last-name"
                      inputProps={{
                        onChange: (e) => this.onChangeValues(e, 'last'),
                      }}
	                    formControlProps={{
	                      fullWidth: true
	                    }}
	                  />
	                </GridItem>
	                <GridItem xs={12} sm={12} md={12}>
                    <GroupsSelect onChangeValues={this.onChangeValues}/>
	                </GridItem>
	              </GridContainer>
      	         <GridContainer>
      						<GridItem xs={12} sm={12} md={12}>
      							<GridContainer>
      								<GridItem xs={12} sm={12} md={12}>
                        <ToggleDisplay show={showPhone1}>
                          <div className={classes.phoneFlex}>
                            <div>
                              <PhoneType onChangeValues={this.onChangeValues} />  
                            </div>
                            <div className={classes.phoneField}>
                              <PhoneInput value={this.state.phone} onChangeValues={this.onChangeValues} />
                            </div>
                          </div>
                        </ToggleDisplay>
                        <ToggleDisplay show={showPhone2}>
                          <div className={classes.phoneFlex}>
                            <div>
                              <PhoneType onChangeValues={this.onChangeValues} />  
                            </div>
                            <div className={classes.phoneField}>
                              <PhoneInput value={this.state.phone} onChangeValues={this.onChangeValues} />
                            </div>
                          </div>
                        </ToggleDisplay>
                        <ToggleDisplay show={showPhone3}>
                          <div className={classes.phoneFlex}>
                            <div>
                              <PhoneType onChangeValues={this.onChangeValues} />  
                            </div>
                            <div className={classes.phoneField}>
                              <PhoneInput value={this.state.phone} onChangeValues={this.onChangeValues} />
                            </div>
                          </div>
                        </ToggleDisplay>
                        <div className={classes.addPhone}>
                          <Typography style={{cursor: 'pointer'}} onClick={this.phoneField} className={classes.buttonOption}>
                            <IconButton>
                              <AddCircle onClick={this.phoneField} style={{fontSize: 32, color: 'green'}}/>
                            </IconButton>
                            add phone
                          </Typography>
                        </div>
      								</GridItem>

      								<GridItem xs={12} sm={12} md={6}>
      									<CustomInput
			                    labelText="Email"
			                    id="email-address"
			                    formControlProps={{
			                      fullWidth: true
			                    }}
  			                />
      								</GridItem>

                      <GridItem xs={12} sm={12} md={12}>
                          <GridContainer>
                            <GridItem xs={12} md={6} className={classes.addressType}>
                            <ToggleDisplay show={showAddress1}>
                              <div>
                                <AddressSelect />
                              </div>
                            </ToggleDisplay>
                            </GridItem>
                            <GridItem xs={12} md={6}>
                              <ToggleDisplay show={showAddress1}>
                              <div className={classes.addressFlex}>
                                <GridItem>
                                  <CustomInput
                                    labelText="Address 1"
                                    id="address1"
                                    inputProps={{
                                      onChange: (e) => this.onChangeValues(e, 'address1'),
                                    }}
                                    formControlProps={{
                                      fullWidth: true
                                    }}
                                  />
                                </GridItem>
                                <GridItem>
                                  <CustomInput
                                    labelText="Address 2"
                                    id="address2"
                                    inputProps={{
                                      onChange: (e) => this.onChangeValues(e, 'address2'),
                                    }}
                                    formControlProps={{
                                      fullWidth: true
                                    }}
                                  />
                                </GridItem>
                                <GridItem>
                                  <CustomInput
                                    labelText="City"
                                    id="city"
                                    inputProps={{
                                      onChange: (e) => this.onChangeValues(e, 'city'),
                                    }}
                                    formControlProps={{
                                      fullWidth: true
                                    }}
                                  />
                                </GridItem>
                                <GridItem xs={6}>
                                  <CustomInput
                                    labelText="State"
                                    id="state"
                                    inputProps={{
                                      onChange: (e) => this.onChangeValues(e, 'state'),
                                    }}
                                    formControlProps={{
                                      fullWidth: true
                                    }}
                                  />
                                </GridItem>
                                <GridItem xs={6}>
                                  <CustomInput
                                    labelText="Zip"
                                    id="zip"
                                    inputProps={{
                                      onChange: (e) => this.onChangeValues(e, 'zip'),
                                    }}
                                    formControlProps={{
                                      fullWidth: true
                                    }}
                                  />
                                </GridItem>
                                <GridItem>
                                  <CustomInput
                                    labelText="Country"
                                    id="country"
                                    inputProps={{
                                      onChange: (e) => this.onChangeValues(e, 'country'),
                                    }}
                                    formControlProps={{
                                      fullWidth: true
                                    }}
                                  />
                                </GridItem>
                              </div>
                              </ToggleDisplay>  
                            </GridItem>
                            <GridItem xs={12} md={6} className={classes.addressType}>
                            <ToggleDisplay show={showAddress2}>
                              <div>
                                <AddressSelect />
                              </div>
                            </ToggleDisplay>
                            </GridItem>
                            <GridItem xs={12} md={6}>
                              <ToggleDisplay show={showAddress2}>
                              <div className={classes.addressFlex}>
                                <GridItem>
                                  <CustomInput
                                    labelText="Address 1"
                                    id="address1"
                                    inputProps={{
                                      onChange: (e) => this.onChangeValues(e, 'address1'),
                                    }}
                                    formControlProps={{
                                      fullWidth: true
                                    }}
                                  />
                                </GridItem>
                                <GridItem>
                                  <CustomInput
                                    labelText="Address 2"
                                    id="address2"
                                    inputProps={{
                                      onChange: (e) => this.onChangeValues(e, 'address2'),
                                    }}
                                    formControlProps={{
                                      fullWidth: true
                                    }}
                                  />
                                </GridItem>
                                <GridItem>
                                  <CustomInput
                                    labelText="City"
                                    id="city"
                                    inputProps={{
                                      onChange: (e) => this.onChangeValues(e, 'city'),
                                    }}
                                    formControlProps={{
                                      fullWidth: true
                                    }}
                                  />
                                </GridItem>
                                <GridItem xs={6}>
                                  <CustomInput
                                    labelText="State"
                                    id="state"
                                    inputProps={{
                                      onChange: (e) => this.onChangeValues(e, 'state'),
                                    }}
                                    formControlProps={{
                                      fullWidth: true
                                    }}
                                  />
                                </GridItem>
                                <GridItem xs={6}>
                                  <CustomInput
                                    labelText="Zip"
                                    id="zip"
                                    inputProps={{
                                      onChange: (e) => this.onChangeValues(e, 'zip'),
                                    }}
                                    formControlProps={{
                                      fullWidth: true
                                    }}
                                  />
                                </GridItem>
                                <GridItem>
                                  <CustomInput
                                    labelText="Country"
                                    id="country"
                                    inputProps={{
                                      onChange: (e) => this.onChangeValues(e, 'country'),
                                    }}
                                    formControlProps={{
                                      fullWidth: true
                                    }}
                                  />
                                </GridItem>
                              </div>
                              </ToggleDisplay>  
                            </GridItem>
                            <GridItem xs={12} md={6} className={classes.addressType}>
                            <ToggleDisplay show={showAddress3}>
                              <div>
                                <AddressSelect />
                              </div>
                            </ToggleDisplay>
                            </GridItem>
                            <GridItem xs={12} md={6}>
                              <ToggleDisplay show={showAddress3}>
                              <div className={classes.addressFlex}>
                                <GridItem>
                                  <CustomInput
                                    labelText="Address 1"
                                    id="address1"
                                    inputProps={{
                                      onChange: (e) => this.onChangeValues(e, 'address1'),
                                    }}
                                    formControlProps={{
                                      fullWidth: true
                                    }}
                                  />
                                </GridItem>
                                <GridItem>
                                  <CustomInput
                                    labelText="Address 2"
                                    id="address2"
                                    inputProps={{
                                      onChange: (e) => this.onChangeValues(e, 'address2'),
                                    }}
                                    formControlProps={{
                                      fullWidth: true
                                    }}
                                  />
                                </GridItem>
                                <GridItem>
                                  <CustomInput
                                    labelText="City"
                                    id="city"
                                    inputProps={{
                                      onChange: (e) => this.onChangeValues(e, 'city'),
                                    }}
                                    formControlProps={{
                                      fullWidth: true
                                    }}
                                  />
                                </GridItem>
                                <GridItem xs={6}>
                                  <CustomInput
                                    labelText="State"
                                    id="state"
                                    inputProps={{
                                      onChange: (e) => this.onChangeValues(e, 'state'),
                                    }}
                                    formControlProps={{
                                      fullWidth: true
                                    }}
                                  />
                                </GridItem>
                                <GridItem xs={6}>
                                  <CustomInput
                                    labelText="Zip"
                                    id="zip"
                                    inputProps={{
                                      onChange: (e) => this.onChangeValues(e, 'zip'),
                                    }}
                                    formControlProps={{
                                      fullWidth: true
                                    }}
                                  />
                                </GridItem>
                                <GridItem>
                                  <CustomInput
                                    labelText="Country"
                                    id="country"
                                    inputProps={{
                                      onChange: (e) => this.onChangeValues(e, 'country'),
                                    }}
                                    formControlProps={{
                                      fullWidth: true
                                    }}
                                  />
                                </GridItem>
                              </div>
                              </ToggleDisplay>  
                            </GridItem>
                          </GridContainer>
                        <Typography style={{cursor: 'pointer'}} onClick={this.addressField} className={classes.buttonOption}>
                          <IconButton>
                            <AddCircle onClick={this.addressField} style={{fontSize: 32, color: 'green'}}/>
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
          <Button className={classes.button} onClick={this.saveData} color="info">Save</Button>
        </div>
	    </div>
	  );
	}
}
export default withStyles(styles)(NewProfile);
