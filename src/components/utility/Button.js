import React  from 'react';
import MButton from '@material-ui/core/Button';

const Button = (props) => {
  return(
    <MButton variant="outlined" color="primary"
      onClick= {props.action}>
      {props.text}
    </MButton>
  )
}

export default Button;
