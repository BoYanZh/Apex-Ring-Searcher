export const SIZE = 1024;
export const USER_RINGS = 2;
export const MAX_RESULT_COUNT = 5;
export const scale = (x) => (x / 16384) * SIZE;
export const search = (userRings, sourceRings) => {
	const similarity = (gameID, rings) => {
		let score = 0;
		if (!rings || rings.length + 1 < userRings.length) return score;
		let ringCount = Math.min(userRings.length, rings.length);
		for (let i = 0; i < ringCount; ++i) {
			const [x1, y1] = [scale(rings[i][0]), scale(rings[i][1])];
			const [x2, y2] = [userRings[i].x, userRings[i].y];
			const d = Math.sqrt((x1 - x2) ** 2 + (y1 - y2) ** 2);
			score += Math.exp(-d / 100) * (i + 1);
		}
		score = (((score * 100) / (1 + ringCount)) * ringCount) / 2;
		return {
			gameID: gameID,
			score: score,
			rings: rings.map((item, idx) => {
				return {
					id: `${gameID}-ring-${idx}`,
					x: scale(item[0]),
					y: scale(item[1]),
					r: scale(item[2])
				};
			})
		};
	};
	const colorize = (data, idx) => {
		data.rings.map((x) => {
			x.color = ['#9400D3', '#FF1493', '#FF69B4', '#FFB6C1', '#FFC0CB'][idx];
			return x;
		});
		return data;
	};
	return Object.entries(sourceRings)
		.map(([k, v]) => similarity(k, v))
		.sort((a, b) => b.score - a.score)
		.slice(0, 5)
		.map((x, idx) => colorize(x, idx));
};
