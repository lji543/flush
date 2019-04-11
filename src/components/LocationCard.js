import React from 'react';

// import Button from '@material-ui/core/Button';
import Button from '../components/utility/Button';

import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Favorite from '@material-ui/icons/Favorite';
import Typography from '@material-ui/core/Typography';

class LocationCard extends React.Component {
  // constructor(props) {
  //   super(props);
  //
  // }

  render() {
    const { loc } = this.props;

    return (
      <Card className={""}>
        <CardContent>
          <Typography variant="h5" component="h2">
            {loc.name}
            <span style={{padding:'0 12px'}}>
              {loc.favorite &&
                <Favorite/>
              }
            </span>
          </Typography>
          <Typography className={""} color="textSecondary" gutterBottom>
            {loc.address}<span> • </span>{loc.neighborhood}
          </Typography>

          <Typography component="p">
            {(loc.code) ? `Code: ${loc.code}` : 'No Code'}
            <br />
            {(loc.note) ? loc.note : ''}
          </Typography>
        </CardContent>
        {this.props.buttons && <CardActions>
          {this.props.buttons.map((button,idx) => {
            return (
              <Button size="small" key={idx}
                text={button.text}
                action={() => button.action(loc)}
              />
            )
          })}
        </CardActions>}
      </Card>
    )
  }
};

export default LocationCard;
