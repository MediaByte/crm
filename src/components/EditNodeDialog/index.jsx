import React from 'react'
import PropTypes from 'prop-types'
import Grid from '@material-ui/core/Grid'
import TextField from '@material-ui/core/TextField'

class EditNodeDialog extends React.Component {
  render() {
    const bodyDialogAddNode = {
      padding: '25px',
    }
    const TextFieldMt = {
      marginTop: '15px',
    }
    return (
      <Grid
        alignContent="center"
        alignItems="center"
        container
        direction="column"
        justify="center"
        style={bodyDialogAddNode}
      >
        <TextField
          fullWidth
          id="add-prop-form-name-field" // required for Accessibility
          label="Name"
          name="name"
          required
        />

        <TextField
          fullWidth
          id="add-prop-form-label-field" // required for Accessibility
          label="Label"
          name="label" // for accessibility only
          required
          style={TextFieldMt}
        />
      </Grid>
    )
  }
}

EditNodeDialog.propTypes = {
  classes: PropTypes.object.isRequired,
}
export default EditNodeDialog
