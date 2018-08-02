import React from "react";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import InputAdornment from "@material-ui/core/InputAdornment";
// @material-ui/icons
import Email from "@material-ui/icons/Email";
import LockOutline from "@material-ui/icons/LockOutline";
// core components
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import Button from "components/CustomButtons/Button.jsx";
import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CustomInput from "components/CustomInput/CustomInput.jsx";
//Styles
import loginPageStyle from "assets/jss/material-kit-pro-react/views/loginPageStyle.jsx";
//Media
import Logo from 'assets/img/crmLogo.png'

class LoginPage extends React.Component {
  componentDidMount() {
    window.scrollTo(0, 0);
    document.body.scrollTop = 0;
  }
  render() {
    const { classes } = this.props;
    return (
      <div>
        <div className={classes.container}>
          <GridContainer justify="center">
            <GridItem xs={12} sm={12} md={4}>
              <Card>
                <form className={classes.form}>
                  <CardHeader
                    color="info"
                    signup
                    className={classes.cardHeader}
                  >
                    <div className={classes.cardTitle}>
                      <img src={Logo} alt={'Login'}/>
                    </div>
                  </CardHeader>
                  <CardBody signup>
                    <CustomInput
                      id="email"
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps={{
                        placeholder: "Email*",
                        type: "email",
                        autoComplete: "email",
                        startAdornment: (
                          <InputAdornment position="start">
                            <Email className={classes.inputIconsColor} />
                          </InputAdornment>
                        )
                      }}
                    />
                    <CustomInput
                      id="pass"
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps={{
                        placeholder: "Password*",
                        type: "password",
                        autoComplete: "current-password",
                        startAdornment: (
                          <InputAdornment position="start">
                            <LockOutline
                              className={classes.inputIconsColor}
                            />
                          </InputAdornment>
                        )
                      }}
                    />
                    <div style={{ marginBottom: 15, }}>
                      <Button fullWidth={true} color="info" variant="raised">
                        Login
                      </Button>
                    </div>
                  </CardBody>
                </form>
              </Card>
            </GridItem>
          </GridContainer>
        </div>
      </div>
    );
  }
}

export default withStyles(loginPageStyle)(LoginPage);
