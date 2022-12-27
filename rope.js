class Rope {
	constructor(game) {
		this.gameWidth = game.gameWidth;
		this.marginBottom = 50;
		this.width = this.gameWidth;
		this.height = 10;
		this.middleCurveX = 0;
		this.isStretching = false;
		this.position = {
			x: game.gameWidth / 2 - this.width / 2,
			y: game.gameHeight - this.height - this.marginBottom,
		};
	}

	draw(ctx) {
		const curveDepthMultiple = 2;
		ctx.fillStyle = "#0ff";
		ctx.beginPath();
		ctx.moveTo(0, this.position.y);
		if (this.isStretching) {
			ctx.bezierCurveTo(
				this.middleCurveX - 30,
				this.position.y + 20 * curveDepthMultiple,
				this.middleCurveX - 30,
				this.position.y + 20 * curveDepthMultiple,
				this.width,
				this.position.y
			);
		}
		ctx.lineTo(this.width, this.position.y);
		ctx.stroke();
	}

	update(deltaTime) {}
}
