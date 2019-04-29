import React, { Component } from 'react';

const Context = React.createContext();

const reducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN':
      return {
        ...state,
        number: action.payload
      };
    case 'CONFIRM':
      return {
        ...state,
        authenticated: action.payload
      };
    case 'SOURCE':
      return {
        sorceLat: action.payload.lat,
        sorceLng: action.payload.lan,
        sourceAddress: action.payload.address
      };
    case 'COSTCACULATE':
      return {
        destinations: action.payload.dist,
        timeTrip: action.payload.predictTime,
        predictDist: action.payload.predictDist
      };
    case 'TRAVELREQUEST':
      return {
        proposalPrice: action.payload.addedCost,
        report: action.payload.report
      };
    default:
      return state;
  }
};

export class Provider extends Component {
  state = {
    authenticated: false,
    number: '',
    os: '',
    sorceLng: '',
    sorceLat: '',
    sourceAddress: '',
    tripStopTime: '',
    tripRequestId: '',
    proposalPrice: '',
    report: '',
    price: '',
    destinations: [
      {
        Lng: '',
        lat: '',
        Address: ''
      }
    ],
    travelState: '',
    dispatch: action => this.setState(state => reducer(state, action))
  };

  render() {
    return (
      <Context.Provider value={this.state}>
        {this.props.children}
      </Context.Provider>
    );
  }
}

export const Consumer = Context.Consumer;
