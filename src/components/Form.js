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

class Form extends React.Component {
  constructor(props) {
    super(props)

    this.autocompleteInput = React.createRef();
    this.autocomplete = null;
    this.handlePlaceChanged = this.handlePlaceChanged.bind(this);

    this.state = {
      query: null,
      newLoc: locationSchema,
      neighborhoods: neighborhoods,
      message: '',
      errorMessage: '',
      addAnother: false,
    }
  }

  handleInput = e => {
    let value = e.target.value;
    let name = e.target.name;
    let errorMessage = ''

    this.setState( prevState => {
        return {
          newLoc: {
            ...prevState.newLoc, [name]: value
           },
          errorMessage: errorMessage
        }
      }//, () => console.log(this.state.newLoc)
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
     address: query.address || this.state.newLoc.address,
     code: '',
     favorite: false,
     lat: query.lat || this.state.newLoc.lat,
     lng: query.lng || this.state.newLoc.lng,
     loc: [],
     name: query.name || this.state.newLoc.name,
     neighborhood: query.neighborhood || this.state.newLoc.neighborhood,
     note: this.state.newLoc.note,
     zip: query.zip || this.state.newLoc.zip
   }

     // TODO dont need all of these
     this.setState({
       query:query,
       newLoc: newLoc
     });
   }

  handleFormSubmit = e => {
    e.preventDefault();
    const { newLoc } = this.state;
    let errorMessage;

    if (!newLoc.name || !newLoc.address || !newLoc.neighborhood) {
      this.setState({errorMessage:'Please fill out all the information.'});
      return;
    }

    let locations = this.props.data.locations;
    let dup = false;
    locations.map(loc => {
      if ((loc.lat === this.state.newLoc.lat) && (loc.lng === this.state.newLoc.lng)) {
        dup = true;
      }
    })

    if (dup) {
      // TODO add link to entry so user can edit
      this.setState({errorMessage:'Looks like this bathroom has already been added!'});
    } else {
      this.sendNewEntry();
    }
  }

  componentDidMount() {

  }

  // name={'name'}
  // <Button text={'Save'} action={this.handleFormSubmit} />&nbsp;&nbsp;
  // <Button text={'Cancel'} action={this.handleClearForm}/>
  render() {
    return (
      <div>
        <form className="container" onSubmit={this.handleFormSubmit} style={{display:'inline-block'}}>
            <Input type={'text'}
              value={this.props.prop}
              handleChange={this.handleInput}
            />
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
)(Form);

// export default connect(
//   mapStateToProps,
//   mapDispatchToProps
// )(GoogleApiWrapper({
//   apiKey: googleMapsAPIKey
// })(Form));
