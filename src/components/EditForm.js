import React from 'react';

import { connect } from 'react-redux';

// import { fetchLocations } from '../actions/actions';
// import firebase from '../staticConfig/firebase';
import { locationSchema, neighborhoods } from '../staticConfig/constants';

// import AutoComplete from '../components/utility/AutoComplete'
import Button from '../components/utility/Button'
import CheckBox from '../components/utility/CheckBox'
import Input from '../components/utility/Input';
import TextArea from '../components/utility/TextArea';
import Select from '../components/utility/Select';

class EditForm extends React.Component {
  constructor(props) {
    super(props)

    this.autocompleteInput = React.createRef();
    this.autocomplete = null;

    this.state = {
      updatedLoc: this.props.loc,
      neighborhoods: neighborhoods,
      message: '',
      errorMessage: '',
    }
  }

  handleEdit = e => {
    let value = e.target.value;
    let name = e.target.name;
    let errorMessage = '';

    if (name === 'favorite') {
      value = (value === 'true') ? false : true;
    }

    this.setState( prevState => {
        return {
          updatedLoc: {
            ...prevState.updatedLoc, [name]: value
           },
          errorMessage: errorMessage
        }
      }//, () => console.log(this.state.updatedLoc)
    )
  }

  handleSave = () => {
    this.props.handleSave(this.state.updatedLoc);
  }

  handleCancel = () => {
    this.props.handleCancel(this.state.updatedLoc);
  }

  componentDidMount() {

  }

  // <Button text={'Save'} action={this.handleFormSubmit} />&nbsp;&nbsp;
  // <Button text={'Cancel'} action={this.handleClearForm}/>
  render() {
    const { loc, handleSave } = this.props

    return (
      <div>
        <form onSubmit={handleSave} style={{display:'flex'}}>
          <Input type={'text'}
            name={'name'}
            value={this.state.updatedLoc.name}
            placeholder={loc.name}
            handleChange={this.handleEdit}
          />
          <Input type={'text'}
            name={'address'}
            value={this.state.updatedLoc.address}
            placeholder={loc.address}
            title={'address'}
            handleChange={this.handleEdit}
          />
          <Input type={'text'}
            name={'code'}
            value={this.state.updatedLoc.code}
            placeholder={loc.code}
            handleChange={this.handleEdit}
          />
          <TextArea type={'text'}
            name={'note'}
            value={this.state.updatedLoc.note}
            placeholder={loc.note}
            label={'note'}
            handleChange={this.handleEdit}
          />
          <Select title={'Neighborhood'}
            name={'neighborhood'}
            options={neighborhoods}
            value={this.state.updatedLoc.neighborhood}
            placeholder={loc.neighborhood}
            handleChange={this.handleEdit}
          />
          <CheckBox
            title={'Favorite'}
            name={'favorite'}
            options={this.state.updatedLoc.favorite}
            value={this.state.updatedLoc.favorite}
            handleChange={this.handleEdit}
          />
          <Button text={'Save'} action={this.handleSave}/>
          <Button text={'Cancel'} action={this.handleCancel}/>
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return state;
};

const mapDispatchToProps = {
  // fetchLocations,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditForm);

// export default connect(
//   mapStateToProps,
//   mapDispatchToProps
// )(GoogleApiWrapper({
//   apiKey: googleMapsAPIKey
// })(Form));
