import React, { Component, createRef } from 'react';
import { Map, Marker, Popup, TileLayer } from 'react-leaflet';
import BottomBar from '../layout/ButtomBar';
import L from 'leaflet';
import axios from 'axios';
import { Consumer } from '../context';

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
    markerDestination: {
      lat: 36.311842,
      lng: 59.56454
    },
    srcfixed: false,
    distfixed: false,
    zoom: 13,
    draggablesource: true,
    draggabledestination: true,
    placesfixed: false,
    sendrequest: false
  };
  refmarker = createRef();
  refdistmarker = createRef();

  toggleDraggable = async (dispatch, e) => {
    const marker = this.refmarker.current;
    const distmarker = this.refdistmarker.current;
    if (marker != null && !this.state.srcfixed) {
      this.setState({
        draggablesource: !this.state.draggablesource,
        srcfixed: !this.state.setsrc
      });

      const res = await axios.post(
        `http://185.252.28.133/reverse.php?format=json&accept-language=fa&lat=${
          this.state.markerSource.lat
        }&lon=${this.state.markerSource.lng}`
      );
      if (res.status === 200) {
        console.log(res.data.address);
        dispatch({
          type: 'SOURCE',
          payload: {
            lat: this.state.markerSource.lat,
            lan: this.state.markerSource.lng,
            address: res.data.address
          }
        });
        marker.leafletElement.setIcon(pin);
      } else {
        console.log(res.data.errorMassage);
      }
    }
    if (distmarker != null && !this.state.distfixed) {
      this.setState({
        draggabledestination: !this.state.draggabledestination,
        distfixed: !this.state.setdist,
        placesfixed: !this.state.placesfixed
      });
      const res = await axios.post(
        `http://185.252.28.133/reverse.php?format=json&accept-language=fa&lat=${
          this.state.markerDestination.lat
        }&lon=${this.state.markerDestination.lng}`
      );
      if (res.status === 200) {
        dispatch({
          type: 'DISTINATION',
          payload: {
            lat: this.state.markerDestination.lat,
            lan: this.state.markerDestination.lng,
            address: res.data.address
          }
        });
        distmarker.leafletElement.setIcon(pin);
      } else {
        console.log(res.data.errorMassage);
      }
    }
  };

  updatePosition = type => {
    const marker = this.refmarker.current;
    const distmarker = this.refdistmarker.current;

    if (marker != null && type === 'src') {
      this.setState({
        markerSource: marker.leafletElement.getLatLng()
      });
    } else if (distmarker != null && type === 'dist') {
      this.setState({
        markerDestination: distmarker.leafletElement.getLatLng()
      });
    }
  };

  travelRequest = type => {};

  render() {
    const position = [this.state.center.lat, this.state.center.lng];
    const markerSourcePosition = [
      this.state.markerSource.lat,
      this.state.markerSource.lng
    ];

    const markerDistinationPosition = [
      this.state.markerDestination.lat,
      this.state.markerDestination.lng
    ];

    return (
      <Consumer>
        {value => {
          const { dispatch } = value;
          return (
            <div>
              <Map center={position} zoom={this.state.zoom}>
                <TileLayer url="http://185.252.28.133/hot/{z}/{x}/{y}.png" />
                <Marker
                  id="src"
                  draggable={this.state.draggablesource}
                  onDragend={this.updatePosition.bind(this, 'src')}
                  position={markerSourcePosition}
                  ref={this.refmarker}
                >
                  <Popup minWidth={90}>
                    <span onClick={this.toggleDraggable.bind(this, dispatch)}>
                      {this.state.draggable ? 'DRAG MARKER' : 'MARKER FIXED'}
                    </span>
                  </Popup>
                </Marker>
                {this.state.srcfixed ? (
                  <Marker
                    id="dist"
                    draggable={this.state.draggabledestination}
                    onDragend={this.updatePosition.bind(this, 'dist')}
                    position={markerDistinationPosition}
                    ref={this.refdistmarker}
                  >
                    <Popup minWidth={90}>
                      <span onClick={this.toggleDraggable.bind(this, dispatch)}>
                        {this.state.draggable ? 'DRAG MARKER' : 'MARKER FIXED'}
                      </span>
                    </Popup>
                  </Marker>
                ) : null}
              </Map>
              <BottomBar
                submitSource={this.toggleDraggable.bind(this, dispatch)}
                setsrc={this.state.srcfixed}
                placesfixed={this.state.placesfixed}
                travelRequest={this.travelRequest.bind(this)}
                sendrequest={false}
              />
            </div>
          );
        }}
      </Consumer>
    );
  }
}
export default User;
