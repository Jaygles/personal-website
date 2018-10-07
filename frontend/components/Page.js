import React, { Component } from 'react';
import './styles/styles.scss';
import Header from './Header';
import Meta from './Meta';

class Page extends Component {
  render() {
    return (
      <>
        <Meta />
        <Header />
        <main>{this.props.children}</main>
      </>
    );
  }
}

export default Page;
