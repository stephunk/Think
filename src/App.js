import React, {Component} from 'react';
import './css/App.css';
import {getUsHousePriceIndex} from './apiWrapper.js';
import {Router, Route, Switch} from 'react-router-dom';
import Employment from './components/employment';
const createBrowserHistory = require('history').createBrowserHistory;

const history = createBrowserHistory();

/**
 * Main App class to be rendered in the page
 */
class App extends Component {
  /**
 * Main app constructor sets state.
 */
  constructor() {
    super();
    this.state = {};
  }

  /**
   * Override for standard React lifecycle method.
   * Used for calling data APIs.
  */
  componentDidMount() {
    getUsHousePriceIndex()
        .then((data) => this.setState({usHousePriceIndex: data}));
  }

  /**
   * Returns html compnenets to be rendered.
   * @return {html} html component
   */
  render() {
    return (
      <Router history={history} basename='/'>
        <div className='App-header'>
          <Switch>
            <Route exact path='/'
              component={() =>
                <Employment indexes={this.state.usHousePriceIndex} />}
            />
            {/* <Route exact path='/' component={React.component}/>
            <Route exact path='/login' component={React.component} /> */}
            <Route render={function() {
              return <p> Not Found </p>;
            }} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
