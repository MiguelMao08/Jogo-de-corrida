class Game {
    constructor(){
        this.placarTitulo = createElement("h2");
        this.jogador1 = createElement("h2");
        this.jogador2 = createElement("h2");
    }
    //métodos

    //exibindo elementos na tela
    elementos(){
        this.placarTitulo.position(width/3 - 60, 40);
        this.placarTitulo.class("leadersText");
        this.placarTitulo.html("Placar");

        this.jogador1.position(width/3 - 50, 80);
        this.jogador1.class("leadersText");

        this.jogador2.position(width/3 - 50, 130);
        this.jogador2.class("leadersText");
    }

    //mostrar a liderança do jogo
    mostrarLideranca(){
        var jogador1, jogador2;
        var players = Object.values(allPlayers);
        if(
            (players[0].rank === 0 && players[1].rank === 0) ||
            players[0].rank === 1
        ){
            jogador1 = 
                players[0].rank +
                "&emsp;" +
                players[0].nome + 
                "&emsp;" +
                players[0].pontos

            jogador2 = 
                players[1].rank +
                "&emsp;" +
                players[1].nome + 
                "&emsp;" +
                players[1].pontos
        }
        if(players[1].rank === 1){
            jogador1 = 
                players[1].rank +
                "&emsp;" +
                players[1].nome + 
                "&emsp;" +
                players[1].pontos

            jogador2 = 
                players[0].rank +
                "&emsp;" +
                players[0].nome + 
                "&emsp;" +
                players[0].pontos
        }
        this.jogador1.html(jogador1);
        this.jogador2.html(jogador2);
    }

    //formulário com nome para jogar
    inicio(){
        form = new Form();
        form.mostrar();
        player = new Player();
        playerCount = player.pegarContagem();
        carro1=createSprite(width/2 - 100,height-100);
        carro1.addImage("car1",carro1Img);
        carro1.scale=0.08;
        carro1.shapeColor="red"
        carro2=createSprite(width/2 + 100,height-100);
        carro2.addImage("car2",carro2Img);
        carro2.scale=0.08;
        carro2.shapeColor="yellow";

        carros = [carro1,carro2];
        // i        0       1
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
        Player.pegaInfoPlayers();
        if(allPlayers != undefined){
            image(pistaImg,0,-height*5,width,height*6);
            this.elementos();
            this.mostrarLideranca();

            var indice = 0;
            for(var plr in allPlayers){
                indice = indice + 1;
                var x = allPlayers[plr].positionX;
                var y = height - allPlayers[plr].positionY;

                carros[indice-1].position.x = x;
                carros[indice-1].position.y = y;
                
                if(indice == player.indice){
                    fill("red");
                    rect(x,y,30,30);
                    camera.position.y=carros[indice-1].position.y;
                }
            }


            drawSprites();
            this.controlaCarros();
        }
    
    }

    //movimento dos carros
    controlaCarros(){
        if(keyIsDown(UP_ARROW)){
            player.positionY += 10;
            player.atualizar();
        }
    }
    
}//chave da classe

