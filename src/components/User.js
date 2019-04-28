import React, { Component, createRef } from 'react';
import { Map, Marker, Popup, TileLayer } from 'react-leaflet';
import BottomBar from '../layout/ButtomBar';
import L from 'leaflet';
import axios from 'axios';
import { Consumer } from '../context';
import Cookies from 'universal-cookie';
import TopBar from '../layout/TopBar';

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
    sourceAddress: {},
    markerDestination: {
      lat: 36.311842,
      lng: 59.56454
    },
    srcfixed: false,
    distfixed: false,
    zoom: 13,
    cost: {},
    draggablesource: true,
    draggabledestination: true,
    placesfixed: false,
    sendrequest: false
  };
  refmarker = createRef();
  refdistmarker = createRef();

  toggleDraggable = async (dispatch, value, e) => {
    const marker = this.refmarker.current;
    const distmarker = this.refdistmarker.current;

    if (marker != null && !this.state.srcfixed) {
      const ressrc = await axios.post(
        `http://185.252.28.133/reverse.php?format=json&accept-language=fa&lat=${
          this.state.markerSource.lat
        }&lon=${this.state.markerSource.lng}`
      );
      if (ressrc.status === 200) {
        const src = {
          lat: this.state.markerSource.lat,
          lan: this.state.markerSource.lng,
          address: ressrc.data.address.city + ' , ' + ressrc.data.address.road
        };
        dispatch({
          type: 'SOURCE',
          payload: src
        });
        this.setState({
          draggablesource: !this.state.draggablesource,
          srcfixed: !this.state.setsrc,
          sourceAddress: src.address
        });
        marker.leafletElement.setIcon(pin);
      } else {
        console.log(ressrc.data.errorMassage);
      }
    }
    if (distmarker != null && !this.state.distfixed) {
      this.setState({
        draggabledestination: !this.state.draggabledestination,
        distfixed: !this.state.setdist
      });
      const resdist = await axios.post(
        `http://185.252.28.133/reverse.php?format=json&accept-language=fa&lat=${
          this.state.markerDestination.lat
        }&lon=${this.state.markerDestination.lng}`
      );
      if (resdist.status === 200) {
        const cookies = new Cookies();
        const distroad = resdist.data.neighbourhood
          ? resdist.data.neighbourhood
          : resdist.data.address.road;
        const distinations = [
          {
            Lat: this.state.markerDestination.lat,
            Lng: this.state.markerDestination.lng,
            Address: resdist.data.address.city + ' , ' + distroad
          }
        ];
        const resCost = await axios.post(
          'http://185.252.28.132:8069/api/CostCalculat',
          {
            customerId: cookies.get('userId'),
            sorceLng: this.state.markerSource.lng,
            sorceLat: this.state.markerSource.lat,
            sorceAddress: this.state.sourceAddress,
            tripStopTime: 0,
            Destinations: distinations,
            promoCode: ''
          },
          {
            headers: {
              token: cookies.get('token')
            }
          }
        );
        if (resCost.status === 200) {
          console.log(distinations);
          dispatch({
            type: 'DISTINATION',
            payload: distinations
          });
          this.setState({
            placesfixed: !this.state.placesfixed,
            cost: resCost.data.data
          });
          distmarker.leafletElement.setIcon(pin);
        } else {
          console.log(resCost.data.errorMassage);
        }
      } else {
        console.log(resdist.data.errorMassage);
      }
    }
  };

  costCalculate = async value => {
    console.log(value);
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

  travelRequest = async e => {};

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
            <React.Fragment>
              <TopBar />
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
                    <span
                      onClick={this.toggleDraggable.bind(this, dispatch, value)}
                    >
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
                      <span
                        onClick={this.toggleDraggable.bind(
                          this,
                          dispatch,
                          value
                        )}
                      >
                        {this.state.draggable ? 'DRAG MARKER' : 'MARKER FIXED'}
                      </span>
                    </Popup>
                  </Marker>
                ) : null}
              </Map>
              <BottomBar
                submitSource={this.toggleDraggable.bind(this, dispatch, value)}
                setsrc={this.state.srcfixed}
                placesfixed={this.state.placesfixed}
                cost={this.state.cost}
                travelRequest={this.travelRequest.bind(this)}
                sendrequest={false}
              />
            </React.Fragment>
          );
        }}
      </Consumer>
    );
  }
}
export default User;
