import React, {Component} from 'react';
import Graph from './graph';

/**
 *
 */
class Employment extends Component {
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

Employment.defaultProps = {
  indexes: [],
  rates: [],
};

export default Employment;
