class Particle {
  
  constructor() {
    
    this.x = random( 50, width-50 );
    this.y = random( 50, height-50 );
    
    this.xSpeed = random( -0.7, 0.7 );
    this.ySpeed = random( -0.7, 0.7 );
    
    this.d = random( 20, 30 );
    
    if( random( 0, 100 ) < 70 ) this.contam = false;
    else this.contam = true; // random contamination
  }

  update() {
    
    if( this.x < this.d/2 || this.x > ( width-this.d/2 ) ) this.xSpeed*=-1;
    if( this.y < this.d/2 || this.y > ( height-this.d/2 ) ) this.ySpeed*=-1;
    
    this.x += this.xSpeed;
    this.y += this.ySpeed;
  }
  
  drawParticle() {
    
    if( this.contam == false ) {
    
      noStroke();
      fill( 'rgba( 30, 30, 30, 0.2 )' );
      circle( this.x, this.y, this.d );
      
      noFill();
      stroke( 'rgba( 30, 30, 30, 0.8 )' );
      circle( this.x, this.y, this.d );
      
    } else {
      
      noStroke();
      fill( 'rgba( 255, 0, 0, 0.6 )' );
      circle( this.x, this.y, this.d );
      
      noFill();
      stroke( 'rgba( 255, 0, 0, 0.8 )' );
      circle( this.x, this.y, this.d );
    }
  }
  
  drawJoints( particles ) {
    
    particles.forEach( element => {
      
      let dis = dist( this.x, this.y, element.x, element.y );
      
      if( dis < 140 ) {
        
        stroke( 'rgba( 60, 60, 60, 0.1 )' );
        line( this.x, this.y, element.x, element.y );
      }
      
      if( dis < 20 && element.contam == true ) {
      
        this.contam = true;
      }
    });
  }
  
  isTouched( mX, mY ) {
    
    let dis = dist( this.x, this.y, mX, mY );
    
    if( dis < 20 ) {
    
      this.contam = false;
    }
  }
}

let particles = []; // particles
let washImg; // wash hands image

let nOfContam = 0; // # contam
let hasWon = false; // has user won?
let hasLost = false; // has user lost?
let particuleSpeed = 0.7; // speed

let level = 0; // level in the game

function setup() {
  
  createCanvas( windowWidth, windowHeight );
  washImg = loadImage( 'wash.png' ); // wash picto
  
  for( let i=0; i<width/14; i++ ) {
    
    particles.push( new Particle() );
  }
}

function draw() {
  
  nOfContam = 0;
  background( '#ffffff' );

  if( !hasWon && !hasLost ) {

    for( let i=0; i<particles.length; i++ ) {
      
      particles[i].update();
      particles[i].drawParticle();
      particles[i].drawJoints( particles );
      
      if( mouseIsPressed ) {
        
        particles[i].isTouched( mouseX, mouseY );
        image( washImg, mouseX-25, mouseY-25, 50, 50 );
      }

      if( particles[i].contam == true ) nOfContam++;
    }

    if( nOfContam >= particles.length ) { hasLost = true; hasWon = false; }
    if( nOfContam <= 0 ) { hasWon = true; hasLost = false; particuleSpeed += 0.2; level += 1; }

    textSize( 24 );
    noStroke(); fill( 'rgba( 255, 0, 0, 0.6 )' );
    text( nOfContam+' / '+particles.length, 20, 40 );
    text( 'level = '+level, 20, 70 );

  } else {

    if( hasWon ) {

      textSize( 100 );
      noStroke(); fill( 'rgba( 255, 0, 0, 0.9 )' );
      text( 'BRAVO !', width/2-210, height/2 );

      if( keyIsPressed ) {

          hasWon = false; // has user won?
          hasLost = false; // has user lost?

          for( let i=0; i<particles.length; i++ ) {

            if( random( 0, 100 ) < 70 ) particles[i].contam = false;
            else particles[i].contam = true; // random contamination

            particles[i].xSpeed = random( -particuleSpeed, particuleSpeed );
            particles[i].ySpeed = random( -particuleSpeed, particuleSpeed );
          }
      }
    }

    if( hasLost ) {

      textSize( 100 );
      noStroke(); fill( 'rgba( 255, 0, 0, 0.9 )' );
      text( 'GAME OVER !', width/2-340, height/2 );

      if( keyIsPressed ) {

          hasWon = false; // has user won?
          hasLost = false; // has user lost?

          for( let i=0; i<particles.length; i++ ) {

            if( random( 0, 100 ) < 70 ) particles[i].contam = false;
            else particles[i].contam = true; // random contamination
          }
      }
    }
  }
}

function windowResized() {
  
  resizeCanvas( windowWidth, windowHeight );
}
