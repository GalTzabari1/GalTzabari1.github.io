class Paddle {
	constructor(game) {
		this.gameWidth = game.gameWidth;
		this.game = game;

		this.width = 50;
		this.height = 20;

		this.position = {
			x: game.gameWidth / 2 - this.width / 2,
			y: 0,
		};
	}

	draw(ctx) {
		ctx.fillStyle = "#0ff";
		ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
	}

	update(deltaTime) {
		if (detectCollision(this.game.ball, this)) {
			this.game.ball.show = false;
		}
	}
}
