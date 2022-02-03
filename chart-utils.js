let _seed = new Date().getTime();

const MONTHS = [
	'January',
	'February',
	'March',
	'April',
	'May',
	'June',
	'July',
	'August',
	'September',
	'October',
	'November',
	'December',
];

const DAYOFWEEK = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

const COLORS = [
	'#4dc9f6',
	'#f67019',
	'#f53794',
	'#537bc4',
	'#acc236',
	'#166a8f',
	'#00a950',
	'#58595b',
	'#8549ba',
];

const CHART_COLORS = {
	red: 'rgb(255, 99, 132)',
	orange: 'rgb(255, 159, 64)',
	yellow: 'rgb(255, 205, 86)',
	green: 'rgb(75, 192, 192)',
	blue: 'rgb(54, 162, 235)',
	purple: 'rgb(153, 102, 255)',
	grey: 'rgb(201, 203, 207)',
};

const NAMED_COLORS = [
	'rgb(255, 99, 132)',
	'rgb(255, 159, 64)',
	'rgb(255, 205, 86)',
	'rgb(75, 192, 192)',
	'rgb(54, 162, 235)',
	'rgb(153, 102, 255)',
	'rgb(201, 203, 207)',
];

const valueOrDefault = function (value, defaultValue) {
	return typeof value === 'undefined' ? defaultValue : value;
};

const srand = function (seed) {
	_seed = seed;
};

const rand = function (min, max) {
	min = valueOrDefault(min, 0);
	max = valueOrDefault(max, 0);
	_seed = (_seed * 9301 + 49297) % 233280;
	return min + (_seed / 233280) * (max - min);
};

const numbers = function (config) {
	var cfg = config || {};
	var min = valueOrDefault(cfg.min, 0);
	var max = valueOrDefault(cfg.max, 100);
	var from = valueOrDefault(cfg.from, []);
	var count = valueOrDefault(cfg.count, 8);
	var decimals = valueOrDefault(cfg.decimals, 8);
	var continuity = valueOrDefault(cfg.continuity, 1);
	var dfactor = Math.pow(10, decimals) || 0;
	var data = [];
	var i, value;
	for (i = 0; i < count; ++i) {
		value = (from[i] || 0) + rand(min, max);
		if (rand(0, 1) <= continuity) {
			data.push(Math.round(dfactor * value) / dfactor);
		} else {
			data.push(null);
		}
	}
	return data;
};

const points = function (config) {
	const xs = numbers(config);
	const ys = numbers(config);
	return xs.map((x, i) => ({ x, y: ys[i] }));
};

const bubbles = function (config) {
	return points(config).map((pt) => {
		pt.r = rand(config.rmin, config.rmax);
		return pt;
	});
};

const labels = function (config) {
	var cfg = config || {};
	var min = cfg.min || 0;
	var max = cfg.max || 100;
	var count = cfg.count || 8;
	var step = (max - min) / count;
	var decimals = cfg.decimals || 8;
	var dfactor = Math.pow(10, decimals) || 0;
	var prefix = cfg.prefix || '';
	var values = [];
	var i;
	for (i = min; i < max; i += step) {
		values.push(prefix + Math.round(dfactor * i) / dfactor);
	}
	return values;
};

const months = function (config) {
	var cfg = config || {};
	var count = cfg.count || 12;
	var section = cfg.section || 30;
	var values = [];
	var i, value;
	for (i = 0; i < count; ++i) {
		value = MONTHS[Math.ceil(i) % 12];
		values.push(value.substring(0, section));
	}
	return values;
};

const dayofweek = function (config) {
	var cfg = config || {};
	var count = cfg.count || 7;
	var section = cfg.section || 7;
	var values = [];
	var i, value;
	for (i = 0; i < count; ++i) {
		value = DAYOFWEEK[Math.ceil(i) % 7];
		values.push(value.substring(0, section));
	}
	return values;
};

const addDate = function (dateStr, add) {
	const date = new Date(dateStr);
	date.setDate(date.getDate() + add);
	return date.toISOString().split('T')[0]; 
}

const color = function (index) {
	return COLORS[index % COLORS.length];
};

const colorHexParse = function (str) {
	let len = str.length;
	let ret;
	if (str[0] === '#') {
		const map = {
			0: 0,
			1: 1,
			2: 2,
			3: 3,
			4: 4,
			5: 5,
			6: 6,
			7: 7,
			8: 8,
			9: 9,
			A: 10,
			B: 11,
			C: 12,
			D: 13,
			E: 14,
			F: 15,
			a: 10,
			b: 11,
			c: 12,
			d: 13,
			e: 14,
			f: 15,
		};
		if (len === 4 || len === 5) {
			ret = {
				r: 255 & (map[str[1]] * 17),
				g: 255 & (map[str[2]] * 17),
				b: 255 & (map[str[3]] * 17),
				a: len === 5 ? map[str[4]] * 17 : 255,
			};
		} else if (len === 7 || len === 9) {
			ret = {
				r: (map[str[1]] << 4) | map[str[2]],
				g: (map[str[3]] << 4) | map[str[4]],
				b: (map[str[5]] << 4) | map[str[6]],
				a: len === 9 ? (map[str[7]] << 4) | map[str[8]] : 255,
			};
		}
	}
	return ret;
};

const colorRgbParse = function (str) {
	function round(v) {
		return (v + 0.5) | 0;
	}
	const lim = (v, l, h) => Math.max(Math.min(v, h), l);
	/**
	 * convert percent to byte 0..255
	 * @param {number} v - 0..100
	 */
	function p2b(v) {
		return lim(round(v * 2.55), 0, 255);
	}

	const m =
		/^rgba?\(\s*([-+.\d]+)(%)?[\s,]+([-+.e\d]+)(%)?[\s,]+([-+.e\d]+)(%)?(?:[\s,/]+([-+.e\d]+)(%)?)?\s*\)$/.exec(
			str
		);
	let a = 255;
	let r, g, b;

	if (!m) {
		return;
	}

	// r is undefined
	if (m[7] !== r) {
		const v = +m[7];
		a = 255 & (m[8] ? p2b(v) : v * 255);
	}

	r = +m[1];
	g = +m[3];
	b = +m[5];
	r = 255 & (m[2] ? p2b(r) : r);
	g = 255 & (m[4] ? p2b(g) : g);
	b = 255 & (m[6] ? p2b(b) : b);

	return {
		r: r,
		g: g,
		b: b,
		a: a,
	};
};

const transparentize = function (value, opacity) {
	var alpha = opacity === undefined ? 0.5 : 1 - opacity;
	const colorRgb = colorHexParse(value) || colorRgbParse(value);
	return (
		'rgba(' +
		colorRgb.r +
		',' +
		colorRgb.g +
		',' +
		colorRgb.b +
		',' +
		alpha +
		')'
	);
};

const namedColor = function (index) {
	return NAMED_COLORS[index % NAMED_COLORS.length];
};

const newDate = function (days) {
	const now = new Date();
	now.setDate(now.getDate() + days);
	return now;
};

const newDateString = function (days) {
	// test sdasd 
	return newDate(days).toISOString();
};

const stringify = function(option) {
	return JSON.stringify(option, (_, value) =>{
		if (typeof value === 'function') {
			return value
				.toString()
				.replace(/\/\/(.+)\n/gi, '/** $1 */\n')
				.split('\n')
				.map((line) => line.trim())
				.join(' ');
		}
		return value;
	}, 2);
}

module.exports = {
	MONTHS: MONTHS,
	DAYOFWEEK: DAYOFWEEK,
	COLORS: COLORS,
	CHART_COLORS: CHART_COLORS,
	NAMED_COLORS: NAMED_COLORS,
	valueOrDefault: valueOrDefault,
	srand: srand,
	rand: rand,
	numbers: numbers,
	points: points,
	bubbles: bubbles,
	labels: labels,
	months: months,
	dayofweek: dayofweek,
	color: color,
	colorHexParse: colorHexParse,
	colorRgbParse: colorRgbParse,
	transparentize: transparentize,
	namedColor: namedColor,
	newDate: newDate,
	newDateString: newDateString,
	addDate : addDate,
	stringify : stringify
};
