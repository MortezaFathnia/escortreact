import React, { Component } from 'react';
import classes from './ButtomBar.module.css';
import { Consumer } from '../context';
import Arrow from '../assets/img/arrow';
import profilePhoto from '../assets/img/profile.jpeg';
import ToggleButton from 'react-toggle-button';
import Slider, { Range } from 'rc-slider';
import 'rc-slider/assets/index.css';
import WomenCar from '../assets/img/womenCar';
import ClassicCar from '../assets/img/classicCar';
import LuxCar from '../assets/img/LuxCar';

class ButtomBar extends Component {
  state = {
    immediateTravel: false
  };
  onSubmit = async e => {
    e.preventDefault();
    this.props.submitSource();
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
        <div className={classes.bottomBarContainer}>
          <div className={classes.bottomBar}>
            <div className="row" style={title}>
              <div className="col-md-6">
                <div className={classes.title}>
                  <p className={classes.driverName}>ساعت اوج</p>
                </div>
              </div>
              <div className="col-md-6">
                <p className={classes.price}>
                  <span style={{ marginLeft: '3px' }}>60000</span>
                  <Arrow width="30px" />
                  <span style={{ marginRight: '3px' }}>35000</span>
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
                      immediateTravel: !this.state.immediateTravel
                    });
                  }}
                />
              </div>
              <div className="col-md-6">
                <Slider />
              </div>
            </div>
            <div className="row">
              <div className="col-md-12" style={textRight}>
                <p>نوع سرویس را انتخاب کنید:</p>
              </div>
            </div>
            <div className="row">
              <button>
                <WomenCar />
              </button>
              <button>
                <ClassicCar />
              </button>
              <button>
                <LuxCar />
              </button>
            </div>
            <input
              style={submit}
              className="btn btn-block"
              type="submit"
              value="درخواست سفر"
            />
          </div>
        </div>

        {this.props.setplace ? (
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
                  <a>پرداخت اعتباری</a>
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
  }
}
export default ButtomBar;
