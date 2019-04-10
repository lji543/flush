import React from 'react';

class InfoWindow extends React.Component {
  // constructor(props) {
  //   super(props);
  //
  // }

  componentDidUpdate(prevProps) {
    console.log(prevProps)
    if ((this.props.map !== prevProps.map) ||
      (this.props.position !== prevProps.position)) {
        this.renderMarker();
    }
  }

  render() {
    const { loc } = this.props;
    console.log(this.props)
    return (
      <div>
        <div>{loc.name}</div>
        <div>Code: {(loc.code) ? loc.code : 'None'}</div>
        <div>{loc.notes}</div>
      </div>
    )
  }
};

export default InfoWindow;
