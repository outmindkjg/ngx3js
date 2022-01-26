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

	/**
	 * Checks texture option
	 * @param textureOptions 
	 */
	private checkTextureOption(textureOptions: any) {
		if (NgxThreeUtil.isNotNullEmpty(textureOptions)) {
			if (typeof textureOptions === 'object' && typeof textureOptions.image === 'string') {
				const imageSrc : string = textureOptions.image;
				if (imageSrc.startsWith('data:')) {
					const image = new Image();
					image.src = imageSrc;
					textureOptions.image = image;
				} else {
					textureOptions.image = NgxThreeUtil.getStoreUrl(imageSrc);
				}
			} else {
				textureOptions = NgxThreeUtil.getStoreUrl(textureOptions);
			}
		}
		return textureOptions;
	}

	private _lastChartInfo: {
		url: string;
		seqn: string;
		background : any;
	} = {
		url: null,
		seqn: null,
		background : null
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
			const backgroundColor = NgxThreeUtil.getColorAlphaSafe(this.canvasBackground, this.canvasBackgroundOpacity);
			let backgroundColorRgb : string = '#ffffff';
			if (NgxThreeUtil.isNotNull(backgroundColor)) {
				if (backgroundColor instanceof N3JS.Color) {
					backgroundColorRgb = 'rgb('+(backgroundColor.r * 255)+','+(backgroundColor.g * 255)+','+(backgroundColor.b * 255)+')'
				} else {
					backgroundColorRgb = 'rgba('+(backgroundColor.x * 255)+','+(backgroundColor.y * 255)+','+(backgroundColor.z * 255)+','+backgroundColor.w+')'
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
		if (this._chart === null) {
			const Chart : any = this.chartjs;
			this._chart = new Chart(this._mapCanvas, this._chartOption);
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
