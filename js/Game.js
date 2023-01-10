class Game {
    constructor(){
        this.placarTitulo = createElement("h2");
        this.jogador1 = createElement("h2");
        this.jogador2 = createElement("h2");

        //butao de riniciar
        this.botao = createButton("reset")
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

        this.botao.position(width-300,130);
        this.botao.class("customButton");
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

        gComb = new Group();
        gMoedas = new Group();
        gObstaculo = new Group();

        var obstaclesPositions = [
            { x: width / 2 + 250, y: height - 800, image: pneuImg },
            { x: width / 2 - 150, y: height - 1300, image: coneImg },
            { x: width / 2 + 250, y: height - 1800, image: coneImg  },
            { x: width / 2 - 180, y: height - 2300, image: pneuImg },
            { x: width / 2, y: height - 2800, image: pneuImg },
            { x: width / 2 - 180, y: height - 3300, image: coneImg  },
            { x: width / 2 + 180, y: height - 3300, image: pneuImg },
            { x: width / 2 + 250, y: height - 3800, image: pneuImg },
            { x: width / 2 - 150, y: height - 4300, image: coneImg  },
            { x: width / 2 + 250, y: height - 4800, image: pneuImg },
            { x: width / 2, y: height - 5300, image: coneImg  },
            { x: width / 2 - 180, y: height - 5500, image: pneuImg }
          ];

        this.addSprites(gMoedas, 20, moedaImg, 0.09);
        this.addSprites(gComb, 20, combImg, 0.02);
        this.addSprites(gObstaculo, obstaclesPositions.length, pneuImg, 0.04,obstaclesPositions);
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
            this.reset();

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

        if(keyIsDown(LEFT_ARROW) && player.positionX>width/3-50){
            player.positionX -= 10;
            player.atualizar();
            
        }

        if(keyIsDown(RIGHT_ARROW) && player.positionX<width/2+270){
            player.positionX += 10;
            player.atualizar();
        }
    }
    
    reset(){
        this.botao.mousePressed(()=>{
           database.ref("/").set({
            gameState: 0,
            playerCount: 0,
            players:{},
           }) 
           window.location.reload();
        })
    }

    //criar os sprites de combustível, moedas e obstáculos
    addSprites(grupo, numero, imagem, escala, matriz = []){
        for(var i=0; i<numero; i++){
            var x,y;

            if(matriz.length>0){
                x=matriz[i].x;
                y=matriz[i].y;
                imagem=matriz[i].image;
            }
            else{
                x = random(width/2-150, width/2+150);
                y = random(-height*4.5, height-400);
            }
        
            var sprite = createSprite(x,y);
            sprite.addImage("sprite", imagem);

            sprite.scale = escala;
            grupo.add(sprite);
        }
    }
}//chave da classe

