import React, { Component } from 'react';
import './App.css';

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
      ]
    };
  }

  render() {
    return (
      <div>
        <div>emojishare</div>
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
