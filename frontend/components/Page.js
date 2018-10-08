import React, { Component } from 'react';
import './styles/styles.scss';
import Header from './Header';
import Meta from './Meta';
import Modal from './Modal';

class Page extends Component {
  render() {
    return (
      <>
        <Meta />
        <Header />
        <main className="container">{this.props.children}</main>
        <Modal />
      </>
    );
  }
}

export default Page;
