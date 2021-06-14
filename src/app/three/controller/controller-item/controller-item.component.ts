import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import * as THREE from 'three';
import { CurveUtils, CurvesNormal } from '../../curve/curveUtils';
import { RendererTimer, ThreeUtil } from '../../interface';
import { AbstractSubscribeComponent } from '../../subscribe.abstract';

export interface ControlObjectItem {
  object3d?: THREE.Object3D;
  component?: any;
  position?: THREE.Vector3;
  rotation?: THREE.Euler;
  scale?: THREE.Vector3;
  material?: THREE.Material;
  uniforms?: { [uniform: string]: THREE.IUniform };
  geometry?: THREE.BufferGeometry;
  attributes?: {[name: string]: THREE.BufferAttribute | THREE.InterleavedBufferAttribute};
  morphAttributes?: {
		[name: string]: ( THREE.BufferAttribute | THREE.InterleavedBufferAttribute )[];
	};
}

const aaa = new THREE.BufferGeometry();
aaa.attributes
@Component({
  selector: 'three-controller-item',
  templateUrl: './controller-item.component.html',
  styleUrls: ['./controller-item.component.scss'],
})
export class ControllerItemComponent extends AbstractSubscribeComponent implements OnInit {
  @Input() public type: string = 'position';
  @Input() private lookathead: number = null;
  @Input() private curve: string = null;
  @Input() private scale: number = null;
  @Input() private radius: number = null;
  @Input() private radiusInner: number = null;
  @Input() private radiusX: number = null;
  @Input() private radiusY: number = null;
  @Input() private radiusZ: number = null;
  @Input() private rotation: number = null;
  @Input() private rotationX: number = null;
  @Input() private rotationY: number = null;
  @Input() private rotationZ: number = null;
  @Input() private center: number = null;
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
  @Input() private tubularSegments: number = null;
  @Input() private tubeRadius: number = null;
  @Input() private tubeRadiusSegments: number = null;
  @Input() private closed: boolean = null;
  @Input() private material: string = null;
  @Input() private uniform: string = null;
  @Input() private wave: number = 0;
  @Input() private waveR: number = 0;
  @Input() private waveH: number = 0;
  @Input() private rate: number = 1;
  @Input() private rateX: number = null;
  @Input() private rateY: number = null;
  @Input() private rateZ: number = null;
  @Input() private valueType: string = 'auto';
  @Input() private refValue: any = null;
  @Input() private minValue: number = 0;
  @Input() private maxValue: number = 1;
  @Input() private colorType: string = 'rgb';
  @Input() private refRate: any = null;

  private getCurve(curve: string): THREE.Curve<THREE.Vector3> {
    return CurveUtils.getCurve(curve, 1, {
      radiusInner: ThreeUtil.getTypeSafe(this.radiusInner, 0),
      waveH: ThreeUtil.getTypeSafe(this.waveH, this.wave, 0),
      waveR: ThreeUtil.getTypeSafe(this.waveR, this.wave, 0),
      rateX: ThreeUtil.getTypeSafe(this.rateX, this.rate, 1),
      rateY: ThreeUtil.getTypeSafe(this.rateY, this.rate, 1),
      rateZ: ThreeUtil.getTypeSafe(this.rateZ, this.rate, 1),
    });
  }

  constructor() {
    super();
  }

  ngOnInit(): void {
    super.ngOnInit('controllerItem');
  }

  ngOnDestroy(): void {
    super.ngOnDestroy();
  }

  ngOnChanges(changes: SimpleChanges): void {
    super.ngOnChanges(changes);
    if (changes && this._curve) {
      this.addChanges(changes);
    }
  }

  ngAfterContentInit(): void {
    super.ngAfterContentInit();
  }

  private _helper: THREE.Object3D = null;
  private _helperPoint: THREE.Object3D = null;
  private _curve: CurvesNormal = null;
  private _lookat: boolean = false;
  private _duration: number = 60;
  private _delta: number = 60;
  private _parent: THREE.Object3D;
  private _lookathead: number = 0.05;

  applyChanges(changes: string[]) {
    if (this._curve !== null && this._parent !== null) {
      if (ThreeUtil.isIndexOf(changes, 'clearinit')) {
        this.getController(this._controlItem, this._parent);
        return;
      }
      if (!ThreeUtil.isOnlyIndexOf(changes, ['init', 'type', 'enabled'])) {
        this.needUpdate = true;
        return;
      }
      super.applyChanges(changes);
    }
  }

  getObject() {
    return this.getController(this._controlItem, this._parent);
  }

  private _controlItem : ControlObjectItem = {};
  private _rateCallBack : (timer? : RendererTimer) => number = null;

  getController(controlItem : ControlObjectItem, parent: THREE.Object3D): this {
    if (this._curve === null || this._needUpdate) {
      this._needUpdate = false;
      this._lookat = false;
      if (this._helper !== null && this._helper.parent === null) {
        this._helper.parent.remove(this._helper);
      }
      if (this._helperPoint !== null && this._helperPoint.parent === null) {
        this._helperPoint.parent.remove(this._helperPoint);
      }
      this._helper = null;
      this._helperPoint = null;
      this._rateCallBack = null;
      if (ThreeUtil.isNotNull(this.refRate)) {
        if (typeof this.refRate === 'function') {
          this._rateCallBack = this.refRate;
        } else if (ThreeUtil.isNotNull(this.refRate.getNumber)) {
          this._rateCallBack = this.refRate.getNumber();
        }
      } 
      const curve = this.getCurve(ThreeUtil.getTypeSafe(this.curve, 'line'));
      let scale: THREE.Vector3 = ThreeUtil.getVector3Safe(ThreeUtil.getTypeSafe(this.radiusX, this.radius, 1), ThreeUtil.getTypeSafe(this.radiusY, this.radius, 1), ThreeUtil.getTypeSafe(this.radiusZ, this.radius, 1));
      let rotation: THREE.Euler = ThreeUtil.getEulerSafe(ThreeUtil.getTypeSafe(this.rotationX, this.rotation, 0), ThreeUtil.getTypeSafe(this.rotationY, this.rotation, 0), ThreeUtil.getTypeSafe(this.rotationZ, this.rotation, 0));
      let center: THREE.Vector3 = ThreeUtil.getVector3Safe(ThreeUtil.getTypeSafe(this.centerX, this.center, 0), ThreeUtil.getTypeSafe(this.centerY, this.center, 0), ThreeUtil.getTypeSafe(this.centerZ, this.center, 0));
      this._lookathead = Math.min(1, Math.max(0.001, ThreeUtil.getTypeSafe(this.lookathead, 0.05)));
      this._curve = new CurvesNormal(curve, {
        scale: scale,
        rotation: rotation,
        center: center,
        multiply: ThreeUtil.getTypeSafe(this.multiply, 1),
        options: this.options,
      });
      this._duration = ThreeUtil.getTypeSafe(this.duration, 60);
      this._delta = ThreeUtil.getTypeSafe(this.delta, 0);
      switch (this.type.toLowerCase()) {
        case 'position':
          this._curve.referCenter = parent.position;
          this._lookat = false;
          break;
        case 'positionlookat':
          this._curve.referCenter = parent.position;
          this._lookat = true;
          break;
      }
      if (this.visible) {
        this._helper = new THREE.Mesh(
          new THREE.TubeGeometry(this._curve, ThreeUtil.getTypeSafe(this.tubularSegments, 64), ThreeUtil.getTypeSafe(this.tubeRadius, 0.01), ThreeUtil.getTypeSafe(this.tubeRadiusSegments, 8), ThreeUtil.getTypeSafe(this.closed, false)),
          new THREE.MeshBasicMaterial({
            color: ThreeUtil.getColorSafe(this.color, 0xff0000),
            opacity: ThreeUtil.getTypeSafe(this.opacity, 0.2),
            depthTest: true,
            transparent: true,
            side: THREE.DoubleSide,
          })
        );
        this._helperPoint = new THREE.Mesh(
          new THREE.SphereGeometry(ThreeUtil.getTypeSafe(this.tubeRadius, 0.01) * 10, ThreeUtil.getTypeSafe(this.tubeRadiusSegments, 8), ThreeUtil.getTypeSafe(this.tubeRadiusSegments, 4)),
          new THREE.MeshBasicMaterial({
            color: ThreeUtil.getColorSafe(this.color, 0x0000ff),
            opacity: ThreeUtil.getTypeSafe(this.opacity, 0.7),
            depthTest: true,
            transparent: true,
            side: THREE.DoubleSide,
          })
        );
        this._helperPoint.visible = false;
        switch (this.type.toLowerCase()) {
          case 'position':
            this._helper.scale.set(1, 1, 1);
            this._helperPoint.visible = false;
          case 'positionlookat':
            this._helper.scale.set(1, 1, 1);
            this._helperPoint.visible = true;
            break;
          default:
            this._helper.scale.set(1, 1, 1).multiplyScalar(ThreeUtil.getTypeSafe(this.scale, 1));
            this._helperPoint.scale.set(1, 1, 1).multiplyScalar(ThreeUtil.getTypeSafe(this.scale, 1));
            this._helperPoint.visible = true;
            break;
        }
      }
      this.setObject(this._curve);
    }
    if (this._parent !== parent && parent !== null) {
      this._parent = parent;
      this._controlItem = controlItem;
      if (this._parent !== null) {
        if (this._helper !== null) {
          if (this._helper.parent !== this._parent.children[0]) {
            this._parent.children[0].add(this._helper);
          }
        }
        if (this._helperPoint !== null) {
          if (this._helperPoint.parent !== this._parent) {
            this._parent.add(this._helperPoint);
          }
        }
      }
    }

    return this;
  }

  private _lastLookAt: THREE.Vector3 = null;

  updateHelperPoint(itemTimer: RendererTimer, scale: number = null) {
    if (this._helperPoint !== null) {
      this._curve.getPointV3(itemTimer, this._helperPoint.position);
      switch (this.type.toLowerCase()) {
        case 'positionlookat':
        case 'position':
          break;
        default:
          this._helperPoint.position.multiplyScalar(ThreeUtil.getTypeSafe(this.scale, 1));
          if (scale !== null) {
            this._helperPoint.scale.set(scale, scale, scale);
          }
          break;
      }
    }
  }

  private updateColor(targetColor : THREE.Color, srcColor : THREE.Color) {
    switch(this.colorType) {
      case 'rate' :
        if (this._rateCallBack !== null) {
          targetColor.b = this._rateCallBack();
        }
        break;
      case 'rgb' :
        targetColor.setRGB(srcColor.r,srcColor.g,srcColor.b);
        break;
      case 'gray' :
        const avgColor = (srcColor.r + srcColor.g + srcColor.b) / 3;
        targetColor.setRGB(avgColor,avgColor,avgColor);
        break;
        default :
        if (this.colorType.indexOf('r') > -1) {
          targetColor.r = srcColor.r;
        }
        if (this.colorType.indexOf('g') > -1) {
          targetColor.g = srcColor.g;
        }
        if (this.colorType.indexOf('b') > -1) {
          targetColor.b = srcColor.b;
        }
        break;
    }
  }

  private _tmpColor : THREE.Color = new THREE.Color();
  private _tmpV3 : THREE.Vector3 = new THREE.Vector3();

  update(timer: RendererTimer, events: string[]): boolean {
    if (this._curve !== null && this._controlItem.object3d !== null) {
      const itemTimer: RendererTimer = {
        elapsedTime: timer.elapsedTime / this._duration + this._delta,
        delta: timer.delta,
      };
      switch (this.type.toLowerCase()) {
        case 'positionlookat':
        case 'position':
          if (events.indexOf('position') === -1 && this._controlItem.position !== null) {
            this._curve.getPointV3(itemTimer, this._controlItem.position);
            events.push('position');
            if (this._lookat) {
              itemTimer.elapsedTime += this._lookathead;
              itemTimer.delta += this._lookathead;
              if (this._lastLookAt === null) {
                this._lastLookAt = this._curve.getPointV3(itemTimer, new THREE.Vector3());
              } else {
                this._curve.getPointV3(itemTimer, this._lastLookAt);
                this._controlItem.object3d.lookAt(this._lastLookAt);
              }
              this.updateHelperPoint(itemTimer);
              events.push('lookat');
            }
            return true;
          } else {
            return false;
          }
        case 'scale':
          if (events.indexOf('scale') === -1 && this._controlItem.scale !== null) {
            this._curve.getPointV3(itemTimer, this._controlItem.scale);
            this.updateHelperPoint(itemTimer);
            events.push('scale');
            return true;
          } else {
            return false;
          }
        case 'rotation':
          if (events.indexOf('rotation') === -1 && this._controlItem.rotation !== null) {
            this._curve.getPointEuler(itemTimer, this._controlItem.rotation);
            this.updateHelperPoint(itemTimer);
            events.push('rotation');
            return true;
          } else {
            return false;
          }
        case 'lookat':
          if (events.indexOf('lookat') === -1) {
            if (this._lastLookAt === null) {
              this._lastLookAt = this._curve.getPointV3(itemTimer, new THREE.Vector3());
            } else {
              this._curve.getPointV3(itemTimer, this._lastLookAt);
              this._controlItem.object3d.lookAt(this._lastLookAt);
            }
            this.updateHelperPoint(itemTimer);
            events.push('lookat');
            return true;
          } else {
            return false;
          }
        case 'material':
          if (ThreeUtil.isNotNull(this.material) && this._controlItem.material !== null) {
            const material = this._controlItem.material;
            if (ThreeUtil.isNotNull(material) && ThreeUtil.isNotNull(material[this.material])) {
              let scale: number = 1;
              const oldValue = material[this.material];
              if (oldValue instanceof THREE.Color) {
                this._curve.getPointColor(itemTimer, this._tmpColor);
                this.updateColor(oldValue, this._tmpColor);
              } else if (oldValue instanceof THREE.Vector2) {
                this._curve.getPointV2(itemTimer, oldValue);
              } else if (oldValue instanceof THREE.Vector3) {
                this._curve.getPointV3(itemTimer, oldValue);
              } else if (typeof oldValue === 'number') {
                switch (this.material.toLowerCase()) {
                  case 'opacity':
                    material.opacity = this._curve.getPointFloat(itemTimer, 0, 1);
                    scale = material.opacity * 3;
                    break;
                  default:
                    material[this.material] = this._curve.getPointFloat(itemTimer, this.minValue, this.maxValue);
                    break;
                }
              }
              this.updateHelperPoint(itemTimer, scale);
            }
          }
          break;
        case 'uniform':
        case 'uniforms':
          if (ThreeUtil.isNotNull(this.uniform) && this._controlItem.uniforms !== null) {
            const uniforms = this._controlItem.uniforms;
            if (ThreeUtil.isNotNull(uniforms[this.uniform])) {
              const uniform: THREE.IUniform = uniforms[this.uniform];
              const oldValue = uniform.value;
              switch (this.valueType.toLowerCase()) {
                case 'copyposition':
                  if (oldValue instanceof THREE.Vector3 && ThreeUtil.isNotNull(this.refValue)) {
                    oldValue.copy(ThreeUtil.getPosition(this.refValue));
                  }
                  break;
                case 'int':
                case 'integer':
                  uniform.value = Math.round(this._curve.getPointFloat(itemTimer, this.minValue, this.maxValue));
                  break;
                case 'float':
                case 'double':
                case 'number':
                  uniform.value = this._curve.getPointFloat(itemTimer, this.minValue, this.maxValue);
                  break;
                default:
                  if (oldValue instanceof THREE.Color) {
                    this._curve.getPointColor(itemTimer, oldValue);
                  } else if (oldValue instanceof THREE.Vector2) {
                    this._curve.getPointV2(itemTimer, oldValue);
                  } else if (oldValue instanceof THREE.Vector3) {
                    this._curve.getPointV3(itemTimer, oldValue);
                  } else if (typeof oldValue === 'number') {
                    switch (this.uniform.toLowerCase()) {
                      default:
                        uniform.value = this._curve.getPointFloat(itemTimer, this.minValue, this.maxValue);
                        break;
                    }
                  }
                  break;
              }
            }
          }
          break;
        case 'update' :
        case 'autoupdate' :
          if (this._controlItem.component !== null) {
           if (ThreeUtil.isNotNull(this._controlItem.component.update)) {
            this._controlItem.component.update();
           }
          }
          break;
        case 'tween' :
          const tween = this._controlItem.object3d.userData.tween;
          // this.consoleLogTime('tween',tween);
          if (ThreeUtil.isNotNull(tween) && tween.elapsedTime < 1) {
            // tween.elapsedTime = this._curve.getPointFloat({elapsedTime : tween.elapsedTime + timer.delta / 300, delta : timer.delta / 30 }, 0, 1);
            tween.elapsedTime = Math.min(1, Math.max(0, tween.elapsedTime + timer.delta / 40));
            Object.entries(tween).forEach(([key, value]) => {
              switch(key) {
                case 'position' :
                  this._controlItem.position.lerp(value as THREE.Vector3 , tween.elapsedTime);
                  break;
                case 'scale' :
                  this._controlItem.scale.lerp(value as THREE.Vector3 , tween.elapsedTime);
                  break;
                case 'rotation' :
                  // this._controlItem.rotation.slerp(value as THREE.Vector3 , tween.elapsedTime);
                  break;
                }
            });
          }
          break;
      }
    }
    return false;
  }
}
