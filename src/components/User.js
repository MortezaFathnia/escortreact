import React, { Component, createRef } from 'react';
import { Map, Marker, Popup, TileLayer } from 'react-leaflet';
import BottomBar from '../layout/ButtomBar';
import L from 'leaflet';

export const pointerIcon = new L.Icon({
  iconUrl: require('../assets/pointerIcon.svg'),
  iconRetinaUrl: require('../assets/pointerIcon.svg'),
  iconAnchor: [5, 55],
  popupAnchor: [10, -44],
  iconSize: [25, 55],
  shadowUrl: '../assets/marker-shadow.png',
  shadowSize: [68, 95],
  shadowAnchor: [20, 92]
});

export const pin = new L.Icon({
  iconUrl: require('../assets/img/pin.svg'),
  iconRetinaUrl: require('../assets/img/pin.svg'),
  iconAnchor: [20, 40],
  popupAnchor: [0, -35],
  iconSize: [40, 40],
  shadowUrl: '../assets/marker-shadow.png',
  shadowSize: [29, 40],
  shadowAnchor: [7, 40]
});

// class User extends Component {
//   state = {
//     lat: 36.311842,
//     lng: 59.56454,
//     zoom: 13
//   };

//   render() {
//     const position = [this.state.lat, this.state.lng];
//     const position2 = [36.3187, 59.56458];
//     return (
//       <Map center={position} zoom={this.state.zoom}>
//         <TileLayer url="http://185.252.28.133/hot/{z}/{x}/{y}.png" />
//         <Marker position={position} icon={pointerIcon}>
//           <Popup>
//             A pretty CSS3 popup. <br /> Easily customizable.
//           </Popup>
//         </Marker>
//         <Marker position={position2} icon={suitcasePoint}>
//           <Popup>
//             A pretty CSS3 popup. <br /> Easily customizable.
//           </Popup>
//         </Marker>
//       </Map>
//     );
//   }
// }

class User extends Component {
  state = {
    center: {
      lat: 36.31184,
      lng: 59.564
    },
    markerSource: {
      lat: 36.311842,
      lng: 59.56454
    },
    setSource: false,
    markerDestination: {
      lat: 36.311842,
      lng: 59.56454
    },
    zoom: 13,
    draggable: true,
    draggabledestination: true
  };
  // $FlowFixMe: ref
  refmarker = createRef();

  toggleDraggable = () => {
    const marker = this.refmarker.current;
    this.setState({ draggable: !this.state.draggable });
    marker.leafletElement.setIcon(pin);
  };

  updatePosition = () => {
    const marker = this.refmarker.current;
    if (marker != null) {
      this.setState({
        markerSource: marker.leafletElement.getLatLng()
      });
    }
  };

  render() {
    const position = [this.state.center.lat, this.state.center.lng];
    const markerSourcePosition = [
      this.state.markerSource.lat,
      this.state.markerSource.lng
    ];

    return (
      <div>
        <Map center={position} zoom={this.state.zoom}>
          <TileLayer url="http://185.252.28.133/hot/{z}/{x}/{y}.png" />
          <Marker
            draggable={this.state.draggable}
            onDragend={this.updatePosition.bind(this)}
            position={markerSourcePosition}
            ref={this.refmarker}
          >
            <Popup minWidth={90}>
              <span onClick={this.toggleDraggable.bind(this)}>
                {this.state.draggable ? 'DRAG MARKER' : 'MARKER FIXED'}
              </span>
            </Popup>
          </Marker>
          {/* {this.state.setSource ? (
            <Marker
              draggable={this.state.draggabledestination}
              onDragend={this.updatePosition}
              position={markerSourcePosition}
              ref={this.refmarker}
            >
              <Popup minWidth={90}>
                <span onClick={this.toggleDraggable}>
                  {this.state.draggable ? 'DRAG MARKER' : 'MARKER FIXED'}
                </span>
              </Popup>
            </Marker>
          ) : null} */}
        </Map>
        <BottomBar submitSource={this.toggleDraggable.bind(this)} />
      </div>
    );
  }
}
export default User;
