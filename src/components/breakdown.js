import React, {Component} from 'react';
import Piechart from './chart';
import PropTypes from 'prop-types';
import Graph from './graph';

/**
 * Component to show breakdown of dataset.
 */
class Breakdown extends Component {
  /**
   *  Constructor override to set state.
   */
  constructor() {
    super();
    this.state = {
      filters: ['unemployed', 'employed_total', 'not_in_labor'],
      labels: ['U', 'E', 'N'],
      averageDataset: {},
    };

    this.calculateAverageDatset = this.calculateAverageDatset.bind(this);
    this.addLineGraph = this.addLineGraph.bind(this);
  }
  /**
   * Override for standard React lifecycle method.
  */
  componentDidMount() {
    this.calculateAverageDatset();
  }
  /**
   * Calculates average dataset values.
   */
  calculateAverageDatset() {
    const averageDataset = {};
    if (this.props.rates.length > 0) {
      this.props.rates.forEach((dataPoint) => {
        this.state.filters.forEach((filter) => {
          averageDataset[filter] = averageDataset[filter] ?
                dataPoint[filter] + averageDataset[filter] : dataPoint[filter];
        });
      });
      this.state.filters.forEach((filter) => {
        averageDataset[filter] /= this.props.rates.length;
      });
      this.setState({averageDataset});
    }
  }

  /**
 * Set state key for selecting filter for line graph
 * @param {*} dataKey
 */
  addLineGraph(dataKey) {
    this.setState({drillDownFilter: dataKey});
  }
  /**
   * @return {*} HTML of react component
   * Render Breakdown component
   */
  render() {
    return (
      <div className='flex-container'>
        <div>
          <h2>Breakdown of Employment numbers</h2>
          <Piechart
            className='breakdown-piechart'
            dataset={this.state.averageDataset}
            labels={this.state.labels}
            linegraph={this.addLineGraph}
          />
          <h3>Click chart to show trend over years.</h3>
          <h5>U - Unemployed</h5>
          <h5>E - Employed</h5>
          <h5>N - Not in labour.</h5>
        </div>
        <Graph
          dataset={this.props.rates}
          graphId='breakdown-linegraph'
          datasetX='year'
          datasetLabel='US Employment rates'
          filter={this.state.drillDownFilter}
          dropdownVisible={false}
        />
      </div>);
  }
}


Breakdown.propTypes = {
  rates: PropTypes.array,
};
Breakdown.defaultProps = {
  rates: [],
};

export default Breakdown;
