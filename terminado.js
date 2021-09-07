var Terminado = {
	preload: function () {
		juego.load.image('back', 'img/swirl1.jpg');
	},

	create: function () {
		//	Our background
		juego.add.image(0, 0, 'back');
		bmd = juego.add.bitmapData(juego.width, juego.height);
		//	Black and opaque
		bmd.fill(0, 0, 0, 1);
		bmd.addToWorld();
		//	Our text object
		text = juego.make.text(20, 20, "game over", { font: "bold 32px Arial", fill: "#ff0044" });
		text.anchor.set(0.5);

		juego.add.tween(text.scale).to({ x: 0.5, y: 0.5 }, 2000, Phaser.Easing.Linear.None, true, 0, Number.MAX_VALUE, true);
		juego.time.events.loop(Phaser.Timer.SECOND * 4, function() { bmd.cls(); }, this);
	},

	update: function () {
		bmd.fill(0, 0, 0, 0.05);

		//	Un-comment to see the rotation in action
		text.rotation += 0.05;

		bmd.draw(text, juego.world.randomX, juego.world.randomY, null, null, 'destination-out');
	}

};