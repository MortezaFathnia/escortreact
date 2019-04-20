import React, { Component } from 'react';
import TextInputGroup from '../layout/TextInputGroup';
import axios from 'axios';
import classes from './Login.module.css';
import { Consumer } from '../context';

class Login extends Component {
  state = { mobile: '' };

  onChange = e => this.setState({ [e.target.name]: e.target.value });

  onSubmit = async (dispatch, e) => {
    e.preventDefault();

    const { mobile } = this.state;

    const res = await axios.post('http://185.252.28.132:8069/api/Rigester', {
      mobile: mobile
    });
    if (res.data.status === 'success') {
      dispatch({ type: 'LOGIN', payload: mobile });
      this.props.history.push('/confirm');
    } else {
      console.log(res.data.errorMassage);
    }
  };

  render() {
    const { mobile } = this.state;
    return (
      <Consumer>
        {value => {
          const { dispatch } = value;
          return (
            <div className={classes.loginContainer}>
              <form onSubmit={this.onSubmit.bind(this, dispatch)}>
                <TextInputGroup
                  label="لطفا شماره موبایل خود را وارد کنید"
                  name="mobile"
                  placeholder="09*********"
                  value={mobile}
                  type="text"
                  onChange={this.onChange}
                />
                <input
                  type="submit"
                  value="دریافت کد تایید"
                  className="btn btn-block"
                />
              </form>
              <div className={classes.loginBg} />
            </div>
          );
        }}
      </Consumer>
    );
  }
}

export default Login;
