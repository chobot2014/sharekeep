import React, { Component } from 'react';
import './app.css';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      something: '',
      mainInputValue: '',
      isLinkValid: false,
      getEmbedSrcLink: '',
      isDead: false
    };
    this.validateLink.bind(this);
  }

  componentDidMount() {
    fetch('/api/someMethod')
      .then(res => res.json())
      .then(someMethodResponse => this.setState({ something: someMethodResponse.something }));
  }

  mainInputValueChange(newInput) {
    this.setState({ mainInputValue: newInput });
  }

  validateLink() {
    if (this.state.mainInputValue !== '' && this.state.mainInputValue !== undefined) {
      fetch('/api/getMedia', {
        method: "POST",
        mode: "cors",
        cache: "no-cache",
        credentials: "same-origin",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ url: this.state.mainInputValue })
      }).then(x => x.json())
        .then(a => this.setState({ isLinkValid: a.isValid, getEmbedSrcLink: a.getEmbedSrcLink, isDead: a.isDead, something: 'not a space' }));
    }
  }

  render() {
    const { something } = this.state;

    let video = '';
    if (this.state.isLinkValid) {
      if (!this.state.isDead) {
        video = <iframe className="videoPlayer" src={this.state.getEmbedSrcLink} />;
      } else {
        let link = `http://${window.location.host}/videos/${this.state.getEmbedSrcLink}`;
        video = <a href={link}>Archived Video</a>;
      }
    }
    return (
      <div>
        <input
          style={{ 'width': '90vw' }}
          type='input'
          value={this.state.mainInputValue}
          onChange={(event) => this.mainInputValueChange(event.target.value)} />

        <button
          onClick={this.validateLink.bind(this)}
        >Validate Link</button>
        {video}
      </div>
    );
  }
}
