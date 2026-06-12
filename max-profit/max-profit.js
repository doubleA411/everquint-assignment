const maxProfit = (n) => {
  const results = [];

  const buildAndEarn = (unitsLeft, earnings, t,p,c) => {
    results.push({earnings, t,p,c})

    if (unitsLeft >= 4) {
      const tempUnitsLeft = unitsLeft - 4;
      const tempEarnings = tempUnitsLeft * 1000 + earnings
      buildAndEarn(tempUnitsLeft, tempEarnings, t, p+1, c); 
    } 
    
    if (unitsLeft >= 5) {
      const tempUnitsLeft = unitsLeft - 5;
      const tempEarnings = tempUnitsLeft * 1500 + earnings
      buildAndEarn(tempUnitsLeft, tempEarnings, t+1, p, c); 
    }

    if (unitsLeft >= 10) {
      const tempUnitsLeft = unitsLeft - 10;
      const tempEarnings = tempUnitsLeft * 2000 + earnings
      buildAndEarn(tempUnitsLeft, tempEarnings, t, p, c+1); 
    }
  }

  buildAndEarn(n, 0,0,0,0)


  const allEarnings = results.map((i) => i.earnings) 
  const max = Math.max(...allEarnings);
  const filteredResults = results.filter((i) => i.earnings === max);
  console.log(filteredResults)
  return filteredResults

}

maxProfit(49)