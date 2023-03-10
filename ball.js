class Ball {
	constructor(game, id) {
		this.image = document.getElementById("img_ball");

		this.gameWidth = game.gameWidth;
		this.gameHeight = game.gameHeight;
		this.id = id;
		this.game = game;
		this.gamePolicy = game.gamePolicy;
		this.isDragging = false;
		this.size = 40;
		this.reset();
		this.movementIntervalId = null;
		this.show = true;
	}

	reset(initPosition) {
		this.prevPosition = initPosition;
		this.position = initPosition;
		this.speed = { x: 0, y: 0 };
	}

	draw(ctx) {
		if (!this.show) return;
		ctx.drawImage(
			this.image,
			this.position.x,
			this.position.y,
			// this.position.x - this.size / 2,
			// this.position.y - this.size / 2,
			this.size,
			this.size
		);
	}

	update(deltaTime) {
		this.gamePolicy.ropeBallCollision(this.game.rope, this);
		this.gamePolicy.paddleBallCollision(this.game.paddle, this);

		this.position.x += this.speed.x;
		this.position.y += this.speed.y;

		// wall on left or right
		// if (this.position.x + this.size > this.gameWidth || this.position.x < 0) {
		// 	this.speed.x = -this.speed.x;
		// }
		if (isOutSideLeftOrRightBorder(this.position, this.size, this.gameWidth)) {
			this.speed.x = -this.speed.x;
		}

		// wall on top
		if (this.position.y < 0) {
			this.speed.y = -this.speed.y;
		}

		// bottom of game
		if (
			this.position.y + this.size >
			this.gameHeight - this.game.rope.marginBottom
		) {
			this.speed.y = -this.speed.y;
		}

		// if (detectCollision(this, this.game.paddle)) {
		// 	this.speed.y = -this.speed.y;
		// 	this.position.y = this.game.paddle.position.y - this.size;
		// }
	}

	move(speed) {
		this.speed = { ...speed };
		this.intervalId = setInterval(() => {
			this.speed.x *= 0.9;
			this.speed.y *= 0.9;
			if (Math.abs(this.speed.x) < 0.1 && Math.abs(this.speed.y) < 0.1) {
				clearInterval(this.intervalId);
				this.speed = { x: 0, y: 0 };
			}
		}, 100);
	}
}
