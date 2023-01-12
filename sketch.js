var form, player, game;
var backgroundImg;
var gameState, playerCount;
var database;
var carro1Img, carro2Img, pistaImg, explosaoImg;
var combImg, moedaImg, pneuImg, coneImg;
var carro1, carro2, carros=[];
var allPlayers;
var gComb, gMoedas, gObstaculo;
var vidaImg;

function preload(){
    backgroundImg = loadImage("./assets/planodefundo.png");
    carro1Img = loadImage("./assets/car1.png");
    carro2Img = loadImage("./assets/car2.png");
    pistaImg = loadImage("./assets/track.jpg");
    combImg = loadImage("./assets/fuel.png");
    moedaImg = loadImage("./assets/goldCoin.png");
    pneuImg = loadImage("./assets/obstacle2.png");
    coneImg = loadImage("./assets/obstacle1.png");
    vidaImg = loadImage("./assets/life.png");
    explosaoImg = loadImage("./assets/blast.png");
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

   if(gameState==2){
    game.fim();
   }


}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
  }

