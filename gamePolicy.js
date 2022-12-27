class GamePolicy {
	constructor(game) {}

	ropeBallCollision(rope, ball) {
		const ballDifference = ball.position.y - rope.position.y;
		if (ball.isDragging && ballDifference > 0) {
			rope.middleCurveX = ball.position.x;
			rope.isStretching = true;
		}
	}

	paddleBallCollision(paddle, ball) {
		if (detectCollision(ball, paddle)) {
			ball.show = false;
		}
	}
}
