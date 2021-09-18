var fondo;
var carro;
var cursores;
var enemigos;
var timer;
var gasolinas;
var timerGasolina;
// var vidas;
var textVidas;
// var puntaje;
var textPuntaje;
// var nivel;
var textNivel;

var Level2 = {
    preload: function () {
        juego.load.image('bg', 'img/bg.png');
        juego.load.image('carro', 'img/carro.png');
        juego.load.image('carroMalo', 'img/carroMalo.png');
        juego.load.image('gasolina', 'img/gas.png');

        juego.forceSingleUpdate = true;

    },

    create: function () {
        fondo = juego.add.tileSprite(0, 0, 290, 540, 'bg');
        carro = juego.add.sprite(juego.width / 2, 496, 'carro');
        carro.anchor.setTo(0.5);
        juego.physics.arcade.enable(carro);
        enemigos = juego.add.group();
        juego.physics.arcade.enable(enemigos, true);
        enemigos.enableBody = true;
        enemigos.createMultiple(20, 'carroMalo');
        enemigos.setAll('anchor.x', 0.5);
        enemigos.setAll('anchor.y', 0.5);
        enemigos.setAll('outOfBoundsKill', true);
        enemigos.setAll('checkWorldBounds', true);
        gasolinas = juego.add.group();
        juego.physics.arcade.enable(gasolinas, true);
        gasolinas.enableBody = true;
        gasolinas.createMultiple(20, 'gasolina');
        gasolinas.setAll('anchor.x', 0.5);
        gasolinas.setAll('anchor.y', 0.5);
        gasolinas.setAll('outOfBoundsKill', true);
        gasolinas.setAll('checkWorldBounds', true);
        timer = juego.time.events.loop(1500, this.crearCarroMalo, this);
        timerGasolina = juego.time.events.loop(2000, this.crearGasolina, this);
        cursores = juego.input.keyboard.createCursorKeys();
        // vidas
        // vidas = 3;
        juego.add.text(185, 10, "Vidas: ", { font: "bold 14px Arial", fill: "#FFF" });
        textVidas = juego.add.text(230, 10, vidas, { font: "bold 14px Arial", fill: "#FFF" });
        // puntos
        // puntaje = 0;
        juego.add.text(40, 10, "Pts: ", { font: "bold 14px Arial", fill: "#FFF" });
        textPuntaje = juego.add.text(70, 10, puntaje, { font: "bold 14px Arial", fill: "#FFF" });
        // nivel
        nivel = 2;
        juego.add.text(120, 10, "Lvl: ", { font: "bold 14px Arial", fill: "#FFF" });
        textNivel = juego.add.text(150, 10, nivel, { font: "bold 14px Arial", fill: "#FFF" });

    },

    update: function () {
        fondo.tilePosition.y += 5;
        if (cursores.right.isDown && carro.position.x < 245) {
            carro.position.x += 5;
        } else if (cursores.left.isDown && carro.position.x > 45) {
            carro.position.x -= 5;
        }
        juego.physics.arcade.overlap(carro,enemigos,this.carroColision,null,this);
        juego.physics.arcade.overlap(carro,gasolinas,this.carroColision,null,this);
        if (vidas <= 0) {
            juego.state.start('Terminado');
        }
        if (puntaje >= 30) {
            juego.state.start('Ganaste');
        }
    },
    crearCarroMalo: function () {
        var position = Math.floor(Math.random() * 3) + 1;
        var enemigo = enemigos.getFirstDead();
        enemigo.physicsBodyType = Phaser.Physics.ARCADE;
        enemigo.reset(position * 73, 0);
        enemigo.body.velocity.y = 200;
        enemigo.anchor.setTo(0.5);
        puntaje++;
        textPuntaje.text = puntaje;
    },
    crearGasolina: function () {
        var pos = Math.floor(Math.random() * 3) + 1;
        var gasolina = gasolinas.getFirstDead();
        gasolina.physicsBodyType = Phaser.Physics.ARCADE;
        gasolina.reset(pos * 73, 0);
        gasolina.body.velocity.y = 200;
        gasolina.anchor.setTo(0.5);
        // puntaje++;
        // textPuntaje.text = puntaje;
    },
    carroColision: function (player, enemy) {
        enemy.kill();
        vidas--;
        textVidas.text = vidas;
    }
}