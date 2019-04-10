import React from 'react';

// import Table from '@material-ui/core/Table';
// import TableBody from '@material-ui/core/TableBody';
// import TableCell from '@material-ui/core/TableCell';
// import TableHead from '@material-ui/core/TableHead';
// import TableRow from '@material-ui/core/TableRow';
// import Paper from '@material-ui/core/Paper';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Typography from '@material-ui/core/Typography';

import Favorite from '@material-ui/icons/Favorite';

import Button from '../components/utility/Button'
import EditForm from '../components/EditForm'

import { connect } from 'react-redux';
import { fetchLocations, deleteLoc } from '../actions/actions';
import firebase from '../staticConfig/firebase';

class ListView extends React.Component {
  constructor() {
    super()

    this.state = {
      locs: [],
    }
  }

  showEditing = loc => {
    let locs = this.state.locs.map(cloc => {
      if ((cloc.lat === loc.lat) && (cloc.lng === loc.lng) && (cloc.name === loc.name)) {
        if (cloc.isEditing) {
          cloc.isEditing = !cloc.isEditing
        } else {
          cloc.isEditing = true;
        }
      } else {
        cloc.isEditing = false;
      }
      return cloc;
    });
    this.setState({locs:locs})
  }

  handleEdit = loc => {
    console.log('editing ',loc)
  }

  handleSave = loc => {
    let locRef = firebase.firestore().collection('locations').doc(loc.id);
    loc.isEditing = false;
    let updatedLocs = this.state.locs.map(l => {
      if (l.id === loc.id) {
        l = loc;
      }
      return l;
    })

    // TODO: use map, etc to only update what actually changed
    return locRef.update(loc)
      .then(() => {
        console.log('successfully updated ')
        this.setState({
          locs: updatedLocs
        });
      })
      .catch(error => {
        console.log('error ', error)
        loc.isEditing = true;
        // TODO add error message
      })

  }

  handleDelete = loc => {
    let locCollection = firebase.firestore().collection('locations');
    let tquery = locCollection
      .where('lat','==',loc.lat)
      .where('lng','==',loc.lng)
      .where('name','==',loc.name);

    tquery.get().then(querySnapshot => {
      querySnapshot.forEach(doc => {
        doc.ref.delete();
      });
    })
    .then(() => {
      locCollection.get().then((snapshot) => {
        let locations = [];
        snapshot.forEach(doc => {
          locations.push(doc.data());
        });
        this.setState({locs:locations})
      })
      console.log('doc successfully deleted ')
    })
    .catch(error => {
      console.error("Error deleting document: ", error);
    });
  }

  createRow = (loc,idx) => {
    if (loc.isEditing) {
      return (
        <div key={idx}>
          <EditForm
            handleEdit={this.handleEdit}
            handleSave={this.handleSave}
            handleCancel={this.showEditing}
            loc={loc}
          />
        </div>
      )
    } else {
      return (
        <div key={idx} style={{display:'flex'}}>
          <Typography style={{padding:'4px 12px'}} variant="body1" gutterBottom>{loc.name}</Typography>
          <Typography style={{padding:'4px 12px'}} variant="body1" gutterBottom>{loc.address}</Typography>
          <Typography style={{padding:'4px 12px'}} variant="body1" gutterBottom>{loc.code}</Typography>
          <Typography style={{padding:'4px 12px'}} variant="body1" gutterBottom>{loc.neighborhood}</Typography>
          <Typography style={{padding:'4px 12px'}} variant="body1" gutterBottom>{loc.note}</Typography>
          <div style={{padding:'4px 12px'}}>
            {loc.favorite &&
              <Favorite/>
            }
          </div>
          <div align="right">
            <Button text={'Edit'} action={() => this.showEditing(loc)}/>
            <Button text={'Delete'} action={() => this.handleDelete(loc)} />
          </div>
        </div>
      )
    }
  }

  componentWillMount() {
    this.props.fetchLocations();
  }

  componentDidMount() {
    console.log('componentDidMount')
    let timeout;
    if (timeout) {
      clearTimeout(timeout);
      timeout = null;
    }
    timeout = setTimeout(() => {
      // console.log(this.props.data.locations.length > 0,
      //   this.state.locs !== this.props.data.locations)
      // if ((this.props.data.locations.length > 0 ) &&
      //   (this.state.locs !== this.props.data.locations)) {
      if (this.state.locs !== this.props.data.locations) {
          this.setState({locs:this.props.data.locations});
        }
    }, 620);
  }

  // componentDidUpdate(prevProps, prevState) {
  //   console.log(prevProps, prevState)
  //   if (this.props.data !== prevProps.data) {
  //     console.log(prevProps, prevState)
  //
  //   }
  // }

  render() {
    // TODO add mapping, fix styling
    // console.log('render')
    return (
      <div>
        <List>
          {this.state.locs.map((loc,idx) => (
            this.createRow(loc,idx)
          ))}
        </List>
      </div>
    );
  }
}
const mapStateToProps = state => {
  return state;
};

const mapDispatchToProps = {
  fetchLocations,
  deleteLoc
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ListView);
