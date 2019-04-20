import React from 'react'
import PropTypes from 'prop-types'
import Grid from '@material-ui/core/Grid'
import TextField from '@material-ui/core/TextField'

class EditNodeDialog extends React.Component {
  render() {
    return (
      <Grid
        alignContent="center"
        alignItems="center"
        container
        direction="column"
        justify="center"
      >
        <TextField
          fullWidth
          margin="dense"
          id="add-prop-form-name-field" // required for Accessibility
          label="Name"
          name="name"
          required
        />

        <TextField
          fullWidth
          margin="dense"
          id="add-prop-form-label-field" // required for Accessibility
          label="Label"
          name="label" // for accessibility only
          required
        />
      </Grid>
    )
  }
}

EditNodeDialog.propTypes = {
  classes: PropTypes.object.isRequired,
}
export default EditNodeDialog
