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
      <div className='flex-container'>
        <Graph
          dataset={this.props.indexes}
          datasetX='Date'
          datasetLabel='US House Price Indexes'
          graphId='breakdown-graph1'
        />
        <Graph
          graphId='breakdown-graph2'
          dataset={this.props.rates}
          datasetX='year'
          datasetLabel='US Employment rates'
        />
      </div>
    );
  }
}

Comparison.defaultProps = {
  indexes: [],
  rates: [],
};

export default Comparison;
