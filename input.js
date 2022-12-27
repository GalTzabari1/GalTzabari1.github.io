class InputHandler {
	constructor(paddle, game) {
		document.addEventListener("keydown", (event) => {
			switch (event.keyCode) {
				case 27:
					game.togglePause();
					break;

				case 32:
					game.start();
					break;
			}
		});
	}
}

const getDraggingSpeed = (prevPosition, position) => {
	const acceleration = 2;
	const xSpeed = (position.x - prevPosition.x) * acceleration;
	const ySpeed = (position.y - prevPosition.y) * acceleration;
	return { x: xSpeed, y: ySpeed };
};

const getRopeStretchedSpeed = (ballPosition, ropePosition) => {
	const acceleration = 2;
	const ballDifference = ballPosition.y - ropePosition.y;
	const ySpeed = ballDifference * acceleration;
	return { x: 0, y: -ySpeed };
};

const startDraggingHandler = (e, context) => {
	console.log({ context });
	const balls = context.balls;
	let ballClicked = context.ball;
	if (ballClicked) clearInterval(ballClicked.movementIntervalId);
	var mouseX = e.pageX - 8;
	var mouseY = e.pageY - 8;

	// console.log({ mouseX, mouseY });
	// console.log({
	// 	ballSize: ball.size,
	// 	posX: ball.position.x,
	// 	posY: ball.position.y,
	// });
	// console.log({
	// 	condition1: `mouseX >= ball.position.x - ball.size / 2 = ${
	// 		mouseX >= ball.position.x - ball.size / 2
	// 	}`,
	// });
	// console.log({
	// 	condition2: `mouseX <= ball.position.x + ball.size / 2 = ${
	// 		mouseX <= ball.position.x + ball.size / 2
	// 	}`,
	// });
	// console.log({
	// 	condition3: `mouseY >= ball.position.y - ball.size / 2 = ${
	// 		mouseY >= ball.position.y - ball.size / 2
	// 	}`,
	// });
	// console.log({
	// 	condition4: `mouseY >= ball.position.y + ball.size / 2 = ${
	// 		mouseY >= ball.position.y + ball.size / 2
	// 	}`,
	// });

	for (let i = 0; i < balls.length; i++) {
		const ball = balls[i];
		if (
			mouseX >= ball.position.x &&
			mouseX <= ball.position.x + ball.size &&
			mouseY >= ball.position.y &&
			mouseY <= ball.position.y + ball.size
		) {
			ballClicked = ball;
			ballClicked.isDragging = true;
			break;
		}
	}
	context.ball = ballClicked;
};

const dragHandler = (e, context) => {
	const ballClicked = context.ball;
	if (!ballClicked) return;
	if (ballClicked.isDragging) {
		ballClicked.prevPosition = { ...ballClicked.position };
		ballClicked.position.x = e.pageX - 8;
		ballClicked.position.y = e.pageY - 8;
	}
};

const stopDraggingHandler = (e, context) => {
	const rope = context.rope;
	const ballClicked = context.ball;
	if (!ballClicked) return;
	if (ballClicked.isDragging) {
		const speed = rope.isStretching
			? getRopeStretchedSpeed(ballClicked.position, rope.position)
			: getDraggingSpeed(ballClicked.prevPosition, ballClicked.position);
		ballClicked.move(speed);
	}
	ballClicked.isDragging = false;
	rope.isStretching = false;
};

class DragHandler {
	constructor(balls, rope, canvasContext) {
		this.ball = null;
		this.balls = balls;
		this.rope = rope;

		// For mobile devices
		canvasContext.ontouchstart = (event) => {
			startDraggingHandler(event, this);
		};
		canvasContext.ontouchmove = (event) => {
			dragHandler(event, this);
		};
		canvasContext.ontouchend = (event) => {
			stopDraggingHandler(event, this);
		};

		// For desktop devices
		canvasContext.onmousedown = (event) => {
			startDraggingHandler(event, this);
		};
		canvasContext.onmousemove = (event) => {
			dragHandler(event, this);
		};
		canvasContext.onmouseup = (event) => {
			stopDraggingHandler(event, this);
		};

		// canvasContext.onmouseover = (event) => {
		// 	if (!this.ball) return;
		// 	this.ball.isDragging = false;
		// };

		// canvasContext.onmouseout = (event) => {
		// 	if (!this.ball) return;
		// 	this.ball.isDragging = false;
		// };
	}
}
