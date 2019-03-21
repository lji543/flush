import React from 'react';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

import { connect } from 'react-redux';
import { fetchLocations } from '../actions/actions';

class Favorites extends React.Component {
  constructor() {
    super()

    this.state = {
      locs: []
    }
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
      <Paper>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell></TableCell>
              <TableCell align="right">Address</TableCell>
              <TableCell align="right">Code</TableCell>
              <TableCell align="right">Neighborhood</TableCell>
              <TableCell align="right">Notes</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {this.state.locs.map((loc,idx) => {
              if (loc.favorite) {
                return (
                  <TableRow key={idx}>
                    <TableCell component="th" scope="loc">
                    {loc.name}
                    </TableCell>
                    <TableCell align="right">{loc.address}</TableCell>
                    <TableCell align="right">{loc.code}</TableCell>
                    <TableCell align="right">{loc.neighborhood}</TableCell>
                    <TableCell align="right">{loc.note}</TableCell>
                  </TableRow>
                )
              }
            })}
          </TableBody>
        </Table>
      </Paper>
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
