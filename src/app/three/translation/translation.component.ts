import { Component, Input, OnInit } from '@angular/core';
import * as THREE from 'three';
import { ApplyMatrix4 } from '../interface';

@Component({
  selector: 'three-translation',
  templateUrl: './translation.component.html',
  styleUrls: ['./translation.component.scss']
})
export class TranslationComponent implements OnInit {

  @Input() private visible:boolean = true;
  @Input() private x:number = 0;
  @Input() private y:number = 0;
  @Input() private z:number = 0;

  constructor() { }

  ngOnInit(): void {
  }

  private translation : THREE.Matrix4 = null;
  private parent : THREE.Object3D | any = null;

  setParent(parent : THREE.Object3D | any){
    if (this.parent !== parent) {
      this.parent = parent;
      this.resetTranslation();
    }
  }

  resetTranslation(){
    if (this.parent !== null && this.visible) {
      const refTranslation:ApplyMatrix4[] = [];
      if (this.parent instanceof THREE.BufferGeometry) {
        refTranslation.push(this.parent);
      } else if (this.parent.getGeometry) {
        refTranslation.push(this.parent.getGeometry());
      } else if (this.parent.meshTranslations) {
        this.parent.meshTranslations.forEach(translations => {
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
