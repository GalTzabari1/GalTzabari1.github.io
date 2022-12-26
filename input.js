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

class DragHandler {
	constructor(ball, rope, canvasContext) {
		canvasContext.onmousedown = function (e) {
			clearInterval(ball.movementIntervalId);
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

			if (
				mouseX >= ball.position.x &&
				mouseX <= ball.position.x + ball.size &&
				mouseY >= ball.position.y &&
				mouseY <= ball.position.y + ball.size
			) {
				ball.isDragging = true;
			}
		};
		canvasContext.onmouseup = (event) => {
			if (ball.isDragging) {
				const speed = rope.isStretching
					? getRopeStretchedSpeed(ball.position, rope.position)
					: getDraggingSpeed(ball.prevPosition, ball.position);
				ball.move(speed);
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
