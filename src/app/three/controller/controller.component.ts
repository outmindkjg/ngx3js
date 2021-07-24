import { Component, ContentChildren, Input, OnInit, QueryList, SimpleChanges } from '@angular/core';
import * as THREE from 'three';
import { CameraComponent } from '../camera/camera.component';
import { CanvasComponent } from '../canvas/canvas.component';
import { AbstractThreeController, AutoUniformsController } from '../controller.abstract';
import { RendererEvent, RendererTimer, ThreeColor, ThreeUtil } from '../interface';
import { SceneComponent } from '../scene/scene.component';
import { AbstractSubscribeComponent } from '../subscribe.abstract';
import { HtmlCollection } from '../visual/visual.component';
import { ControllerItemComponent, ControlObjectItem } from './controller-item/controller-item.component';

/**
 * ControllerComponent
 */
@Component({
  selector: 'ngx3js-controller',
  templateUrl: './controller.component.html',
  styleUrls: ['./controller.component.scss'],
})
export class ControllerComponent extends AbstractSubscribeComponent implements OnInit {
  /**
   * Input  of controller component
   *
   * Notice - case insensitive.
   * 
   */
  @Input() private type: string = 'auto';

  /**
   * Input  of controller component
   */
  @Input() private controlComponent: { new (ref3d: THREE.Object3D, ref2d: HtmlCollection): AbstractThreeController } = null;

  /**
   * Input  of controller component
   */
  @Input() private controlParams: { [key: string]: any } = null;

  /**
   * Input  of controller component
   *
   * Notice - case insensitive.
   * 
   */
  @Input() private curve: string = null;

  /**
   * Input  of controller component
   */
  @Input() private scale: number = null;

  /**
   * Input  of controller component
   */
  @Input() private radius: number = null;

  /**
   * Input  of controller component
   */
  @Input() private radiusX: number = null;

  /**
   * Input  of controller component
   */
  @Input() private radiusY: number = null;

  /**
   * Input  of controller component
   */
  @Input() private radiusZ: number = null;

  /**
   * Input  of controller component
   */
  @Input() private rotationX: number = null;

  /**
   * Input  of controller component
   */
  @Input() private rotationY: number = null;

  /**
   * Input  of controller component
   */
  @Input() private rotationZ: number = null;

  /**
   * Input  of controller component
   */
  @Input() private centerX: number = null;

  /**
   * Input  of controller component
   */
  @Input() private centerY: number = null;

  /**
   * Input  of controller component
   */
  @Input() private centerZ: number = null;

  /**
   * Input  of controller component
   */
  @Input() private duration: number = null;

  /**
   * Input  of controller component
   */
  @Input() private delta: number = null;

  /**
   * Input  of controller component
   */
  @Input() private multiply: number = null;

  /**
   * Input  of controller component
   *
   * Notice - case insensitive.
   * 
   */
  @Input() private options: string = null;

  /**
   * Input  of controller component
   */
  @Input() private visible: boolean = false;

  /**
   * Input  of controller component
   */
  @Input() private color: ThreeColor = null;

  /**
   * Input  of controller component
   */
  @Input() private opacity: number = null;

  /**
   * Input  of controller component
   */
  @Input() private tubularSegments: number = null;

  /**
   * Input  of controller component
   */
  @Input() private tubeRadius: number = null;

  /**
   * Input  of controller component
   */
  @Input() private tubeRadiusSegments: number = null;

  /**
   * Input  of controller component
   */
  @Input() private closed: boolean = null;

  /**
   * Input  of controller component
   *
   * Notice - case insensitive.
   * 
   */
  @Input() private material: string = null;

  /**
   * Input  of controller component
   */
  @Input() private useEvent: boolean = false;

  /**
   * Input  of controller component
   */
  @Input() private eventSeqn: number = 1000;

  /**
   * Input  of controller component
   */
  @Input() private mstDuration: number = null;

  /**
   * Content children of controller component
   */
  @ContentChildren(ControllerItemComponent, { descendants: false }) controllerItemList: QueryList<ControllerItemComponent>;

  /**
   * Creates an instance of controller component.
   */
  constructor() {
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
    super.ngOnInit('controller');
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
    if (changes && (this._controller !== null || this.pathGuide !== null)) {
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
    super.ngAfterContentInit();
    this.subscribeListQueryChange(this.controllerItemList, 'controllerItemList', 'controllerItem');
  }

  /**
   * Applys changes
   * @param changes
   * @returns
   */
  public applyChanges(changes: string[]) {
    if (this._controller !== null || this._controllerItems !== null) {
      if (ThreeUtil.isIndexOf(changes, 'clearinit')) {
        this.getController();
        return;
      }
      if (ThreeUtil.isIndexOf(changes, ['type', 'object3d', 'object2d'])) {
        this.needUpdate = true;
        return;
      }
      if (ThreeUtil.isIndexOf(changes, 'init')) {
        changes = ThreeUtil.pushUniq(changes, ['controlparams', 'render', 'position']);
      }
      if (ThreeUtil.isIndexOf(changes, 'render')) {
        changes = ThreeUtil.pushUniq(changes, ['scene', 'canvas']);
      }
      if (this._controller !== null && this._renderer !== null) {
        changes.forEach((change) => {
          switch (change.toLowerCase()) {
            case 'controlparams':
              this._controller.setVariables(this.controlParams);
              break;
            case 'render':
              this._controller.setRenderer(this._renderer, this._scenes, this._cameras, this._canvas2ds);
              break;
            case 'scene':
              if (this._scene !== null) {
                this._controller.setScene(this._scene);
              }
              break;
            case 'canvas':
              if (this._canvas !== null) {
                this._controller.setCanvas(this._canvas);
              }
              break;
          }
        });
      } else if (this._controllerItems !== null) {
        if (
          ThreeUtil.isIndexOf(changes, [
            'controlleritem',
            'scale',
            'radius',
            'radiusx',
            'radiusy',
            'radiusz',
            'rotationx',
            'rotationy',
            'rotationz',
            'centerx',
            'centery',
            'centerz',
            'duration',
            'delta',
            'multiply',
            'options',
            'controlleritem',
            'color',
            'opacity',
            'tubularsegments',
            'thubradius',
            'tuberadiussegments',
            'closed',
            'material',
          ])
        ) {
          this.needUpdate = true;
          return;
        }
        changes.forEach((change) => {
          switch (change.toLowerCase()) {
            case 'visible':
              if (this.pathGuide !== null) {
                this.pathGuide.visible = ThreeUtil.getTypeSafe(this.visible, false);
              }
              break;
            case 'position':
              this.refreshRefObject3dPosition();
              break;
          }
        });
      }
      super.applyChanges(changes);
    }
  }

  /**
   * Controller  of controller component
   */
  private _controller: AbstractThreeController = null;

  /**
   * Ref object3d of controller component
   */
  private refObject3d: THREE.Object3D = null;

  /**
   * Ref object2d of controller component
   */
  private refObject2d: HtmlCollection = null;

  /**
   * Path guide of controller component
   */
  private pathGuide: THREE.Object3D = null;

  /**
   * Ref object3dposition of controller component
   */
  private refObject3dposition: THREE.Vector3 = new THREE.Vector3();

  /**
   * Duration  of controller component
   */
  private _duration: number = 1;

  /**
   * Refreshs ref object3d position
   */
  public refreshRefObject3dPosition() {
    if (ThreeUtil.isNotNull(this.refObject3d)) {
      if (ThreeUtil.isNotNull(this.refObject3d.userData.initPosition)) {
        this.refObject3dposition.copy(this.refObject3d.userData.initPosition);
      } else {
        this.refObject3dposition.copy(this.refObject3d.position);
      }
      if (this.pathGuide !== null) {
        this.pathGuide.children[0].position.copy(this.refObject3dposition);
      }
      this._controlItem.object3d = this.refObject3d;
      this._controlItem.component = ThreeUtil.getThreeComponent(this.refObject3d);
      this._controlItem.position = this.refObject3d.position;
      this._controlItem.rotation = this.refObject3d.rotation;
      this._controlItem.scale = this.refObject3d.scale;
      if (this.refObject3d instanceof THREE.Mesh) {
        if (Array.isArray(this.refObject3d.material)) {
          if (this.refObject3d.material.length > 0) {
            this._controlItem.material = this.refObject3d.material[0];
          } else {
            this._controlItem.material = null;
          }
        } else {
          this._controlItem.material = this.refObject3d.material;
        }
        if (ThreeUtil.isNotNull(this._controlItem.material) && this._controlItem.material instanceof THREE.ShaderMaterial) {
          this._controlItem.uniforms = this._controlItem.material.uniforms;
        } else {
          this._controlItem.uniforms = null;
        }
        this._controlItem.geometry = this.refObject3d.geometry;
        this._controlItem.attributes = this._controlItem.geometry.attributes;
        this._controlItem.morphAttributes = this._controlItem.geometry.morphAttributes;
      } else {
        this._controlItem.material = null;
        this._controlItem.geometry = null;
        this._controlItem.uniforms = null;
        this._controlItem.attributes = null;
        this._controlItem.morphAttributes = null;
      }
    }
  }

  /**
   * Control item of controller component
   */
  private _controlItem: ControlObjectItem = {
    object3d: null,
    component: null,
    position: null,
    rotation: null,
    scale: null,
    material: null,
    uniforms: null,
    geometry: null,
    attributes: null,
    morphAttributes: null,
  };

  /**
   * Sets object3d
   * @param refObject3d
   */
  public setObject3d(refObject3d: THREE.Object3D) {
    if (this.refObject3d !== refObject3d) {
      this.refObject3d = refObject3d;
      if (this.refObject3d !== null) {
        this.unSubscribeRefer('position');
        this.addChanges('position');
        this.subscribeRefer(
          'position',
          ThreeUtil.getSubscribe(
            this.refObject3d,
            () => {
              this.unSubscribeRefer('position');
              this.addChanges('position');
            },
            'position'
          )
        );
      }
      if (this.checkController()) {
        this.addChanges('object3d');
      }
    }
  }

  /**
   * Sets object2d
   * @param refObject2d
   */
  public setObject2d(refObject2d: HtmlCollection) {
    if (this.refObject2d !== refObject2d) {
      this.refObject2d = refObject2d;
      if (this.checkController()) {
        this.addChanges('object2d');
      }
    }
  }

  /**
   * Renderer  of controller component
   */
  private _renderer: THREE.Renderer = null;

  /**
   * Scenes  of controller component
   */
  private _scenes: QueryList<SceneComponent> = null;

  /**
   * Cameras  of controller component
   */
  private _cameras: QueryList<CameraComponent> = null;

  /**
   * Canvas2ds  of controller component
   */
  private _canvas2ds: QueryList<CanvasComponent> = null;

  /**
   * Scene  of controller component
   */
  private _scene: THREE.Scene = null;

  /**
   * Canvas  of controller component
   */
  private _canvas: HtmlCollection = null;

  /**
   * Event  of controller component
   */
  private _event: RendererEvent = null;

  /**
   * Sets renderer
   * @param renderer
   * @param scenes
   * @param cameras
   * @param canvas2ds
   */
  public setRenderer(renderer: THREE.Renderer, scenes: QueryList<SceneComponent>, cameras: QueryList<CameraComponent>, canvas2ds: QueryList<CanvasComponent>) {
    this._renderer = renderer;
    this._event = ThreeUtil.getThreeComponent(renderer)?.events;
    this._scenes = scenes;
    this._cameras = cameras;
    this._canvas2ds = canvas2ds;
    if (this.checkController()) {
      this.addChanges('render');
    }
  }

  /**
   * Sets scene
   * @param scene
   */
  public setScene(scene: THREE.Scene) {
    this._scene = scene;
    if (this.checkController()) {
      this.addChanges('scene');
    }
  }

  /**
   * Sets canvas
   * @param canvas
   */
  public setCanvas(canvas: HtmlCollection) {
    this._canvas = canvas;
    if (this.checkController()) {
      this.addChanges('canvas');
    }
  }

  /**
   * Checks controller
   * @returns true if controller
   */
  private checkController(): boolean {
    if (this.refObject3d !== null || this.refObject2d !== null) {
      if (this._needUpdate) {
        this.getController();
        return false;
      } else {
        return true;
      }
    }
    return false;
  }

  /**
   * Controller items of controller component
   */
  private _controllerItems: ControllerItemComponent[] = null;

  /**
   * Gets controller
   */
  public getController(): void {
    if ((this.refObject3d !== null || this.refObject2d !== null) && this._needUpdate && ThreeUtil.isNotNull(this.controllerItemList)) {
      this.needUpdate = false;
      this._controllerItems = null;
      this._controller = null;
      let controller: any = null;
      this._duration = ThreeUtil.getTypeSafe(this.mstDuration, 1);

      if (this.pathGuide !== null) {
        this.pathGuide.parent.remove(this.pathGuide);
        this.pathGuide = null;
      }
      if (typeof this.type === 'string') {
        switch (this.type.toLowerCase()) {
          case 'uniforms':
            controller = AutoUniformsController;
            break;
          case 'auto':
            if (ThreeUtil.isNotNull(this.controlComponent)) {
              controller = this.controlComponent;
            } else {
              controller = 'auto';
            }
            break;
          default:
            controller = this.type;
            break;
        }
      } else {
        controller = this.type;
      }
      if (ThreeUtil.isNotNull(controller)) {
        if (typeof controller === 'string' && this.refObject3d !== null) {
          const controllerItemList: ControllerItemComponent[] = [];
          if (this.pathGuide === null) {
            this.pathGuide = new THREE.Group();
            this.pathGuide.add(new THREE.Group());
            if (this.visible) {
              this.refObject3d.parent.add(this.pathGuide);
            }
          } else if (this.visible && this.refObject3d.parent !== this.pathGuide.parent) {
            this.refObject3d.parent.add(this.pathGuide);
          }
          switch (controller.toLowerCase()) {
            case 'positionlookat':
            case 'position':
            case 'scale':
            case 'rotation':
            case 'lookat':
            case 'material':
            case 'tween':
            case 'uniforms':
              const controllerItem = this.initLocalComponent('controllerItem', new ControllerItemComponent());
              controllerItem.updateInputParams({
                type: controller,
                curve: this.curve,
                scale: this.scale,
                radius: this.radius,
                radiusX: this.radiusX,
                radiusY: this.radiusY,
                radiusZ: this.radiusZ,
                rotationX: this.rotationX,
                rotationY: this.rotationY,
                rotationZ: this.rotationZ,
                centerX: this.centerX,
                centerY: this.centerY,
                centerZ: this.centerZ,
                duration: this.duration,
                delta: this.delta,
                multiply: this.multiply,
                options: this.options,
                color: this.color,
                opacity: this.opacity,
                tubularSegments: this.tubularSegments,
                tubeRadius: this.tubeRadius,
                tubeRradiusSegments: this.tubeRadiusSegments,
                closed: this.closed,
                visible: this.visible,
                material: this.material,
              });
              controllerItemList.push(controllerItem.getController(this._controlItem, this.pathGuide));
              break;
          }
          if (ThreeUtil.isNotNull(this.controllerItemList) && this.controllerItemList.length > 0) {
            this.controllerItemList.forEach((controllerItem) => {
              controllerItemList.push(controllerItem.getController(this._controlItem, this.pathGuide));
            });
          }
          this._controllerItems = controllerItemList;
          super.setObject(this._controllerItems);
        } else {
          this._controller = new controller(this.refObject3d, this.refObject2d);
          this._controller.setVariables(this.controlParams);
          this._controller.awake();
          super.setObject(this._controller);
        }
      }
    }
  }

  /**
   * Log seqn of controller component
   */
  private _logSeqn: number = 0;

  /**
   * Render time of controller component
   */
  private renderTime: number = 0;

  /**
   * Updates controller component
   * @param rendererTimer
   */
  public update(rendererTimer: RendererTimer) {
    if (this._controller !== null) {
      this._controller.update(rendererTimer);
    } else if (this.refObject3d !== null && this._controllerItems !== null) {
      const events: string[] = [];
      if (this._event !== null && false) {
        this.renderTime += (this._event.direction.y / 1000) * rendererTimer.delta;
      } else {
        this.renderTime += rendererTimer.delta / this._duration;
      }
      const dirRendererTimer: RendererTimer = {
        elapsedTime: this.renderTime,
        delta: rendererTimer.delta / this._duration,
      };
      this._controllerItems.forEach((item) => {
        item.update(dirRendererTimer, events);
      });
      if (this.useEvent && events.length > 0) {
        if (this._logSeqn % this.eventSeqn === 0 && ThreeUtil.isNotNull(this.refObject3d.userData.component) && ThreeUtil.isNotNull(this.refObject3d.userData.component.setSubscribeNext)) {
          this.refObject3d.userData.component.setSubscribeNext(events);
        }
        this._logSeqn++;
      }
    } else {
      this.consoleLogTime('controller', rendererTimer);
    }
  }
}
