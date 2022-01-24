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
	
	static DAYOFWEEK: string[] = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

	static COLORS: string[] = [
		'#4dc9f6',
		'#f67019',
		'#f53794',
		'#537bc4',
		'#acc236',
		'#166a8f',
		'#00a950',
		'#58595b',
		'#8549ba'
	];

	static CHART_COLORS: { 
		[ key : string ] : string;
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
		grey: 'rgb(201, 203, 207)'
	};

	static NAMED_COLORS: string[] = [
		'rgb(255, 99, 132)',
		'rgb(255, 159, 64)',
		'rgb(255, 205, 86)',
		'rgb(75, 192, 192)',
		'rgb(54, 162, 235)',
		'rgb(153, 102, 255)',
		'rgb(201, 203, 207)'
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

	static transparentize(value, opacity) {
		var alpha = opacity === undefined ? 0.5 : 1 - opacity;
		return value.replace(')', ', ' + alpha + ')').replace('rgb', 'rgba');
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
}
