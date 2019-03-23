
const US_HOUSE_PRICE_INDEX_API = 'https://storage.googleapis.com/gweb-dat-coding-challenge-data-sources/us_house_price_idx.json';

/**
 * Calls data provider api to retrieve US house prices index data.
 * @return {JSON} parsed JSON with US house price indeces.
 */
export const getUsHousePriceIndex = () => {
  const result = fetch(US_HOUSE_PRICE_INDEX_API)
      .then((response) => response.json())
      .then(parseUsHousePriceIndex);
  return result;
};

/**
 * Transforms data as received from API and converts it to indexing by date.
 * @param {JSON} json
 * @return {Object} parsed JSON with US house price indexes by date.
 */
export const parseUsHousePriceIndex = (json) => {
  return json.map((dataPoint) => {
    const {Date, ...indexes} = dataPoint;
    return {Date, values: {...indexes}};
  });
};

