import React, { Component } from 'react';
import classes from './ButtomBar.module.css';
import Arrow from '../assets/img/arrow';
import profilePhoto from '../assets/img/profile.jpeg';
import ToggleButton from 'react-toggle-button';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import WomenCar from '../assets/img/womenCar';
import ClassicCar from '../assets/img/classicCar';
import LuxCar from '../assets/img/LuxCar';
import { Consumer } from '../context';
import Cookies from 'universal-cookie';
import axios from 'axios';

const marks = {
  10: '1000',
  20: '2000',
  30: '3000',
  40: '4000',
  50: '5000',
  60: {
    style: {
      color: '#fff'
    },
    label: <strong>6000</strong>
  }
};

class ButtomBar extends Component {
  state = {
    immediateTravel: false,
    addedcost: 0,
    type: 0
  };
  onSubmit = async e => {
    e.preventDefault();
    this.props.submitSource();
  };
  sendRequest = async (dispatch, value, e) => {
    e.preventDefault();
    console.log(value);
    const cookies = new Cookies();
    const resTravel = await axios.post(
      'http://185.252.28.132:8069/api/TripRequestByCustomer',
      {
        customerId: Number(cookies.get('userId')),
        tripRequestId: '',
        firstName: 'مرتضی',
        lastName: 'فتح نیا',
        mobile: '09156193976',
        sorceLat: value.sorceLat,
        sorceLng: value.sorceLng,
        sorceAddress: value.sourceAddress,
        regionSrc: 0,
        regionDes: 0,
        oodOreven: 2,
        destinationLat: value.destinations[0].Lat,
        destinationLng: value.destinations[0].Lng,
        destinationAddress: value.destinations[0].Address,
        tripTypeId: value.report.tripTypeID,
        traficFlag: 0,
        timeTrip: value.timeTrip,
        specialPlaceFlag: 0,
        requestCount: 1,
        tripStopTime: 0,
        regionId: 0,
        PredictTripDistanc: value.predictDist,
        PredictTripWatingDistanc: 0,
        cost: value.report.totalPrice,
        proposalPrice: this.state.addedcost,
        promoCode: '',
        discountval: 0,
        increesPrice: 0,
        tripPriceId: value.report.tripPriceId,
        payableVal: 0,
        grossRevenue: 0,
        otherDestination: []
      },
      {
        headers: {
          token: cookies.get('token')
        }
      }
    );
    console.log(resTravel.data);
    dispatch({
      type: 'TRAVELREQUEST',
      payload: {
        tripRequestId: resTravel.tripRequestId
      }
    });
  };
  log = (dispatch, value) => {
    this.setState({
      addedcost: (value / 10) * 10000
    });
    dispatch({
      type: 'IMMADIATETRAVEL',
      payload: {
        addedCost: this.state.addedcost
      }
    });
  };
  typeChange = (dispatch, e) => {
    this.setState({
      type: e.currentTarget.value
    });
    dispatch({
      type: 'CHANGETYPE',
      payload: {
        report: this.props.cost.report[this.state.type]
      }
    });
  };
  render() {
    const title = {
      borderBottom: '1px solid #454f63'
    };
    const submit = {
      border: '1px solid #454f63',
      color: 'white'
    };
    const textRight = {
      textAlign: 'right'
    };
    const styles = {
      container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        flex: 1,
        fontFamily: 'Helvetica Neue'
      },
      exampleContainer: {
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column'
      },
      titleStyle: {
        fontWeight: 500
      },
      subTitleStyle: {
        fontWeight: 500
      },
      exampleInternal: {
        display: 'flex',
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
      },
      informationBlock: {
        display: 'flex',
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
      },
      toggleContainer: {
        height: 100,
        width: 800,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-start'
      },
      descriptionStyle: {
        lineHeight: 1.5,
        fontWeight: 500,
        fontSize: 14,
        marginLeft: 50,
        width: 800,
        overflow: 'auto'
      },
      codeBlock: {
        display: 'flex',
        flex: 1,
        width: 800,
        overflow: 'auto',
        backgroundColor: '#f5f5f5',
        fontSize: 13,
        padding: 10,
        border: '1px solid #ccc',
        borderRadius: 4,
        marginBottom: -20
      }
    };

    return (
      <Consumer>
        {value => {
          const { dispatch } = value;
          return (
            <div>
              <form
                className={classes.bottomBarContainer}
                onSubmit={this.onSubmit.bind(this)}
              >
                <input
                  className="btn btn-block"
                  type="submit"
                  value={!this.props.setsrc ? 'تایید مبدا' : 'تایید مقصد'}
                  style={{
                    zIndex: 50000,
                    color: 'white',
                    background: '#2e5bff',
                    width: '600px',
                    marginBottom: '3em'
                  }}
                />
              </form>
              {this.props.placesfixed ? (
                <form
                  onSubmit={this.sendRequest.bind(this, dispatch, value)}
                  className={classes.bottomBarContainer}
                >
                  <div className={classes.bottomBar}>
                    <div className="row">
                      <div className="col-md-6">
                        <div className={classes.title}>
                          <p className={classes.driverName}>ساعت اوج</p>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <p className={classes.price}>
                          <span style={{ marginLeft: '3px' }}>
                            {this.props.cost.report[this.state.type]
                              .totalPrice + this.state.addedcost}
                          </span>
                          {this.state.immediateTravel ? (
                            <React.Fragment>
                              <Arrow width="30px" fill="#fff" />
                              <span style={{ marginRight: '3px' }}>
                                {
                                  this.props.cost.report[this.state.type]
                                    .totalPrice
                                }
                              </span>
                            </React.Fragment>
                          ) : (
                            ''
                          )}
                        </p>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-6" style={textRight}>
                        <ToggleButton
                          inactiveLabel={''}
                          activeLabel={''}
                          colors={{
                            activeThumb: {
                              base: 'rgb(250,250,250)'
                            },
                            inactiveThumb: {
                              base: 'rgb(62,130,247)'
                            },
                            active: {
                              base: 'rgb(207,221,245)',
                              hover: 'rgb(177, 191, 215)'
                            },
                            inactive: {
                              base: 'rgb(65,66,68)',
                              hover: 'rgb(95,96,98)'
                            }
                          }}
                          trackStyle={styles.trackStyle}
                          thumbStyle={styles.thumbStyle}
                          thumbAnimateRange={[-10, 36]}
                          value={this.state.immediateTravel}
                          onToggle={value => {
                            this.setState({
                              immediateTravel: !this.state.immediateTravel,
                              addedcost: 10000
                            });
                          }}
                        />
                      </div>
                      {this.state.immediateTravel ? (
                        <div className="col-md-6">
                          <Slider
                            dots
                            min={10}
                            marks={marks}
                            step={10}
                            onChange={this.log.bind(this, dispatch)}
                            defaultValue={10}
                            max={60}
                          />
                        </div>
                      ) : (
                        ''
                      )}
                    </div>
                    <div className="row">
                      <div className="col-md-12" style={textRight}>
                        <p>نوع سرویس را انتخاب کنید:</p>
                      </div>
                    </div>
                    <div
                      className="row"
                      style={{
                        display: 'flex',
                        justifyContent: 'space-around'
                      }}
                    >
                      <input
                        className={classes.serviceInput}
                        type="radio"
                        name="type"
                        id="classic"
                        style={{ margin: '0 0 10px 20px', display: 'none' }}
                        defaultChecked
                        value="0"
                        onChange={this.typeChange.bind(this, dispatch)}
                      />
                      <label className={classes.serviceType} htmlFor="classic">
                        <ClassicCar width="50" height="50" />
                        کلاسیک
                      </label>
                      <input
                        className={classes.serviceInput}
                        type="radio"
                        name="type"
                        id="lux"
                        style={{ margin: '0 0 10px 20px', display: 'none' }}
                        value="2"
                        onChange={this.typeChange.bind(this, dispatch)}
                      />
                      <label className={classes.serviceType} htmlFor="lux">
                        <LuxCar width="50" height="50" />
                        لوکس
                      </label>
                      <input
                        className={classes.serviceInput}
                        type="radio"
                        name="type"
                        id="women"
                        style={{ margin: '0 0 10px 20px', display: 'none' }}
                        value="1"
                        onChange={this.typeChange.bind(this, dispatch)}
                      />
                      <label className={classes.serviceType} htmlFor="women">
                        <WomenCar width="50" height="50" />
                        بانوان
                      </label>
                    </div>
                    <input
                      style={{ color: 'white', background: '#2E5BFF' }}
                      className="btn btn-block"
                      type="submit"
                      value="درخواست سفر"
                    />
                  </div>
                </form>
              ) : (
                ''
              )}

              {this.props.sendrequest ? (
                <div className={classes.bottomBarContainer}>
                  <div className={classes.bottomBar}>
                    <div className="row" style={title}>
                      <div className="col-md-6">
                        <img
                          src={profilePhoto}
                          className={classes.profilePhoto}
                          alt="profile"
                        />
                        <div className={classes.title}>
                          <p className={classes.driverName}>احسان کریمی</p>
                          <p className={classes.carName}>پژو 405 سورمه ای</p>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <p className={classes.carNumber}>
                          551 و 36 <span>15</span>
                        </p>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-6" style={textRight}>
                        <p>3 دقیقه</p>
                      </div>
                      <div className="col-md-6">
                        <button>
                          <i className="fas fa-envelope" />
                        </button>
                        <button>
                          <i className="fas fa-phone" />
                        </button>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-6" style={textRight}>
                        <p>3500 تومان نقدی پرداخت کنید</p>
                      </div>
                      <div className="col-md-6">
                        <a href="">پرداخت اعتباری</a>
                      </div>
                    </div>
                    <input
                      style={submit}
                      className="btn btn-block"
                      type="submit"
                      value="لغو سفر"
                    />
                  </div>
                </div>
              ) : (
                ''
              )}
            </div>
          );
        }}
      </Consumer>
    );
  }
}
export default ButtomBar;
