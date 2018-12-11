import React, { Component } from 'react';
import Logo from 'assets/img/crmLogo.png';

class Content extends Component {
  render() {
    return (
      <div>
        <img src={Logo} alt={''} />
      </div>
    );
  }
}

export default Content;
