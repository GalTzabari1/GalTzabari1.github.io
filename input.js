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

class DragHandler {
	constructor(balls, rope, canvasContext) {
		this.ball = null;
		canvasContext.addEventListener("mousedown", (e) => {
			if (this.ball) clearInterval(this.ball.movementIntervalId);
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
					this.ball = ball;
					this.ball.isDragging = true;
					break;
				}
			}
		});
		canvasContext.addEventListener("mouseup", (event) => {
			if (!this.ball) return;
			if (this.ball.isDragging) {
				const speed = rope.isStretching
					? getRopeStretchedSpeed(this.ball.position, rope.position)
					: getDraggingSpeed(this.ball.prevPosition, this.ball.position);
				this.ball.move(speed);
			}
			this.ball.isDragging = false;
			rope.isStretching = false;
		});
		canvasContext.addEventListener("mouseover", (event) => {
			if (!this.ball) return;
			this.ball.isDragging = false;
		});

		canvasContext.addEventListener("mousemove", (e) => {
			if (!this.ball) return;
			if (this.ball.isDragging) {
				this.ball.prevPosition = { ...this.ball.position };
				this.ball.position.x = e.pageX - 8;
				this.ball.position.y = e.pageY - 8;
			}
		});

		canvasContext.addEventListener("onmouseout", (event) => {
			if (!this.ball) return;
			this.ball.isDragging = false;
		});
	}
}
