import React  from 'react';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import MSelect from '@material-ui/core/Select';
// import OutlinedInput from '@material-ui/core/OutlinedInput';
import MenuItem from '@material-ui/core/MenuItem';

const Select = (props) => {
  return(
    <div>
      <FormControl variant="outlined">
      <InputLabel htmlFor={props.name}>{props.title}</InputLabel>
        <MSelect variant="outlined" style={{width:'174px'}}
          name={props.name}
          value={props.value}
          onChange={props.handleChange}
        >
          <MenuItem value={props.placeholder} disabled>{props.placeholder}</MenuItem>
          {props.options.map(option => {
            return (
              <MenuItem
                key={option}
                value={option}
                label={option}>{option}
              </MenuItem>
            );
          })}
        </MSelect>
      </FormControl>
    </div>
  )
}

export default Select;
//
// <label htmlFor={props.name}> {props.title} </label>
// <Select
//   name={props.name}
//   value={props.value}
//   onChange={props.handleChange}
// >
//   <option value="" disabled>{props.placeholder}</option>
//   {props.options.map(option => {
//     return (
//       <option
//         key={option}
//         value={option}
//         label={option}>{option}
//       </option>
//     );
//   })}
// </select>



        //
        //
        //
        // <FormControl variant="outlined"
        //   <InputLabel
        //     ref={ref => {
        //       this.InputLabelRef = ref;
        //     }}
        //     htmlFor={props.name}
        //   >
        //     Age
        //   </InputLabel>
        //   <Select
        //     value={this.state.age}
        //     onChange={this.handleChange}
        //     input={
        //       <OutlinedInput
        //         labelWidth={this.state.labelWidth}
        //         name="age"
        //       />
        //     }
        //   >
        //     <MenuItem value="">
        //       <em>None</em>
        //     </MenuItem>
        //     <MenuItem value={10}>Ten</MenuItem>
        //     <MenuItem value={20}>Twenty</MenuItem>
        //     <MenuItem value={30}>Thirty</MenuItem>
        //   </Select>
        // </FormControl>
