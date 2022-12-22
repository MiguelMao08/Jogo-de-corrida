class Player {
    constructor(){
        this.nome = null;
        this.indice = null;
        this.positionX = 0;
        this.positionY = 0;
        this.rank = 0;
        this.pontos = 0;
        this.comb = 185;
    }
    //métodos

     //pegar a contagem dos players do banco de dados (ler o BD)
     pegarContagem(){
        var playerCountRef = database.ref("playerCount");
        playerCountRef.on("value", function(data){
            playerCount = data.val();
        });
    }

    //atualizar a contagem no banco de dados
    atualizarContagem(contagem){
        database.ref("/").update({
            playerCount: contagem
        });
    }

    //adicionar o player no banco de dados
    addPlayer(){
        var playerIndex = "players/player" + this.indice;
        if(this.indice === 1){
            this.positionX = width/2 - 100;
        }else{
            this.positionX = width/2 + 100;
        }

        database.ref(playerIndex).set({
            nome: this.nome,
            positionX: this.positionX,
            positionY: this.positionY,
            rank: this.rank,
            pontos: this.pontos,
            comb: this.comb,
        })
    }

    //pega os dados de todos os players do BD 

    static pegaInfoPlayers(){
        var playerInfoRef = database.ref("players");
        playerInfoRef.on("value", data =>{
            allPlayers = data.val();
        });
    }

    //atualizar o BD
    atualizar(){
        var playerIndex = "players/player" + this.indice;
        database.ref(playerIndex).update({
            positionX: this.positionX,
            positionY: this.positionY,
            rank: this.rank,
            pontos: this.pontos,
            comb: this.comb,
        });
    }
    //lê as posições X e Y do BD para iniciar o jogo
    pegarDistancia(){
        var playerDistanceRef = database.ref("players/player"+this.indice);
        playerDistanceRef.on("value", data =>{
            var data = data.val();
            this.positionX = data.positionX;
            this.positionY = data.positionY;
        });
    }

    
}//chave da classe