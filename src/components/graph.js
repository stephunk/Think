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
      filter: null,
    };
    this.createHandleFilter = this.createHandleFilter.bind(this);
    this.generateGraphs = this.generateGraphs.bind(this);
  }

  /**
   * @param {*} id
   * @return {function}
   */
  createHandleFilter(id) {
    return (eventKey, event) => {
      this.setState({
        filter: eventKey,
      });
    };
  }

  /**
   *
   */
  componentDidMount() {
    this.generateGraphs();
  }
  /**
   *
   * @param {*} prevProps
   * @param {*} prevState
   * @param {*} snapshot
   */
  componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.state.filter !== prevState.filter) {
      this.generateGraphs();
    }
  }

  /**
   * Generate graph
   */
  generateGraphs() {
    console.log('Generating Graph..');
    const graph1 = graphs.lineGraph(
        this.props.graphId,
        this.props.dataset,
        this.props.datasetX,
        this.state.filter
    );
    this.setState({graph1});
  }
  /**
   * @return {*}
   */
  render() {
    console.log('Rendering Graph Component..');
    return (
      <div>
        {this.props.dataset.length > 0 &&
              <Dropdown>
                <Dropdown.Toggle variant="success" className="dropdown-dataset">
                  {this.props.datasetLabel}
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  {Object.keys(this.props.dataset[0]).map((key) =>
                    key !== this.props.datasetX && <Dropdown.Item
                      key={key}
                      eventKey={key}
                      onSelect={this.createHandleFilter(1)}
                    >
                      {key}
                    </Dropdown.Item>)}
                </Dropdown.Menu>
              </Dropdown>
        }
        <div id={this.props.graphId}></div>
      </div>
    );
  }
}

Graph.propTypes = {
  dataset: PropTypes.array,
  datasetX: PropTypes.string,
  datasetLabel: PropTypes.string,
  graphId: PropTypes.string,
};
Graph.defaultProps = {
  datasetX: 'date',
  dataset: [],
};

export default Graph;
