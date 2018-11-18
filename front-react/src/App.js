import React, { Component } from 'react';
import './App.css';
import axios from 'axios';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

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
    this.getData();
  }

  hadleChange = e => {
    this.setState({ inputValue: e.target.value });
  };

  handleSubmit = e => {
    if (!this.state.inputValue) {
      return;
    }
    this.getData(this.state.inputValue);
  };

  getData = inputUrl => {
    const url = inputUrl ? '?url=' + inputUrl : '';
    axios
      .get(
        'https://script.google.com/macros/s/AKfycbyw9qQBpO7rm89iFWFjaslKcEqm4C72Z2smPh0rtcC68hMVGXI/exec' +
          url
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
      <div className="App">
        <div>emojishare</div>
        <div className="button-and-text">
          <TextField
            className="text-field"
            type="text"
            label="Slack Emoji url"
            placeholder="Please add your Emoji's url"
            value={this.state.inputValue}
            onChange={this.hadleChange}
            variant="outlined"
          />
          <Button
            onClick={this.handleSubmit}
            variant="outlined"
            color="primary"
          >
            add
          </Button>
        </div>
        <div>
          {this.state.emojiList.map((emoji, i) => (
            <img
              alt={emoji.url}
              key={'emoji' + i}
              src={emoji.url}
              width="20px"
              className="image-icon"
            />
          ))}
        </div>
      </div>
    );
  }
}

export default App;
