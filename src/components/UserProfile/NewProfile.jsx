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
      showPhone1: false,
      showPhone2: false,
      showPhone3: false,
		}
    this.phoneField = this.phoneField.bind(this);
    this.onChangeValues = this.onChangeValues.bind(this);
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
    const { showPhone1, showPhone2, showPhone3 } = this.state
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
	          <GridItem xs={12} sm={12} md={8}>
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
	          <Button className={classes.button} onClick={this.saveData} color="info">Save</Button>
	        </div>
	    </div>
	  );
	}
}
export default withStyles(styles)(NewProfile);
