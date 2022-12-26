class GamePolicy {
	constructor(game) {}

	paddleBallCollision(paddle, ball) {
		if (detectCollision(this.game.ball, this)) {
			this.game.ball.show = false;
		}
	}
}
