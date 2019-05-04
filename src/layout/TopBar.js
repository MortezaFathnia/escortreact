import React, { Component } from 'react';
import classes from './TopBar.module.css';
import Menu from '../assets/img/menu';
import Arrow from '../assets/img/arrow';
import { Consumer } from '../context';

class TopBar extends Component {
  render() {
    return (
      <Consumer>
        {value => {
          console.log(this.props);
          return (
            <div className={classes.topBarContainer}>
              {!this.props.placesfixed ? (
                <div className={classes.addressContainer}>
                  {!value.sourceAddress ? (
                    <p className={classes.addressValue}>
                      {this.props.sourceAddress
                        ? this.props.sourceAddress
                        : 'کجا هستید؟'}
                    </p>
                  ) : (
                    <p className={classes.addressValue}>
                      {this.props.distinations[0]
                        ? this.props.distinations[0]
                        : 'کجا می روید؟'}
                    </p>
                  )}
                  <button className={classes.btnAddress}>
                    {!value.sourceAddress ? (
                      <Menu width="30px" fill="#454f63" />
                    ) : (
                      <Arrow
                        width="25px"
                        fill="#454f63"
                        style={{ marginRight: '5px' }}
                      />
                    )}
                  </button>
                </div>
              ) : (
                <button className={classes.btnAddress}>
                  <Arrow
                    width="25px"
                    fill="#454f63"
                    style={{ marginRight: '5px' }}
                  />
                </button>
              )}
            </div>
          );
        }}
      </Consumer>
    );
  }
}
export default TopBar;
