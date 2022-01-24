import {
	Component,
	forwardRef,
	Input,
	OnInit,
	SimpleChanges
} from '@angular/core';
import {
	I3JS,
	INgxColor, N3JS,
	NgxAbstractRendererUpdateComponent,
	NgxAbstractSubscribeComponent,
	NgxAbstractTextureComponent,
	NgxThreeUtil
} from 'ngx3js';
import * as ECHARTS from './echarts.interface';


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
	selector: 'ngx3js-texture-echarts',
	templateUrl: './echarts.component.html',
	styleUrls: ['./echarts.component.scss'],
	providers: [
		{
			provide: NgxAbstractTextureComponent,
			useExisting: forwardRef(() => NgxTextureEChartsComponent),
		},
		{
			provide: NgxAbstractSubscribeComponent,
			useExisting: forwardRef(() => NgxTextureEChartsComponent),
		},
		{
			provide: NgxAbstractRendererUpdateComponent,
			useExisting: forwardRef(() => NgxTextureEChartsComponent),
		},
	],
})
export class NgxTextureEChartsComponent
	extends NgxAbstractTextureComponent
	implements OnInit
{
	@Input() public echarts: ECHARTS.echarts = null;

	@Input() public title: any = null;

	@Input() public legend: any = null;

	@Input() public grid: any = null;
	
	@Input() public radar: any = null;

	@Input() public tooltip: any = null;

	@Input() public xAxis: any = null;

	@Input() public yAxis: any = null;

	@Input() public chartSeries: any[] = null;

	@Input() public requiredMaps: { [key : string] : any } = null;

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
			this.echarts.dispose(this._chart);
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
			console.log(changes);
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

	private jsonFileLoad(url : string, callBack : (data : any) => void) {
		const fileLoader : I3JS.FileLoader = NgxThreeUtil.getLoader('fileLoader', N3JS.FileLoader);
		fileLoader.load(NgxThreeUtil.getStoreUrl(url), (text : string) => {
			try {
				callBack(JSON.parse( text ))
			} catch ( error ) {
				return;
			}			
		});
	}

	private initChart() {
		if (NgxThreeUtil.isNull(this.echarts)) {
			return;
		}
		const echarts = this.echarts;
		if (NgxThreeUtil.isNotNull(this.requiredMaps)) {
			const requiredMapKeyUrl:{ key : string, url : string} = { key : null, url : null};
			Object.entries(this.requiredMaps).forEach(([key, value]) => {
				if (echarts.getMap(key) === null) {
					if (typeof value === 'string') {
						if (requiredMapKeyUrl.key === null) {
							requiredMapKeyUrl.key = key;
							requiredMapKeyUrl.url = value;
						}
					} else {
						echarts.registerMap(key, value);
					}
				}
			})
			if (requiredMapKeyUrl.key !== null && requiredMapKeyUrl.url) {
				this.jsonFileLoad(requiredMapKeyUrl.url, (geoJson) => {
					echarts.registerMap(requiredMapKeyUrl.key, geoJson);
					this.initChart();
				});
				return ;
			}
		}
		if (NgxThreeUtil.isNotNull(this.chartSeries)) {
			for(let i = 0; i < this.chartSeries.length ; i++) {
				const chartSeries = this.chartSeries[i];
				if (typeof chartSeries.data === 'string') {
					this.jsonFileLoad(chartSeries.data, (data) => {
						chartSeries.data = data;
						this.initChart();
					});
					return ;
				}
			}
		}
		let backgroundColorRgb : string = 'transparent';
		if (NgxThreeUtil.isNotNull(this.canvasBackground)) {
			const backgroundColor = NgxThreeUtil.getColorAlphaSafe(this.canvasBackground, this.canvasBackgroundOpacity);
			if (NgxThreeUtil.isNotNull(backgroundColor)) {
				if (backgroundColor instanceof N3JS.Color) {
					backgroundColorRgb = 'rgb( '+(backgroundColor.r * 255)+', '+(backgroundColor.g * 255)+', '+(backgroundColor.b * 255)+')'
				} else {
					backgroundColorRgb = 'rgba( '+(backgroundColor.x * 255)+', '+(backgroundColor.y * 255)+', '+(backgroundColor.z * 255)+', '+backgroundColor.w+')'
				}
			}
		}
		if (NgxThreeUtil.isNotNull(this.title)) {
			this._chartOption.title = this.title;
		} else {
			delete this._chartOption.title;
		}
		if (NgxThreeUtil.isNotNull(this.legend)) {
			this._chartOption.legend = this.legend;
		} else {
			delete this._chartOption.legend;
		}
		if (NgxThreeUtil.isNotNull(this.grid)) {
			this._chartOption.grid = this.grid;
		} else {
			delete this._chartOption.grid;
		}
		if (NgxThreeUtil.isNotNull(this.radar)) {
			this._chartOption.radar = this.radar;
		} else {
			delete this._chartOption.radar;
		}
		

		if (NgxThreeUtil.isNotNull(this.tooltip)) {
			this._chartOption.tooltip = this.tooltip;
		} else {
			delete this._chartOption.tooltip;
		}

		if (NgxThreeUtil.isNotNull(this.xAxis)) {
			this._chartOption.xAxis = this.xAxis;
		} else {
			delete this._chartOption.xAxis;
		}
		if (NgxThreeUtil.isNotNull(this.yAxis)) {
			this._chartOption.yAxis = this.yAxis;
		} else {
			delete this._chartOption.yAxis;
		}
		this._chartOption.backgroundColor = backgroundColorRgb;
		this._chartOption.series = this.chartSeries;
		if (this._chart === null) {
			this._chart = echarts.init ( this._mapCanvas );
		} 
		this._chart.setOption(this._chartOption);
		this.texture.needsUpdate = true;
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
			this._chart = null;
			this.texture = new N3JS.CanvasTexture(this._mapCanvas);
			this.synkMaterial(this.texture);
			super.setObject(this.texture);
		}
		return this.texture as T;
	}

	private _chart: ECHARTS.ECharts = null;
	private _chartOption: any = {};
	private _mapCanvasSize: I3JS.Vector2 = null;
	private _mapCanvas: HTMLCanvasElement = null;

	public update() {
		if (this.texture !== null) {
			this.texture.needsUpdate = true;
		}
	}
}
