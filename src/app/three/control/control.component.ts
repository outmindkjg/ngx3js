import { Component, ContentChildren, EventEmitter, Input, OnInit, Output, QueryList } from '@angular/core';
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
import { PlainControls } from './plain-controls';

@Component({
  selector: 'three-control',
  templateUrl: './control.component.html',
  styleUrls: ['./control.component.scss']
})
export class ControlComponent implements OnInit {

  @Input() type : string = "orbit";
  @Input() private autoRotate:boolean = false;
  @Input() private screenSpacePanning:boolean = null;
  @Input() private minDistance:number = null;
  @Input() private maxDistance:number = null;
  @Input() private xDistance:number = null;
  @Input() private yDistance:number = null;
  @Input() private minZoom:number = null;
  @Input() private maxZoom:number = null;
  @Input() private staticMoving:boolean = null;
  @Input() private rotateSpeed:number = null;
  @Input() private zoomSpeed:number = null;
  @Input() private panSpeed:number = null;
  @Input() private maxPolarAngle:number = null;
  @Input() private enableKeys:boolean = true;
  @Input() private enablePan:boolean = true;
  @Input() private enableDamping:boolean = false;
  @Input() private movementSpeed:number = null;
  @Input() private rollSpeed:number = null;
  @Input() private dragToLook:boolean = null;
  @Input() private autoForward:boolean = null;
  @Input() private lookSpeed:number = null;
  @Input() private lookVertical:boolean = null;
  @Input() private activeLook:boolean = null;
  @Input() private heightSpeed:boolean = null;
  @Input() private heightCoef:number = null;
  @Input() private heightMin:number = null;
  @Input() private heightMax:number = null;
  @Input() private constrainVertical:boolean = null;
  @Input() private verticalMin:number = null;
  @Input() private verticalMax:number = null;
  @Input() private mouseDragOn:boolean = null;
  @Input() private maxFar: number = null;
  @Input() private cascades: number = null;
  @Input() private mode: string = null;
  @Input() private scene: any = null;
  @Input() private shadowMapSize: number = null;
  @Input() private lightDirectionX: number = null;
  @Input() private lightDirectionY: number = null;
  @Input() private lightDirectionZ: number = null;
  @Input() private camera: any = null;

  @Output() private onLoad:EventEmitter<ControlComponent> = new EventEmitter<ControlComponent>();
  @Output() private eventListener:EventEmitter<{type : string, event : any}> = new EventEmitter<{ type : string, event : any}>();
	@ContentChildren(LookatComponent, { descendants: false }) private lookatList: QueryList<LookatComponent> = null;

  constructor() { }

  ngOnInit(): void {
  }

  setControlParams(params : { [key : string] : any } ) {
    Object.entries(params).forEach(([key, value]) => {
      if (this[key] !== undefined) {
        this[key] = value;
      }
    });
  }

  private _camera : THREE.Camera = null;
  private _scene : QueryList<SceneComponent> = null;
  private _domElement : HTMLElement = null;

  setCameraDomElement(camera : THREE.Camera, domElement : HTMLElement, scene : QueryList<SceneComponent>) {
    if (this._camera !== camera || this._domElement !== domElement || this._scene !== scene) {
      console.log('camera', this._camera !== camera);
      console.log('domElement', this._domElement !== domElement);
      console.log('scene', this._scene !== scene);
      
      this._camera = camera;
      this._domElement = domElement;
      this._scene = scene;
      switch(this.type.toLowerCase()) {
        case 'csm' :
          break;
        default :
          this.needUpdate = true;
          break;
      }
      this.getControl();
    }
  }

  private control : any = null;
  private needUpdate : boolean = true;

  getControl() {
    if (this.control === null || this.needUpdate) {
      const camera = this._camera;
      const domElement = this._domElement;
      this.needUpdate = false;
      if (this.control !== null) {
        if (this.control instanceof TransformControls && this.control.parent)  {
          this.control.parent.remove(this.control);
        }
      }
      this.control = null;
      let control : any = null;
      switch(this.type.toLowerCase()) {
        case "fly":
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
        case "firstperson":
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
        case "transform":
          const transformControls =  new TransformControls(camera, domElement);
          transformControls.addEventListener( 'dragging-changed', ( event ) => {
            this.eventListener.emit({ type : 'dragging-changed', event : event })
          });
          transformControls.addEventListener( 'objectChange', ( event ) => {
            this.eventListener.emit({ type : 'objectChange', event : event })
          });
          control = transformControls;
          if (this._scene !== null && this._scene.length > 0) {
            setTimeout(() => {
              this._scene.first.getScene().add(control);
            }, 100);
          }
          break;
        case "trackball":
          const trackballControls = new TrackballControls(camera, domElement);
          if (ThreeUtil.isNotNull(this.staticMoving)) {
            trackballControls.staticMoving = this.staticMoving;
          }
          control = trackballControls;
          break;
        case "csm" :
          let csmScene = ThreeUtil.getTypeSafe(this.scene, {});
          if (ThreeUtil.isNotNull(csmScene.getSceneDumpy)) {
            csmScene = csmScene.getSceneDumpy();
          }
          if (!(csmScene instanceof THREE.Scene)) {
            console.error('error Scene');
            csmScene = new THREE.Scene();
          }
          let csmCamera = ThreeUtil.getTypeSafe(this.camera, this._camera, {});
          if (ThreeUtil.isNotNull(csmCamera.getCamera)) {
            csmCamera = csmCamera.getCamera();
          }
          if (!(csmCamera instanceof THREE.Camera)) {
            console.error('error Camera');
            csmCamera = new THREE.Camera();
          }
          const csm = new CSM({
            maxFar: ThreeUtil.getTypeSafe(this.maxFar, 100000),
            cascades: ThreeUtil.getTypeSafe(this.cascades, 3),
            mode: ThreeUtil.getTypeSafe(this.mode, 'practical'),
            parent: csmScene,
            shadowMapSize: ThreeUtil.getTypeSafe(this.shadowMapSize, 2048),
            lightDirection: ThreeUtil.getVector3Safe(this.lightDirectionX, this.lightDirectionY, this.lightDirectionZ, new THREE.Vector3(1,1,1)).normalize(),
            camera: csmCamera
          });
          control = csm;
          break;
        case "plain" :
          const mouseMoveControls = new PlainControls(camera, domElement);
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
        case "orbit":
        default :
          const orbitControls = new OrbitControls(camera, domElement);
          orbitControls.autoRotate = this.autoRotate;
          orbitControls.enableDamping = this.enableDamping;
          orbitControls.enablePan = this.enablePan;
          orbitControls.enableKeys = this.enableKeys;
          if (ThreeUtil.isNotNull(this.screenSpacePanning)) {
            orbitControls.screenSpacePanning = this.screenSpacePanning;
          }
          if (ThreeUtil.isNotNull(this.minDistance)) {
            orbitControls.minDistance = this.minDistance;
          }
          if (ThreeUtil.isNotNull(this.maxDistance)) {
            orbitControls.maxDistance = this.maxDistance;
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
          if (ThreeUtil.isNotNull(this.maxPolarAngle)) {
            orbitControls.maxPolarAngle = ThreeUtil.getAngleSafe(this.maxPolarAngle, 180);
          }
          orbitControls.addEventListener('change', () => {
            camera.dispatchEvent({type : 'change'});
          })
          control = orbitControls;
          break;
      }
      this.control = control;
      if (this.control !== null && this.lookatList !== null && this.lookatList !== undefined) {
        this.lookatList.forEach(lookat => {
          lookat.setParent(this.control);
        })
      }
      this.onLoad.emit(this);
    }
    return this.control;
  }

  render(renderTimer : RendererTimer) {
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
      } else if (this.control instanceof PlainControls) {
        this.control.update(renderTimer.delta);
      }
    }
  }
}
