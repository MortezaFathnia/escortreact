import React, { Component } from 'react';
import TextInputGroup from '../layout/TextInputGroup';
import axios from 'axios';
import loginClasses from './Login.module.css';
import classes from './Confirm.module.css'

class Confirm extends Component {
  state = { code: '' };

  onChange = e => this.setState({ [e.target.name]: e.target.value });

  onSubmit = async e => {
    e.preventDefault();

    const { code } = this.state;

    const res = await axios.post('http://185.252.28.132:8069/api/Rigester', {
      code: code
    });
    if (res.data.status === 'success') {
      console.log('okey');
    } else {
      console.log(res.data.errorMassage);
    }
  };

  render() {
    const { code } = this.state;
    return (
      <div className={loginClasses.loginContainer}>
        <form onSubmit={this.onSubmit}>
          <TextInputGroup
            label={`یک کد 5 رقمی به شماره موبایل پیامک شد آن را وارد نمایید`}
            name="code"
            placeholder="*****"
            value={code}
            type="text"
            onChange={this.onChange}
          />
           <p><span>ارسال مجدد</span>کد، تا <span className={classes.textBlue}> 45 </span>ثانیه دیگر</p>
          <input
            type="submit"
            value="ادامه"
            className="btn btn-block"
          />
        </form>
        <div className={loginClasses.loginBg} />
      </div>
    );
  }
}

export default Confirm;
