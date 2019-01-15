import React, { Component } from 'react';
import './app.css';
import ReactImage from './react.png';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      something: ''
    };
  }

  componentDidMount() {
    fetch('/api/someMethod')
      .then(res => res.json())
      .then(someMethodResponse => this.setState({ something: someMethodResponse.something }));
  }

  render() {
    const { something } = this.state;
    return (
      <div>
        {something}
      </div>
    );
  }
}
