/* jshint browser: true, esnext: true */

let darts = [];

function setup() {
  createCanvas(256, 256);
  noLoop();
  console.assert(width == height, "Canvas was not a square!");

  let butt = createButton("Throw dart");
  butt.style("display", "block");

  const sliderValue = 30000;
  const sliderDigits = Math.floor(1 + Math.log10(sliderValue));
  let sliderDisplay = createSpan(`Darts to throw: ${zfill(sliderValue / 2, sliderDigits)}`);
  let slider = createSlider(0, sliderValue, sliderValue / 2, 5);

  let approximationDisplay = createP("π approximation: 0");

  butt.mousePressed(() => {
    for (let i = 0, l = slider.value(); i < l; ++i) throwDart();
    approximationDisplay.html("π approximation: " + approximatePi());
    draw();
  });

  slider.input(() => sliderDisplay.html("Darts to throw: " + zfill(slider.value(), sliderDigits)));

  draw();
}

function draw() {
  background(0);

  stroke(255);
  strokeWeight(1);
  darts.forEach(([x, y]) => {
    point(x, y);
  });

  stroke(255, 0, 0);
  strokeWeight(2);
  noFill();
  ellipse(width / 2, height / 2, width);
}

function throwDart() {
  darts.push([random(width), random(height)]);
}

function approximatePi() {
  let totalHit = 0;

  for (let i = darts.length - 1; i >= 0; --i) {
    const [x, y] = darts[i];
    if (dist(width / 2, height / 2, x, y) <= width / 2) totalHit += 1;
  }

  return (totalHit / darts.length) * 4;
}

function zfill(n, width) {
  n = n + '';
  return n.length >= width ? n : new Array(width - n.length + 1).join('0') + n;
}
