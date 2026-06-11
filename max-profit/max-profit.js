// Max Profit, given t units (minutes) , get the max profit earned from the properties.
// Theatre 5 units to build; earns $1500/unit
// Pub 4 units to build; earns $1000/unit
// Commercial Park 10 units to build; earns $2000/unit


// commented out console.logs for clean output, can be uncommented for step by step analysis.

const maxProfit = (n) => {

//   console.log('n = ',n)
//   console.log("----------------")
  const store = [{ profit: 0, T: 0, P: 0, C: 0 }];

  for (let t = 1; t <= n; t++) {
    let best = store[0]

    // console.log('t = ',t)
    if (t >= 4) {
      const profit = (t - 4) * 1000 + store[t - 4].profit;
    //   console.log('>=4, profit=',profit )
      if (profit > best.profit) {
        best = {
          profit: profit,
          T: store[t - 4].T,
          P: store[t - 4].P + 1,
          C: store[t - 4].C,
        };
      }
    }


    if (t >= 5) {
      const profit = (t - 5) * 1500 + store[t - 5].profit;
    //   console.log('>=5, profit=',profit )
      if (profit > best.profit) {
        best = {
          profit: profit,
          T: store[t - 5].T + 1,
          P: store[t - 5].P,
          C: store[t - 5].C,
        };
      }
    }

    if (t >= 10) {
      const profit = (t - 10) * 2000 + store[t - 10].profit;
    //   console.log('>=10, profit=',profit )
      if (profit > best.profit) {
        best = {
          profit: profit,
          T: store[t - 10].T,
          P: store[t - 10].P,
          C: store[t - 10].C + 1,
        };
      }
    }

    // console.log('best = ', best)
    // console.log("----------------")


    store[t] = best;
  }

  return store[n];
};

const result1 = maxProfit(13);
const result2 = maxProfit(8);
const result3 = maxProfit(7);

console.log({
    result1,
    result2,
    result3
});
