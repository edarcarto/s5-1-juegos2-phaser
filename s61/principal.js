var juego = new Phaser.Game(290, 540, Phaser.CANVAS, 'runner');

juego.state.add('Portada', Portada);
juego.state.add('Juego', Juego);
juego.state.add('Level2', Level2);
juego.state.add('Terminado', Terminado);
juego.state.add('Ganaste', Ganaste);
juego.state.start('Portada');