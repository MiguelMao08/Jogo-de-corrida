class Game {
    constructor(){

    }
    //métodos

    //formulário com nome para jogar
    inicio(){
        form = new Form();
        form.mostrar();
        player = new Player();
        playerCount = player.pegarContagem();
        carro1=createSprite(width/2 - 100,height-100);
        //carro1.addImage("car1",carro1Img);
        //carro1.scale=0.08;
        carro1.shapeColor="red"
        carro2=createSprite(width/2 + 100,height-100);
        //carro2.addImage("car2",carro2Img);
        //carro2.scale=0.08;
        carro2.shapeColor="yellow"
    }

    //pegar o estado do jogo do banco de dados (ler o BD)
    pegarEstado(){
        var gameStateRef = database.ref("gameState");
        gameStateRef.on("value", function(data){
            gameState = data.val();
        });
    }

     //atualizar o estado do jogo no banco de dados
     atualizarEstado(estado){
        database.ref("/").update({
            gameState: estado
        });
    }
    //funçao play 
    play(){
        form.esconder();
        image(pistaImg,0,-height*5,width,height*6);
        drawSprites();
    }
}