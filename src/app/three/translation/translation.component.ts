import { Component, Input, OnInit } from '@angular/core';
import * as THREE from 'three';
import { AbstractGetGeometry, AbstractSvgGeometry, ApplyMatrix4 } from '../interface';

@Component({
  selector: 'three-translation',
  templateUrl: './translation.component.html',
  styleUrls: ['./translation.component.scss']
})
export class TranslationComponent implements OnInit {

  @Input() visible: boolean = true;
  @Input() x : number = 0;
  @Input() y : number = 0;
  @Input() z : number = 0;

  constructor() { }

  ngOnInit(): void {
  }

  private translation : THREE.Matrix4 = null;
  private refObject3d : THREE.Object3D | AbstractGetGeometry | AbstractSvgGeometry= null;

  setObject3D(refObject3d : THREE.Object3D | AbstractGetGeometry | AbstractSvgGeometry){
    if (this.refObject3d !== refObject3d) {
      this.refObject3d = refObject3d;
      this.resetTranslation();
    }
  }

  resetTranslation(){
    if (this.refObject3d !== null && this.visible) {
      const refTranslation:ApplyMatrix4[] = [];
      if (this.refObject3d instanceof THREE.BufferGeometry || this.refObject3d instanceof THREE.Geometry) {
        refTranslation.push(this.refObject3d);
      } else if (this.refObject3d instanceof AbstractGetGeometry) {
        refTranslation.push(this.refObject3d.getGeometry());
      } else if (this.refObject3d instanceof AbstractSvgGeometry) {
        this.refObject3d.meshTranslations.forEach(translations => {
          refTranslation.push(translations);
        });
      }
      if (refTranslation.length > 0) {
        const translation : THREE.Matrix4 = this.getTranslation();
        refTranslation.forEach(refTranslation => {
          refTranslation.applyMatrix4(translation);
        })
      }
    }
  }

  getTranslation() : THREE.Matrix4{
    if (this.translation === null) {
      this.translation = new THREE.Matrix4().makeTranslation(this.x, this.y, this.z)
    }
    return this.translation;
  }

}
