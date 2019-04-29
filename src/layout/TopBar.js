import React, { Component } from 'react';
import classes from './TopBar.module.css';
import { Consumer } from '../context';

class TopBar extends Component {
  render() {
    return (
      <Consumer>
        {value => {
          return (
            <div className={classes.topBarContainer}>
              <input
                className={classes.inputAddress}
                type="text"
                placeholder="کجا هستید؟"
                value={value.sourceAddress}
                readOnly
              />
              {value.sourceAddress ? (
                <input
                  className={classes.inputAddress}
                  type="text"
                  style={{ marginTop: '8px' }}
                  placeholder="به کجا می روید؟"
                  value={value.destinations[0].Address}
                  readOnly
                />
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
export default TopBar;
