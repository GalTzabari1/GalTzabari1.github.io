class InputHandler {
	constructor(paddle, game) {
		document.addEventListener("keydown", (event) => {
			switch (event.keyCode) {
				// case 37:
				// 	paddle.moveLeft();
				// 	break;

				// case 39:
				// 	paddle.moveRight();
				// 	break;

				case 27:
					game.togglePause();
					break;

				case 32:
					game.start();
					break;
			}
		});

		// document.addEventListener("keyup", (event) => {
		// 	switch (event.keyCode) {
		// 		case 37:
		// 			if (paddle.speed < 0) paddle.stop();
		// 			break;

		// 		case 39:
		// 			if (paddle.speed > 0) paddle.stop();
		// 			break;
		// 	}
		// });
	}
}

const getSpeed = (prevPosition, position) => {
	const acceleration = 2;
	const xSpeed = (position.x - prevPosition.x) * acceleration;
	const ySpeed = (position.y - prevPosition.y) * acceleration;
	return { x: xSpeed, y: ySpeed };
};

class DragHandler {
	constructor(ball, canvasContext) {
		this.intervalId = null;
		canvasContext.onmousedown = function (e) {
			clearInterval(this.intervalId);
			var mouseX = e.pageX - 8;
			var mouseY = e.pageY - 8;

			if (
				mouseX >= ball.position.x - ball.size / 2 &&
				mouseX <= ball.position.x + ball.size / 2 &&
				mouseY >= ball.position.y - ball.size / 2 &&
				mouseY <= ball.position.y + ball.size / 2
			) {
				ball.isDragging = true;
			}
		};
		canvasContext.onmouseup = (event) => {
			if (ball.isDragging) {
				console.log({
					prevPosition: ball.prevPosition,
					position: ball.position,
				});
				ball.speed = getSpeed(ball.prevPosition, ball.position);

				this.intervalId = setInterval(() => {
					ball.speed.x *= 0.9;
					ball.speed.y *= 0.9;
					if (Math.abs(ball.speed.x) < 0.1 && Math.abs(ball.speed.y) < 0.1) {
						clearInterval(this.intervalId);
						ball.speed = { x: 0, y: 0 };
					}
				}, 100);
			}
			ball.isDragging = false;
		};
		canvasContext.onmouseover = (event) => {
			ball.isDragging = false;
		};

		canvasContext.onmousemove = (e) => {
			if (ball.isDragging) {
				ball.prevPosition = { ...ball.position };
				ball.position.x = e.pageX - 8;
				ball.position.y = e.pageY - 8;
			}
		};

		canvasContext.onmouseout = (event) => {
			ball.isDragging = false;
		};
	}
}
