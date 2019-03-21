import React from 'react';

import { connect } from 'react-redux';
import { GoogleApiWrapper } from 'google-maps-react';

import { fetchMap } from '../actions/actions';
import firebase from '../staticConfig/firebase';
import { googleMapsAPIKey, locationSchema, neighborhoods } from '../staticConfig/constants';

// import AutoComplete from '../components/utility/AutoComplete'
import Button from '../components/utility/Button'
import CheckBox from '../components/utility/CheckBox'
import Input from '../components/utility/Input';
import TextArea from '../components/utility/TextArea';
import Select from '../components/utility/Select';

class AddLocation extends React.Component {
  constructor(props) {
    super(props)

    this.autocompleteInput = React.createRef();
    this.autocomplete = null;
    this.handlePlaceChanged = this.handlePlaceChanged.bind(this);

    this.state = {
      query: {},
      newLoc: locationSchema,
      neighborhoods: neighborhoods,
      message: ''
    }
  }

  handleInput = e => {
    let value = e.target.value;
    let name = e.target.name;
    let message = '';

    this.setState( prevState => {
        return {
          newLoc: {
            ...prevState.newLoc, [name]: value, message: message
           }
        }
      }//, () => console.log(this.state.newLoc)
    )
   }

   handleCheckBox = e => {
     const favorite = (e.target.value === 'true') ? true : false;

    this.setState( prevState => ({ newLoc:
      {...prevState.newLoc, favorite: !favorite }
    })
    )
   }

   handlePlaceChanged(){
     const place = this.autocomplete.getPlace();

     let streetNum, street, zip, neighborhood;
     place.address_components.map(a => {
       if (a.types.includes('street_number')) {
         streetNum = a.short_name;
       }
       if (a.types.includes('route')) {
         street = a.short_name;
       }
       if (a.types.includes('neighborhood')) {
         neighborhood = a.long_name;
       }
       if (a.types.includes('postal_code')) {
         zip = a.short_name;
       }
       return a;
     })

     let query = {
       address: `${streetNum} ${street}`,
       lat: place.geometry.location.lat(),
       lng: place.geometry.location.lng(),
       loc: [],
       name: place.name,
       neighborhood: neighborhood,
       zip: zip
     }

     // TODO DRY/Move
     let newLoc = {
       address: query.address || this.state.address,
       code: '',
       favorite: false,
       lat: query.lat || this.state.lat,
       lng: query.lng || this.state.lng,
       loc: [],
       name: query.name || this.state.name,
       neighborhood: query.neighborhood || this.state.neighborhood,
       zip: query.zip || this.state.zip
     }

     this.setState({
       query:query,
       newLoc: newLoc
     });
   }

  handleFormSubmit = e => {
    e.preventDefault();
    const { newLoc } = this.state;
    let message;

    if (!newLoc.name || !newLoc.address || !newLoc.code || !newLoc.neighborhood) {
      message = 'Please fill out all the information.';
      this.setState({message:message})
      return;
    }

    this.sendNewEntry();
  }

  sendNewEntry = () => {
    let locCollection = firebase.firestore().collection('locations');

    locCollection.doc().set(this.state.newLoc)
      .then(function() {
          console.log("Document successfully written!");
      })
      .catch(function(error) {
          console.error("Error writing document: ", error);
      }
    );
  }

  handleClearForm = e => {
    console.log('clearing form ', e)
    // e.preventDefault();
    // this.setState({
    //   newUser: {
    //     name: '',
    //     age: '',
    //     gender: '',
    //     skills: [],
    //     about: ''
    //   },
    // })
  }

  componentDidMount() {
    const { google } = this.props;

    this.autocomplete = new google.maps.places.Autocomplete(
      this.autocompleteInput.current,{'types': ['establishment']}
    ); //,'address'

    this.autocomplete.addListener('place_changed', this.handlePlaceChanged);
  }

  render() {
    console.log(this.state.newLoc)
    return (
      <div>
        <form className="container" onSubmit={this.handleFormSubmit}>

          <input ref={this.autocompleteInput}  id="autocomplete" style={{width:'500px'}}
            placeholder="Enter your address"
            type="text">
          </input>

          <br />
          <br />

          <Input type={'text'}
            title={'Name'}
            name={'name'}
            value={this.state.newLoc.name}
            placeholder={'Name'}
            handleChange={this.handleInput}
          />
          <Input type={'text'}
            title={'Street Address'}
            name={'address'}
            value={this.state.newLoc.address}
            placeholder={'Street Address'}
            handleChange={this.handleInput}
          />
          <Input type={'text'}
            title={'Code'}
            name={'code'}
            value={this.state.newLoc.code}
            placeholder={'Enter the code'}
            handleChange={this.handleInput}
          />
          <TextArea type={'text'}
            title={'Notes'}
            name={'note'}
            value={this.state.newLoc.note}
            placeholder={'Details - floor, room, etc'}
            handleChange={this.handleInput}
          />
          <Select title={'Neighborhood'}
            name={'neighborhood'}
            options={this.state.neighborhoods}
            value={this.state.newLoc.neighborhood}
            rows={3}
            placeholder={'Select Neighborhood'}
            handleChange={this.handleInput}
          />
          <br />
          <br />

          <CheckBox
            title={'Mark as Favorite?'}
            name={'favorite'}
            options={this.state.newLoc.favorite}
            value={this.state.newLoc.favorite}
            handleChange={this.handleCheckBox}
          />

          {this.state.message &&
            <div>
              <br />
              <br />
              <div>{this.state.message}</div>
            </div>
          }

          <br />

          <Button text={'Submit'} action={this.handleSubmit} />&nbsp;&nbsp;
          <Button text={'Clear Form'} action={this.handleClearForm}/>
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return state;
};

const mapDispatchToProps = {
  fetchMap,
};

// export default connect(
//   mapStateToProps,
//   mapDispatchToProps
// )(AddLocation);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(GoogleApiWrapper({
  apiKey: googleMapsAPIKey
})(AddLocation));
