import React from 'react';
import ReactDOM from 'react-dom';

class App extends React.Component {
  render() {
    return (
      <div>
        <p>Hello world</p>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.querySelector('#content'));