/* jshint browser: true, esnext: true */

const SQUARE_SIDE = 256;

// TODO: Remove duplicates.
let darts = [];

function setup() {
  createCanvas(SQUARE_SIDE, SQUARE_SIDE);
  noLoop();

  let butt = createButton("Throw dart");
  butt.style("display", "block");

  const sliderValue = 30000;
  const sliderDigits = Math.floor(1 + Math.log10(sliderValue));
  let sliderDisplay = createSpan(`Darts to throw: ${zfill(sliderValue / 2, sliderDigits)}`);
  let slider = createSlider(0, sliderValue, sliderValue / 2, 5);

  let thrownDisplay = createP("Thrown so far: 0");

  let approximationDisplay = createP("π approximation: 0");

  butt.mousePressed(() => {
    for (let i = 0, l = slider.value(); i < l; ++i) throwDart();
    thrownDisplay.html("Thrown so far: " + darts.length);
    approximationDisplay.html("π approximation: " + approximatePi());
    draw();
  });

  slider.input(() => sliderDisplay.html("Darts to throw: " + zfill(slider.value(), sliderDigits)));

  draw();
}

function draw() {
  background(0);

  loadPixels();
  for (let [x, y] of darts) {
    set(x, y, 255);
  }
  updatePixels();

  stroke(255, 0, 0);
  strokeWeight(2);
  noFill();
  ellipse(SQUARE_SIDE / 2, SQUARE_SIDE / 2, SQUARE_SIDE);
}

function throwDart() {
  darts.push([random(SQUARE_SIDE), random(SQUARE_SIDE)]);
}

function approximatePi() {
  let totalHit = 0;

  for (let i = darts.length - 1; i >= 0; --i) {
    const [x, y] = darts[i];
    if (dist(SQUARE_SIDE / 2, SQUARE_SIDE / 2, x, y) <= SQUARE_SIDE / 2) totalHit += 1;
  }

  return (totalHit / darts.length) * 4;
}

function zfill(n, width) {
  n = n + '';
  return n.length >= width ? n : new Array(width - n.length + 1).join('0') + n;
}
