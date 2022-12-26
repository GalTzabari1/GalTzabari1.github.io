const GAMESTATE = {
	PAUSED: 0,
	RUNNING: 1,
	MENU: 2,
	GAMEOVER: 3,
	NEWLEVEL: 4,
};

class Game {
	constructor(gameWidth, gameHeight, bricksPerRow) {
		this.gameWidth = gameWidth;
		this.gameHeight = gameHeight;
		this.gamestate = GAMESTATE.MENU;
		this.ball = new Ball(this);
		this.rope = new Rope(this, this.ball);
		this.paddle = new Paddle(this);
		this.gameObjects = [];
		this.lives = 3;
		this.levels = [level1, level2];
		this.currentLevel = 0;
	}

	start() {
		if (
			this.gamestate !== GAMESTATE.MENU &&
			this.gamestate !== GAMESTATE.NEWLEVEL
		)
			return;

		this.ball.reset();
		this.gameObjects = [this.ball, this.rope, this.paddle];

		this.gamestate = GAMESTATE.RUNNING;
	}

	update(deltaTime) {
		if (this.lives === 0) this.gamestate = GAMESTATE.GAMEOVER;

		if (
			this.gamestate === GAMESTATE.PAUSED ||
			this.gamestate === GAMESTATE.MENU ||
			this.gamestate === GAMESTATE.GAMEOVER
		)
			return;
		[...this.gameObjects].forEach((object) => object.update(deltaTime));
	}

	draw(ctx) {
		[...this.gameObjects].forEach((object) => object.draw(ctx));
	}

	togglePause() {
		if (this.gamestate == GAMESTATE.PAUSED) {
			this.gamestate = GAMESTATE.RUNNING;
		} else {
			this.gamestate = GAMESTATE.PAUSED;
		}
	}
}
