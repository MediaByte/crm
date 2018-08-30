//React v16.3.1
import React from "react";
import PropTypes from "prop-types";
//Material-UI components
import { withStyles } from "@material-ui/core/styles";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import Chip from "@material-ui/core/Chip";
//State Management
import { connect } from 'react-redux';
import { groupView, groupEdit, groupCreate } from 'state/newUser/actions.js';

//Styles
import styles from "assets/jss/material-kit-pro-react/customSelectStyle.jsx";
const mapStateToProps = (state) => {
  return {
    groupView: state.newUser.groupView,
    groupEdit: state.newUser.groupEdit,
    groupCreate: state.newUser.groupCreate,
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    onChangeGroupView: (event) => dispatch(groupView(event)),
    onChangeGroupEdit: (event) => dispatch(groupEdit(event)),
    onChangeGroupCreate: (event) => dispatch(groupCreate(event)),
  }
};

const names = ["View", "Edit", "Create"];

class GroupsSelect extends React.Component {

  constructor(props) {
    super(props);
      this.state = {
        name: [],
        groupView: false,
        groupEdit: false,
        groupCreate: false,
      }
      this.handleChange = this.handleChange.bind(this);
  }

  handleChange (data) {
    
    this.setState({ name: data });

    //Will need this for later when app scales
    // const suggestions = (suggestion) => names.filter(found => {
    //   return found === suggestion
    // });

    // const groupType = data.map((value) => {
    //   if (suggestions(value)) {
    //       return { [`group${suggestions(value)[0]}`]: true }
    //   }
    //     return value;
    // });
    
    data.forEach(value => {
      if (value === 'View'){
        this.props.onChangeGroupView(true)
      } 
      if (value === 'Edit') {
        this.props.onChangeGroupEdit(true)
      } 
      if (value === 'Create') {
        this.props.onChangeGroupCreate(true)
      }
    })

  }

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <FormControl className={classes.selectFormControl} fullWidth>
          <InputLabel className={classes.selectLabel} htmlFor="select-multiple-chip">Select</InputLabel>
          <Select
            multiple
            value={this.state.name}
            onChange={(event)=>this.handleChange(event.target.value)}
            input={<Input id="select-multiple-chip" />}
            renderValue={selected => (
              <div className={classes.chips}>
                {selected.map(value => (
                  <Chip key={value} label={value} className={classes.chip} />
                ))}
              </div>
            )}
            MenuProps={{
              className: classes.selectMenu
            }}
            classes={{
              select: classes.select
            }}
          >
            {names.map(name => (
              <MenuItem
                key={name}
                value={name}
                classes={{
                  root: classes.selectMenuItem,
                  selected: classes.selectMenuItemSelected
                }}
              >
                {name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>
    );
  }
}

GroupsSelect.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired
};

export default withStyles(styles, { withTheme: true })(connect(mapStateToProps, mapDispatchToProps)(GroupsSelect));
