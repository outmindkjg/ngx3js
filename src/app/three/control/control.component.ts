import { AfterContentInit, Component, ContentChildren, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, QueryList, SimpleChanges } from '@angular/core';
import * as THREE from 'three';
import { FirstPersonControls } from 'three/examples/jsm/controls/FirstPersonControls';
import { FlyControls } from 'three/examples/jsm/controls/FlyControls';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { TrackballControls } from 'three/examples/jsm/controls/TrackballControls';
import { TransformControls } from 'three/examples/jsm/controls/TransformControls';
import { CSM } from 'three/examples/jsm/csm/CSM';
import { RendererTimer, ThreeUtil } from '../interface';
import { LookatComponent } from '../lookat/lookat.component';
import { SceneComponent } from '../scene/scene.component';
import { AbstractSubscribeComponent } from '../subscribe.abstract';
import { PlaneControls } from './plane-controls';

/**
 * ControlComponent
 */
@Component({
  selector: 'ngx3js-control',
  templateUrl: './control.component.html',
  styleUrls: ['./control.component.scss'],
})
export class ControlComponent extends AbstractSubscribeComponent implements OnInit, OnDestroy, OnChanges, AfterContentInit {
  /**
   * Input  of control component
   */
  @Input() type: string = 'orbit';

  /**
   * Input  of control component
   */
  @Input() private autoRotate: boolean = null;

  /**
   * Input  of control component
   */
  @Input() private autoRotateSpeed: number = null;

  /**
   * Input  of control component
   */
  @Input() private screenSpacePanning: boolean = null;

  /**
   * Input  of control component
   */
  @Input() private minDistance: number = null;

  /**
   * Input  of control component
   */
  @Input() private maxDistance: number = null;

  /**
   * Input  of control component
   */
  @Input() private xDistance: number = null;

  /**
   * Input  of control component
   */
  @Input() private yDistance: number = null;

  /**
   * Input  of control component
   */
  @Input() private enableZoom: boolean = null;

  /**
   * Input  of control component
   */
  @Input() private minZoom: number = null;

  /**
   * Input  of control component
   */
  @Input() private maxZoom: number = null;

  /**
   * Input  of control component
   */
  @Input() private staticMoving: boolean = null;

  /**
   * Input  of control component
   */
  @Input() private rotateSpeed: number = null;

  /**
   * Input  of control component
   */
  @Input() private zoomSpeed: number = null;

  /**
   * Input  of control component
   */
  @Input() private panSpeed: number = null;

  /**
   * Input  of control component
   */
  @Input() private minPolarAngle: number = null;

  /**
   * Input  of control component
   */
  @Input() private maxPolarAngle: number = null;

  /**
   * Input  of control component
   */
  @Input() private enableKeys: boolean = null;

  /**
   * Input  of control component
   */
  @Input() private enablePan: boolean = null;

  /**
   * Input  of control component
   */
  @Input() private enableDamping: boolean = null;

  /**
   * Input  of control component
   */
  @Input() private movementSpeed: number = null;

  /**
   * Input  of control component
   */
  @Input() private rollSpeed: number = null;

  /**
   * Input  of control component
   */
  @Input() private dragToLook: boolean = null;

  /**
   * Input  of control component
   */
  @Input() private autoForward: boolean = null;

  /**
   * Input  of control component
   */
  @Input() private lookSpeed: number = null;

  /**
   * Input  of control component
   */
  @Input() private lookVertical: boolean = null;

  /**
   * Input  of control component
   */
  @Input() private activeLook: boolean = null;

  /**
   * Input  of control component
   */
  @Input() private heightSpeed: boolean = null;

  /**
   * Input  of control component
   */
  @Input() private heightCoef: number = null;

  /**
   * Input  of control component
   */
  @Input() private heightMin: number = null;

  /**
   * Input  of control component
   */
  @Input() private heightMax: number = null;

  /**
   * Input  of control component
   */
  @Input() private constrainVertical: boolean = null;

  /**
   * Input  of control component
   */
  @Input() private verticalMin: number = null;

  /**
   * Input  of control component
   */
  @Input() private verticalMax: number = null;

  /**
   * Input  of control component
   */
  @Input() private mouseDragOn: boolean = null;

  /**
   * Input  of control component
   */
  @Input() private maxFar: number = null;

  /**
   * Input  of control component
   */
  @Input() private cascades: number = null;

  /**
   * Input  of control component
   *
   * Notice - case insensitive.
   * 
   */
  @Input() private mode: string = null;

  /**
   * Input  of control component
   */
  @Input() private scene: any = null;

  /**
   * Input  of control component
   */
  @Input() private shadowMapSize: number = null;

  /**
   * Input  of control component
   */
  @Input() private lightDirectionX: number = null;

  /**
   * Input  of control component
   */
  @Input() private lightDirectionY: number = null;

  /**
   * Input  of control component
   */
  @Input() private lightDirectionZ: number = null;

  /**
   * Input  of control component
   */
  @Input() private target: THREE.Vector3 | LookatComponent | any = null;

  /**
   * Input  of control component
   */
  @Input() private camera: any = null;

  /**
   * Output  of control component
   */
  @Output() private eventListener: EventEmitter<{ type: string; event: any }> = new EventEmitter<{ type: string; event: any }>();

  /**
   * Content children of control component
   */
  /**
   * Content children of control component
   */
  @ContentChildren(LookatComponent, { descendants: false }) private lookatList: QueryList<LookatComponent> = null;

  /**
   * Creates an instance of control component.
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
    super.ngOnInit('control');
  }

  /**
   * A callback method that performs custom clean-up, invoked immediately
   * before a directive, pipe, or service instance is destroyed.
   */
  ngOnDestroy(): void {
    if (this.control !== null && ThreeUtil.isNotNull(this.control.dispose)) {
      this.control.dispose();
    }
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
    if (changes && this.control) {
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
    this.subscribeListQueryChange(this.lookatList, 'lookatList', 'lookat');
    super.ngAfterContentInit();
  }

  /**
   * Applys changes
   * @param changes
   * @returns
   */
  protected applyChanges(changes: string[]) {
    if (this.control !== null) {
      if (ThreeUtil.isIndexOf(changes, 'clearinit')) {
        this.getControl();
        return;
      }
      if (!ThreeUtil.isOnlyIndexOf(changes, ['target', 'lookat'], this.OBJECT_ATTR)) {
        this.needUpdate = true;
        return;
      }
      if (ThreeUtil.isIndexOf(changes, 'init')) {
        changes = ThreeUtil.pushUniq(changes, ['target']);
      }
      if (ThreeUtil.isIndexOf(changes, 'lookat')) {
        changes = ThreeUtil.pushUniq(changes, ['target']);
      }
      changes.forEach((change) => {
        switch (change.toLowerCase()) {
          case 'target':
            this.unSubscribeRefer('target');
            if (ThreeUtil.isNotNull(this.control['target'])) {
              if (ThreeUtil.isNotNull(this.target)) {
                this.control['target'] = ThreeUtil.getLookAt(this.target);
                this.subscribeRefer(
                  'target',
                  ThreeUtil.getSubscribe(
                    this.target,
                    (event) => {
                      this.addChanges(event);
                    },
                    'lookat'
                  )
                );
              } else {
                this.unSubscribeReferList('lookatList');
                if (ThreeUtil.isNotNull(this.lookatList)) {
                  if (this.lookatList.length > 0) {
                    this.control['target'] = this.lookatList.first.getLookAt();
                  }
                  this.subscribeListQuery(this.lookatList, 'lookatList', 'lookat');
                }
              }
            }
            break;
        }
      });
    }
  }

  /**
   * Camera  of control component
   */
  private _camera: THREE.Camera = null;

  /**
   * Scene  of control component
   */
  private _scene: QueryList<SceneComponent> = null;

  /**
   * Dom element of control component
   */
  private _domElement: HTMLElement = null;

  /**
   * Sets camera dom element
   * @param camera
   * @param domElement
   * @param scenes
   */
  public setCameraDomElement(camera: THREE.Camera, domElement: HTMLElement, scenes: QueryList<SceneComponent>) {
    if (this._camera !== camera || this._domElement !== domElement || this._scene !== scenes) {
      if (this.control !== null && ThreeUtil.isNotNull(this.control.dispose)) {
        this.control.dispose();
      }
      this._camera = camera;
      this._domElement = domElement;
      this._scene = scenes;
      switch (this.type.toLowerCase()) {
        case 'csm':
          break;
        default:
          this.control = null;
          this.getControl();
          break;
      }
    }
  }

  /**
   * Control  of control component
   */
  private control: any = null;

  /**
   * Gets control
   * @returns control
   */
  public getControl(): any {
    if (this.control === null || this._needUpdate) {
      this.needUpdate = false;
      const camera = this._camera;
      const domElement = this._domElement;
      if (this.control !== null) {
        if (this.control instanceof TransformControls && this.control.parent) {
          this.control.parent.remove(this.control);
        }
      }
      this.control = null;
      let control: any = null;
      switch (this.type.toLowerCase()) {
        case 'fly':
          const flyControls = new FlyControls(camera, domElement);
          if (ThreeUtil.isNotNull(this.movementSpeed)) {
            flyControls.movementSpeed = this.movementSpeed;
          }
          if (ThreeUtil.isNotNull(this.rollSpeed)) {
            flyControls.rollSpeed = ThreeUtil.getAngleSafe(this.rollSpeed, 0);
          }
          if (ThreeUtil.isNotNull(this.dragToLook)) {
            flyControls.dragToLook = this.dragToLook;
          }
          if (ThreeUtil.isNotNull(this.autoForward)) {
            flyControls.autoForward = this.autoForward;
          }
          control = flyControls;
          break;
        case 'firstperson':
          const firstPersonControls = new FirstPersonControls(camera, domElement);
          if (ThreeUtil.isNotNull(this.movementSpeed)) {
            firstPersonControls.movementSpeed = this.movementSpeed;
          }
          if (ThreeUtil.isNotNull(this.lookSpeed)) {
            firstPersonControls.lookSpeed = this.lookSpeed;
          }
          if (ThreeUtil.isNotNull(this.lookVertical)) {
            firstPersonControls.lookVertical = this.lookVertical;
          }
          if (ThreeUtil.isNotNull(this.autoForward)) {
            firstPersonControls.autoForward = this.autoForward;
          }
          if (ThreeUtil.isNotNull(this.activeLook)) {
            firstPersonControls.activeLook = this.activeLook;
          }
          if (ThreeUtil.isNotNull(this.heightSpeed)) {
            firstPersonControls.heightSpeed = this.heightSpeed;
          }
          if (ThreeUtil.isNotNull(this.heightCoef)) {
            firstPersonControls.heightCoef = this.heightCoef;
          }
          if (ThreeUtil.isNotNull(this.heightMin)) {
            firstPersonControls.heightMin = this.heightMin;
          }
          if (ThreeUtil.isNotNull(this.heightMax)) {
            firstPersonControls.heightMax = this.heightMax;
          }
          if (ThreeUtil.isNotNull(this.constrainVertical)) {
            firstPersonControls.constrainVertical = this.constrainVertical;
          }
          if (ThreeUtil.isNotNull(this.verticalMin)) {
            firstPersonControls.verticalMin = this.verticalMin;
          }
          if (ThreeUtil.isNotNull(this.verticalMax)) {
            firstPersonControls.verticalMax = this.verticalMax;
          }
          if (ThreeUtil.isNotNull(this.mouseDragOn)) {
            firstPersonControls.mouseDragOn = this.mouseDragOn;
          }
          control = firstPersonControls;
          break;
        case 'transform':
          const transformControls = new TransformControls(camera, domElement);
          transformControls.addEventListener('dragging-changed', (event) => {
            this.eventListener.emit({ type: 'dragging-changed', event: event });
          });
          transformControls.addEventListener('objectChange', (event) => {
            this.eventListener.emit({ type: 'objectChange', event: event });
          });
          control = transformControls;
          if (this._scene !== null && this._scene.length > 0) {
            window.setTimeout(() => {
              this._scene.first.getScene().add(control);
            }, 100);
          }
          break;
        case 'trackball':
          const trackballControls = new TrackballControls(camera, domElement);
          if (ThreeUtil.isNotNull(this.staticMoving)) {
            trackballControls.staticMoving = this.staticMoving;
          }
          control = trackballControls;
          break;
        case 'csm':
          let csmScene = ThreeUtil.getTypeSafe(this.scene, {});
          if (ThreeUtil.isNotNull(csmScene.getSceneDumpy)) {
            csmScene = csmScene.getSceneDumpy();
          }
          if (!(csmScene instanceof THREE.Scene)) {
            this.consoleLog('error Scene', csmScene, 'error');
            csmScene = new THREE.Scene();
          }
          let csmCamera = ThreeUtil.getTypeSafe(this.camera, this._camera, {});
          if (ThreeUtil.isNotNull(csmCamera.getCamera)) {
            csmCamera = csmCamera.getObject3d();
          }
          if (!(csmCamera instanceof THREE.Camera)) {
            this.consoleLog('error Camera', csmCamera, 'error');
            csmCamera = new THREE.Camera();
          }
          const csm = new CSM({
            maxFar: ThreeUtil.getTypeSafe(this.maxFar, 100000),
            cascades: ThreeUtil.getTypeSafe(this.cascades, 3),
            mode: ThreeUtil.getTypeSafe(this.mode, 'practical'),
            parent: csmScene,
            shadowMapSize: ThreeUtil.getTypeSafe(this.shadowMapSize, 2048),
            lightDirection: ThreeUtil.getVector3Safe(this.lightDirectionX, this.lightDirectionY, this.lightDirectionZ, new THREE.Vector3(1, 1, 1)).normalize(),
            camera: csmCamera,
          });
          control = csm;
          break;
        case 'plane':
          const mouseMoveControls = new PlaneControls(camera, domElement);
          if (ThreeUtil.isNotNull(this.rotateSpeed)) {
            mouseMoveControls.rotateSpeed = this.rotateSpeed;
          }
          if (ThreeUtil.isNotNull(this.zoomSpeed)) {
            mouseMoveControls.zoomSpeed = this.zoomSpeed;
          }
          if (ThreeUtil.isNotNull(this.panSpeed)) {
            mouseMoveControls.panSpeed = this.panSpeed;
          }
          if (ThreeUtil.isNotNull(this.xDistance)) {
            mouseMoveControls.xDistance = this.xDistance;
          }
          if (ThreeUtil.isNotNull(this.yDistance)) {
            mouseMoveControls.yDistance = this.yDistance;
          }
          control = mouseMoveControls;
          break;
        case 'orbit':
        default:
          const orbitControls = new OrbitControls(camera, domElement);
          if (ThreeUtil.isNotNull(this.autoRotate)) {
            orbitControls.autoRotate = this.autoRotate;
          }
          if (ThreeUtil.isNotNull(this.autoRotateSpeed)) {
            orbitControls.autoRotateSpeed = this.autoRotateSpeed;
          }
          if (ThreeUtil.isNotNull(this.enableDamping)) {
            orbitControls.enableDamping = this.enableDamping;
          }
          if (ThreeUtil.isNotNull(this.enablePan)) {
            orbitControls.enablePan = this.enablePan;
          }
          if (ThreeUtil.isNotNull(this.enableKeys)) {
            orbitControls.enableKeys = this.enableKeys;
          }
          if (ThreeUtil.isNotNull(this.screenSpacePanning)) {
            orbitControls.screenSpacePanning = this.screenSpacePanning;
          }
          if (ThreeUtil.isNotNull(this.minDistance)) {
            orbitControls.minDistance = this.minDistance;
          }
          if (ThreeUtil.isNotNull(this.maxDistance)) {
            orbitControls.maxDistance = this.maxDistance;
          }
          if (ThreeUtil.isNotNull(this.enableZoom)) {
            orbitControls.enableZoom = this.enableZoom;
          }
          if (ThreeUtil.isNotNull(this.minZoom)) {
            orbitControls.minZoom = this.minZoom;
          }
          if (ThreeUtil.isNotNull(this.maxZoom)) {
            orbitControls.maxZoom = this.maxZoom;
          }
          if (ThreeUtil.isNotNull(this.rotateSpeed)) {
            orbitControls.rotateSpeed = this.rotateSpeed;
          }
          if (ThreeUtil.isNotNull(this.zoomSpeed)) {
            orbitControls.zoomSpeed = this.zoomSpeed;
          }
          if (ThreeUtil.isNotNull(this.panSpeed)) {
            orbitControls.panSpeed = this.panSpeed;
          }
          if (ThreeUtil.isNotNull(this.minPolarAngle)) {
            orbitControls.minPolarAngle = ThreeUtil.getAngleSafe(this.minPolarAngle, 180);
          }
          if (ThreeUtil.isNotNull(this.maxPolarAngle)) {
            orbitControls.maxPolarAngle = ThreeUtil.getAngleSafe(this.maxPolarAngle, 180);
          }
          orbitControls.addEventListener('change', () => {
            camera.dispatchEvent({ type: 'change' });
          });
          control = orbitControls;
          break;
      }
      this.control = control;
      super.setObject(this.control);
    }
    return this.control;
  }

  /**
   * Renders control component
   * @param renderTimer
   */
  public render(renderTimer: RendererTimer) {
    if (this.control !== null) {
      if (this.control instanceof OrbitControls) {
        this.control.update();
      } else if (this.control instanceof CSM) {
        this.control.update();
      } else if (this.control instanceof FlyControls) {
        this.control.update(renderTimer.delta);
      } else if (this.control instanceof FirstPersonControls) {
        this.control.update(renderTimer.delta);
      } else if (this.control instanceof TrackballControls) {
        this.control.update();
      } else if (this.control instanceof PlaneControls) {
        this.control.update(renderTimer.delta);
      }
    }
  }
}
