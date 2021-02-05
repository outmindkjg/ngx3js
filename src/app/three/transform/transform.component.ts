import { Component, Input, OnInit, SimpleChanges } from '@angular/core';

import * as THREE from 'three';
import { HtmlComponent } from '../html/html.component';
import { ThreeUtil } from '../interface';

@Component({
  selector: 'three-transform',
  templateUrl: './transform.component.html',
  styleUrls: ['./transform.component.scss']
})
export class TransformComponent implements OnInit {

  @Input() visible: boolean = true;
  @Input() anchorSeparat: boolean = false;
  @Input() x : number = null;
  @Input() y : number = null;
  @Input() z : number = null;
  @Input() width : number = null;
  @Input() height : number = null;
  @Input() left : number = null;
  @Input() top : number = null;
  @Input() right : number = null;
  @Input() bottom : number = null;
  @Input() anchorMinX : number = null;
  @Input() anchorMinY : number = null;
  @Input() anchorMaxX : number = null;
  @Input() anchorMaxY : number = null;
  @Input() pivotX : number = null;
  @Input() pivotY : number = null;
  @Input() rotationX : number = null;
  @Input() rotationY : number = null;
  @Input() rotationZ : number = null;
  @Input() scaleX : number = null;
  @Input() scaleY : number = null;
  @Input() scaleZ : number = null;

  getLeft(def? : number) : number {
    return ThreeUtil.getTypeSafe(this.left, def);
  }

  getTop(def? : number) : number {
    return ThreeUtil.getTypeSafe(this.top, def);
  }

  getRight(def? : number) : number {
    return ThreeUtil.getTypeSafe(this.right, def);
  }
  
  getBottom(def? : number) : number {
    return ThreeUtil.getTypeSafe(this.bottom, def);
  }


  getPosition(def? : THREE.Vector3) : THREE.Vector3 {
    return ThreeUtil.getVector3Safe(this.x, this.y, this.z, def);
  }
  
  getSize(def? : THREE.Vector2) : THREE.Vector2 {
    return ThreeUtil.getVector2Safe(this.width, this.height, def);
  }

  getAnchorMin(def? : THREE.Vector2) : THREE.Vector2 {
    return ThreeUtil.getVector2Safe(this.anchorMinX, this.anchorMinY, def);
  }

  getAnchorMax(def? : THREE.Vector2) : THREE.Vector2 {
    return ThreeUtil.getVector2Safe(this.anchorMaxX, this.anchorMaxY, def);
  }

  getPivot(def? : THREE.Vector2) : THREE.Vector2 {
    return ThreeUtil.getVector2Safe(this.pivotX, this.pivotY, def);
  }

  getRotation(def? : THREE.Euler) : THREE.Euler {
    return ThreeUtil.getEulerSafe(this.rotationX, this.rotationY, this.rotationZ, def);
  }

  getScale(def? : THREE.Vector3) : THREE.Vector3 {
    return ThreeUtil.getVector3Safe(this.scaleX, this.scaleY, this.scaleZ, def);
  }

  constructor() { }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes ) {
      this.applyHtmlStyle();
    }
  }

  private parentNode : HTMLElement = null;
  private parentSize : THREE.Vector2 = null;

  setParentNode(parentNode : HTMLElement, size : THREE.Vector2) {
    if (this.parentNode !== parentNode) {
      this.parentNode = parentNode;
    }
    this.parentSize = size; 
    this.applyHtmlStyle();
  }

  applyHtmlStyle() {
    if (this.parentNode !== null && this.parentSize !== null) {
      const style : { [ key : string] : string } = {
        width : '100px',
        height : '100px',
        left : 'auto',
        right : 'auto',
        top : 'auto',
        bottom : 'auto'
      }
      const anchorMin = this.getAnchorMin(new THREE.Vector2(0, 0)).multiply(this.parentSize);
      const anchorMax = this.getAnchorMax(new THREE.Vector2(1, 1)).multiply(this.parentSize);

      if (this.anchorSeparat) {
        const left = this.getLeft(0);
        const top = this.getTop(0);
        const right = this.getRight(0);
        const bottom = this.getBottom(0);
        const size = anchorMax.clone().sub(anchorMin);
        style.width = (size.x + left - right) + 'px';
        style.height = (size.y + top - bottom) + 'px';
        style.left = (anchorMin.x + left) + 'px';
        style.top = (this.parentSize.y - anchorMax.y + top) + 'px';
      } else {
        const size = this.getSize(this.parentSize);
        style.width = size.x + 'px';
        style.height = size.y + 'px';
        style.left = anchorMin.x + 'px';
        style.top = (this.parentSize.y - anchorMax.y) + 'px';
      }
      const transform : string[] = [];
      const scale = this.getScale(new THREE.Vector3(1,1,1));
      if (scale.x !== 1 || scale.y !== 1 || scale.z !== 1) {
        transform.push('scale3d('+scale.x+','+scale.y+','+scale.z+')');
      }
      const rotation = this.getRotation(new THREE.Euler(0,0,0));
      if (rotation.x !== 0 || rotation.y !== 0 || rotation.z !== 0) {
        const quaternion : THREE.Quaternion = new THREE.Quaternion();
        quaternion.setFromEuler(rotation);
        transform.push('rotate3d('+quaternion.x+','+quaternion.y+','+quaternion.z+','+quaternion.w+'rad)');
      }
      if (transform.length > 0) {
        style.transform = transform.join(' ');
      }
      const pivot = this.getPivot(new THREE.Vector2(0.5,0.5));
      if (pivot.x !== 0.5 || pivot.y !== 0.5) {
        style.transformOrigin = (pivot.x * 100) + '% '+(pivot.y * 100) + '%';
      }
      HtmlComponent.applyHtmlStyle(this.parentNode, style);
    }
  }

}
