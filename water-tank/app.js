// -----------------------------------------------------
// parseInput -  takes the string of comma separated number and converts it into an array of numbers
// input - "0,4,0,0,0,6,0,6,4,0"
// output - [0,4,0,0,0,6,0,6,4,0]

const parseInput = (input) => {
  const numbersArray = input.match(/\d+/g) ?? [];
  const result = numbersArray.map(Number);
  return result;
};


// -----------------------------------------------------
// trapWater - takes the array of heights and returns the total water trapped, also levels for svg renders.
// input - [0,4,0,0,0,6,0,6,4,0]
// output - { total: total water trapped, levels: array of water levels at each index }

const trapWater = (heights) => {
  const n = heights.length;
  if (n === 0) return { total: 0, levels: [] };

  let leftMax = [];
  let rightMax = [];
  let water = 0;
  let levels = [];

  leftMax[0] = heights[0];
  rightMax[n - 1] = heights[n - 1];

  for (let i = 1; i < n; i++) {
    leftMax[i] = Math.max(leftMax[i - 1], heights[i]);
  }
  for (let i = n - 2; i >= 0; i--) {
    rightMax[i] = Math.max(rightMax[i + 1], heights[i]);
  }
  for (let i = 0; i < n; i++) {
    water += Math.max(0, Math.min(leftMax[i], rightMax[i]) - heights[i]);
    levels[i] = Math.min(leftMax[i], rightMax[i]);
  }
  return { total: water, levels: levels };
};

// -----------------------------------------------------
// renderSVG - takes the levels, array of heights and constant values of the size of canvas and renders a svg with rects for each block.
// input - heights: array of height of blocks, levels: level of water for each index, W: width of the canvas (constant width for each cell x number of blocks), H: constant height of canvas, cellW: constant width for each cell.
// output - svg tag with rects.

const renderSVG = (heights, levels, { W, H, cellW }) => {
  const maxHeight = Math.max(...heights);
  const scale = maxHeight === 0 ? 0 : H / maxHeight;

  let rects = "";
  for (let i = 0; i < heights.length; i++) {
    const x = i * cellW;
    const y = H - heights[i] * scale;
    const height = heights[i] * scale;
    const waterTop = H - levels[i] * scale;
    const waterHeight = (levels[i] - heights[i]) * scale;
    rects += `<rect x="${x}" y="${y}" width="${cellW}" height="${height}" fill="yellow" />`;
    if (levels[i] > heights[i]) {
      rects += `<rect x="${x}" y="${waterTop}" width="${cellW}" height="${waterHeight}" fill="blue" />`;
    }
  }

  return `<svg viewBox="0 0 ${W} ${H}"> ${rects} </svg>`;
};

// -----------------------------------------------------
// DOM Maniplutations

const elements = {
  input: document.getElementById("heights"),
  run: document.getElementById("run"),
  error: document.getElementById("error"),
  canvas: document.getElementById("canvas"),
  total: document.getElementById("total"),
  totalValue: document.getElementById("total-value"),
  legend: document.getElementById("legend"),
};

const showError = (msg) => {
  elements.error.textContent = msg;
  elements.error.hidden = false;
  elements.total.hidden = true;
  elements.legend.hidden = true;
  elements.canvas.innerHTML = '<p class="empty">Fix the input and try again.</p>';
};

const clearError = () => {
  elements.error.hidden = true;
  elements.error.textContent = "";
};

const handleRun = () => {
  clearError();
  const heights = parseInput(elements.input.value);

  if (heights.length === 0) {
    showError("Enter at least one number, e.g. 0,4,0,0,0,6,0,6,4,0");
    return;
  }

  const result = trapWater(heights);
  const { total, levels } = result;
  const H = 260;
  const cellW = 48;
  const W = heights.length * cellW;

  const svg = renderSVG(heights, levels, { W, H, cellW });

  elements.totalValue.textContent = total;
  elements.total.hidden = false;
  elements.legend.hidden = false;
  elements.canvas.innerHTML = svg
};

elements.run.addEventListener("click", handleRun);
elements.input.addEventListener("keydown", (e) => {
  if (e.key === "Enter") handleRun();
});
