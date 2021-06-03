import { Component, ContentChildren, Input, OnInit, QueryList, SimpleChanges } from '@angular/core';
import * as THREE from 'three';
import { CameraComponent } from '../camera/camera.component';
import { CanvasComponent } from '../canvas/canvas.component';
import { AbstractThreeController, AutoUniformsController } from '../controller.abstract';
import { RendererTimer, ThreeUtil } from '../interface';
import { SceneComponent } from '../scene/scene.component';
import { AbstractSubscribeComponent } from '../subscribe.abstract';
import { HtmlCollection } from '../visual/visual.component';
import { ControllerItemComponent } from './controller-item/controller-item.component';

@Component({
  selector: 'three-controller',
  templateUrl: './controller.component.html',
  styleUrls: ['./controller.component.scss'],
})
export class ControllerComponent extends AbstractSubscribeComponent implements OnInit {
  @Input() private controller: { new (ref3d: THREE.Object3D, ref2d: HtmlCollection): AbstractThreeController } | string = 'auto';
  @Input() private params: { [key: string]: any } = null;
  @Input() private curve: string = null;
  @Input() private scale: number = null;
  @Input() private scaleX: number = null;
  @Input() private scaleY: number = null;
  @Input() private scaleZ: number = null;
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
  @Input() private visible: boolean = null;
  @Input() private color: string | number | THREE.Color = null;
  @Input() private opacity: number = null;
  @Input() private useEvent: boolean = false;
  @Input() private eventSeqn: number = 1000;
  @Input() private tubularSegments: number = null;
  @Input() private radius: number = null;
  @Input() private radiusSegments: number = null;
  @Input() private closed: boolean = null;

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
    if (changes && this._needUpdate === false) {
      this.addChanges(changes);
      /*
      if (changes.controller) {
        this.needUpdate = true;
      } else if (changes.params && this._controller !== null) {
        this._controller.setVariables(this.params);
      }
      todo
      */
    }
  }

  ngAfterContentInit(): void {
    super.ngAfterContentInit();
    this.subscribeListQuery(this.controllerItemList, 'controllerItemList', 'controllerItem');
    this.resetRenderer();
  }

  private _controller: AbstractThreeController = null;
  private parent: THREE.Object3D = null;
  private refObject2d: HtmlCollection = null;

  setObject3d(parent: THREE.Object3D) {
    if (this.parent !== parent) {
      this.parent = parent;
      this.resetRenderer();
    }
  }

  setObject2D(refObject2d: HtmlCollection) {
    if (this.refObject2d !== refObject2d) {
      this.refObject2d = refObject2d;
      this.resetRenderer();
    }
  }

  private _renderer: THREE.Renderer = null;
  private _scenes: QueryList<SceneComponent> = null;
  private _cameras: QueryList<CameraComponent> = null;
  private _canvas2ds: QueryList<CanvasComponent> = null;
  private _scene: THREE.Scene = null;
  private _canvas: HtmlCollection = null;

  setRenderer(renderer: THREE.Renderer, scenes: QueryList<SceneComponent>, cameras: QueryList<CameraComponent>, canvas2ds: QueryList<CanvasComponent>) {
    this._renderer = renderer;
    this._scenes = scenes;
    this._cameras = cameras;
    this._canvas2ds = canvas2ds;
    this.resetRenderer();
  }

  setScene(scene: THREE.Scene) {
    this._scene = scene;
    this.resetRenderer();
  }

  setCanvas(canvas: HtmlCollection) {
    this._canvas = canvas;
    this.resetRenderer();
  }

  resetRenderer() {
    if (this._needUpdate) {
      this.getController();
    }
    if (this._controller !== null && this._renderer !== null) {
      this._controller.setRenderer(this._renderer, this._scenes, this._cameras, this._canvas2ds);
      if (this._scene !== null) {
        this._controller.setScene(this._scene);
      }
      if (this._canvas !== null) {
        this._controller.setCanvas(this._canvas);
      }
    }
  }

  private _controllerItems: ControllerItemComponent[] = null;

  getController(): void {
    if ((this.parent !== null || this.refObject2d !== null) && this._needUpdate && ThreeUtil.isNotNull(this.controllerItemList)) {
      this.needUpdate = false;
      this._controllerItems = [];
      this._controller = null;
      let controller: any = null;
      if (typeof this.controller === 'string') {
        switch (this.controller.toLowerCase()) {
          case 'uniforms':
            controller = AutoUniformsController;
            break;
          default:
            controller = this.controller;
            break;
        }
      } else {
        controller = this.controller;
      }
      if (ThreeUtil.isNotNull(controller)) {
        if (typeof controller === 'string') {
          switch (controller.toLowerCase()) {
            case 'positionlookat':
            case 'position':
            case 'scale':
            case 'rotation':
            case 'lookat':
              const controllerItem = new ControllerItemComponent();
              controllerItem.ngOnInit();
              controllerItem.setControlParams({
                type: controller,
                curve: this.curve,
                scale: this.scale,
                scaleX: this.scaleX,
                scaleY: this.scaleY,
                scaleZ: this.scaleZ,
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
              });
              this._controllerItems.push(controllerItem.getController(this.parent));
              break;
          }
          if (ThreeUtil.isNotNull(this.controllerItemList) && this.controllerItemList.length > 0) {
            this.controllerItemList.forEach((controllerItem) => {
              this._controllerItems.push(controllerItem.getController(this.parent));
            });
          }
          if (this._controllerItems.length === 0) {
            this._controllerItems = null;
          }
          super.setObject(this._controllerItems);
        } else {
          this._controller = new controller(this.parent, this.refObject2d);
          this.resetRenderer();
          this._controller.setVariables(this.params);
          this._controller.awake();
          super.setObject(this._controller);
        }
      }
    }
  }

  private _logSeqn: number = 0;

  update(rendererTimer: RendererTimer) {
    if (this._controller !== null) {
      this._controller.update(rendererTimer);
    } else if (this.parent !== null && this._controllerItems !== null) {
      const events: string[] = [];
      this._controllerItems.forEach((item) => {
        item.update(rendererTimer, this.parent, events);
      });
      if (this.useEvent && events.length > 0) {
        if (this._logSeqn % this.eventSeqn === 0 && ThreeUtil.isNotNull(this.parent.userData.component) && ThreeUtil.isNotNull(this.parent.userData.component.setSubscribeNext)) {
          this.parent.userData.component.setSubscribeNext(events);
        }
        this._logSeqn++;
      }
    } else {
      this.consoleLogTime('controller', rendererTimer);
    }
  }
}
