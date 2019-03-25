import React, {Component} from 'react';
import PropTypes from 'prop-types';
import * as graphs from '../graphs/linegraph.js';
import {Dropdown} from 'react-bootstrap';

/**
 *  React Coomponent used to draw a d3 graph.
 */
class Graph extends Component {
  /**
   *  Constructor override to set state.
   * @param {*} props
   */
  constructor(props) {
    super(props);
    this.state = {
      filter: !!props.filter ? props.filter : null,
      hideDropdown: !!props.filter,
    };

    this.createHandleFilter = this.createHandleFilter.bind(this);
    this.generateGraphs = this.generateGraphs.bind(this);
  }

  /**
   * Creates function to handle changes in filter options
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
   * Override for standard React lifecycle method.
   * Used to generate graphs
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
    if (prevProps.filter !== this.props.filter) {
      this.setState({
        filter: this.props.filter,
        hideDropdown: true,
      });
    }
  }

  /**
   * Generate graph
   */
  generateGraphs() {
    const graph1 = graphs.lineGraph(
        this.props.graphId,
        this.props.dataset,
        this.props.datasetX,
        this.state.filter
    );
    this.setState({graph1});
  }
  /**
   * @return {*} HTML do be rendered component
   */
  render() {
    return (
      <div>
        {this.props.dataset.length > 0 && this.props.dropdownVisible &&
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
  filter: PropTypes.string,
  dropdownVisible: PropTypes.bool,
};
Graph.defaultProps = {
  datasetX: 'date',
  dataset: [],
  dropdownVisible: true,
};

export default Graph;
