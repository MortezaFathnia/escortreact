import React, { Component } from 'react';
import classes from './ButtomBar.module.css';
import { Consumer } from '../context';

import profilePhoto from '../assets/img/profile.jpeg';
class ButtomBar extends Component {
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
