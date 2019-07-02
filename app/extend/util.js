'use strict';
const Moment = require('moment');

const range = {
  1: [0, 2],
  2: [3, 5],
  3: [6, 8],
  4: [9, 11],
}

function getCurrentQuarter() {
  const cur = Moment().quarter()
  return range[cur]
}

module.exports = {
  getCurrentMonth() {
    const cur = Moment().month();
    return cur;
  },
  getCurrentQuarter,
  getCurrentYear() {
    const cur = Moment().year();
    return cur;
  },
  getSum(arr) {
    const sum = arr.reduce((prev, curr) => {
      const value = Number(curr.insurance);
      if (!isNaN(value)) {
        return prev + value;
      } else {
        return prev;
      }
    }, 0);
    return {
      sum: sum.toFixed(2),
      count: arr.length
    }
  },

  getMonthRange() {
    const month = Moment().month();
    const year = Moment().year();
    const days = Moment().daysInMonth();
    const beginDate = new Date(year, month, 1, 0, 0, 0);
    const endDate = new Date(year, month, days, 23, 59, 59);
    return {
      beginDate,
      endDate
    }
  },

  getQuarterRange() {
    const year = Moment().year();
    const quarter = getCurrentQuarter();
    const days = Moment(quarter[1] + 1, 'M').daysInMonth();
    const beginDate = new Date(year, quarter[0], 1, 0, 0, 0);
    const endDate = new Date(year, quarter[1], days, 23, 59, 59);
    return {
      beginDate,
      endDate
    }
  },

  getYearRange() {
    const year = Moment().year();
    const beginDate = new Date(year, 0, 1, 0, 0, 0);
    const endDate = new Date(year, 11, 31, 23, 59, 59);
    return {
      beginDate,
      endDate
    }
  }
};