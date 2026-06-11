// Max Profit, given t units (minutes) , get the max profit earned from the properties.
// Theatre 5 units to build; earns $1500/unit
// Pub 4 units to build; earns $1000/unit
// Commercial Park 10 units to build; earns $2000/unit


const maxProfit = (n) => {
  let best = 0;
  let store = [];

  // generating combination of T,P,C that can be constructed with the given 'n' units ex: 49/10 = 4; 49/5 = 9; 49/4 = 12;
  // total 4 parks, 9 theatre and 12 pubs can be built for 49 units; earning for every possible combo of T , P , C is calculated and the best is returned.
  // every combo of buildings until the max count reaches is generated here in this for loop.
  for (let C = 0; C <= n / 10; C++) {
    for (let T = 0; T <= n / 5; T++) {
      for (let P = 0; P <= n / 4; P++) {
        if (5 * T + 4 * P + 10 * C > n) continue; // ignoring if build units exceeds 'n' units

        // if the earnings are greater than the prev best, the whole array is updated with new max
        // if the earnings are same as best, it is pused and stored in the array
        // ignoring if the earnings is less than the best.
        // this way we get all the possible combinations of max earnings
        const earnings = findEarnings(T, P, C, n);
        if (earnings > best) {
          best = earnings;
          store = [{ profit: earnings, T, P, C }];
        } else if (earnings === best) {
          store.push({ profit: earnings, T, P, C });
        }
      }
    }
  }

  return store;
};

// findEarnings - this calculates the earnings for the combo generated.
// tracking the total earnings and used units. 
// the for loop block , for the total building count it tracks how many used and 
// calculates the earning as (n - used units x earning cost) as it starts to operate after it built
const findEarnings = (T, P, C, n) => {
  let used = 0;
  let earnings = 0;

  for (let i = 0; i < C; i++) {
    used += 10;
    earnings += (n - used) * 2000;
  }

  for (let i = 0; i < T; i++) {
    used += 5;
    earnings += (n - used) * 1500;
  }

  for (let i = 0; i < P; i++) {
    used += 4;
    earnings += (n - used) * 1000;
  }

  return earnings;
};

console.log(maxProfit(49));
