import React from 'react';

import LocationCard from '../components/LocationCard';

import { connect } from 'react-redux';
import { fetchLocations } from '../actions/actions';

class Favorites extends React.Component {
  constructor() {
    super()

    this.state = {
      locs: []
    }
  }

  handleRedirect = () => {
    this.props.history.push('/')
  }

  componentWillMount() {
    this.props.fetchLocations();
  }

  componentDidMount() {

    let timeout;
    if (timeout) {
      clearTimeout(timeout);
      timeout = null;
    }
    timeout = setTimeout(() => {
      if ((this.props.data.locations.length > 0 ) &&
        (this.state.locs !== this.props.data.locations)) {
          // console.log(this.props.data,Object.entries(this.props.data).length)
          this.setState({locs:this.props.data.locations});
        }
    }, 520);
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.data !== prevProps.data) {
      console.log(prevProps, prevState)

    }
  }

  render() {
    return (
      <div>
        {this.state.locs.map((loc,idx) => {
          if (loc.favorite) {
            return (
              <LocationCard key={idx}
                loc={loc}
                buttons={[{text:'View on MAP',action:this.handleRedirect}]}
              />
            )
          }
          return null;
        })}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return state;
};

const mapDispatchToProps = {
  fetchLocations
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Favorites);
