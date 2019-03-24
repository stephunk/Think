import React, {Component} from 'react';
import * as graph from '../graphs/linegraph.js';

const filter = 'National-US';
/**
 *
 */
class Employment extends Component {
/**
 * @param {*} prevProps - props before update
 */
  componentDidMount() {
    graph.lineGraph(this.props.indexes, filter);
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
};

export default Employment;
