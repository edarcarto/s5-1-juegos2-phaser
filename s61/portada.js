var botonStart;

var Portada = {
    
    preload: function(){
        
    },
    
    create: function(){
  		juego.stage.backgroundColor = "000000";
        juego.add.text(5,250, "Presiona Spacebar", {font: "bold 32px cursive", fill: "#FFF"});
  		juego.add.text(40,400, "Juego desarrollado @edarcarto", {font: "bold 14px Arial", fill: "#FFF"});
        juego.add.text(60,420, "Efren Carrillo - u19303680", {font: "bold 14px Arial", fill: "#FFF"});
		botonStart=juego.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    },

    update: function(){
        if(botonStart.isDown){
            juego.state.start('Juego');
        }
    }
    
   
};