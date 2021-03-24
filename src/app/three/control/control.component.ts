import { Component, ContentChildren, EventEmitter, Input, OnInit, Output, QueryList } from '@angular/core';
import { RendererTimer, ThreeUtil } from '../interface';
import { FirstPersonControls } from 'three/examples/jsm/controls/FirstPersonControls';
import { FlyControls } from 'three/examples/jsm/controls/FlyControls';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { TrackballControls } from 'three/examples/jsm/controls/TrackballControls';
import { TransformControls } from 'three/examples/jsm/controls/TransformControls';
import { LookatComponent } from '../lookat/lookat.component';

@Component({
  selector: 'three-control',
  templateUrl: './control.component.html',
  styleUrls: ['./control.component.scss']
})
export class ControlComponent implements OnInit {

  @Input() type : string = "orbit";
  @Input() private autoRotate:boolean = false;
  @Input() private minDistance:number = null;
  @Input() private maxDistance:number = null;
  @Input() private maxPolarAngle:number = null;
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

  camera : THREE.Camera = null;
  scene : THREE.Scene = null;
  domElement : HTMLElement = null;

  setCameraDomElement(camera : THREE.Camera, domElement : HTMLElement, scene : THREE.Scene) {
    if (this.camera !== camera || this.domElement !== domElement || this.scene !== scene) {
      this.camera = camera;
      this.domElement = domElement;
      this.scene = scene;
      this.needUpdate = true;
      this.getControl();
    }
  }

  private control : any = null;
  private needUpdate : boolean = true;
  getControl() {
    if (this.control === null || this.needUpdate) {
      const camera = this.camera;
      const domElement = this.domElement;
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
          if (this.scene !== null) {
            this.scene.add(control);
          }
          break;
        case "trackball":
          const trackballControls = new TrackballControls(camera, domElement);
          control = trackballControls;
          break;
        case "orbit":
        default :
          const orbitControls = new OrbitControls(camera, domElement);
          orbitControls.autoRotate = this.autoRotate;
          orbitControls.enableDamping = this.enableDamping;
          orbitControls.enablePan = this.enablePan;
          if (ThreeUtil.isNotNull(this.minDistance)) {
            orbitControls.minDistance = this.minDistance;
          }
          if (ThreeUtil.isNotNull(this.maxDistance)) {
            orbitControls.maxDistance = this.maxDistance;
          }
          if (ThreeUtil.isNotNull(this.maxPolarAngle)) {
            orbitControls.maxPolarAngle = ThreeUtil.getAngleSafe(this.maxPolarAngle, 180);
          }
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
      } else if (this.control instanceof FlyControls) {
        this.control.update(renderTimer.delta);
      } else if (this.control instanceof FirstPersonControls) {
        this.control.update(renderTimer.delta);
      } else if (this.control instanceof TrackballControls) {
        this.control.update();
      }
    }
  }
}
