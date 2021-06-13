import { Component, ContentChildren, Input, OnInit, QueryList, SimpleChanges } from '@angular/core';
import * as THREE from 'three';
import { CameraComponent } from '../camera/camera.component';
import { CanvasComponent } from '../canvas/canvas.component';
import { AbstractThreeController, AutoUniformsController } from '../controller.abstract';
import { RendererEvent, RendererTimer, ThreeUtil } from '../interface';
import { SceneComponent } from '../scene/scene.component';
import { AbstractSubscribeComponent } from '../subscribe.abstract';
import { HtmlCollection } from '../visual/visual.component';
import { ControllerItemComponent, ControlObjectItem } from './controller-item/controller-item.component';

@Component({
  selector: 'three-controller',
  templateUrl: './controller.component.html',
  styleUrls: ['./controller.component.scss'],
})
export class ControllerComponent extends AbstractSubscribeComponent implements OnInit {
  @Input() private type: string = 'auto';
  @Input() private controlComponent: { new (ref3d: THREE.Object3D, ref2d: HtmlCollection): AbstractThreeController } = null;
  @Input() private controlParams: { [key: string]: any } = null;
  @Input() private curve: string = null;
  @Input() private scale: number = null;
  @Input() private radius: number = null;
  @Input() private radiusX: number = null;
  @Input() private radiusY: number = null;
  @Input() private radiusZ: number = null;
  @Input() private rotationX: number = null;
  @Input() private rotationY: number = null;
  @Input() private rotationZ: number = null;
  @Input() private centerX: number = null;
  @Input() private centerY: number = null;
  @Input() private centerZ: number = null;
  @Input() private duration: number = null;
  @Input() private delta: number = null;
  @Input() private multiply: number = null;
  @Input() private options: string = null;
  @Input() private visible: boolean = false;
  @Input() private color: string | number | THREE.Color = null;
  @Input() private opacity: number = null;
  @Input() private tubularSegments: number = null;
  @Input() private tubeRadius: number = null;
  @Input() private tubeRadiusSegments: number = null;
  @Input() private closed: boolean = null;
  @Input() private material: string = null;
  @Input() private useEvent: boolean = false;
  @Input() private eventSeqn: number = 1000;

  @ContentChildren(ControllerItemComponent, { descendants: false }) controllerItemList: QueryList<ControllerItemComponent>;

  constructor() {
    super();
  }

  ngOnInit(): void {
    super.ngOnInit('controller');
  }

  ngOnDestroy(): void {
    super.ngOnDestroy();
  }

  ngOnChanges(changes: SimpleChanges): void {
    super.ngOnChanges(changes);
    if (changes && (this._controller !== null || this.pathGuide !== null)) {
      this.addChanges(changes);
    }
  }

  ngAfterContentInit(): void {
    super.ngAfterContentInit();
    this.subscribeListQueryChange(this.controllerItemList, 'controllerItemList', 'controllerItem');
  }

  applyChanges(changes: string[]) {
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
            case 'position' :
              this.refreshRefObject3dPosition();
              break;
          }
        });
      }
      super.applyChanges(changes);
    }
  }

  private _controller: AbstractThreeController = null;
  private refObject3d: THREE.Object3D = null;
  private refObject2d: HtmlCollection = null;
  private pathGuide: THREE.Object3D = null;
  private refObject3dposition : THREE.Vector3 = new THREE.Vector3();

  refreshRefObject3dPosition() {
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

  private _controlItem : ControlObjectItem = {
    object3d: null,
    position: null,
    rotation: null,
    scale: null,
    material: null,
    uniforms: null,
    geometry: null,
    attributes: null,
    morphAttributes: null
  };

  setObject3d(refObject3d: THREE.Object3D) {
    if (this.refObject3d !== refObject3d) {
      this.refObject3d = refObject3d;
      if (this.refObject3d !== null) {
        this.unSubscribeRefer('position');
        this.addChanges('position');
        this.subscribeRefer('position', ThreeUtil.getSubscribe(this.refObject3d,() => {
          this.unSubscribeRefer('position');
          this.addChanges('position');
        }, 'position'));
      }
      if (this.checkController()) {
        this.addChanges('object3d');
      }
    }
  }

  setObject2d(refObject2d: HtmlCollection) {
    if (this.refObject2d !== refObject2d) {
      this.refObject2d = refObject2d;
      if (this.checkController()) {
        this.addChanges('object2d');
      }
    }
  }

  private _renderer: THREE.Renderer = null;
  private _scenes: QueryList<SceneComponent> = null;
  private _cameras: QueryList<CameraComponent> = null;
  private _canvas2ds: QueryList<CanvasComponent> = null;
  private _scene: THREE.Scene = null;
  private _canvas: HtmlCollection = null;
  private _event : RendererEvent = null;
  setRenderer(renderer: THREE.Renderer, scenes: QueryList<SceneComponent>, cameras: QueryList<CameraComponent>, canvas2ds: QueryList<CanvasComponent>) {
    this._renderer = renderer;
    this._event = ThreeUtil.getThreeComponent(renderer)?.events;
    this._scenes = scenes;
    this._cameras = cameras;
    this._canvas2ds = canvas2ds;
    if (this.checkController()) {
      this.addChanges('render');
    }
  }

  setScene(scene: THREE.Scene) {
    this._scene = scene;
    if (this.checkController()) {
      this.addChanges('scene');
    }
  }

  setCanvas(canvas: HtmlCollection) {
    this._canvas = canvas;
    if (this.checkController()) {
      this.addChanges('canvas');
    }
  }

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

  private _controllerItems: ControllerItemComponent[] = null;

  getController(): void {
    if ((this.refObject3d !== null || this.refObject2d !== null) && this._needUpdate && ThreeUtil.isNotNull(this.controllerItemList)) {
      this.needUpdate = false;
      this._controllerItems = null;
      this._controller = null;
      let controller: any = null;
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
            this.refObject3d.parent.add(this.pathGuide);
          } else if (this.refObject3d.parent !== this.pathGuide.parent) {
            this.refObject3d.parent.add(this.pathGuide);
          }
          switch (controller.toLowerCase()) {
            case 'positionlookat':
            case 'position':
            case 'scale':
            case 'rotation':
            case 'lookat':
            case 'material':
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

  private _logSeqn: number = 0;

  private renderTime : number = 0;
  update(rendererTimer: RendererTimer) {
    if (this._controller !== null) {
      this._controller.update(rendererTimer);
    } else if (this.refObject3d !== null && this._controllerItems !== null) {
      const events: string[] = [];
      if (this._event !== null && false) {
         this.renderTime += this._event.direction.y / 1000 * rendererTimer.delta;
      } else {
        this.renderTime += rendererTimer.delta;
      }
      const dirRendererTimer : RendererTimer = {
        elapsedTime : this.renderTime,
        delta : rendererTimer.delta 
      }
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
