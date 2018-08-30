import React from "react";
//a stateless react component that toggles the display of it's children
import ToggleDisplay from 'react-toggle-display';
//gundb
import Gun from 'gun/gun';
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
//styles
import styles from 'assets/jss/material-kit-pro-react/components/newProfileStyle.jsx';
//State
import { connect } from 'react-redux';
import { 
  first, 
  last, 
  email, 
  homePhone, 
  mobilePhone, 
  workPhone, 
  homeAddress1, 
  homeAddress2, 
  homeAddressCity, 
  homeAddressState, 
  homeAddressZip, 
  homeAddressCountry,
  workAddress1,
  workAddress2,
  workAddressCity,
  workAddressState,
  workAddressZip,
  workAddressCountry,
  mailAddress1,
  mailAddress2,
  mailAddressCity,
  mailAddressState,
  mailAddressZip,
  mailAddressCountry
} from 'state/newUser/actions.js';
const gun = Gun('https://crm-server.herokuapp.com/gun');
const db = gun.get('users');
const mapStateToProps = (state) => {
  return {
    first: state.newUser.first,
    last: state.newUser.last,
    email: state.newUser.email,
    homePhone: state.newUser.homePhone,
    mobilePhone: state.newUser.mobilePhone,
    workPhone: state.newUser.workPhone,
    homeAddress1: state.newUser.homeAddress1,
    homeAddress2: state.newUser.homeAddress2,
    homeAddressCity: state.newUser.homeAddressCity,
    homeAddressState: state.newUser.homeAddressState,
    homeAddressZip: state.newUser.homeAddressZip,
    homeAddressCountry: state.newUser.homeAddressCountry,
    workAddress1: state.newUser.workAddress1,
    workAddress2: state.newUser.workAddress2,
    workAddressCity: state.newUser.workAddressCity,
    workAddressState: state.newUser.workAddressState,
    workAddressZip: state.newUser.workAddressZip,
    workAddressCountry: state.newUser.workAddressCountry,
    mailAddress1: state.newUser.mailAddress1,
    mailAddress2: state.newUser.mailAddress2,
    mailAddressCity: state.newUser.mailAddressCity,
    mailAddressState: state.newUser.mailAddressState,
    mailAddressZip: state.newUser.mailAddressZip,
    mailAddressCountry: state.newUser.mailAddressCountry,
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    onChangeFirstName: (event) => dispatch(first(event)),
    onChangeLastName: (event) => dispatch(last(event)),
    onChangeEmail: (event) => dispatch(email(event)),
    onChangeHomePhone: (event) => dispatch(homePhone(event)),
    onChangeMobilePhone: (event) => dispatch(mobilePhone(event)),
    onChangeWorkPhone: (event) => dispatch(workPhone(event)),
    onChangeHomeAddress1: (event) => dispatch(homeAddress1(event)),
    onChangeHomeAddress2: (event) => dispatch(homeAddress2(event)),
    onChangeHomeAddressCity: (event) => dispatch(homeAddressCity(event)),
    onChangeHomeAddressState: (event) => dispatch(homeAddressState(event)),
    onChangeHomeAddressZip: (event) => dispatch(homeAddressZip(event)),
    onChangeHomeAddressCountry: (event) => dispatch(homeAddressCountry(event)),
    onChangeWorkAddress1: (event) => dispatch(workAddress1(event)),
    onChangeWorkAddress2: (event) => dispatch(workAddress2(event)),
    onChangeWorkAddressCity: (event) => dispatch(workAddressCity(event)),
    onChangeWorkAddressState: (event) => dispatch(workAddressState(event)),
    onChangeWorkAddressZip: (event) => dispatch(workAddressZip(event)),
    onChangeWorkAddressCountry: (event) => dispatch(workAddressCountry(event)),
    onChangeMailAddress1: (event) => dispatch(mailAddress1(event)),
    onChangeMailAddress2: (event) => dispatch(mailAddress2(event)),
    onChangeMailAddressCity: (event) => dispatch(mailAddressCity(event)),
    onChangeMailAddressState: (event) => dispatch(mailAddressState(event)),
    onChangeMailAddressZip: (event) => dispatch(mailAddressZip(event)),
    onChangeMailAddressCountry: (event) => dispatch(mailAddressCountry(event)),
    onChangeGroupsView: (event) => dispatch(mailAddressCountry(event)),
    onChangeGroupsEdit: (event) => dispatch(mailAddressCountry(event)),
    onChangeGroupsCreate: (event) => dispatch(mailAddressCountry(event)),
  }
}

class NewProfile extends React.Component {
	constructor(props) {
		super(props);
  		this.state = {
        id: 0, 
        group: '',
        password: '',
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
    const { id, group, password } = this.state
    const { first, last, email, homePhone, mobilePhone, workPhone } = this.props
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
            mobile: mobilePhone.toString(),
            work: workPhone.toString(),
          },
          email: email,
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
                        onChange: (event) => this.props.onChangeFirstName(event.target.value),
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
                        onChange: (event) => this.props.onChangeLastName(event.target.value),
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
                              <PhoneInput value={this.props.homePhone} onChangeValues={this.onChangeValues} />
                            </div>
                          </div>
                        </ToggleDisplay>
                        <ToggleDisplay show={showPhone2}>
                          <div className={classes.phoneFlex}>
                            <div>
                              <PhoneType onChangeValues={this.onChangeValues} />  
                            </div>
                            <div className={classes.phoneField}>
                              <PhoneInput value={this.props.mobilePhone} onChangeValues={this.onChangeValues} />
                            </div>
                          </div>
                        </ToggleDisplay>
                        <ToggleDisplay show={showPhone3}>
                          <div className={classes.phoneFlex}>
                            <div>
                              <PhoneType onChangeValues={this.onChangeValues} />  
                            </div>
                            <div className={classes.phoneField}>
                              <PhoneInput value={this.props.workPhone} onChangeValues={this.onChangeValues} />
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


export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(NewProfile));
