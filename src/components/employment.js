import React, {Component} from 'react';
import * as graphs from '../graphs/linegraph.js';

const filter = 'National-US';
/**
 *
 */
class Employment extends Component {
/**
 * @param {*} prevProps - props before update
 */
  componentDidMount() {
    console.log(this.props.indexes);
    const graph = graphs.lineGraph(this.props.indexes, filter);
    graphs.addLineToGraph(
        graph.svg,
        graph.x,
        graph.y,
        this.props.rates,
        'orange',
        'employed_percent'
    );
    this.setState({graph});
  }

  /**
 *  @return {*}
 */
  render() {
    return (
      <div id="data"></div>
    );
  }
}

Employment.defaultProps = {
  indexes: [],
  rates: [],
};

export default Employment;
