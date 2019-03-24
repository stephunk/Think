import React, {Component} from 'react';
import PropTypes from 'prop-types';
import * as graphs from '../graphs/linegraph.js';
import {Dropdown} from 'react-bootstrap';

const filter1 = 'National-US';
const filter2 = 'employed_percent';
/**
 *
 */
class Graph extends Component {
  /**
   *
   * @param {*} props
   */
  constructor(props) {
    super(props);
    this.state = {
      filter1: null,
      filter2: null,
    };
    this.createHandleFilter = this.createHandleFilter.bind(this);
    this.generateGraph = this.generateGraph.bind(this);
  }

  /**
   * @param {*} id
   * @return {function}
   */
  createHandleFilter(id) {
    return (eventKey, event) => {
      this.setState({
        ['filter' + id]: eventKey,
      });
    };
  }

  /**
   *
   */
  componentDidMount() {
    this.generateGraph();
  }
  /**
   *
   * @param {*} prevProps
   */
  componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.state.filter1 !== prevState.filter1 || this.state.filter2 !== prevState.filter2) {
      this.generateGraph();
    }
  }

  /**
   * Generate graph
   */
  generateGraph() {
    console.log('generating posi');
    const graph = graphs.lineGraph(
        this.props.dataset1,
        this.props.dataset1X,
        this.state.filter1
    );
    graphs.addLineToGraph(
        graph.svg,
        graph.x,
        graph.y,
        this.props.dataset2,
        'orange',
        this.props.dataset2X,
        this.state.filter2
    );
    this.setState({graph});
  }
  /**
   * @return {*}
   */
  render() {
    console.log('rendering');
    return (
      <div>
        <div className='flex-container'>
          {this.props.dataset1.length > 0 &&
            <Dropdown>
              <Dropdown.Toggle variant="success" className="dropdown-dataset">
                Dataset 1
              </Dropdown.Toggle>

              <Dropdown.Menu>
                {Object.keys(this.props.dataset1[0]).map((key) =>
                  <Dropdown.Item key={key} eventKey={key} onSelect={this.createHandleFilter(1)}>
                    {key}
                  </Dropdown.Item>)}
              </Dropdown.Menu>
            </Dropdown>
          }
          {this.props.dataset2.length > 0 &&
            <Dropdown>
              <Dropdown.Toggle variant="success" className="dropdown-dataset">
                Dataset 2
              </Dropdown.Toggle>

              <Dropdown.Menu>
                {Object.keys(this.props.dataset2[0]).map((key) =>
                  <Dropdown.Item key={key} eventKey={key} onSelect={this.createHandleFilter(2)}>
                    {key}
                  </Dropdown.Item>)}
              </Dropdown.Menu>
            </Dropdown>
          }
        </div>
        <div id="data"></div>
      </div>
    );
  }
}

Graph.propTypes = {
  dataset1: PropTypes.array,
  dataset1X: PropTypes.string,
  dataset2: PropTypes.array,
  dataset2X: PropTypes.string,
};
Graph.defaultProps = {
  dataset1X: 'date',
  dataset2X: 'date',
  dataset1: [],
  dataset2: [],
};

export default Graph;
