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
        dataset2={this.props.rates}
        dataset1X='Date'
        dataset2X='year'
      />
    );
  }
}

Comparison.defaultProps = {
  indexes: [],
  rates: [],
};

export default Comparison;
