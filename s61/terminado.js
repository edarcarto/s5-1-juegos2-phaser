var botonStart;

var Terminado = {
    
    preload: function(){
        
    },
    
    create: function(){
  		juego.stage.backgroundColor = "990000";
  		juego.add.text(40,250, "Vuelve a intenterlo", {font: "bold 20px cursive", fill: "#FFF"});
        juego.add.text(40,300, "Presiona Spacebar", {font: "bold 20px cursive", fill: "#FFF"});
        botonStart=juego.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    },

    update: function(){
        if(botonStart.isDown){
            juego.state.start('Portada');
        }
    }
};