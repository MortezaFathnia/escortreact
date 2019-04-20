import React, { Component } from 'react';
import TextInputGroup from '../layout/TextInputGroup';
import axios from 'axios';
import loginClasses from './Login.module.css';
import classes from './Confirm.module.css';
import { Consumer } from '../context';
import Cookies from 'universal-cookie';

class Confirm extends Component {
  state = { code: '' };

  onChange = e => this.setState({ [e.target.name]: e.target.value });

  onSubmit = async (dispatch, number, e) => {
    e.preventDefault();

    const { code } = this.state;

    const res = await axios.post(
      'http://185.252.28.132:8069/api/CheckCode',
      {
        mobile: number,
        code: code,
        mac: 'no',
        imei: 'no',
        brand: 'samsung',
        deviceName: 'universal7870',
        model: 'SM-G610F',
        apiLevel: 23,
        operatingSystem: 'Android',
        osVersion: '6.0.1',
        deviceId: 'de9eeda4ea81579c',
        display: '1080 * 1920'
      },
      {
        headers: {
          tokenApp: '88888888888888888888',
          'Access-Control-Allow-Origin': '*'
        }
      }
    );
    if (res.data.status === 'success') {
      dispatch({ type: 'CONFIRM', payload: true });
      const cookies = new Cookies();
      cookies.set('token', res.data.data.tokenApps[0].token, { path: '/' });
      this.props.history.push('/user');
    } else {
      console.log(res.data.errorMassage);
    }
  };

  render() {
    const { code } = this.state;
    return (
      <Consumer>
        {value => {
          const { dispatch } = value;
          const { number } = value;
          return (
            <div className={loginClasses.loginContainer}>
              <form onSubmit={this.onSubmit.bind(this, dispatch, number)}>
                <TextInputGroup
                  label={`یک کد 5 رقمی به شماره موبایل پیامک شد آن را وارد نمایید`}
                  name="code"
                  placeholder="*****"
                  value={code}
                  type="text"
                  onChange={this.onChange}
                />
                <p>
                  <span>ارسال مجدد</span>کد، تا{' '}
                  <span className={classes.textBlue}> 45 </span>ثانیه دیگر
                </p>
                <input type="submit" value="ادامه" className="btn btn-block" />
              </form>
              <div className={loginClasses.loginBg} />
            </div>
          );
        }}
      </Consumer>
    );
  }
}

export default Confirm;
