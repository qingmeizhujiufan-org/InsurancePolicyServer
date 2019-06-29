'use strict';
const Moment = require('moment');

const range = {
  1: [0, 2],
  2: [3, 5],
  3: [6, 8],
  4: [9, 11],
}

module.exports = {
  getCurrentMonth() {
    const cur = Moment().month();
    return cur;
  },
  getCurrentQuarter() {
    const cur = Moment().quarter()
    return range[cur]
  },
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
  }
};