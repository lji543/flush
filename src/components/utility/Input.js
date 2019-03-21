import React  from 'react';
import TextField from '@material-ui/core/TextField';

const Input = (props) => {
  // <label htmlFor={props.name}>{props.title}</label>
  return (
    <div>
      <TextField
        name={props.name}
        label={props.placeholder}
        value={props.value}
        onChange={props.handleChange}
        margin="normal"
        variant="outlined"
      />
    </div>
  )
}

export default Input;
