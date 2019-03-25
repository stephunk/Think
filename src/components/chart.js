import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {pieChart} from '../graphs/piechart';

/**
 * Component to show pie chart.
 */
class Piechart extends Component {
  /**
   *  Constructor override to set state.
   * @param {*} props
   */
  constructor(props) {
    super(props);

    this.state = {
      pieChartId: 'breakdown-piechart',
    };

    this.generateGraphs = this.generateGraphs.bind(this);
  }
  /**
   * Override for standard React lifecycle method.
   * Used to generate graphs
  */
  componentDidMount() {
    this.generateGraphs();
  }
  /**
   * @param{*} prevProps
   */
  componentDidUpdate(prevProps) {
    if (prevProps.dataset !== this.props.dataset) {
      this.generateGraphs();
    }
  }
  /**
  * Generate pie chart graph.
 */
  generateGraphs() {
    pieChart(
        this.state.pieChartId,
        this.props.dataset,
        this.props.labels,
        this.props.linegraph
    );
  }

  /**
   * @return {*} HTML of react component
   * Render pie chart component
   */
  render() {
    return (
      <div>
        <div id={this.state.pieChartId}></div>
      </div>
    );
  }
}

Piechart.propTypes = {
  dataset: PropTypes.object,
  labels: PropTypes.array,

};
Piechart.defaultProps = {
  dataset: {},
  labels: [],
};

export default Piechart;
