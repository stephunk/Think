import React, {Component} from 'react';
import {pieChart} from '../graphs/piechart';

/**
 * Component to show breakdown of dataset.
 */
class Breakdown extends Component {
  /**
   *
   */
  constructor() {
    super();
    this.state = {
      pieChartId: 'breakdown-piechart',
    };
  }
  /**
   *
   */
  componentDidMount() {
    pieChart(this.state.pieChartId, ()=> console.log(123123));
  }
  /**
   * @return {*} HTML of react component
   * Render Breakdown component
   */
  render() {
    return (
      <div>Breakdown
        {/* Pie chart */}
        {/* graph */}
        <div id={this.state.pieChartId}></div>
      </div>);
  }
}

export default Breakdown;
