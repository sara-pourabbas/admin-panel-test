import React, { Component} from 'react';
import {Container} from 'reactstrap';
import {CheckToken} from "../../Utility";
import GoogleMapReact from 'google-map-react';

const AnyReactComponent = ({ text }) => <div>{text}</div>;
class Map extends Component {
  constructor(props){
    super(props);
    CheckToken(props);
  }
  static defaultProps = {
    center: {
      lat: 59.95,
      lng: 30.33,
    },
    zoom: 11
  };
  render() {
    return (
      <div className="animated fadeIn">
        <Container className='text-center'>
          <div style={{ height: '100vh', width: '100%' }}>
            <GoogleMapReact
              bootstrapURLKeys={{ key: 'AIzaSyAmKTtH63o6XXc2nDS6WKlq05m9Aa5P96U'}}
              defaultCenter={this.props.center}
              defaultZoom={this.props.zoom}
            >
              <AnyReactComponent
                lat={59.955413}
                lng={30.337844}
                text="My Marker"
              />
            </GoogleMapReact>
          </div>
        </Container>
      </div>
    );
  }
}

export default Map;
