import { Component, forwardRef, Input, OnInit, SimpleChanges } from '@angular/core';
import {
	I3JS,
	IRendererEvent,
	IRendererTimer,
	N3JS,
	NgxAbstractObject3dComponent,
	NgxAbstractRendererEventComponent,
	NgxAbstractRendererUpdateComponent,
	NgxAbstractSubscribeComponent,
	NgxThreeUtil,
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
	selector: 'ngx3js-event-proxy',
	templateUrl: './event-proxy.component.html',
	styleUrls: ['./event-proxy.component.scss'],
	providers: [
		{
			provide: NgxAbstractObject3dComponent,
			useExisting: forwardRef(() => NgxEventProxyComponent),
		},
		{
			provide: NgxAbstractSubscribeComponent,
			useExisting: forwardRef(() => NgxEventProxyComponent),
		},
		{
			provide: NgxAbstractRendererEventComponent,
			useExisting: forwardRef(() => NgxEventProxyComponent),
		},
		{
			provide: NgxAbstractRendererUpdateComponent,
			useExisting: forwardRef(() => NgxEventProxyComponent),
		},
	],
})
export class NgxEventProxyComponent
	extends NgxAbstractObject3dComponent
	implements OnInit
{
	public eventTypes: string[] = ['pointermove', 'click'];

	@Input() public lookatCamera : boolean = false;

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
		super.ngOnInit('event-proxy');
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
		if (changes && this.object3d) {
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
			this.getObject3d();
			this._parentMesh = parent as I3JS.Mesh;
			this._parentMaterial = this._parentMesh.material as any;
			this._parentGeometry = this._parentMesh.geometry;
			const canvasMap = this._parentMaterial['map'];
			this.setCanvasTexture(canvasMap);
			this.subscribeRefer('canvasMap', NgxThreeUtil.getSubscribe(canvasMap, () => {
				this.setCanvasTexture(this._parentMaterial['map']);
			}, 'loaded'))
			return true;
		}
		return false;
	}

	/**
	 * Sets canvas texture
	 * 
	 * @param map 
	 */
	private setCanvasTexture(map : I3JS.CanvasTexture) {
		this._parentTexture = map;
		this._parentTextureCanvas = this._parentTexture.image;
		const width = parseInt(this._parentTextureCanvas.style.width) || this._parentTextureCanvas.width;
		const height = parseInt(this._parentTextureCanvas.style.height) || this._parentTextureCanvas.height;
		this._mapCanvasSize = new N3JS.Vector2(width,height);
	}

	private _parentMesh: I3JS.Mesh = null;
	private _parentMaterial: I3JS.Material = null;
	private _parentGeometry: I3JS.BufferGeometry = null;
	private _parentTexture: I3JS.Texture = null;
	private _parentTextureCanvas: HTMLCanvasElement = null;
	private _mapCanvasSize : I3JS.Vector2 = null;

	/**
	 * Applys changes3d
	 * @param changes
	 * @returns
	 */
	protected applyChanges3d(changes: string[]): void {
		if (this.object3d !== null) {
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
	 * Gets mesh
	 * @template T
	 * @returns mesh
	 */
	public getObject3d<T extends I3JS.Object3D>(): T {
		if (this.object3d === null || this._needUpdate) {
			this.needUpdate = false;
			this.setObject3d(new N3JS.Group());
		}
		return this.object3d as T;
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

	/**
	 * Gets virtual event
	 * 
	 * @param renderEvent 
	 * @returns virtual event 
	 */
	protected getVirtualEvent(renderEvent: IRendererEvent): MouseEvent {
		const intersectMove = this.getIntersection(
			renderEvent.mouse,
			this._parentMesh,
			false,
			renderEvent.mainCamera
		);
		if (intersectMove !== null) {
			const uv = intersectMove.uv;
			this._parentTexture.transformUv(uv);
			let eventType: string = renderEvent.type;
			switch (renderEvent.type) {
				case 'click':
					break;
				case 'pointermove':
					eventType = 'mousemove';
					break;
			}
			uv.multiply(this._mapCanvasSize);
			return new MouseEvent(eventType, {
				clientX: uv.x,
				clientY: uv.y,
			});
		}
		return null;
	}

	/**
	 * Updates event
	 * 
	 * @param renderEvent 
	 */
	public updateEvent(renderEvent: IRendererEvent) {
		if (this._parentTextureCanvas !== null) {
			switch (renderEvent.type) {
				case 'click':
				case 'pointerleave':
					const virtualEventClick = this.getVirtualEvent(renderEvent);
					if (virtualEventClick !== null) {
						this._parentTextureCanvas.dispatchEvent(virtualEventClick);
					}
					break;
				case 'pointermove':
					const virtualEventMove = this.getVirtualEvent(renderEvent);
					if (virtualEventMove !== null) {
						this._parentTextureCanvas.dispatchEvent(virtualEventMove);
					}
					break;
			}
		}
	}

	/**
	 * Updates ngx event proxy component
	 * 
	 * @param renderTimer 
	 */
	public update(renderTimer: IRendererTimer) {
		if (this._parentTexture !== null) {
			this._parentTexture.needsUpdate = true;
		}
		if (this._parentMesh !== null && this.lookatCamera && renderTimer.event.mainCamera !== null) {
			this._parentMesh.lookAt(renderTimer.event.mainCamera.position);
		}
	}
}
