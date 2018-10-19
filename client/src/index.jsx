import React from 'react';
import ReactDOM from 'react-dom';

import StandardData from './components/StandardData.jsx'

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      test: "asdkjfh"
    };
  }
  render () {
    return (
      <div>
        <h1>Comparsion Grid</h1>
        <StandardData />
      </div>
      );
  }
}

ReactDOM.render(<App />, document.getElementById('App'));
