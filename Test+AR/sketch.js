let capture;

var button_Snap;
var button_R;
var snapshot;
var flag = false;

function setup() {
  createCanvas(390, 240);
  capture = createCapture(VIDEO);
  capture.size(320, 240);
  capture.hide();
  
  button_Snap = createButton('snap');
  button_Snap.mousePressed(takesnap);

  button_R = createButton('return');
  button_R.mousePressed(Retour);
}

function draw() {
  background(255);
  //if (flag == false)
  image(capture, 0, 0, 320, 240);
}

function takesnap() {
  snapshot = capture.get();
  //print(snapshot);
  noLoop();
}

function Retour() {
  loop();
}
