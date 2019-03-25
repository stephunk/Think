import React, {Component} from 'react';
import PropTypes from 'prop-types';
import * as graphs from '../graphs/linegraph.js';
import {Dropdown} from 'react-bootstrap';

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
      graphId: 'comparison-linegraph',
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
   * @param {*} prevState
   * @param {*} snapshot
   */
  componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.state.filter1 !== prevState.filter1 ||
      this.state.filter2 !== prevState.filter2) {
      this.generateGraph();
    }
  }

  /**
   * Generate graph
   */
  generateGraph() {
    console.log('Generating Graph..');
    const graph = graphs.lineGraph(
        this.state.graphId,
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
    console.log('Rendering Graph Component..');
    return (
      <div>
        <div className='flex-container'>
          {this.props.dataset1.length > 0 &&
            <Dropdown>
              <Dropdown.Toggle variant="success" className="dropdown-dataset">
                {this.props.dataset1Label}
              </Dropdown.Toggle>

              <Dropdown.Menu>
                {Object.keys(this.props.dataset1[0]).map((key) =>
                  key !== this.props.dataset1X && <Dropdown.Item
                    key={key}
                    eventKey={key}
                    onSelect={this.createHandleFilter(1)}
                  >
                    {key}
                  </Dropdown.Item>)}
              </Dropdown.Menu>
            </Dropdown>
          }
          {this.props.dataset2.length > 0 &&
            <Dropdown>
              <Dropdown.Toggle variant="success" className="dropdown-dataset">
                {this.props.dataset2Label}
              </Dropdown.Toggle>

              <Dropdown.Menu>
                {Object.keys(this.props.dataset2[0]).map((key) =>
                  key !== this.props.dataset2X && <Dropdown.Item
                    key={key}
                    eventKey={key}
                    onSelect={this.createHandleFilter(2)}
                  >
                    {key}
                  </Dropdown.Item>)}
              </Dropdown.Menu>
            </Dropdown>
          }
        </div>
        <div id={this.state.graphId}></div>
      </div>
    );
  }
}

Graph.propTypes = {
  dataset1: PropTypes.array,
  dataset1X: PropTypes.string,
  dataset1Label: PropTypes.string,
  dataset2: PropTypes.array,
  dataset2X: PropTypes.string,
  dataset2Label: PropTypes.string,
};
Graph.defaultProps = {
  dataset1X: 'date',
  dataset2X: 'date',
  dataset1: [],
  dataset2: [],
};

export default Graph;
