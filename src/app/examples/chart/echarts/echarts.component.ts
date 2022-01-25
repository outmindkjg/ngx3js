import {
	Component,
	forwardRef,
	Input,
	OnInit,
	Output,
	SimpleChanges,
	EventEmitter
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

	@Input() public option: ECHARTS.EChartOption | ECHARTS.EChartsResponsiveOption = {};

	@Input() public optionSeqn: string = null;

	@Output() public onInitChart: EventEmitter<ECHARTS.ECharts> = new EventEmitter<ECHARTS.ECharts>();

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
					['option', 'optionseqn','charttype', 'chartdata', 'chartoptions', 'chartplugins', 'canvasbackground', 'canvasbackgroundopacity'],
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
		this.binaryFileLoad(url, (text) => {
			try {
				callBack(JSON.parse( text ))
			} catch ( error ) {
			}
		})
	}

	private binaryFileLoad(url : string, callBack : (data : any) => void) {
		const fileLoader : I3JS.FileLoader = NgxThreeUtil.getLoader('fileLoader', N3JS.FileLoader);
		fileLoader.load(NgxThreeUtil.getStoreUrl(url), (text : string) => {
			callBack(text)
		});

	}

	private checkMapResource(mapResource : ECHARTS.EChartsMapResource[]) {
		const resource = mapResource.shift();
		if (resource !== null && resource !== undefined) {
			switch(resource.type) {
				case 'map' :
					if (resource.url.endsWith('.svg')) {
						this.binaryFileLoad(resource.url, (svg) => {
							this.echarts.registerMap(resource.name, { svg : svg });
							if (resource.parent && resource.key) {
								resource.parent[resource.key] = resource.name;
							}
							this.checkMapResource(mapResource);
						})
					}
					break;
			}
		} else {
			this.initChart();
		}
	}

	private _lastChartUrl : string = null;

	private initChart() {
		if (NgxThreeUtil.isNull(this.echarts)) {
			return;
		}
		this._chartOption = this.option || {};
		if (NgxThreeUtil.isNotNull(this._chartOption.url) && this._chartOption.url !== '' && this._chartOption.url !== this._lastChartUrl) {
			this.jsonFileLoad(this._chartOption.url , (json) => {
				this._lastChartUrl = this._chartOption.url;
				Object.assign(this._chartOption, json);
				this.initChart();
			})
			return ;
		}
		if (NgxThreeUtil.isNotNull(this.title)) {
			this._chartOption.title = this.title;
		}
		if (NgxThreeUtil.isNotNull(this.legend)) {
			this._chartOption.legend = this.legend;
		}
		if (NgxThreeUtil.isNotNull(this.grid)) {
			this._chartOption.grid = this.grid;
		}
		if (NgxThreeUtil.isNotNull(this.radar)) {
			this._chartOption.radar = this.radar;
		}
		if (NgxThreeUtil.isNotNull(this.tooltip)) {
			this._chartOption.tooltip = this.tooltip;
		}
		if (NgxThreeUtil.isNotNull(this.xAxis)) {
			this._chartOption.xAxis = this.xAxis;
		}
		if (NgxThreeUtil.isNotNull(this.yAxis)) {
			this._chartOption.yAxis = this.yAxis;
		}
		if (NgxThreeUtil.isNotNull(this.chartSeries)) {
			// this._chartOption.series = this.chartSeries;
		}
		const mapResource : ECHARTS.EChartsMapResource[] = [];
		if (NgxThreeUtil.isNotNull(this._chartOption.geo)) {
			this._chartOption.geo.forEach((geo : any) => {
				if (NgxThreeUtil.isNotNull(geo.map) && typeof geo.map === 'object' && NgxThreeUtil.isNotNull(geo.map.url)) {
					if (this.echarts.getMap(geo.map.name) !== null) {
						geo.map = geo.map.name; 
					} else {
						mapResource.push({
							name : geo.map.name,
							url : geo.map.url,
							type : 'map',
							parent : geo,
							key : 'map',
							loaded : false
						})
					}
				}
			});
		}
		if (NgxThreeUtil.isNotNull(this._chartOption.geo3D)) {
			this._chartOption.geo3D.forEach((geo3D : any) => {
				if (NgxThreeUtil.isNotNull(geo3D.map) && typeof geo3D.map === 'object' && NgxThreeUtil.isNotNull(geo3D.map.url)) {
					if (this.echarts.getMap(geo3D.map.name) !== null) {
						geo3D.map = geo3D.map.name; 
					} else {
						mapResource.push({
							name : geo3D.map.name,
							url : geo3D.map.url,
							type : 'map',
							parent : geo3D,
							key : 'map',
							loaded : false
						})
					}
				}
			});
		}

		if (mapResource.length > 0) {
			console.log(mapResource);
			this.checkMapResource(mapResource);
			return ;
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
		this._chartOption.backgroundColor = backgroundColorRgb;
		if (NgxThreeUtil.isNotNull(this._chartOption.globe) && Array.isArray(this._chartOption.globe)) {
			this._chartOption.globe.forEach((globe : any) => {
				if (NgxThreeUtil.isNotNull(globe.environment)) {
					globe.environment= NgxThreeUtil.getStoreUrl(globe.environment);
				}
				if (NgxThreeUtil.isNotNull(globe.heightTexture)) {
					globe.heightTexture= NgxThreeUtil.getStoreUrl(globe.heightTexture);
				}
				if (NgxThreeUtil.isNotNull(globe.baseTexture)) {
					globe.baseTexture= NgxThreeUtil.getStoreUrl(globe.baseTexture);
				}
				if (NgxThreeUtil.isNotNull(globe.displacementTexture)) {
					globe.displacementTexture= NgxThreeUtil.getStoreUrl(globe.displacementTexture);
				}
				if (NgxThreeUtil.isNotNull(globe.light)) {
					if (NgxThreeUtil.isNotNull(globe.light.ambientCubemap) && NgxThreeUtil.isNotNull(globe.light.ambientCubemap.texture)) {
						globe.light.ambientCubemap.texture= NgxThreeUtil.getStoreUrl(globe.light.ambientCubemap.texture);
					}
				}
				if (NgxThreeUtil.isNotNull(globe.layers)) {
					if (Array.isArray(globe.layers)) {
						globe.layers.forEach(layer => {
							if (NgxThreeUtil.isNotNull(layer.texture)) {
								layer.texture= NgxThreeUtil.getStoreUrl(layer.texture);
							}
						})
					}
				}
			})
		}

		this._chartOption.backgroundColor = backgroundColorRgb;
		if (this._chart === null) {
			this._chart = this.echarts.init ( this._mapCanvas );
		} 
		this._chart.setOption(this._chartOption, true);
		this.texture.needsUpdate = true;
		this.onInitChart.emit(this._chart);
	}

	public getChart() : ECHARTS.ECharts {
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
	private _chartOption: ECHARTS.EChartOption | ECHARTS.EChartsResponsiveOption = {};
	private _mapCanvasSize: I3JS.Vector2 = null;
	private _mapCanvas: HTMLCanvasElement = null;

	public update() {
		if (this.texture !== null) {
			this.texture.needsUpdate = true;
		}
	}
}
