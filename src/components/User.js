import React, { Component } from 'react';
import { Map, Marker, Popup, TileLayer } from 'react-leaflet';

class User extends Component {
  constructor() {
    super()
    this.state = {
      lat: 36.311842,
      lng: 59.56454,
      zoom: 13
    }
  }
  render() {
    const position = [this.state.lat, this.state.lng];
   
      return (
        <div>
        <Map center={position} zoom={this.state.zoom}>
          <TileLayer
            url='http://185.252.28.133/hot/{z}/{x}/{y}.png'
          />
          <Marker position={position}>
            <Popup>
              A pretty CSS3 popup. <br/> Easily customizable.
            </Popup>
          </Marker>
        </Map>
        </div>
      );
    
   
  }
}
export default User;