import { Component, ContentChildren, Input, OnInit, QueryList, SimpleChanges } from '@angular/core';
import * as THREE from 'three';
import { ControllerComponent } from '../controller/controller.component';
import { FogComponent } from '../fog/fog.component';
import { ThreeColor, ThreeTexture, ThreeUtil } from '../interface';
import { AbstractObject3dComponent } from '../object3d.abstract';
import { PhysicsComponent } from '../physics/physics.component';
import { RendererComponent } from '../renderer/renderer.component';
import { AbstractTextureComponent } from '../texture.abstract';
import { TextureComponent } from '../texture/texture.component';
import { ViewerComponent } from '../viewer/viewer.component';
import { RendererTimer } from './../interface';
import { LocalStorageService } from './../local-storage.service';
import { MixerComponent } from './../mixer/mixer.component';
import { RigidbodyComponent } from './../rigidbody/rigidbody.component';

/**
 * SceneComponent
 */
@Component({
	selector: 'ngx3js-scene',
	templateUrl: './scene.component.html',
	styleUrls: ['./scene.component.scss'],
})
export class SceneComponent extends AbstractObject3dComponent implements OnInit {
	/**
	 * Input  of scene component
	 */
	@Input() private storageName: string = null;

	/**
	 * If not null, sets the background used when rendering the scene, and is always rendered first.
	 * Can be set to a [page:Color] which sets the clear color, a [page:Texture] covering the canvas, a cubemap as a [page:CubeTexture] or an equirectangular as a [page:Texture] . Default is null.
	 */
	@Input() private background: ThreeTexture | ThreeColor = null;

	/**
	 * If not null, this texture is set as the environment map for all physical materials in the scene.
	 * However, it's not possible to overwrite an existing texture assigned to [page:MeshStandardMaterial.envMap]. Default is null.
	 */
	@Input() private environment: ThreeTexture = null;

	/**
	 * Content children of scene component
	 */
	@ContentChildren(PhysicsComponent, { descendants: false }) private physicsList: QueryList<PhysicsComponent>;

	/**
	 * Content children of scene component
	 */
	@ContentChildren(RigidbodyComponent, { descendants: true }) private sceneRigidbodyList: QueryList<RigidbodyComponent>;

	/**
	 * Content children of scene component
	 */
	@ContentChildren(FogComponent, { descendants: false }) private fogList: QueryList<FogComponent>;

	/**
	 * Content children of scene component
	 */
	@ContentChildren(ControllerComponent, { descendants: true }) private sceneControllerList: QueryList<ControllerComponent>;

	/**
	 * Content children of scene component
	 */
	@ContentChildren(MixerComponent, { descendants: true }) private sceneMixerList: QueryList<MixerComponent>;

	/**
	 * Content children of scene component
	 */
	@ContentChildren(ViewerComponent, { descendants: true }) private viewerList: QueryList<ViewerComponent>;

	/**
	 * Content children of scene component
	 */
	@ContentChildren(TextureComponent, { descendants: false }) private textureList: QueryList<TextureComponent>;

	/**
	 * Creates an instance of scene component.
	 * @param localStorageService
	 */
	constructor(private localStorageService: LocalStorageService) {
		super();
	}

	/**
	 * A callback method that is invoked immediately after the
	 * default change detector has checked the directive's
	 * data-bound properties for the first time,
	 * and before any of the view or content children have been checked.
	 * It is invoked only once when the directive is instantiated.
	 */
	ngOnInit(): void {
		super.ngOnInit('scene');
	}

	/**
	 * A callback method that performs custom clean-up, invoked immediately
	 * before a directive, pipe, or service instance is destroyed.
	 */
	ngOnDestroy(): void {
		super.ngOnDestroy();
	}

	/**
	 * A callback method that is invoked immediately after the
	 * default change detector has checked data-bound properties
	 * if at least one has changed, and before the view and content
	 * children are checked.
	 *
	 * @param changes The changed properties.
	 */
	ngOnChanges(changes: SimpleChanges): void {
		super.ngOnChanges(changes);
		if (changes && this.scene) {
			this.addChanges(changes);
		}
	}

	/**
	 * A callback method that is invoked immediately after
	 * Angular has completed initialization of all of the directive's
	 * content.
	 * It is invoked only once when the directive is instantiated.
	 */
	ngAfterContentInit(): void {
		this.subscribeListQueryChange(this.physicsList, 'physicsList', 'physics');
		this.subscribeListQueryChange(this.sceneRigidbodyList, 'sceenrigidbodyList', 'rigidbody');
		this.subscribeListQueryChange(this.fogList, 'fogList', 'fog');
		this.subscribeListQueryChange(this.textureList, 'textureList', 'texture');
		this.subscribeListQueryChange(this.sceneControllerList, 'sceneControllerList', 'sceneController');
		this.subscribeListQueryChange(this.sceneMixerList, 'sceneMixerList', 'mixer');
		this.subscribeListQueryChange(this.viewerList, 'viewerList', 'viewer');
		super.ngAfterContentInit();
	}

	/**
	 * Scene  of scene component
	 */
	private scene: THREE.Scene = null;

	/**
	 * Renderer  of scene component
	 */
	private renderer: RendererComponent = null;

	/**
	 * Sets renderer
	 * @param renderer
	 */
	public setRenderer(renderer: RendererComponent) {
		this.renderer = renderer;
	}

	/**
	 * Gets renderer
	 * @returns renderer
	 */
	public getRenderer(): RendererComponent {
		return this.renderer;
	}

	/**
	 * Gets three renderer
	 * @returns three renderer
	 */
	public getThreeRenderer(): THREE.Renderer {
		if (ThreeUtil.isNotNull(this.renderer)) {
			return this.renderer.getRenderer();
		} else {
			return ThreeUtil.getRenderer();
		}
	}

	/**
	 * Gets object3d
	 * @template T
	 * @returns object3d
	 */
	public getObject3d<T extends THREE.Object3D>(): T {
		return this.getScene() as any;
	}

	/**
	 * Gets json
	 * @returns json
	 */
	public getJson(): any {
		return this.getScene().toJSON();
	}

	/**
	 * Sets clear
	 */
	public setClear(): void {
		const scene = this.getScene();
		if (scene['clear']) {
			scene['clear']();
		} else {
			scene.children = [];
		}
	}

	/**
	 * Sets savelocal storage
	 * @param storageName
	 * @returns
	 */
	public setSavelocalStorage(storageName: string) {
		return this.localStorageService.setScene(storageName, this.getScene());
	}

	/**
	 * Physics  of scene component
	 */
	private _physics: PhysicsComponent = null;

	/**
	 * Gets texture option
	 * @param map
	 * @param name
	 * @returns texture option
	 */
	private getTextureOption(map: ThreeTexture, name: string): THREE.Texture {
		if (ThreeUtil.isNotNull(map)) {
			if (typeof map === 'string') {
				const texture = AbstractTextureComponent.getTextureImageOption(map, null, 'texture', null, () => {
					this.addChanges(name);
				});
				return texture;
			} else if (ThreeUtil.isNotNull(map['value'])) {
				const texture = AbstractTextureComponent.getTextureImageOption(map['value'], map['options'], map['type'] as string, map['cubeImage'], () => {
					this.addChanges(name);
				});
				return texture;
			} else {
				this.unSubscribeRefer(name);
				const texture = ThreeUtil.getTexture(map, name);
				this.subscribeRefer(
					name,
					ThreeUtil.getSubscribe(
						map,
						() => {
							this.addChanges(name);
						},
						'texture'
					)
				);
				return texture;
			}
		}
		return null;
	}

	/**
	 * Applys changes3d
	 * @param changes
	 */
	public applyChanges3d(changes: string[]) {
		if (this.scene !== null) {
			if (ThreeUtil.isIndexOf(changes, 'init')) {
				changes = ThreeUtil.pushUniq(changes, ['material', 'background', 'environment', 'texture', 'mesh', 'viewer', 'light', 'camera', 'physics', 'fog', 'scenecontroller']);
			}
			changes.forEach((change) => {
				switch (change) {
					case 'viewer':
						this.unSubscribeReferList('viewerList');
						if (ThreeUtil.isNotNull(this.viewerList)) {
							this.viewerList.forEach((viewer) => {
								viewer.setParent(this.scene);
							});
							this.subscribeListQuery(this.viewerList, 'viewerList', 'viewer');
						}
						break;
					case 'rigidbody':
					case 'physics':
					case 'mixer':
						this.unSubscribeReferList('physicsList');
						this.unSubscribeReferList('rigidbodyList');
						this.unSubscribeReferList('mixerList');
						if (ThreeUtil.isNotNull(this.sceneRigidbodyList) && ThreeUtil.isNotNull(this.physicsList) && this.physicsList.length > 0) {
							this._physics = this.physicsList.first;
							this.sceneRigidbodyList.forEach((rigidbody) => {
								rigidbody.setPhysics(this._physics);
							});
							this.subscribeListQuery(this.physicsList, 'physicsList', 'physics');
							this.subscribeListQuery(this.sceneRigidbodyList, 'rigidbodyList', 'rigidbody');
						}
						if (ThreeUtil.isNotNull(this._physics) && ThreeUtil.isNotNull(this.sceneMixerList)) {
							this.sceneMixerList.forEach((mixer) => {
								mixer.setPhysics(this._physics);
							});
							this.subscribeListQuery(this.sceneMixerList, 'sceneMixerList', 'mixer');
						}
						break;
					case 'fog':
						this.unSubscribeReferList('fogList');
						if (ThreeUtil.isNotNull(this.fogList)) {
							this.fogList.forEach((fog) => {
								fog.setScene(this.scene);
							});
							this.subscribeListQuery(this.fogList, 'fogList', 'fog');
						}
						break;
					case 'controller':
					case 'scenecontroller':
						this.unSubscribeReferList('sceneControllerList');
						if (ThreeUtil.isNotNull(this.sceneControllerList)) {
							this.sceneControllerList.forEach((controller) => {
								controller.setScene(this.scene);
							});
							this.subscribeListQuery(this.sceneControllerList, 'sceneControllerList', 'controller');
						}
						break;
					case 'background':
						if (ThreeUtil.isNotNull(this.background)) {
							if (ThreeUtil.isColor(this.background)) {
								this.scene.background = ThreeUtil.getColorSafe(this.background, 0x000000);
							} else {
								this.scene.background = this.getTextureOption(this.background, 'background');
							}
						} else {
							this.scene.background = null;
						}
						break;
					case 'environment':
						if (ThreeUtil.isNotNull(this.environment)) {
							this.scene.environment = this.getTextureOption(this.environment, 'environment');
						} else {
							this.scene.environment = null;
						}
						break;
					case 'texture':
						this.unSubscribeReferList('textureList');
						if (ThreeUtil.isNotNull(this.textureList)) {
							this.textureList.forEach((texture) => {
								texture.setMaterial(this.scene);
							});
							this.subscribeListQuery(this.textureList, 'textureList', 'texture');
						}
						break;
					case 'material':
						this.unSubscribeReferList('materialList');
						if (ThreeUtil.isNotNull(this.materialList)) {
							this.materialList.forEach((material) => {
								material.setMesh(this.scene);
							});
							this.subscribeListQuery(this.materialList, 'materialList', 'material');
						}
						break;
				}
			});
		}
		super.applyChanges3d(changes);
	}

	/**
	 * Updates scene component
	 * @param timer
	 */
	public update(timer: RendererTimer) {
		this.viewerList.forEach((viewer) => {
			viewer.update(timer);
		});
		this.sceneMixerList.forEach((mixer) => {
			mixer.update(timer);
		});
		this.physicsList.forEach((physics) => {
			physics.update(timer);
		});
		this.sceneRigidbodyList.forEach((rigidbody) => {
			rigidbody.update(timer);
		});
	}

	/**
	 * Scene synked of scene component
	 */
	private _sceneSynked: boolean = false;

	/**
	 * Gets scene
	 * @returns scene
	 */
	public getScene(): THREE.Scene {
		if (this.scene === null || this._needUpdate) {
			this.getSceneDumpy();
		}
		if (!this._sceneSynked) {
			this._sceneSynked = true;
			if (ThreeUtil.isNotNull(this.storageName)) {
				this.scene = new THREE.Scene();
				this.localStorageService.getScene(this.storageName, (scene: THREE.Scene) => {
					this.scene = scene;
					this.setObject3d(scene);
				});
			} else {
				this.setObject3d(this.scene);
			}
		}
		return this.scene;
	}

	/**
	 * Gets scene dumpy
	 * @returns scene dumpy
	 */
	public getSceneDumpy(): THREE.Scene {
		if (this.scene === null || this._needUpdate) {
			this.needUpdate = false;
			this.scene = new THREE.Scene();
			this._sceneSynked = false;
		}
		return this.scene;
	}
}
