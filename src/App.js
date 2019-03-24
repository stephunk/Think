import React, {Component} from 'react';
import './css/App.css';
import {getUsHousePriceIndex, getUsEmploymentRates} from './apiWrapper.js';
import {Router, Route, Switch} from 'react-router-dom';
import Comparison from './components/comparison';
import Insights from './components/insights';
import Breakdown from './components/breakdown';
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
    let usEmploymentRates;
    let usHousePriceIndex;

    getUsEmploymentRates()
        .then((rates) => usEmploymentRates = rates)
        .then(getUsHousePriceIndex()
            .then((index) => usHousePriceIndex = index)
            .then(() => this.setState({
              usHousePriceIndex,
              usEmploymentRates,
            })));
  }

  /**
   * Returns html compnenets to be rendered.
   * @return {html} html component
   */
  render() {
    return (
      <Router history={history} basename='/'>
        <div className='App-body'>
          <Switch>
            <Route exact path='/(comparison|)/'
              component={() =>
                <Comparison indexes={this.state.usHousePriceIndex}
                  rates={this.state.usEmploymentRates} />}
            />
            <Route exact path='/insights' component={Insights}/>
            <Route exact path='/breakdown' component={Breakdown} />
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
