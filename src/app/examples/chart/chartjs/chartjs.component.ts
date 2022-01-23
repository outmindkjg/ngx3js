import {
	Component,
	forwardRef,
	Input,
	OnInit,
	SimpleChanges
} from '@angular/core';
import {
	I3JS, IRendererTimer, N3JS, NgxAbstractRendererUpdateComponent, NgxAbstractSubscribeComponent, NgxAbstractTextureComponent, NgxThreeUtil
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
		{
			provide: NgxAbstractRendererUpdateComponent,
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
		super.ngOnInit('texture-echart');
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
			if (!NgxThreeUtil.isOnlyIndexOf(changes, [], this.TEXTURE_ATTR)) {
				this.needUpdate = true;
				return;
			}
			if (NgxThreeUtil.isIndexOf(changes, 'init')) {
				changes = NgxThreeUtil.pushUniq(changes, ['initchart']);
			}
			changes.forEach((change) => {
				switch (change.toLowerCase()) {
					case 'initchart' :
						this.initChart();
						break;
				}
			});
			super.applyChanges(changes);
		}
	}

	private initChart() {
		if (NgxThreeUtil.isNull(this.chartjs)) {
			return ;
		}
		const chartjs = this.chartjs;
		this._chartOption = {
			type: 'bar',
			data: {
				labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
				datasets: [
					{
						label: '# of Votes',
						data: [12, 19, 3, 5, 2, 3],
						backgroundColor: [
							'rgba(255, 99, 132, 0.2)',
							'rgba(54, 162, 235, 0.2)',
							'rgba(255, 206, 86, 0.2)',
							'rgba(75, 192, 192, 0.2)',
							'rgba(153, 102, 255, 0.2)',
							'rgba(255, 159, 64, 0.2)',
						],
						hoverBackgroundColor: [
							'rgba(255,99,132, 0.7)',
							'rgba(54, 162, 235, 0.7)',
							'rgba(255, 206, 86, 0.7)',
							'rgba(75, 192, 192, 0.7)',
							'rgba(153, 102, 255, 0.7)',
							'rgba(255, 159, 64, 0.7)'
						],
						borderColor: [
							'rgba(255, 99, 132, 1)',
							'rgba(54, 162, 235, 1)',
							'rgba(255, 206, 86, 1)',
							'rgba(75, 192, 192, 1)',
							'rgba(153, 102, 255, 1)',
							'rgba(255, 159, 64, 1)',
						],
						borderWidth: 1,
					},
				],
			},
			options: {
				responsive : false,
				animations: {
					tension: {
					  duration: 1000,
					  easing: 'linear',
					  from: 1,
					  to: 0,
					  loop: true
					}
				},				
				scales: {
					y: {
						beginAtZero: true,
					},
				},
			},
		};
		if (this._chart === null) {
			this._chart = new chartjs(this._mapCanvas, this._chartOption);
		} else {
			this._chart.destroy();
			this._chart = new chartjs.Chart(this._mapCanvas, this._chartOption);
		}
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
			const mapCanvas = this._mapCanvas = this._mapCanvas = document.createElement('canvas');
			this._mapCanvasSize = new N3JS.Vector2(this.canvasSize, Math.round((this.canvasSize * this.height) / this.width));
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

	private _chart: any = null;
	private _chartOption: CHARTJS.ChartConfiguration = null;
	private _mapCanvasSize: I3JS.Vector2 = null;
	private _mapCanvas: HTMLCanvasElement = null;

	public update(renderTimer: IRendererTimer) {
		if (this.texture !== null) {
			this.texture.needsUpdate = true;
		}
	}
}
