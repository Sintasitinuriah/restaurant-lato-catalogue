// utils/lodashUtils.js

export const filterData = async (data, filterFunction) => {
  const _ = await import('lodash/filter');
  return _.default(data, filterFunction);
};
