import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Formik } from 'formik';
import Brightness1 from '@material-ui/icons/Brightness1Outlined';
import Description from '@material-ui/icons/DescriptionOutlined';
import Group from '@material-ui/icons/GroupAddOutlined';

import Close from '@material-ui/icons/Close';
import {
  Paper,
  Grid,
  MenuItem,
  Typography,
  FormControlLabel,
  Checkbox,
  Button,
  AppBar,
  Toolbar,
  IconButton,
  TextField,
} from '@material-ui/core';

import { saveUser, addUser } from '../../state/userGroups/actions';

//material ui components
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  wrapper: {
    // padding: 25
  },
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 120,
  },
  root: {
    borderRadius: 0,
    boxShadow: 'none',
    borderTop: '1px solid #ddd',
    borderBottom: '1px solid #ddd',
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
    textindent: '10px',
  },
  textField: {
    [theme.breakpoints.up('md')]: {
      marginLeft: '-20px',
      justifyContent: 'space-between',
    },
    [theme.breakpoints.up('lg')]: {
      marginLeft: '-40px',
      justifyContent: 'space-between',
    },
  },
  selected: {
    backgroundColor: '#f00',
  },
  subtitle: {
    fontSize: '0.9rem',
    fontWeight: 'bold',
  },
  //demoContent: {
  //backgroundColor: '#f6f6f6',
  //},
  demoContent: {
    padding: 10,
    [theme.breakpoints.up('sm')]: {
      padding: 0,
    },
    [theme.breakpoints.up('md')]: {
      padding: 0,
    },
    backgroundColor: '#f6f6f6',
  },
  title: {
    marginBottom: 10,
    color: '#616161',
    fontSize: '0.85rem',
    //borderBottom: "1px solid #ddd",
    marginLeft: 15,
    //fontWeight: 'bold',
    [theme.breakpoints.up('lg')]: {
      marginLeft: 30,
    },
  },
  root3: {
    borderRadius: 0,
    boxShadow: 'none',
    borderBottom: '1px solid #ddd',
    //borderTop: "1px solid #ddd"
  },
  paddingFull: {
    padding: 15,
    [theme.breakpoints.up('md')]: {
      padding: '20px 30px',
    },
  },
  appBar: {
    dropShadow: 'none',
    position: 'sticky',
    flex: 1,
    top: 0,
    zIndex: 10,
  },
  newTitle: {
    //[theme.breakpoints.up('md')]: {
    margin: '0 auto',
    left: '70px',
    position: 'absolute',
    width: '75%',
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#0dacc4',
    //}
  },
  noShadow: {
    dropShadow: 'none',
    backgroundColor: '#fff',
    borderBottom: '1px solid #ddd',
  },
  noStyle: {
    [theme.breakpoints.down('md')]: {
      boxShadow: 'none',
      dropShadow: 'none',
    },
  },
});

class UserGroupForm extends Component {
  render() {
    const { classes, user } = this.props;

    const isAdd = user && !user.id;

    return (
      <div>
        <Formik
          initialValues={this.props.user}
          validate={values => {}}
          enableReinitialize={true}
          onSubmit={(values, { setSubmitting }) => {
            console.log('onSubmit', values, this);
            if (values.id) {
              this.props.saveUser(values);
            } else {
              this.props.addUser(values);
            }
            setTimeout(() => {
              setSubmitting(false);
              this.props.handleClose();
            }, 300);
          }}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
            isSubmitting,
            /* and other goodies */
          }) => {
            return (
              <form onSubmit={handleSubmit} className={classes.demoContent}>
                {isAdd && (
                  <div className={classes.appBar}>
                    <AppBar
                      position="sticky"
                      color="default"
                      height="20"
                      className={classes.noStyle}
                    >
                      <Toolbar className={classes.noShadow}>
                        <IconButton
                          className={classes.menuButton}
                          color="grey"
                          style={{ position: 'absolute', left: -1 }}
                          onClick={this.props.handleClose}
                          aria-label="Close"
                        >
                          <Close />
                        </IconButton>
                        <Typography
                          variant="subtitle1"
                          color="inherit"
                          textAlign="center"
                          className={classes.newTitle}
                        >
                          {this.props.title}
                        </Typography>
                        <Button
                          color="inherit"
                          style={{ position: 'absolute', right: 1 }}
                          type="submit"
                        >
                          save
                        </Button>
                      </Toolbar>
                    </AppBar>
                  </div>
                )}
                <Paper className={classes.root3} elevation={1}>
                  <div className={classes.paddingFull}>
                    {/* <Hidden smDown>
									<Typography variant="title" noWrap className={classes.title}>New User Group</Typography>
								</Hidden> */}
                    <Grid
                      container
                      spacing={8}
                      alignItems="flex-end"
                      className={classes.inputGrid}
                    >
                      <Grid item xs={2} sm={isAdd ? 2 : 1}>
                        <Group />
                      </Grid>
                      <Grid item xs={10} sm={isAdd ? 10 : 11}>
                        <TextField
                          name="name"
                          label="Name"
                          fullWidth
                          className={classes.textField}
                          value={values.name}
                          onChange={handleChange}
                          onBlur={handleBlur}
                        />
                      </Grid>
                    </Grid>
                    <br />
                    <Grid
                      container
                      spacing={8}
                      alignItems="flex-end"
                      className={classes.inputGrid}
                    >
                      <Grid item xs={2} sm={isAdd ? 2 : 1}>
                        <Description />
                      </Grid>
                      <Grid item xs={10} sm={isAdd ? 10 : 11}>
                        <TextField
                          name="description"
                          label="Description"
                          fullWidth
                          className={classes.textField}
                          value={
                            values.description !== ''
                              ? values.description
                              : 'Users will have administrator level permissions'
                          }
                          onChange={handleChange}
                          onBlur={handleBlur}
                        />
                      </Grid>
                    </Grid>
                    <Grid
                      container
                      spacing={8}
                      alignItems="flex-end"
                      className={classes.inputGrid}
                    >
                      <Grid item xs={2} sm={isAdd ? 2 : 1}>
                        <Brightness1 />
                      </Grid>
                      <Grid item xs={10} sm={isAdd ? 10 : 11}>
                        <TextField
                          name="status"
                          label="Status"
                          fullWidth
                          className={classes.textField}
                          value={user.status}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          margin="normal"
                        >
                          <MenuItem value="">Select</MenuItem>
                          <MenuItem value="active">Active</MenuItem>
                          <MenuItem value="inactive">Inactive</MenuItem>
                        </TextField>
                      </Grid>
                    </Grid>
                  </div>
                </Paper>
                <br />
                <br />
                <Typography noWrap className={classes.title}>
                  Permissions
                </Typography>
                <Paper className={classes.root} elevation={1}>
                  <div className={classes.paddingFull}>
                    {values.permissions.map((item, index) => (
                      <div key={index}>
                        <Typography
                          variant="title"
                          noWrap
                          className={classes.subtitle}
                        >
                          {item.title}
                        </Typography>
                        <FormControlLabel
                          control={
                            <Checkbox
                              name={`permissions[${index}].view`}
                              checked={item.view}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              value={item.view ? 'on' : 'off'}
                              classes={{
                                root: classes.root2,
                                checked: classes.checked,
                              }}
                            />
                          }
                          label="View"
                        />
                        <FormControlLabel
                          control={
                            <Checkbox
                              name={`permissions[${index}].create`}
                              checked={item.create}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              value={item.create ? 'on' : 'off'}
                              classes={{
                                root: classes.root2,
                                checked: classes.checked,
                              }}
                            />
                          }
                          label="Create"
                        />
                        <FormControlLabel
                          control={
                            <Checkbox
                              name={`permissions[${index}].edit`}
                              checked={item.edit}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              value={item.edit ? 'on' : 'off'}
                              classes={{
                                root: classes.root2,
                                checked: classes.checked,
                              }}
                            />
                          }
                          label="Edit"
                        />
                        <FormControlLabel
                          control={
                            <Checkbox
                              name={`permissions[${index}].delete`}
                              checked={item.delete}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              value={item.delete ? 'on' : 'off'}
                              classes={{
                                root: classes.root2,
                                checked: classes.checked,
                              }}
                            />
                          }
                          label="Delete"
                        />
                        <br />
                      </div>
                    ))}
                    {/* {this.props.user && this.props.user.id && ( */}

                    {/* )} */}
                  </div>
                </Paper>
                <br />
              </form>
            );
          }}
        </Formik>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {};
};

const mapDispatchToProps = dispatch => {
  return {
    saveUser: user => dispatch(saveUser(user)),
    addUser: user => dispatch(addUser(user)),
  };
};

UserGroupForm.propTypes = {
  classes: PropTypes.object.isRequired,
};
export default withStyles(styles)(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(UserGroupForm),
);
