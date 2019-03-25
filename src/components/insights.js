import React, {Component} from 'react';
import PropTypes from 'prop-types';


/**
   * Helper function to add to first if not null
   * @param {*} a
   * @param {Number} b
   * @return {Number}
   */
function addToIfNotNull(a, b) {
  return !!a ? a + b : b;
}

/**
 * Component to show insights into dataset.
 */
class Insights extends Component {
/**
 *  Overwriting constructor to set state.
 */
  constructor() {
    super();
    this.state = {
      mean: {},
      numberOfSamples: {},
    };
    this.calculateMean = this.calculateMean.bind(this);
    this.calculateStats = this.calculateStats.bind(this);
  }
  /**
   * Override for standard React lifecycle method.
  */
  componentDidMount() {
    this.calculateStats();
  }
  /**
   * Calculate insight stats and store them in state
   */
  calculateStats() {
    let mean = {};
    let numberOfSamples = {};
    [mean, numberOfSamples] = this.calculateMean();
    this.setState({mean, numberOfSamples});
  }

  /**
   *  Calcualte mean for each field of the dataset
   * @return {Array} and array on mean and number of samples
   */
  calculateMean() {
    const mean = {};
    const numberOfSamples = {};
    console.log(this.props.exclude);
    this.props.dataset.forEach((dataPoint) => {
      Object.keys(dataPoint).forEach((key) => {
        if (!this.props.exclude.has(key)) {
          mean[key] = addToIfNotNull(mean[key], dataPoint[key]);
          if (!!dataPoint[key]) {
            numberOfSamples[key] = addToIfNotNull(numberOfSamples[key], 1);
          }
        }
      });
    });

    Object.keys(mean).forEach((key) => {
      mean[key] = (mean[key]/numberOfSamples[key]).toFixed(2);
    });
    return [mean, numberOfSamples];
  }

  /**
   * @return {*} HTML of react component
   * Render Insgiths component
   */
  render() {
    return (
      <div className='flex-container'>
        <div className='stat'>
          <h2>Mean</h2>
          {Object.keys(this.state.mean).map((key) =>
            (<h5>{key}:   {this.state.mean[key]}</h5>))}
        </div>
        <div className='stat'>
          <h2>Number of samples</h2>
          {Object.keys(this.state.numberOfSamples).map((key) =>
            (<h5>{key}:   {this.state.numberOfSamples[key]}</h5>))}
        </div>
      </div>);
  }
}

Insights.propTypes = {
  dataset: PropTypes.array,
  exclude: PropTypes.object,
};

Insights.defaultProps = {
  dataset: [],
};

export default Insights;
