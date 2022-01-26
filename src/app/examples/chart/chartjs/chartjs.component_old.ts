import {
	Component,
	forwardRef,
	Input,
	OnInit,
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
	@Input() public chartjs: any = null;

	@Input() public chartType: string = 'bar';

	@Input() public chartData: CHARTJS.ChartData = null;

	@Input() public chartOptions: CHARTJS.ChartOptions = null;

	@Input() public chartPlugins: CHARTJS.Plugin[] = null;

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
		super.ngOnInit('texture-chartjs');
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
					['charttype', 'chartdata', 'chartoptions', 'chartplugins', 'canvasbackground', 'canvasbackgroundopacity'],
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
					'charttype',
					'chartdata',
					'chartoptions',
					'chartplugins',
				])
			) {
				changes = NgxThreeUtil.pushUniq(changes, ['initchart']);
			}
			if (
				!NgxThreeUtil.isIndexOf(changes, 'initchart') &&
				NgxThreeUtil.isIndexOf(changes, [
					'canvasbackground',
					'canvasbackgroundopacity',
				])
			) {
				changes = NgxThreeUtil.pushUniq(changes, ['background']);
			}
			changes.forEach((change) => {
				switch (change.toLowerCase()) {
					case 'initchart':
						this.initChart();
						break;
					case 'background' :
						this.changeCanvasBackground();
						break;
				}
			});
			super.applyChanges(changes);
		}
	}

	private initChart() {
		if (NgxThreeUtil.isNull(this.chartjs)) {
			return;
		}
		const chartjs = this.chartjs;
		this._chartOption.type = this.chartType as any;
		this._chartOption.data = this.chartData;
		this._chartOption.options = Object.assign({}, this.chartOptions, {
			responsive: false,
		});
		this._chartOption.plugins = Object.assign([], this.chartPlugins);
		this.changeCanvasBackground();
		if (this._chart === null) {
			this._chart = new chartjs(this._mapCanvas, this._chartOption);
		} else {
			this._chart.destroy();
			this._chart = new chartjs(this._mapCanvas, this._chartOption);
		}
		this.texture.needsUpdate = true;
	}

	private changeCanvasBackground() {
		const id = 'custom_canvas_background_color';
		let customBackgroundColor: CHARTJS.Plugin = null;
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
				console.log(this._chartOption);
			}
		}
		if (this._chart !== null) {
			this._chart.update();
		}
	}

	/**
	 * Gets mesh
	 * @template T
	 * @returns mesh
	 */
	public getTexture<T extends I3JS.Texture>(): T {
		if (this.texture === null || this._needUpdate) {
			this.needUpdate = false;
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
			this.texture = new N3JS.CanvasTexture(this._mapCanvas);
			this.synkMaterial(this.texture);
			super.setObject(this.texture);
		}
		return this.texture as T;
	}

	private _chart: CHARTJS.Chart = null;
	private _chartOption: CHARTJS.ChartConfiguration = {
		type: 'bar',
		data: {
			labels: [],
			datasets: [],
		},
		options: {},
		plugins: [],
	};
	private _mapCanvasSize: I3JS.Vector2 = null;
	private _mapCanvas: HTMLCanvasElement = null;
}
