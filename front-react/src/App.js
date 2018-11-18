import React, { Component } from 'react';
import './App.css';
import axios from 'axios';

class App extends Component {
  constructor() {
    super();
    this.state = {
      emojiList: [
        {
          url:
            'https://emoji.slack-edge.com/T02HHLFPR/lgtm/393f650bcf7d2b0a.png',
          likeCount: 0
        }
      ],
      inputValue: ''
    };
  }

  componentDidMount() {
    axios
      .get(
        'https://script.google.com/macros/s/AKfycbyw9qQBpO7rm89iFWFjaslKcEqm4C72Z2smPh0rtcC68hMVGXI/exec'
      )
      .then(response => {
        this.setState({
          emojiList: response.data.data
        });
      });
  }

  hadleChange = e => {
    this.setState({ inputValue: e.target.value });
  };

  handleSubmit = e => {
    if (!this.state.inputValue) {
      return;
    }

    axios
      .get(
        'https://script.google.com/macros/s/AKfycbyw9qQBpO7rm89iFWFjaslKcEqm4C72Z2smPh0rtcC68hMVGXI/exec?url=' +
          encodeURI(this.state.inputValue)
      )
      .then(response => {
        this.setState({
          emojiList: response.data.data
        });
      });
    this.setState({ inputValue: '' });
  };

  render() {
    return (
      <div>
        <div>emojishare</div>
        <input
          type="text"
          placeholder="Please add your Emoji's url"
          value={this.state.inputValue}
          onChange={this.hadleChange}
        />
        <button onClick={this.handleSubmit}>add</button>
        <div>
          {this.state.emojiList.map((emoji, i) => (
            <img
              alt={emoji.url}
              key={'emoji' + i}
              src={emoji.url}
              width="20px"
            />
          ))}
        </div>
      </div>
    );
  }
}

export default App;
