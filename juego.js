var nave;
var balas;
var tiempoEntreBalas=400;
var tiempo=0;
var malos;
var timer;
var puntos;
var txtPuntos;
var vidas;
var textVidas;
var cursores;
var slaser;

var Juego={
	preload: function () {
		juego.load.image('nave','img/_nave.png');
		juego.load.image('laser','img/laser.png');
		juego.load.image('malo','img/_malo.png');
		juego.load.image('bg','img/bg.png');
		juego.load.audio('slaser', './sounds/laser.wav');
	},

	create: function(){
		juego.add.tileSprite(0,0,400,540,'bg');
		juego.physics.startSystem(Phaser.Physics.ARCADE);
		nave = juego.add.sprite(juego.width/2, 485, 'nave');
		nave.anchor.setTo(0.5);
		juego.physics.arcade.enable(nave, true);
		cursores=juego.input.keyboard.createCursorKeys();

		balas = juego.add.group();
		balas.enableBody = true;
		balas.setEnableBody = Phaser.Physics.ARCADE;
		balas.createMultiple(50, 'laser');
		balas.setAll('anchor.x', 0.5);
		balas.setAll('anchor.y', 0.5);
		balas.setAll('checkWorldBounds', true);
		balas.setAll('outOfBoundsKill', true);

		malos = juego.add.group();
		malos.enableBody = true;
		malos.setEnableBody = Phaser.Physics.ARCADE;
		malos.createMultiple(30, 'malo');
		malos.setAll('anchor.x', 0.5);
		malos.setAll('anchor.y', 0.5);
		malos.setAll('checkWorldBounds', true);
		malos.setAll('outOfBoundsKill', true);

		timer=juego.time.events.loop(2000,this.crearEnemigo, this);

		puntos=0;
		juego.add.text(20,20, "Puntos: ", {font: "14px Arial", fill: "#FFF"});
		txtPuntos=juego.add.text(80,20, "0",{font: "14px Arial", fill: "#FFF"});

		vidas=3;
		juego.add.text(310,20, "Vidas: ", {font: "14px Arial", fill: "#FFF"});
		textVidas=juego.add.text(360,20, vidas,{font: "14px Arial", fill: "#FFF"});

		slaser = juego.add.audio('slaser');

	},
	update: function(){
		// animamos el juego
        if(cursores.right.isDown){
            nave.position.x+=3;
        }else if(cursores.left.isDown){
            nave.position.x-=3;
        }
		nave.rotation = juego.physics.arcade.angleToPointer(nave) + Math.PI / 2;
		if(juego.input.activePointer.isDown){
			this.disparar();
		}
		// colision
		juego.physics.arcade.overlap(balas,malos,this.balaColisionEnemy,null,this);
		// contador vidas
		malos.forEachAlive(function(m){
			if (m.position.y > 520 && m.position.y < 521) {
				vidas -= 1;
				textVidas.text = vidas;
			}
		});
		if(vidas == 0){
			juego.state.start('Terminado');
		}
	},
	disparar: function(){
		if(juego.time.now > tiempo && balas.countDead() > 0){
			tiempo = juego.time.now + tiempoEntreBalas;
			var bala = balas.getFirstDead();
			bala.anchor.setTo(0.5);
			bala.reset(nave.x, nave.y);
			bala.rotation = juego.physics.arcade.angleToPointer(bala) + Math.PI/2;
			juego.physics.arcade.moveToPointer(bala, 200);
			slaser.play();
		}
	},
	crearEnemigo: function(){
		var enem=malos.getFirstDead();
		var num=Math.floor(Math.random()*10+1);
		enem.reset(num*38,0);
		enem.anchor.setTo(0.5);
		enem.body.velocity.y = 100;
		enem.checkWorldBounds = true;
		enem.outOfBoundsKill = true;
	},
	balaColisionEnemy: function(b, m){
		b.kill();
		m.kill();
		puntos++;
		txtPuntos.text = puntos;
	}


};