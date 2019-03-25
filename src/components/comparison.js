import React, {Component} from 'react';
import Graph from './graph';

/**
 *
 */
class Comparison extends Component {
/**
 * @param {*} prevProps - props before update
 */
  componentDidMount() {
  }

  /**
 *  @return {*}
 */
  render() {
    return (
      <Graph
        dataset1={this.props.indexes}
        dataset1X='Date'
        dataset1Label='US House Price Indexes'
        dataset2={this.props.rates}
        dataset2X='year'
        dataset2Label='US Employment rates'
      />
    );
  }
}

Comparison.defaultProps = {
  indexes: [],
  rates: [],
};

export default Comparison;
