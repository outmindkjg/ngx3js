import { Component, Input, OnInit } from '@angular/core';
import * as THREE from 'three';
import { ApplyMatrix4 } from '../interface';
import { AbstractSubscribeComponent } from '../subscribe.abstract';

@Component({
  selector: 'ngx3js-translation',
  templateUrl: './translation.component.html',
  styleUrls: ['./translation.component.scss']
})
export class TranslationComponent extends AbstractSubscribeComponent implements OnInit {

  /**
   * 
   */
  @Input() private visible:boolean = true;

  /**
   * 
   */
  @Input() private x:number = 0;

  /**
   * 
   */
  @Input() private y:number = 0;

  /**
   * 
   */
  @Input() private z:number = 0;

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
    super.ngOnInit('translation');
  }

  /**
   * A callback method that performs custom clean-up, invoked immediately
   * before a directive, pipe, or service instance is destroyed.
   */
  ngOnDestroy(): void {
    super.ngOnDestroy();
  }

  /**
   * A callback method that is invoked immediately after
   * Angular has completed initialization of all of the directive's
   * content.
   * It is invoked only once when the directive is instantiated.
   */
  ngAfterContentInit(): void {
    super.ngAfterContentInit();
  }

  private translation : THREE.Matrix4 = null;

  setParent(parent : THREE.Object3D | any) : boolean {
    if (super.setParent(parent)) {
      this.resetTranslation();
      return true;
    } else {
      return false;
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
    if (this.translation === null || this._needUpdate) {
      this.needUpdate = false;
      this.translation = new THREE.Matrix4().makeTranslation(this.x, this.y, this.z);
      super.setObject(this.translation);
    }
    return this.translation;
  }

}
