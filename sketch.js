let handpose;
let video;
let hands = [];
let birdRight;

function setup() {
  createCanvas(640, 480);
  video = createCapture(VIDEO);
  video.size(width, height);

  handpose = ml5.handpose(video, modelReady);

  // This sets up an event that fills the global variable "predictions"
  // with an array every time new hand poses are detected
  handpose.on("predict", function(results) {
    hands = results;
  });

  // Hide the video element, and just show the canvas
  video.hide();

  //set up the bird
  birdRight = new Sprite(0, 0);
  birdRight.addAnimation('birdRight.png', { frameSize: [100,100], frames: 2 });
  frameRate(30);
}

function modelReady() {
  console.log("Model ready!");
}

function draw() {
  image(video, 0, 0, width, height);

  // If there is a hand
  if (hands.length > 0) {
    // Individual parts are in "annotations"
    let index = hands[0].annotations.indexFinger;
    // fill(0, 0, 255);
    // noStroke();
    // The top of the index finger is index 3
    //position, tracking
    // birdRight.moveTowards(index[3][1], 0.1);
    birdRight.x = index[3][0];
    birdRight.y = index[3][1];
    
  }
}



