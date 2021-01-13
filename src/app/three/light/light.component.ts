import { Component, ContentChild, Input, OnInit, SimpleChanges } from '@angular/core';

import * as THREE from 'three';
import { LookatComponent } from '../lookat/lookat.component';
import { PositionComponent } from '../position/position.component';
import { RotationComponent } from '../rotation/rotation.component';
import { ScaleComponent } from '../scale/scale.component';

@Component({
  selector: 'three-light',
  templateUrl: './light.component.html',
  styleUrls: ['./light.component.scss']
})
export class LightComponent implements OnInit {

  @Input() type: string = "spot";
  @Input() color: string | number = null;
  @Input() skyColor: string | number = null;
  @Input() groundColor: string | number = null;
  @Input() visible: boolean = true;
  @Input() castShadow: boolean = true;
  @Input() intensity: number = null;
  @Input() distance: number = null;
  @Input() angle: number = null;
  @Input() penumbra: number = null;
  @Input() decay: number = null;
  @Input() width: number = null;
  @Input() height: number = null;


  @ContentChild(PositionComponent) position: PositionComponent = null;
  @ContentChild(RotationComponent) rotation: RotationComponent = null;
  @ContentChild(ScaleComponent) scale: ScaleComponent = null;
  @ContentChild(LookatComponent) lookat: LookatComponent = null;

  constructor() { }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes) {
      if (this.refObject3d !== null) {
        this.refObject3d.remove(this.light);
        this.light = null;
        this.refObject3d.add(this.getLight());
      }
    }
  }

  getIntensity(def: number): number {
    return this.intensity === null ? def : this.intensity;
  }

  getDistance(def: number): number {
    return this.distance === null ? def : this.distance;
  }

  getAngle(def: number): number {
    return (this.angle === null ? def : this.angle) / 180 * Math.PI;
  }

  getPenumbra(def: number): number {
    return this.penumbra === null ? def : this.penumbra;
  }

  getDecay(def: number): number {
    return this.decay === null ? def : this.decay;
  }

  getWidth(def: number): number {
    return this.width === null ? def : this.width;
  }

  getHeight(def: number): number {
    return this.height === null ? def : this.height;
  }

  getColor(def: string | number): string | number {
    if (this.color === null) {
      return def;
    } else {
      const color = this.color.toString();
      if (color.startsWith('0x')) {
        return parseInt(color, 16);
      } else {
        return this.color;
      }
    }
  }

  getSkyColor(def: string | number): string | number {
    if (this.skyColor === null) {
      return def;
    } else {
      const color = this.skyColor.toString();
      if (color.startsWith('0x')) {
        return parseInt(color, 16);
      } else {
        return this.skyColor;
      }
    }
  }

  getGroundColor(def: string | number): string | number {
    if (this.groundColor === null) {
      return def;
    } else {
      const color = this.groundColor.toString();
      if (color.startsWith('0x')) {
        return parseInt(color, 16);
      } else {
        return this.groundColor;
      }
    }
  }
 
  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    if (this.light != null && this.refObject3d != null) {
      this.refObject3d.remove(this.light);
    }
  }

  private light: THREE.Light = null;

  getPosition(): THREE.Vector3 {
    return this.getLight().position;
  }

  getScale(): THREE.Vector3 {
    return this.getLight().scale;
  }

  getRotation(): THREE.Euler {
    return this.getLight().rotation;
  }

  private refObject3d: THREE.Object3D = null;

  setObject3D(refObject3d: THREE.Object3D) {
    if (this.refObject3d !== refObject3d) {
      this.refObject3d = refObject3d;
      this.refObject3d.add(this.getLight());
    }
  }

  getLight(): THREE.Light {
    if (this.light === null) {
      switch (this.type.toLowerCase()) {
        case 'directional':
          this.light = new THREE.DirectionalLight(
            this.getColor(0xffffff),
            this.getIntensity(1)
          );
          this.light.castShadow = this.castShadow;
          break;
        case 'hemisphere':
          this.light = new THREE.HemisphereLight(
            this.getSkyColor(0xffffff),
            this.getGroundColor(0xffffff),
            this.getIntensity(1)
          );
          this.light.castShadow = this.castShadow;
          break;
        case 'point':
          this.light = new THREE.PointLight(
            this.getColor(0xffffff),
            this.getIntensity(1),
            this.getDistance(0),
            this.getDecay(1)
          );
          this.light.castShadow = this.castShadow;
          break;
        case 'rectarea':
          this.light = new THREE.RectAreaLight(
            this.getColor(0xffffff),
            this.getIntensity(1),
            this.getWidth(10),
            this.getHeight(10)
          );
          this.light.castShadow = this.castShadow;
          break;
        case 'spot':
          this.light = new THREE.SpotLight(
            this.getColor(0xffffff),
            this.getIntensity(1),
            this.getDistance(0),
            this.getAngle(60),
            this.getPenumbra(0),
            this.getDecay(1)
          );
          this.light.castShadow = this.castShadow;
          break;
        case 'ambient':
        default:
          this.light = new THREE.AmbientLight(
            this.getColor(0x0c0c0c),
            this.getIntensity(1)
          );
          break;
      }
      this.light.visible = this.visible;
      if (this.position !== null && this.position != undefined) {
        this.light.position.copy(this.position.getPosition());
        this.position.setPosition(this.light.position);
      }
      if (this.rotation !== null && this.rotation != undefined) {
        this.light.rotation.copy(this.rotation.getRotation());
        this.rotation.setRotation(this.light.rotation);
      }
      if (this.scale !== null && this.scale != undefined) {
        this.light.scale.copy(this.scale.getScale());
        this.scale.setScale(this.light.scale);
      }
      if (this.lookat !== null && this.lookat != undefined) {
        this.light.lookAt(this.lookat.getLookAt());
        this.lookat.setObject3D(this.light);
      }
    }
    return this.light;
  }

}
