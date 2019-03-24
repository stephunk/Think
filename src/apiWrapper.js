
const US_HOUSE_PRICE_INDEX_API = 'https://storage.googleapis.com/gweb-dat-coding-challenge-data-sources/us_house_price_idx.json';
const US_EMPLOYMENT_API = 'https://storage.googleapis.com/gweb-dat-coding-challenge-data-sources/us_employment_and_unemployment_rates.json';
/**
 * Calls data provider api to retrieve US house prices index data.
 * @return {JSON} parsed JSON with US house price indeces.
 */
export const getUsHousePriceIndex = () => {
  const result = fetch(US_HOUSE_PRICE_INDEX_API)
      .then(status)
      .then((response) => response.json())
      .then(parseUsHousePriceIndex);
  return result;
};

/**
 * Transforms data as received from API and converts it to indexing by date.
 * @param {JSON} json
 * @return {Array} parsed JSON with US house price indexes by date.
 */
export const parseUsHousePriceIndex = (json) => {
  return json.map((dataPoint) => {
    const {Date, ...indexes} = dataPoint;
    return {date: Date, value: {...indexes}};
  });
};

/**
 * Function for filtering on a specific index
 * @param {String} filter - filter tha.
 * @param {Array} indexes - array of house prices indexes .
 * @return {Array} returns array with objects having the same key but
 * values containg members that match filter.
 */
export const filterHousePriceIndex = (filter, indexes) => {
  return [];
};

/**
 * @param {*} response - response from fetch req
 * @return {*}
 */
function status(response) {
  if (response.status >= 200 && response.status < 300) {
    return Promise.resolve(response);
  } else {
    return Promise.reject(new Error(response.statusText));
  }
}

/**
 * Calls data provider api to retrieve US employment data.
 * @return {JSON} parsed JSON with US employment rates.
 */
export const getUsEmploymentRates = () => {
  const result = fetch(US_EMPLOYMENT_API)
      .then(status)
      .then((response) => response.json())
      .then(parseUsEmploymentData);
  return result;
};

/**
 * Transforms data as received from API and converts it to indexing by year.
 * @param {JSON} json
 * @return {Array} parsed JSON with US employemnt rates by year.
 */
export const parseUsEmploymentData = (json) => {
  return json.map((dataPoint) => {
    const {year, ...rates} = dataPoint;
    return {date: year.toString() + '-01-01', value: {...rates}};
  });
};
