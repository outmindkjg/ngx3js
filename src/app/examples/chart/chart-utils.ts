export interface ChartConfig {
	count?: number;
	section?: number;
	min?: number;
	max?: number;
	decimals?: number;
	prefix?: string;
	from?: number[];
	continuity?: number;
	rmin?: number;
	rmax?: number;
}

export interface ChartAction {
	name?: string;
	handler?: string | Function | Object;
	onclick?: Function;
	property?: string;
	select?: any[] | { [key: string]: any };
	min?: number;
	max?: number;
	listen?: boolean;
	change?: any;
}

export interface ChartSharedVar {
	[key: string]: any;
}

export class ChartUtils {
	static _seed: number = new Date().getTime();

	static MONTHS: string[] = [
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

	static DAYOFWEEK: string[] = [
		'Mon',
		'Tue',
		'Wed',
		'Thu',
		'Fri',
		'Sat',
		'Sun',
	];

	static COLORS: string[] = [
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

	static CHART_COLORS: {
		[key: string]: string;
		red: string;
		orange: string;
		yellow: string;
		green: string;
		blue: string;
		purple: string;
		grey: string;
	} = {
		red: 'rgb(255, 99, 132)',
		orange: 'rgb(255, 159, 64)',
		yellow: 'rgb(255, 205, 86)',
		green: 'rgb(75, 192, 192)',
		blue: 'rgb(54, 162, 235)',
		purple: 'rgb(153, 102, 255)',
		grey: 'rgb(201, 203, 207)',
	};

	static NAMED_COLORS: string[] = [
		'rgb(255, 99, 132)',
		'rgb(255, 159, 64)',
		'rgb(255, 205, 86)',
		'rgb(75, 192, 192)',
		'rgb(54, 162, 235)',
		'rgb(153, 102, 255)',
		'rgb(201, 203, 207)',
	];

	static valueOrDefault(value: any, defaultValue: any): any {
		return typeof value === 'undefined' ? defaultValue : value;
	}

	static srand(seed: number) {
		this._seed = seed;
	}

	static rand(min?: number, max?: number) {
		min = this.valueOrDefault(min, 0);
		max = this.valueOrDefault(max, 0);
		this._seed = (this._seed * 9301 + 49297) % 233280;
		return min + (this._seed / 233280) * (max - min);
	}

	static numbers(config: ChartConfig): number[] {
		var cfg = config || {};
		var min = this.valueOrDefault(cfg.min, 0);
		var max = this.valueOrDefault(cfg.max, 100);
		var from = this.valueOrDefault(cfg.from, []);
		var count = this.valueOrDefault(cfg.count, 8);
		var decimals = this.valueOrDefault(cfg.decimals, 8);
		var continuity = this.valueOrDefault(cfg.continuity, 1);
		var dfactor = Math.pow(10, decimals) || 0;
		var data = [];
		var i, value;
		for (i = 0; i < count; ++i) {
			value = (from[i] || 0) + this.rand(min, max);
			if (this.rand(0, 1) <= continuity) {
				data.push(Math.round(dfactor * value) / dfactor);
			} else {
				data.push(null);
			}
		}
		return data;
	}

	static points(config: ChartConfig): { x: number; y: number }[] {
		const xs = this.numbers(config);
		const ys = this.numbers(config);
		return xs.map((x, i) => ({ x, y: ys[i] }));
	}

	static bubbles(config?: ChartConfig): { x: number; y: number; r: number }[] {
		return this.points(config).map((pt: any) => {
			pt.r = this.rand(config.rmin, config.rmax);
			return pt;
		});
	}

	static labels(config?: ChartConfig): string[] {
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
	}

	static months(config?: ChartConfig): string[] {
		var cfg = config || {};
		var count = cfg.count || 12;
		var section = cfg.section || 30;
		var values = [];
		var i, value;
		for (i = 0; i < count; ++i) {
			value = this.MONTHS[Math.ceil(i) % 12];
			values.push(value.substring(0, section));
		}
		return values;
	}

	static dayofweek(config?: ChartConfig): string[] {
		var cfg = config || {};
		var count = cfg.count || 7;
		var section = cfg.section || 7;
		var values = [];
		var i, value;
		for (i = 0; i < count; ++i) {
			value = this.DAYOFWEEK[Math.ceil(i) % 7];
			values.push(value.substring(0, section));
		}
		return values;
	}

	static color(index) {
		return this.COLORS[index % this.COLORS.length];
	}

	static colorHexParse(str) {
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
	}

	/**
	 * Parse rgb(a) string to RGBA
	 * @param {string} str - the rgb string
	 * @returns {RGBA} - the parsed color
	 */
	static colorRgbParse(str) {
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
	}

	static transparentize(value, opacity?: number) {
		var alpha = opacity === undefined ? 0.5 : 1 - opacity;
		const colorRgb = this.colorHexParse(value) || this.colorRgbParse(value);
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
	}

	static namedColor(index) {
		return this.NAMED_COLORS[index % this.NAMED_COLORS.length];
	}

	static newDate(days): Date {
		const now = new Date();
		now.setDate(now.getDate() + days);
		return now;
	}

	static newDateString(days) {
		return this.newDate(days).toISOString();
	}

	static stringify(option): string {
		return JSON.stringify(
			option,
			(_, value) => {
				if (typeof value === 'function') {
					return value
						.toString()
						.split('\n')
						.map((line) => line.trim())
						.join(' ');
				}
				return value;
			},
			2
		);
	}

	static parseISODate(dateString: string): Date {
		return new Date(dateString);
	}

	static isFunctionString(str: string): boolean {
		if (str !== null && str !== undefined) {
			return (
				/\)[ \t\n]*=>[ \t\n]*/.test(str) ||
				/^(function|function [a-zA-Z][a-zA-Z_0-9]+|[a-zA-Z][a-zA-Z_0-9]+)(| )\([^\)]*\)[ \t\n]*\{/.test(
					str
				)
			);
		} else {
			return false;
		}
	}

	static getFunctionString(str: string): string {
		return str.replace(
			/^(function|function [a-zA-Z][a-zA-Z_0-9]+|[a-zA-Z][a-zA-Z_0-9]+)(| )\(/,
			'function('
		);
	}

	static isObjectString(str: string): boolean {
		return /^\{/.test(str) && /\}$/.test(str);
	}

	static isCallableString(str: string): boolean {
		return /^(new |)(map|Date|[a-zA-Z][a-zA-Z0-9]+\.[a-zA-Z][a-zA-Z0-9_\.]+)(|\(.*\))$/.test(str);
	}
}
