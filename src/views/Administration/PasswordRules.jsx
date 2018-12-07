import React, { Component } from 'react';
//material-ui components
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
//project files & components
import Page from 'views/Page/Page';
import GridItem from 'components/Grid/GridItem.jsx';
import GridContainer from 'components/Grid/GridContainer.jsx';
import CustomInput from 'components/CustomInput/CustomInput.jsx';
import CustomButton from 'components/CustomButtons/Button.jsx';

const styles = theme => ({
  content: {
    [theme.breakpoints.up('lg')]: {
      display: 'block',
      margin: 'auto',
      marginLeft: theme.spacing.unit * 18,
      marginRight: theme.spacing.unit * 18,
      marginTop: theme.spacing.unit * 8,
      height: '100%',
    },
    [theme.breakpoints.down('md')]: {
      display: 'block',
      margin: 'auto',
      marginLeft: theme.spacing.unit * 15,
      marginRight: theme.spacing.unit * 13,
      marginTop: theme.spacing.unit * 8,
    },
    [theme.breakpoints.down('sm')]: {
      display: 'block',
      margin: 'auto',
      marginLeft: theme.spacing.unit * 7,
      marginRight: theme.spacing.unit * 7,
      marginTop: theme.spacing.unit * 8,
      textAlign: 'center',
    },
    [theme.breakpoints.down('xs')]: {
      display: 'block',
      margin: 'auto',
      marginTop: theme.spacing.unit * 8,
      textAlign: 'center',
    },
  },
  grid: {
    width: '100%',
  },
  paper: {
    paddingTop: 70,
    paddingBottom: 30,
  },
});

class PasswordRules extends Component {
  componentDidMount() {
    window.scrollTo(0, 0);
    document.body.scrollTop = 0;
  }

  render() {
    const { classes } = this.props;

    return (
      <div>
        <Page component={'administration'}>
          <GridContainer className={classes.content}>
            <Paper className={classes.paper}>
              <GridContainer>
                <GridItem xs={12}>
                  <GridContainer className={classes.grid}>
                    <GridItem md={1} />
                    <GridItem xs={12} sm={12} md={8}>
                      <Typography style={{ paddingTop: 33 }} variant={'body2'}>
                        {' '}
                        Password Expiration Period (Days)
                      </Typography>
                    </GridItem>
                    <GridItem xs={12} sm={12} md={2}>
                      <CustomInput
                        inputProps={{
                          placeholder: '45',
                        }}
                      />
                    </GridItem>
                  </GridContainer>
                  <GridContainer className={classes.grid}>
                    <GridItem md={1} />
                    <GridItem xs={12} sm={12} md={8}>
                      <Typography style={{ paddingTop: 33 }} variant={'body2'}>
                        Minimum Character Length
                      </Typography>
                    </GridItem>
                    <GridItem xs={12} sm={12} md={2}>
                      <CustomInput
                        inputProps={{
                          placeholder: '8',
                        }}
                      />
                    </GridItem>
                  </GridContainer>
                  <GridContainer className={classes.grid}>
                    <GridItem md={1} />
                    <GridItem xs={12} sm={12} md={8}>
                      <Typography style={{ paddingTop: 33 }} variant={'body2'}>
                        Minimum Number of Special Characters
                      </Typography>
                    </GridItem>
                    <GridItem xs={12} sm={12} md={2}>
                      <CustomInput
                        inputProps={{
                          placeholder: '1',
                        }}
                      />
                    </GridItem>
                  </GridContainer>
                  <GridContainer className={classes.grid}>
                    <GridItem
                      style={{ marginTop: 140 }}
                      align={'right'}
                      md={12}
                    >
                      <CustomButton
                        color={'white'}
                        style={{ marginRight: 20, color: 'black' }}
                      >
                        Cancel
                      </CustomButton>
                      <CustomButton color={'info'}>Save</CustomButton>
                    </GridItem>
                  </GridContainer>
                </GridItem>
              </GridContainer>
            </Paper>
          </GridContainer>
        </Page>
      </div>
    );
  }
}

export default withStyles(styles)(PasswordRules);
