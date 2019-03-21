import React  from 'react';
import TextField from '@material-ui/core/TextField';

const TextArea = (props) => {
  // <label htmlFor={props.name}>{props.title}</label>
  return (
    <div>
      <TextField
          label={props.placeholder}
          multiline
          rowsMax={props.rows}
          value={props.value}
          onChange={props.handleChange}
          margin="normal"
          variant="outlined"
        />
    </div>
  )
}

export default TextArea;
