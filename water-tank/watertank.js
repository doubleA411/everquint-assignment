// pure js function for algorithm

const trapWater = (n) => {
    let leftMax = [];
    let rightMax = [];
    let water = 0;

    leftMax[0] = n[0]; // first element of n
    rightMax[n.length - 1] = n[n.length - 1]; // last element of n

    for (let i = 1; i < n.length; i++) {
        leftMax[i] = Math.max(leftMax[i - 1], n[i]);
    }
    for (let i = n.length - 2; i >= 0; i--) {
        rightMax[i] = Math.max(rightMax[i + 1], n[i]);
    }


    for (let i = 0; i < n.length; i++) {
        water += Math.max(0, Math.min(leftMax[i], rightMax[i]) - n[i]);
    }
    return water;
};


const result = trapWater([0,4,0,0,0,6,0,6,4,0]);
console.log(result);


const parseInput = (input) => {
    const numbersArray = input.match(/\d+/g) ?? [];
    const result = numbersArray.map(Number);
    return result;
}