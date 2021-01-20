import { Component, Input, OnInit } from '@angular/core';
import * as THREE from 'three';

export interface ApplyMatrix4 {
  applyMatrix4( matrix: THREE.Matrix4 ): any ;
}

@Component({
  selector: 'three-translation',
  templateUrl: './translation.component.html',
  styleUrls: ['./translation.component.scss']
})
export class TranslationComponent implements OnInit {

  @Input() x : number = 0;
  @Input() y : number = 0;
  @Input() z : number = 0;

  constructor() { }

  ngOnInit(): void {
  }

  private translation : THREE.Matrix4 = null;
  private refTranslation : ApplyMatrix4 | ApplyMatrix4[] = null;
  
  setTranslation(refTranslation : ApplyMatrix4 | ApplyMatrix4[]){
    if (this.refTranslation !== refTranslation) {
      this.refTranslation = refTranslation;
      if (this.refTranslation instanceof Array) {
        this.refTranslation.forEach(refTranslation => {
          refTranslation.applyMatrix4(this.getTranslation());
        })
      } else {
        this.refTranslation.applyMatrix4(this.getTranslation());
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
