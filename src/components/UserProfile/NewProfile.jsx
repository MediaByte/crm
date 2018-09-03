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
import AddressSelect from 'components/UserProfile/AddressSelect.jsx';
import newPassword from 'components/UserProfile/generatePassword.js';
// material-ui icons
import AddCircle from '@material-ui/icons/AddCircle';
import RemoveCircle from '@material-ui/icons/RemoveCircle';

//files
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
const db = gun.get('testRost').get('users');
const dbRelations = gun.get('relation').get('users')
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
    groups: state.newUser.groups
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
    onChangeHomeCity: (event) => dispatch(homeAddressCity(event)),
    onChangeHomeState: (event) => dispatch(homeAddressState(event)),
    onChangeHomeZip: (event) => dispatch(homeAddressZip(event)),
    onChangeHomeCountry: (event) => dispatch(homeAddressCountry(event)),
    onChangeWorkAddress1: (event) => dispatch(workAddress1(event)),
    onChangeWorkAddress2: (event) => dispatch(workAddress2(event)),
    onChangeWorkCity: (event) => dispatch(workAddressCity(event)),
    onChangeWorkState: (event) => dispatch(workAddressState(event)),
    onChangeWorkZip: (event) => dispatch(workAddressZip(event)),
    onChangeWorkCountry: (event) => dispatch(workAddressCountry(event)),
    onChangeMailingAddress1: (event) => dispatch(mailAddress1(event)),
    onChangeMailingAddress2: (event) => dispatch(mailAddress2(event)),
    onChangeMailingCity: (event) => dispatch(mailAddressCity(event)),
    onChangeMailingState: (event) => dispatch(mailAddressState(event)),
    onChangeMailingZip: (event) => dispatch(mailAddressZip(event)),
    onChangeMailingCountry: (event) => dispatch(mailAddressCountry(event)),
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
    this.saveData = this.saveData.bind(this);
	}
  componentDidMount() {
    // db.map()
  }
  saveData() {
    const { 
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
      mailAddressCountry,
      groups
    } = this.props

    //schema
    let newEmployee = {
      [email]: {
        name: {
          first: first,
          last: last,
        },
        groups: new Set(groups),
        contactInfo: {
          phone: {
            home: homePhone.toString(),
            mobile: mobilePhone.toString(),
            work: workPhone.toString(),
          },
          email: email,
          address: {
            homeAddress1: homeAddress1,
            homeAddress2: homeAddress2, 
            homeAddressCity: homeAddressCity, 
            homeAddressState: homeAddressState, 
            homeAddressZip: homeAddressZip, 
            homeAddressCountry: homeAddressCountry,
            workAddress1: workAddress1,
            workAddress2: workAddress2,
            workAddressCity: workAddressCity,
            workAddressState: workAddressState,
            workAddressZip: workAddressZip,
            workAddressCountry: workAddressCountry,
            mailAddress1: mailAddress1,
            mailAddress2: mailAddress2,
            mailAddressCity: mailAddressCity,
            mailAddressState: mailAddressState,
            mailAddressZip: mailAddressZip,
            mailAddressCountry: mailAddressCountry,
          }
        },
      }
    };
    //relations
    const newRelation = {
      [email]: {
        current: newPassword(),
        previous: null,
        temp: true,
        lastReset: new Date()
      }
    }

    db.put(newEmployee, (ack) => {
      ack.ok 
        ? dbRelations.put(newRelation)
        : console.log(ack.err)
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

  onChangeValues(event, key, reference=null) {
    //buggy - not worth investing time into now
    const functionString = `onChange${key}${reference}`;
    const parsedMethod = this.props[functionString];
    typeof parsedMethod === 'function' && key === 'Home'
      ? parsedMethod(event) 
      : typeof parsedMethod === 'function' && key === 'Mailing'
        ? parsedMethod(event) 
        : typeof method === 'function' && key === 'Work'
          ? parsedMethod(event) 
          : console.log(parsedMethod)
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
                    <GroupsSelect/>
	                </GridItem>
	              </GridContainer>
      	         <GridContainer>
      						<GridItem xs={12} sm={12} md={12}>
      							<GridContainer>
      								<GridItem xs={12} sm={12} md={12}>
                        <ToggleDisplay show={showPhone1}>
                          <div className={classes.phoneFlex}>
                            <div className={classes.phoneField}>
                              <PhoneInput select={'select1'} input={'input1'} /> <RemoveCircle style={{ color: 'red', fontSize: '25px', marginBottom: '0px', cursor: 'pointer' }} />
                            </div>
                          </div>
                        </ToggleDisplay>
                        <ToggleDisplay show={showPhone2}>
                          <div className={classes.phoneFlex}>
                            <div className={classes.phoneField}>
                              <PhoneInput select={'select2'} input={'input2'} /> <RemoveCircle style={{ color: 'red', fontSize: '25px', marginBottom: '0px', cursor: 'pointer' }} />
                            </div>
                          </div>
                        </ToggleDisplay>
                        <ToggleDisplay show={showPhone3}>
                          <div className={classes.phoneFlex}>
                            <div className={classes.phoneField}>
                              <PhoneInput select={'select3'} input={'input3'} /> <RemoveCircle style={{ color: 'red', fontSize: '25px', marginBottom: '0px', cursor: 'pointer'  }} />
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
                          inputProps={{
                            onChange: (e) => this.props.onChangeEmail(e.target.value),
                          }}
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
                                <AddressSelect control={this.onChangeValues} refID={'addressType1'} />
                              </div>
                            </ToggleDisplay>
                            </GridItem>
                            <GridItem xs={12} md={6}>
                              <ToggleDisplay show={showAddress1}>
                              <div className={classes.addressFlex}>
                                <GridItem>
                                  <CustomInput
                                    labelText="Address 1"
                                    id="address1-1"
                                    inputProps={{
                                      onChange: (e) => this.onChangeValues(e.target.value, document.getElementById('addressType1').value, 'Address1'),
                                    }}
                                    formControlProps={{
                                      fullWidth: true
                                    }}
                                  />
                                </GridItem>
                                <GridItem>
                                  <CustomInput
                                    labelText="Address 2"
                                    id="address2-1"
                                    inputProps={{
                                      onChange: (e) => this.onChangeValues(e.target.value, document.getElementById('addressType1').value, 'Address2'),
                                    }}
                                    formControlProps={{
                                      fullWidth: true
                                    }}
                                  />
                                </GridItem>
                                <GridItem>
                                  <CustomInput
                                    labelText="City"
                                    id="city-1"
                                    inputProps={{
                                      onChange: (e) => this.onChangeValues(e.target.value, document.getElementById('addressType1').value, 'City'),
                                    }}
                                    formControlProps={{
                                      fullWidth: true
                                    }}
                                  />
                                </GridItem>
                                <GridItem xs={6}>
                                  <CustomInput
                                    labelText="State"
                                    id="state-1"
                                    inputProps={{
                                      onChange: (e) => this.onChangeValues(e.target.value, document.getElementById('addressType1').value, 'State'),
                                    }}
                                    formControlProps={{
                                      fullWidth: true
                                    }}
                                  />
                                </GridItem>
                                <GridItem xs={6}>
                                  <CustomInput
                                    labelText="Zip"
                                    id="zip-1"
                                    inputProps={{
                                      onChange: (e) => this.onChangeValues(e.target.value, document.getElementById('addressType1').value, 'Zip'),
                                    }}
                                    formControlProps={{
                                      fullWidth: true
                                    }}
                                  />
                                </GridItem>
                                <GridItem>
                                  <CustomInput
                                    labelText="Country"
                                    id="country-1"
                                    inputProps={{
                                      onChange: (e) => this.onChangeValues(e.target.value, document.getElementById('addressType1').value, 'Country'),
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
                                <AddressSelect refID={'addressType2'} />
                              </div>
                            </ToggleDisplay>
                            </GridItem>
                            <GridItem xs={12} md={6}>
                              <ToggleDisplay show={showAddress2}>
                              <div className={classes.addressFlex}>
                                <GridItem>
                                  <CustomInput
                                    labelText="Address 1"
                                    id="address1-2"
                                    inputProps={{
                                      onChange: (e) => this.onChangeValues(e.target.value, document.getElementById('addressType2').value, 'Address1'),
                                    }}
                                    formControlProps={{
                                      fullWidth: true
                                    }}
                                  />
                                </GridItem>
                                <GridItem>
                                  <CustomInput
                                    labelText="Address 2"
                                    id="address2-2"
                                    inputProps={{
                                      onChange: (e) => this.onChangeValues(e.target.value, document.getElementById('addressType2').value, 'Address2'),
                                    }}
                                    formControlProps={{
                                      fullWidth: true
                                    }}
                                  />
                                </GridItem>
                                <GridItem>
                                  <CustomInput
                                    labelText="City"
                                    id="city-2"
                                    inputProps={{
                                      onChange: (e) => this.onChangeValues(e.target.value, document.getElementById('addressType2').value, 'City'),
                                    }}
                                    formControlProps={{
                                      fullWidth: true
                                    }}
                                  />
                                </GridItem>
                                <GridItem xs={6}>
                                  <CustomInput
                                    labelText="State"
                                    id="state-2"
                                    inputProps={{
                                      onChange: (e) => this.onChangeValues(e.target.value, document.getElementById('addressType2').value, 'State'),
                                    }}
                                    formControlProps={{
                                      fullWidth: true
                                    }}
                                  />
                                </GridItem>
                                <GridItem xs={6}>
                                  <CustomInput
                                    labelText="Zip"
                                    id="zip-2"
                                    inputProps={{
                                      onChange: (e) => this.onChangeValues(e.target.value, document.getElementById('addressType2').value, 'Zip'),
                                    }}
                                    formControlProps={{
                                      fullWidth: true
                                    }}
                                  />
                                </GridItem>
                                <GridItem>
                                  <CustomInput
                                    labelText="Country"
                                    id="country-2"
                                    inputProps={{
                                      onChange: (e) => this.onChangeValues(e.target.value, document.getElementById('addressType2').value, 'Country'),
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
                                <AddressSelect refID={'addressType3'} />
                              </div>
                            </ToggleDisplay>
                            </GridItem>
                            <GridItem xs={12} md={6}>
                              <ToggleDisplay show={showAddress3}>
                              <div className={classes.addressFlex}>
                                <GridItem>
                                  <CustomInput
                                    labelText="Address 1"
                                    id="address1-3"
                                    inputProps={{
                                      onChange: (e) => this.onChangeValues(e.target.value, document.getElementById('addressType3').value, 'Address1'),
                                    }}
                                    formControlProps={{
                                      fullWidth: true
                                    }}
                                  />
                                </GridItem>
                                <GridItem>
                                  <CustomInput
                                    labelText="Address 2"
                                    id="address2-3"
                                    inputProps={{
                                      onChange: (e) => this.onChangeValues(e.target.value, document.getElementById('addressType3').value, 'Address2'),
                                    }}
                                    formControlProps={{
                                      fullWidth: true
                                    }}
                                  />
                                </GridItem>
                                <GridItem>
                                  <CustomInput
                                    labelText="City"
                                    id="city-3"
                                    inputProps={{
                                      onChange: (e) => this.onChangeValues(e.target.value, document.getElementById('addressType3').value, 'City'),
                                    }}
                                    formControlProps={{
                                      fullWidth: true
                                    }}
                                  />
                                </GridItem>
                                <GridItem xs={6}>
                                  <CustomInput
                                    labelText="State"
                                    id="state-3"
                                    inputProps={{
                                      onChange: (e) => this.onChangeValues(e.target.value, document.getElementById('addressType3').value, 'State'),
                                    }}
                                    formControlProps={{
                                      fullWidth: true
                                    }}
                                  />
                                </GridItem>
                                <GridItem xs={6}>
                                  <CustomInput
                                    labelText="Zip"
                                    id="zip-3"
                                    inputProps={{
                                      onChange: (e) => this.onChangeValues(e.target.value, document.getElementById('addressType3').value, 'Zip'),
                                    }}
                                    formControlProps={{
                                      fullWidth: true
                                    }}
                                  />
                                </GridItem>
                                <GridItem>
                                  <CustomInput
                                    labelText="Country"
                                    id="country-3"
                                    inputProps={{
                                      onChange: (e) => this.onChangeValues(e.target.value, document.getElementById('addressType3').value, 'Country'),
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
