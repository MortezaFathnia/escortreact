import React, { Component, createRef } from 'react';
import { Map, Marker, Popup, TileLayer } from 'react-leaflet';
import BottomBar from '../layout/ButtomBar';

class User extends Component {
  state = {
    center: {
      lat: 36.31184,
      lng: 59.564
    },
    marker: {
      lat: 36.311842,
      lng: 59.56454
    },
    zoom: 13,
    draggable: true
  };
  // $FlowFixMe: ref
  refmarker = createRef();

  toggleDraggable = () => {
    this.setState({ draggable: !this.state.draggable });
  };

  updatePosition = () => {
    const marker = this.refmarker.current;
    if (marker != null) {
      this.setState({
        marker: marker.leafletElement.getLatLng()
      });
    }
  };

  render() {
    const position = [this.state.center.lat, this.state.center.lng];
    const markerPosition = [this.state.marker.lat, this.state.marker.lng];

    return (
      <div>
        <Map center={position} zoom={this.state.zoom}>
          <TileLayer url="http://185.252.28.133/hot/{z}/{x}/{y}.png" />
          <Marker
            draggable={this.state.draggable}
            onDragend={this.updatePosition}
            position={markerPosition}
            ref={this.refmarker}
          >
            <Popup minWidth={90}>
              <span onClick={this.toggleDraggable}>
                {this.state.draggable ? 'DRAG MARKER' : 'MARKER FIXED'}
              </span>
            </Popup>
          </Marker>
        </Map>
        <BottomBar />
      </div>
    );
  }
}
export default User;
