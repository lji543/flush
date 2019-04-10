import React from 'react';

import { connect } from 'react-redux';
import { GoogleApiWrapper } from 'google-maps-react';

import { fetchLocations } from '../actions/actions';
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

    if (!newLoc.name || !newLoc.address || !newLoc.neighborhood) {
      this.setState({errorMessage:'Please fill out all the information.'});
      return;
    }

    // if (!newLoc.code) {
    //   message = 'Is there a bathroom code?';
    //   this.setState({message:message})
    //   return;
    // }

    let locations = this.props.data.locations;
    let dup = false;
    locations.map(loc => {
      if ((loc.lat === this.state.newLoc.lat) && (loc.lng === this.state.newLoc.lng)) {
        return dup = true;
      }
      return false;
    })

    if (dup) {
      // TODO add link to entry so user can edit
      this.setState({errorMessage:'Looks like this bathroom has already been added!'});
    } else {
      this.sendNewEntry();
    }
  }

  sendNewEntry = () => {
    let locCollection = firebase.firestore().collection('locations');

    locCollection.add(this.state.newLoc)
      .then((docRef) => {
          console.log("Document successfully written!", docRef);
          locCollection.doc(docRef.id).update({id: docRef.id})
            .then(() => {
              this.setState({
                errorMessage: '',
                message: "Thanks for sharing!!",
                query: null,
                newLoc: locationSchema,
                addAnother:true,
                autocomplete: null
              })
              document.getElementById('autocomplete').value = null;
            })
      })
      .catch(error => {
          console.error("Error writing document: ", error);
          this.setState({
            message: '',
            errorMessage: "Error - entry did not send.",
            query: this.state.query,
            newLoc: this.state.newLoc
          })
      })
  }

  handleAddAnother = e => {
    this.setState({
      addAnother:!this.state.addAnother,
      message: ''
    });
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

    this.props.fetchLocations();

    this.autocomplete = new google.maps.places.Autocomplete(
      this.autocompleteInput.current,{'types': ['establishment']}
    ); //,'address'

    this.autocomplete.addListener('place_changed', this.handlePlaceChanged);
  }

  render() {
    return (
      <div>

        <input ref={this.autocompleteInput}
        id="autocomplete" style={{width:'250px',height:'48px'}}
        placeholder="Where's the bathroom?"
        type="text">
        </input>

        {this.state.addAnother && (
          <Button text={'Add Another?'} action={this.handleAddAnother}/>
        )}

        <br />
        <br />

        {this.state.query && (
          <form className="container" onSubmit={this.handleFormSubmit}>

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
              rows={3}
              handleChange={this.handleInput}
            />
            <br />
            <Select title={'Neighborhood'}
              name={'neighborhood'}
              options={this.state.neighborhoods}
              value={this.state.newLoc.neighborhood}
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

            {this.state.errorMessage &&
              <div>
              <br />
              <br />
              <div>{this.state.errorMessage}</div>
              </div>
            }

            <br />

            <Button text={'Submit'} action={this.handleFormSubmit} />&nbsp;&nbsp;
            <Button text={'Clear Form'} action={this.handleClearForm}/>
          </form>
        )}

        {this.state.message &&
          <div>
          <br />
          <br />
          <div>{this.state.message}</div>
          </div>
        }

      </div>
    );
  }
}

const mapStateToProps = state => {
  return state;
};

const mapDispatchToProps = {
  fetchLocations,
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
