import React from "react";
import MCheckBox from '@material-ui/core/Checkbox';
import Favorite from '@material-ui/icons/Favorite';
import FavoriteBorder from '@material-ui/icons/FavoriteBorder';

const CheckBox = props => {
  return (
    <div>
      <label htmlFor={props.name}>
        {props.title}
      </label>
      <div>
        <MCheckBox
          id={props.name}
          name={props.name}
          onChange={props.handleChange}
          value={`${props.value}`}
          checked={props.value}
          type="checkbox"
          icon={<FavoriteBorder />}
          checkedIcon={<Favorite />}
        />
      </div>
    </div>
  );
};

export default CheckBox;
