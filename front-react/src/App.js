import React, { Component } from 'react';
import './App.css';
import axios from 'axios';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';

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
      inputValue: '',
      loadingFlag: false
    };
  }

  componentDidMount() {
    this.requestApi();
  }

  hadleChange = e => {
    this.setState({ inputValue: e.target.value });
  };

  handleSubmit = e => {
    if (!this.state.inputValue) {
      return;
    }
    this.requestApi(this.state.inputValue);
  };

  requestApi = inputUrl => {
    this.setState({ loadingFlag: true });
    const url = inputUrl ? '?url=' + inputUrl : '';
    axios
      .get(
        'https://script.google.com/macros/s/AKfycbyw9qQBpO7rm89iFWFjaslKcEqm4C72Z2smPh0rtcC68hMVGXI/exec' +
          url
      )
      .then(response => {
        if (response.data.meta.status === 'error') {
          this.setState({ loadingFlag: false });
          return alert(response.data.meta.message);
        }
        this.setState({
          emojiList: response.data.data
        });
        this.setState({ inputValue: '', loadingFlag: false });
      });
  };

  likeCountUp = likedUrl => {
    axios
      .get(
        'https://script.google.com/macros/s/AKfycbyw9qQBpO7rm89iFWFjaslKcEqm4C72Z2smPh0rtcC68hMVGXI/exec?likedUrl=' +
          likedUrl
      )
      .then(response => {
        if (response.data.meta.status === 'error') {
          return alert(response.data.meta.message);
        }
        this.setState({
          emojiList: response.data.data
        });
      });
  };

  render() {
    return (
      <div className="App">
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
          <div>{this.state.loadingFlag && <CircularProgress />}</div>
        </div>
        <div>
          {this.state.emojiList.map((emoji, i) => (
            <a
              href={emoji.url}
              download={'emoji' + i}
              target="_blank"
              rel="noopener noreferrer"
              className="link-text"
              onClick={() => {
                this.likeCountUp(emoji.url);
              }}
            >
              <img
                alt={emoji.url}
                key={'emoji' + i}
                src={emoji.url}
                width="20px"
                className="image-icon"
              />
              <span className="like-count">{emoji.likeCount}</span>
            </a>
          ))}
        </div>
      </div>
    );
  }
}

export default App;
