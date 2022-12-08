var form, player, game;
var backgroundImg;
var gameState, playerCount;
var database;
var carro1Img, carro2Img, pistaImg;
var carro1, carro2;

function preload(){
    backgroundImg = loadImage("./assets/planodefundo.png");
    carro1Img = loadImage("./assets/car1.png");
    carro2Img = loadImage("./assets/car2.png");
    pistaImg = loadImage("./assets/track.jpg");
}

function setup(){
    
    createCanvas(windowWidth, windowHeight);
    database = firebase.database();
    game = new Game();
    game.pegarEstado();
    game.inicio();
    
    
}

function draw(){
   background(backgroundImg);
   if(playerCount==2){
    game.atualizarEstado(1);
   };
   if(gameState==1){
    game.play();
   };
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
  }

