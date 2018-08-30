import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import Chip from "@material-ui/core/Chip";

import styles from "assets/jss/material-kit-pro-react/customSelectStyle.jsx";

const names = ["View", "Edit", "Create"];

class GroupsSelect extends React.Component {
  state = {
    name: []
  };

  handleChange = event => {
    this.setState({ name: event.target.value });

    console.log(event.target.value)
  };

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <FormControl className={classes.selectFormControl} fullWidth>
          <InputLabel className={classes.selectLabel} htmlFor="select-multiple-chip">Select</InputLabel>
          <Select
            multiple
            value={this.state.name}
            onChange={this.handleChange}
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

export default withStyles(styles, { withTheme: true })(GroupsSelect);
