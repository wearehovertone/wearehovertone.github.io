let urlParams;
let spotLgt = 0.0;
let spotLat = 0.0;
let geoFence;

function setup() {

  urlParams = getURLParams(); // get params

  spotLgt = urlParams.lgt; // get lgt from url
  spotLat = urlParams.lat; // get lat from url

  geoFence = new geoFenceCircle( spotLgt, spotLat, 0.05 );

  createCanvas( windowWidth, windowHeight );
}

function draw() {

  clear(); noStroke();
  background( 30, 30, 30 );

  textSize( 50 );
  textAlign( CENTER );
  let geoText = "";

  if( geoFence.insideFence ) {

    geoText = "Tu es chez toi!";
    fill( 255, 0, 0 );

  } else {

    geoText = "Tu n'es pas chez toi!";
    fill( 255, 255, 255 );
  }

  ellipse( width/2, height/2, 500, 500 );
  text( geoText, width/2, height/2+350 );
}

function windowResized() {

  resizeCanvas( windowWidth, windowHeight );
}

document.ontouchmove = function( event ) {

    event.preventDefault();
};
