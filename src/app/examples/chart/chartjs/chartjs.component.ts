import {
	Component,
	EventEmitter,
	forwardRef,
	Input,
	OnInit,
	Output,
	SimpleChanges,
} from '@angular/core';
import {
	I3JS,
	INgxColor,
	N3JS,
	NgxAbstractSubscribeComponent,
	NgxAbstractTextureComponent,
	NgxThreeUtil,
} from 'ngx3js';
import { ChartUtils } from '../chart-utils';
import * as CHARTJS from './chartjs.interface';

/**
 * The Mesh component.
 *
 * See the [ngx3js docs](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/NgxEchart) page for details.
 *
 * ```html
 * <ngx3js-echart [type]="'skybox'" [skyboxType]="'sun'"></ngx3js-echart>
 * ```
 *
 * @see THREE.Mesh
 * @see THREE.Group
 */
@Component({
	selector: 'ngx3js-texture-chartjs',
	templateUrl: './chartjs.component.html',
	styleUrls: ['./chartjs.component.scss'],
	providers: [
		{
			provide: NgxAbstractTextureComponent,
			useExisting: forwardRef(() => NgxTextureChartJsComponent),
		},
		{
			provide: NgxAbstractSubscribeComponent,
			useExisting: forwardRef(() => NgxTextureChartJsComponent),
		},
	],
})
export class NgxTextureChartJsComponent
	extends NgxAbstractTextureComponent
	implements OnInit
{
	@Input() public chartjs: CHARTJS.Chart = null;

	@Input() public helpers: any = null;

	@Input() public option: CHARTJS.ChartConfiguration = {};

	@Input() public optionSeqn: string = null;

	@Output() public onInitChart: EventEmitter<CHARTJS.Chart> =
		new EventEmitter<CHARTJS.Chart>();

	@Input() public width: number = 1;

	@Input() public height: number = 1;

	@Input() public canvasSize: number = 1024;

	@Input() public canvasBackground: INgxColor = null;

	@Input() public canvasBackgroundOpacity: number = 1;

	/**
	 * Creates an instance of mesh component.
	 */
	constructor() {
		super();
	}

	/**
	 * A callback method that is invoked immediately after the default change detector has checked the directive's data-bound properties for the first time, and before any of the view or content children have been checked.
	 * It is invoked only once when the directive is instantiated.
	 */
	ngOnInit(): void {
		super.ngOnInit('texture-echarts');
	}

	/**
	 * A callback method that performs custom clean-up, invoked immediately before a directive, pipe, or service instance is destroyed.
	 */
	ngOnDestroy(): void {
		if (this._mapCanvas !== null) {
			this._mapCanvas.parentNode.removeChild(this._mapCanvas);
		}
		if (this._chart !== null) {
			this._chart.destroy();
		}
		super.ngOnDestroy();
	}

	/**
	 * A callback method that is invoked immediately after the default change detector has checked the directive's data-bound properties for the first time, and before any of the view or content children have been checked.
	 * It is invoked only once when the directive is instantiated.
	 * default change detector has checked data-bound properties if at least one has changed, and before the view and content children are checked.
	 *
	 * @param changes The changed properties.
	 */
	ngOnChanges(changes: SimpleChanges): void {
		super.ngOnChanges(changes);
		if (changes && this.texture) {
			this.addChanges(changes);
		}
	}

	/**
	 * A callback method that is invoked immediately after Angular has completed initialization of all of the directive's content.
	 * It is invoked only once when the directive is instantiated.
	 */
	ngAfterContentInit(): void {
		super.ngAfterContentInit();
	}

	/**
	 * Applys changes3d
	 * @param changes
	 * @returns
	 */
	public applyChanges(changes: string[]) {
		if (this.texture !== null) {
			if (NgxThreeUtil.isIndexOf(changes, 'clearinit')) {
				this.getTexture();
				return;
			}
			if (
				!NgxThreeUtil.isOnlyIndexOf(
					changes,
					[
						'option',
						'optionseqn',
						'canvasbackground',
						'canvasbackgroundopacity',
					],
					this.TEXTURE_ATTR
				)
			) {
				this.needUpdate = true;
				return;
			}
			if (NgxThreeUtil.isIndexOf(changes, 'init')) {
				changes = NgxThreeUtil.pushUniq(changes, ['initchart']);
			}
			if (
				NgxThreeUtil.isIndexOf(changes, [
					'option',
					'optionseqn',
					'canvasbackground',
					'canvasbackgroundopacity',
				])
			) {
				changes = NgxThreeUtil.pushUniq(changes, ['initchart']);
			}
			changes.forEach((change) => {
				switch (change.toLowerCase()) {
					case 'initchart':
						this.initChart();
						break;
				}
			});
			super.applyChanges(changes);
		}
	}

	private jsonFileLoad(url: string, callBack: (data: any) => void) {
		this.binaryFileLoad(url, (text) => {
			try {
				callBack(JSON.parse(text));
			} catch (error) {}
		});
	}

	private binaryFileLoad(url: string, callBack: (data: any) => void) {
		const fileLoader: I3JS.FileLoader = NgxThreeUtil.getLoader(
			'fileLoader',
			N3JS.FileLoader
		);
		fileLoader.load(NgxThreeUtil.getStoreUrl(url), (text: string) => {
			callBack(text);
		});
	}

	private _sharedVar: any = {};

	/**
	 * Checks function option
	 *
	 * @param scriptOptions
	 * @returns function option
	 */
	private checkEvalString(str: string): any {
		let functionItem: any = null;
		try {
			const Chart = this.chartjs;
			const THREE = N3JS;
			const Utils = ChartUtils;
			const sharedVar = this._sharedVar || {};
			const helpers = this.helpers || {};
			if (
				Chart !== null &&
				THREE !== null &&
				Utils !== null &&
				sharedVar !== null &&
				helpers !== null
			) {
				eval('functionItem = ' + str + '');
				if (
					typeof functionItem === 'function' ||
					typeof functionItem === 'object'
				) {
					return functionItem;
				} else {
					functionItem = null;
				}
			}
		} catch (ex) {
			this.consoleLog('evalString', ex, 'error');
			functionItem = null;
		}
	}

	/**
	 * Checks function option
	 *
	 * @param scriptOptions
	 * @returns function option
	 */
	private checkScriptOption(scriptOptions: CHARTJS.Scriptable<any>): any {
		let functionItem = null;
		if (NgxThreeUtil.isNotNullEmpty(scriptOptions)) {
			if (typeof scriptOptions === 'string') {
				let scriptOptionsTrim = scriptOptions.trim();
				if (ChartUtils.isFunctionString(scriptOptionsTrim)) {
					scriptOptionsTrim = ChartUtils.getFunctionString(scriptOptionsTrim);
					functionItem = this.checkEvalString(scriptOptionsTrim);
					if (
						typeof functionItem === 'function' ||
						typeof functionItem === 'object'
					) {
						return functionItem;
					} else {
						functionItem = null;
					}
				} else if (ChartUtils.isObjectString(scriptOptionsTrim)) {
					try {
						functionItem = JSON.parse(scriptOptionsTrim);
					} catch (ex) {
						this.consoleLog('jsonItem', ex, 'error');
						functionItem = null;
					}
				} else if (ChartUtils.isCallableString(scriptOptionsTrim)) {
					functionItem = this.checkEvalString(scriptOptionsTrim);
				} else {
					functionItem = scriptOptions;
				}
			} else {
				functionItem = scriptOptions;
			}
		}
		return functionItem;
	}

	/**
	 * Checks scriptable and array options
	 *
	 * @param elements
	 *
	 * @returns scriptable and array options
	 */
	private checkScriptableElementOptions(
		elements: CHARTJS.ElementOptions
	): CHARTJS.ElementOptions {
		if (NgxThreeUtil.isNotNull(elements.backgroundColor)) {
			elements.backgroundColor = this.checkScriptOption(
				elements.backgroundColor
			);
		}
		if (NgxThreeUtil.isNotNull(elements.hoverBackgroundColor)) {
			elements.hoverBackgroundColor = this.checkScriptOption(
				elements.hoverBackgroundColor
			);
		}
		if (NgxThreeUtil.isNotNull(elements.borderColor)) {
			elements.borderColor = this.checkScriptOption(elements.borderColor);
		}
		if (NgxThreeUtil.isNotNull(elements.hoverBorderColor)) {
			elements.hoverBorderColor = this.checkScriptOption(
				elements.hoverBorderColor
			);
		}
		if (NgxThreeUtil.isNotNull(elements.borderWidth)) {
			elements.borderWidth = this.checkScriptOption(elements.borderWidth);
		}
		if (NgxThreeUtil.isNotNull(elements.hoverBorderWidth)) {
			elements.hoverBorderWidth = this.checkScriptOption(
				elements.hoverBorderWidth
			);
		}
		if (NgxThreeUtil.isNotNull(elements.radius)) {
			elements.radius = this.checkScriptOption(elements.radius);
		}
		if (NgxThreeUtil.isNotNull(elements.hoverRadius)) {
			elements.hoverRadius = this.checkScriptOption(elements.hoverRadius);
		}
		if (NgxThreeUtil.isNotNull(elements.pointStyle)) {
			elements.pointStyle = this.checkScriptOption(elements.pointStyle);
		}
		return elements;
	}

	/**
	 * Checks animations options
	 *
	 * @param elements
	 * @returns animations options
	 */
	private checkAnimationsOptions(
		elements: CHARTJS.AnimationsSpec
	): CHARTJS.AnimationsSpec {
		if (elements.from !== undefined) {
			if (elements.from === null) {
				elements.from = NaN;
			} else {
				elements.from = this.checkScriptOption(elements.from);
			}
		}
		if (elements.to !== undefined) {
			if (elements.to === null) {
				elements.to = NaN;
			} else {
				elements.to = this.checkScriptOption(elements.to);
			}
		}
		if (NgxThreeUtil.isNotNull(elements.loop)) {
			elements.loop = this.checkScriptOption(elements.loop);
		}
		if (NgxThreeUtil.isNotNull(elements.duration)) {
			elements.duration = this.checkScriptOption(elements.duration);
		}
		if (NgxThreeUtil.isNotNull(elements.delay)) {
			elements.delay = this.checkScriptOption(elements.delay);
		}
		return elements;
	}

	private _lastChartInfo: {
		url: string;
		seqn: string;
		background: any;
	} = {
		url: null,
		seqn: null,
		background: null,
	};

	private changeCanvasBackground() {
		const id = 'custom_canvas_background_color';
		let customBackgroundColor: CHARTJS.Plugin = null;
		if (this._chartOption.plugins === undefined) {
			this._chartOption.plugins = [];
		}
		const plugins = this._chartOption.plugins;
		plugins.forEach((plugin) => {
			if (plugin.id === id) {
				customBackgroundColor = plugin;
			}
		});
		if (NgxThreeUtil.isNotNull(this.canvasBackground)) {
			const backgroundColor = NgxThreeUtil.getColorAlphaSafe(
				this.canvasBackground,
				this.canvasBackgroundOpacity
			);
			let backgroundColorRgb: string = '#ffffff';
			if (NgxThreeUtil.isNotNull(backgroundColor)) {
				if (backgroundColor instanceof N3JS.Color) {
					backgroundColorRgb =
						'rgb(' +
						backgroundColor.r * 255 +
						',' +
						backgroundColor.g * 255 +
						',' +
						backgroundColor.b * 255 +
						')';
				} else {
					backgroundColorRgb =
						'rgba(' +
						backgroundColor.x * 255 +
						',' +
						backgroundColor.y * 255 +
						',' +
						backgroundColor.z * 255 +
						',' +
						backgroundColor.w +
						')';
				}
			}
			if (customBackgroundColor === null) {
				customBackgroundColor = {
					id: id,
					beforeDraw: (chart) => {
						const ctx = chart.canvas.getContext('2d');
						ctx.save();
						ctx.globalCompositeOperation = 'destination-over';
						ctx.fillStyle = backgroundColorRgb;
						ctx.fillRect(0, 0, chart.width, chart.height);
						ctx.restore();
					},
				};
				plugins.push(customBackgroundColor);
			} else {
				customBackgroundColor.beforeDraw = (chart) => {
					const ctx = chart.canvas.getContext('2d');
					ctx.save();
					ctx.globalCompositeOperation = 'destination-over';
					ctx.fillStyle = backgroundColorRgb;
					ctx.fillRect(0, 0, chart.width, chart.height);
					ctx.restore();
				};
			}
		} else {
			if (customBackgroundColor !== null) {
				const idx = plugins.indexOf(customBackgroundColor);
				if (idx > -1) {
					plugins.splice(idx, 1);
				}
			}
		}
		if (this._chart !== null) {
			this._chart.update();
		}
	}

	private initChart() {
		if (NgxThreeUtil.isNull(this.chartjs)) {
			return;
		}
		this._chartOption = this.option || {};
		if (
			NgxThreeUtil.isNotNullEmpty(this._chartOption.url) &&
			this._chartOption.url !== this._lastChartInfo.url
		) {
			this.jsonFileLoad(this._chartOption.url, (json) => {
				this._lastChartInfo.url = this._chartOption.url;
				Object.assign(this._chartOption, json);
				this.initChart();
			});
			return;
		}

		if (
			this._chart !== null &&
			NgxThreeUtil.isNotNullEmpty(this.optionSeqn) &&
			this._lastChartInfo.seqn !== this.optionSeqn
		) {
			this._chart.destroy();
			this._lastChartInfo.seqn = this.optionSeqn;
			this._chart = null;
		}
		this.changeCanvasBackground();
		this._chartOption.options = Object.assign(this._chartOption.options || {}, {
			responsive: false,
		});
		if (NgxThreeUtil.isNotNull(this._chartOption.sharedVar)) {
			Object.entries(this._chartOption.sharedVar).forEach(([key, value]) => {
				let sharedValue = value;
				if (typeof value === 'string') {
					sharedValue = this.checkScriptOption(value);
				}
				this._sharedVar[key] = this._chartOption.sharedVar[key] = sharedValue;
			});
		}
		if (NgxThreeUtil.isNotNull(this._chartOption.data?.datasets)) {
			if (Array.isArray(this._chartOption.data?.datasets)) {
				const datasets = this._chartOption.data?.datasets;
				datasets.forEach((dataset) => {
					if (NgxThreeUtil.isNotNull(dataset.segment)) {
						const segment = dataset.segment;
						if (NgxThreeUtil.isNotNullEmpty(segment?.backgroundColor)) {
							segment.backgroundColor = this.checkScriptOption(
								segment.backgroundColor
							);
						}
						if (NgxThreeUtil.isNotNullEmpty(segment?.borderColor)) {
							segment.borderColor = this.checkScriptOption(segment.borderColor);
						}
						if (NgxThreeUtil.isNotNullEmpty(segment?.borderDash)) {
							segment.borderDash = this.checkScriptOption(segment.borderDash);
						}
						if (NgxThreeUtil.isNotNullEmpty(segment?.borderJoinStyle)) {
							segment.borderJoinStyle = this.checkScriptOption(
								segment.borderJoinStyle
							);
						}
						if (NgxThreeUtil.isNotNullEmpty(segment?.borderWidth)) {
							segment.borderWidth = this.checkScriptOption(segment.borderWidth);
						}
					}
					if (NgxThreeUtil.isNotNull(dataset.borderColor)) {
						dataset.borderColor = this.checkScriptOption(dataset.borderColor);
					}
				});
			}
		}
		if (NgxThreeUtil.isNotNull(this._chartOption.options)) {
			const options = this._chartOption.options;
			if (NgxThreeUtil.isNotNull(options.scales)) {
				const scales = options.scales;
				if (NgxThreeUtil.isNotNull(scales.x)) {
					const x = scales.x;
					if (NgxThreeUtil.isNotNull(x.ticks)) {
						const ticks = x.ticks;
						if (NgxThreeUtil.isNotNull(ticks.font)) {
							ticks.font = this.checkScriptOption(ticks.font);
						}
						if (NgxThreeUtil.isNotNull(ticks.callback)) {
							ticks.callback = this.checkScriptOption(ticks.callback);
						}
					}
				}
				if (NgxThreeUtil.isNotNull(scales.y)) {
					const y = scales.y;
					if (NgxThreeUtil.isNotNull(y.grid)) {
						const grid = y.grid;
						if (NgxThreeUtil.isNotNull(grid.color)) {
							grid.color = this.checkScriptOption(grid.color);
						}
					}
				}
			}
			if (NgxThreeUtil.isNotNull(options.plugins)) {
				const plugins = options.plugins;
				if (NgxThreeUtil.isNotNull(plugins.legend)) {
					const legend = plugins.legend;
					if (NgxThreeUtil.isNotNullEmpty(legend?.labels)) {
						const labels = legend.labels;
						if (NgxThreeUtil.isNotNullEmpty(labels?.generateLabels)) {
							labels.generateLabels = this.checkScriptOption(
								labels.generateLabels
							);
						}
					}
					if (NgxThreeUtil.isNotNullEmpty(legend?.onClick)) {
						legend.onClick = this.checkScriptOption(legend.onClick);
					}
					if (NgxThreeUtil.isNotNullEmpty(legend?.onHover)) {
						legend.onHover = this.checkScriptOption(legend.onHover);
					}
					if (NgxThreeUtil.isNotNullEmpty(legend?.onLeave)) {
						legend.onLeave = this.checkScriptOption(legend.onLeave);
					}
				}
				if (NgxThreeUtil.isNotNull(plugins.title)) {
					const title: any = plugins.title;
					if (NgxThreeUtil.isNotNullEmpty(title?.text)) {
						title.text = this.checkScriptOption(title.text);
					}
				}
				if (NgxThreeUtil.isNotNull(plugins.tooltip)) {
					const tooltip = plugins.tooltip;
					if (NgxThreeUtil.isNotNull(tooltip.callbacks)) {
						const callbacks: any = tooltip.callbacks;
						if (NgxThreeUtil.isNotNullEmpty(callbacks?.label)) {
							callbacks.label = this.checkScriptOption(callbacks.label);
						}
						if (NgxThreeUtil.isNotNullEmpty(callbacks?.footer)) {
							callbacks.footer = this.checkScriptOption(callbacks.footer);
						}
					}
					if (NgxThreeUtil.isNotNullEmpty(tooltip?.external)) {
						tooltip.external = this.checkScriptOption(tooltip.external);
					}
				}
			}
			if (NgxThreeUtil.isNotNull(options.elements)) {
				const elements = options.elements;
				if (NgxThreeUtil.isNotNull(elements.bar)) {
					elements.bar = this.checkScriptableElementOptions(elements.bar);
				}
				if (NgxThreeUtil.isNotNull(elements.arc)) {
					elements.arc = this.checkScriptableElementOptions(elements.arc);
				}
				if (NgxThreeUtil.isNotNull(elements.line)) {
					elements.line = this.checkScriptableElementOptions(elements.line);
				}
				if (NgxThreeUtil.isNotNull(elements.point)) {
					elements.point = this.checkScriptableElementOptions(elements.point);
				}
			}
			if (NgxThreeUtil.isNotNull(options.animation)) {
				const animation = options.animation;
				if (NgxThreeUtil.isNotNull(animation.onProgress)) {
					animation.onProgress = this.checkScriptOption(animation.onProgress);
				}
				if (NgxThreeUtil.isNotNull(animation.onComplete)) {
					animation.onComplete = this.checkScriptOption(animation.onComplete);
				}
				if (NgxThreeUtil.isNotNull(animation.duration)) {
					animation.duration = this.checkScriptOption(animation.duration);
				}
				if (NgxThreeUtil.isNotNull(animation.delay)) {
					animation.delay = this.checkScriptOption(animation.delay);
				}
				if (NgxThreeUtil.isNotNull(animation.x)) {
					animation.x = this.checkAnimationsOptions(animation.x);
				}
				if (NgxThreeUtil.isNotNull(animation.y)) {
					animation.y = this.checkAnimationsOptions(animation.y);
				}
				if (NgxThreeUtil.isNotNull(animation.radius)) {
					animation.radius = this.checkAnimationsOptions(animation.radius);
				}
			}
			if (NgxThreeUtil.isNotNull(options.animations)) {
				const animations = options.animations;
				if (NgxThreeUtil.isNotNull(animations.y)) {
					animations.y = this.checkAnimationsOptions(animations.y);
				}
				if (NgxThreeUtil.isNotNull(animations.x)) {
					animations.x = this.checkAnimationsOptions(animations.x);
				}
				if (NgxThreeUtil.isNotNull(animations.radius)) {
					animations.radius = this.checkAnimationsOptions(animations.radius);
				}
			}
		}
		if (
			NgxThreeUtil.isNotNull(this._chartOption.plugins) &&
			Array.isArray(this._chartOption.plugins)
		) {
			const plugins = this._chartOption.plugins;
			plugins.forEach((plugin) => {
				if (typeof plugin.beforeDraw === 'string') {
					plugin.beforeDraw = this.checkScriptOption(plugin.beforeDraw);
				}
				if (typeof plugin.afterDraw === 'string') {
					plugin.afterDraw = this.checkScriptOption(plugin.afterDraw);
				}
				if (typeof plugin.beforeRender === 'string') {
					plugin.beforeRender = this.checkScriptOption(plugin.beforeRender);
				}
				if (typeof plugin.afterRender === 'string') {
					plugin.afterRender = this.checkScriptOption(plugin.afterRender);
				}
				if (typeof plugin.beforeUpdate === 'string') {
					plugin.beforeUpdate = this.checkScriptOption(plugin.beforeUpdate);
				}
				if (typeof plugin.afterUpdate === 'string') {
					plugin.afterUpdate = this.checkScriptOption(plugin.afterUpdate);
				}
				if (typeof plugin.beforeDestroy === 'string') {
					plugin.beforeDestroy = this.checkScriptOption(plugin.beforeDestroy);
				}
				if (typeof plugin.afterDestroy === 'string') {
					plugin.afterDestroy = this.checkScriptOption(plugin.afterDestroy);
				}
			});
		}

		if (
			NgxThreeUtil.isNotNull(this._chartOption.actions) &&
			Array.isArray(this._chartOption.actions)
		) {
			this._chartOption.actions.forEach((actions) => {
				if (typeof actions.handler === 'string') {
					actions.handler = this.checkScriptOption(actions.handler);
					if (
						typeof actions.handler === 'string' &&
						actions.handler.startsWith('sharedVar')
					) {
						const [_, sharedKey] = (actions.handler + '.').split('.');
						if (sharedKey !== null && sharedKey.length > 0) {
							actions.handler = this._sharedVar[sharedKey] || {};
						} else {
							actions.handler = this._sharedVar;
						}
					}
				}
				if (typeof actions.handler === 'function') {
					const handler = actions.handler;
					actions.onclick = () => {
						handler(this._chart);
					};
				} else if (
					typeof actions.handler !== 'object' ||
					NgxThreeUtil.isNull(actions.property)
				) {
					actions.handler = null;
					actions.onclick = null;
				}
			});
		}
		if (this._chart === null) {
			const Chart: any = this.chartjs;
			this._chart = new Chart(this._mapCanvas, this._chartOption);
			(this._chart as any).sharedVar = this._sharedVar;
		} else {
			this._chart.update();
		}
		this.texture.needsUpdate = true;
		this.onInitChart.emit(this._chart);
		this.getTimeout(1000).then(() => {
			this._mapCanvas.dispatchEvent(
				new MouseEvent('mousemove', {
					clientX: Math.random(),
					clientY: Math.random(),
				})
			);
			this.texture.needsUpdate = true;
		});
	}

	public getChart(): CHARTJS.Chart {
		return this._chart;
	}

	/**
	 * Gets mesh
	 * @template T
	 * @returns mesh
	 */
	public getTexture<T extends I3JS.Texture>(): T {
		if (this.texture === null || this._needUpdate) {
			this.needUpdate = false;
			if (this._mapCanvas !== null) {
				this._mapCanvas.parentNode.removeChild(this._mapCanvas);
			}
			if (this._chart !== null) {
				this._chart.destroy();
			}
			const mapCanvas =
				(this._mapCanvas =
				this._mapCanvas =
					document.createElement('canvas'));
			this._mapCanvasSize = new N3JS.Vector2(
				this.canvasSize,
				Math.round((this.canvasSize * this.height) / this.width)
			);
			mapCanvas.width = this._mapCanvasSize.x;
			mapCanvas.height = this._mapCanvasSize.y;
			mapCanvas.style.width = this._mapCanvasSize.x + 'px';
			mapCanvas.style.height = this._mapCanvasSize.y + 'px';
			mapCanvas.style.pointerEvents = 'none';
			mapCanvas.style.display = 'none';
			document.body.append(mapCanvas);
			this._chart = null;
			this.texture = new N3JS.CanvasTexture(this._mapCanvas);
			this.synkMaterial(this.texture);
			super.setObject(this.texture);
		}
		return this.texture as T;
	}

	private _chart: CHARTJS.Chart = null;
	private _chartOption: CHARTJS.ChartConfiguration = {};
	private _mapCanvasSize: I3JS.Vector2 = null;
	private _mapCanvas: HTMLCanvasElement = null;
}
