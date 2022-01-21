import {
	Component,
	forwardRef,
	Input,
	OnInit,
	SimpleChanges,
} from '@angular/core';
import {
	I3JS,
	N3JS,
	NgxAbstractObject3dComponent,
	NgxAbstractSubscribeComponent,
	NgxAbstractRendererUpdateComponent,
	NgxAbstractRendererEventComponent,
	NgxThreeUtil,
	IRendererEvent,
	IRendererTimer,
} from 'ngx3js';

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
	selector: 'ngx3js-echart',
	templateUrl: './echart.component.html',
	styleUrls: ['./echart.component.scss'],
	providers: [
		{
			provide: NgxAbstractObject3dComponent,
			useExisting: forwardRef(() => NgxEchartComponent),
		},
		{
			provide: NgxAbstractSubscribeComponent,
			useExisting: forwardRef(() => NgxEchartComponent),
		},
		{
			provide: NgxAbstractRendererUpdateComponent,
			useExisting: forwardRef(() => NgxEchartComponent),
		},
		{
			provide: NgxAbstractRendererEventComponent,
			useExisting: forwardRef(() => NgxEchartComponent),
		},
	],
})
export class NgxEchartComponent
	extends NgxAbstractObject3dComponent
	implements OnInit
{
	@Input() public chartjs: any = null;

	@Input() public width: number = 1;

	@Input() public height: number = 1;

	@Input() public canvasSize: number = 1024;

	public eventTypes: string[] = ['pointermove', 'click'];

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
		super.ngOnInit('echart');
	}

	/**
	 * A callback method that performs custom clean-up, invoked immediately before a directive, pipe, or service instance is destroyed.
	 */
	ngOnDestroy(): void {
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
		if (changes && this._chartjsMesh) {
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
	 * Sets parent
	 * @param parent
	 * @returns true if parent
	 */
	public setParent(parent: I3JS.Object3D): boolean {
		if (super.setParent(parent)) {
			this.getEchart();
			return true;
		}
		return false;
	}

	/**
	 * Applys changes3d
	 * @param changes
	 * @returns
	 */
	public applyChanges3d(changes: string[]) {
		if (this._chartjsMesh !== null) {
			if (NgxThreeUtil.isIndexOf(changes, 'clearinit')) {
				this.getObject3d();
				return;
			}
			if (!NgxThreeUtil.isOnlyIndexOf(changes, [], this.OBJECT3D_ATTR)) {
				this.needUpdate = true;
				return;
			}
			if (NgxThreeUtil.isIndexOf(changes, 'init')) {
				changes = NgxThreeUtil.pushUniq(changes, []);
			}
			changes.forEach((change) => {
				switch (change.toLowerCase()) {
				}
			});
			super.applyChanges3d(changes);
		}
	}

	/**
	 * Gets object3d
	 * @template T
	 * @returns object3d
	 */
	public getObject3d<T extends I3JS.Object3D>(): T {
		return this.getEchart();
	}

	private loadEchart() {
		const mapCanvas = this._mapCanvas = document.createElement('canvas');
		this._mapCanvasSize = new N3JS.Vector2(this.canvasSize, Math.round((this.canvasSize * this.height) / this.width));
		mapCanvas.width = this._mapCanvasSize.x;
		mapCanvas.height = this._mapCanvasSize.y;
		mapCanvas.style.position = 'absolute';
		mapCanvas.style.left = '0';
		mapCanvas.style.top = '0';
		mapCanvas.style.bottom = '0';
		mapCanvas.style.right = '0';
		mapCanvas.style.zIndex = '1000';
		mapCanvas.style.pointerEvents = 'none';
		// mapCanvas.style.display = 'none';
		document.body.append(mapCanvas);
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
		chartjs.Chart.register(...chartjs.registerables);
		this._chart = new chartjs.Chart(mapCanvas, this._chartOption);
		this._mapTexture = new N3JS.CanvasTexture(mapCanvas);
		this._material.map = this._mapTexture;
		this._material.needsUpdate = true;
		this._mapTexture.needsUpdate = true;
	}

	/**
	 * Gets mesh
	 * @template T
	 * @returns mesh
	 */
	public getEchart<T extends I3JS.Object3D>(): T {
		if (this._chartjsMesh === null || this._needUpdate) {
			this.needUpdate = false;
			this._geometry = new N3JS.PlaneBufferGeometry(this.width, this.height);
			this._material = new N3JS.MeshBasicMaterial({
				color: NgxThreeUtil.getColorSafe(0xffffff),
				transparent: true,
				side: N3JS.DoubleSide,
			});
			const echart: I3JS.Mesh = new N3JS.Mesh(this._geometry, this._material);
			if (NgxThreeUtil.isNotNull(this.chartjs)) {
				this.loadEchart();
				/*
				const fileLoader: I3JS.FileLoader = NgxThreeUtil.getLoader(
					'fileLoader',
					N3JS.FileLoader
				);
				fileLoader.load(
					NgxThreeUtil.getStoreUrl('echart/life-expectancy-table.json'),
					(response) => {
						this.loadEchart();
					}
				);
				*/
			}
			this._chartjsMesh = echart;
			this.setObject3d(this._chartjsMesh);
		}
		return this._chartjsMesh as any;
	}

	private _chartjsMesh: I3JS.Mesh = null;
	private _chart: any = null;
	private _camera: I3JS.Camera = null;
	private _geometry: I3JS.PlaneBufferGeometry = null;
	private _material: I3JS.MeshBasicMaterial = null;
	private _mapTexture: I3JS.Texture = null;
	private _chartOption: any = null;
	private _mapCanvasSize: I3JS.Vector2 = null;
	private _mapCanvas: HTMLCanvasElement = null;
	

	public setCamera(camera: I3JS.Camera) {
		if (camera !== null && this._camera !== camera) {
			this._camera = camera;
		}
	}

	/**
	 * The Raycaster of camera component
	 */
	private raycaster: I3JS.Raycaster = null;

	/**
	 * Gets raycaster
	 * @param [mouse]
	 * @returns raycaster
	 */
	public getRaycaster(
		mouse: I3JS.Vector2 = null,
		camera: I3JS.Camera = null
	): I3JS.Raycaster {
		if (this.raycaster === null) {
			this.raycaster = new N3JS.Raycaster();
		}
		if (mouse !== null && camera !== null) {
			this.raycaster.setFromCamera(mouse, camera);
		}
		return this.raycaster;
	}

	/**
	 * Gets intersections
	 * @param mouse
	 * @param mesh
	 * @param [recursive]
	 * @returns intersections
	 */
	public getIntersections(
		mouse: I3JS.Vector2,
		mesh: I3JS.Object3D | I3JS.Object3D[],
		recursive: boolean = false,
		camera: I3JS.Camera = null
	): I3JS.Intersection[] {
		const raycaster = this.getRaycaster(mouse, camera);
		if (mesh instanceof N3JS.Object3D) {
			return raycaster.intersectObject(mesh, recursive);
		} else if (Array.isArray(mesh)) {
			return raycaster.intersectObjects(mesh, recursive);
		} else {
			return [];
		}
	}

	/**
	 * Gets intersection
	 * @param mouse
	 * @param mesh
	 * @param [recursive]
	 * @returns intersection
	 */
	public getIntersection(
		mouse: I3JS.Vector2,
		mesh: I3JS.Object3D | I3JS.Object3D[],
		recursive: boolean = false,
		camera: I3JS.Camera = null
	): I3JS.Intersection {
		const intersects = this.getIntersections(mouse, mesh, recursive, camera);
		if (intersects !== null && intersects.length > 0) {
			return intersects[0];
		} else {
			return null;
		}
	}

	protected getVirtualEvent(renderEvent: IRendererEvent) : MouseEvent {
		const intersectMove = this.getIntersection(
			renderEvent.mouse,
			this._chartjsMesh,
			false,
			renderEvent.mainCamera
		);
		if (intersectMove !== null) {
			const uv = intersectMove.uv;
			this._mapTexture.transformUv(uv);
			uv.multiply(this._mapCanvasSize);
			let eventType : string = renderEvent.type;

			switch(renderEvent.type) {
				case 'pointermove' :
					eventType = 'mousemove';
					break;
			}
			return new MouseEvent(eventType, {
				clientX: uv.x,
				clientY: uv.y,
			});
		}
		return null;
	}

	public updateEvent(renderEvent: IRendererEvent) {
		switch (renderEvent.type) {
			case 'click':
			case 'pointerleave':
				const virtualEventClick = this.getVirtualEvent(renderEvent);
				if (virtualEventClick !== null) {
					this._mapCanvas.dispatchEvent(virtualEventClick);
					console.log(virtualEventClick);
				}
				break;
			case 'pointermove':
				const virtualEventMove = this.getVirtualEvent(renderEvent);
				if (virtualEventMove !== null) {
					this._mapCanvas.dispatchEvent(virtualEventMove);
					this.consoleLogTime('event', virtualEventMove, 100);
				}
				break;
		}
	}

	public update(renderTimer: IRendererTimer) {
		if (this._chartjsMesh !== null) {
			this.setCamera(renderTimer.event.mainCamera);
			if (this._mapTexture !== null) {
				this._mapTexture.needsUpdate = true;
			}
			// this.consoleLogTime('update', renderTimer);
		}
	}
}
