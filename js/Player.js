class Player {
    constructor(){
        this.nome = null;
        this.indice = null;
        this.positionX = 0;
        this.positionY = 0;
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
            name: this.nome,
            positionX: this.positionX,
            positionY: this.positionY,
        })
    }
}