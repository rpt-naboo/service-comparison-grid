import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery'

import StandardData from './components/StandardData.jsx'

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      products: []
    };
  }

  componentDidMount() {
    $.get('http://localhost:3000/random', function(data) {
      this.setState({
        products: data
      });
    }.bind(this));
  }

  render () {
    return (
      <div>
        <h1>Comparsion Grid</h1>
        <StandardData products={this.state.products} />
      </div>
      );
  }
}

ReactDOM.render(<App />, document.getElementById('App'));
