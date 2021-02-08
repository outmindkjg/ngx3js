import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import * as THREE from 'three';
import { CssStyle, ThreeUtil } from '../interface';

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

  ngOnDestroy(): void {
    if (this.parentNode !== null) {
      if (ThreeUtil.isNotNull(this.cssClazzName)) {
        ThreeUtil.removeCssStyle(this.parentNode, this.cssClazzName);
        this.cssClazzName = null;
      }
      this.parentNode = null;
    }
  }

  private parentNode : HTMLElement = null;
  private parentSize : THREE.Vector2 = null;
  private eleSize: THREE.Vector2 = null;

  setParentNode(parentNode : HTMLElement, parentSize : THREE.Vector2, eleSize : THREE.Vector2) {
    if (this.parentNode !== parentNode) {
      this.parentNode = parentNode;
    }
    this.parentSize = parentSize;
    this.eleSize = eleSize;
    this.applyHtmlStyle();
  }

  getStyle() : CssStyle {
    let style : CssStyle = {}
    if (this.parentSize !== null) {
      const anchorMin = this.getAnchorMin(new THREE.Vector2(0, 0)).multiply(this.parentSize);
      const anchorMax = this.getAnchorMax(new THREE.Vector2(1, 1)).multiply(this.parentSize);
      if (this.anchorSeparat) {
        const left = this.getLeft(0);
        const top = this.getTop(0);
        const right = this.getRight(0);
        const bottom = this.getBottom(0);
        const size = anchorMax.clone().sub(anchorMin);
        this.eleSize.x = (size.x + left - right);
        this.eleSize.y = (size.y + top - bottom);
        style.width = this.eleSize.x;
        style.height = this.eleSize.y;
        style.left = (anchorMin.x + left);
        style.top = (this.parentSize.y - anchorMax.y + top);
        
      } else {
        const size = this.getSize(this.parentSize);
        this.eleSize.x = size.x;
        this.eleSize.y = size.y;
        style.width = this.eleSize.x;
        style.height = this.eleSize.y;
        style.left = anchorMin.x;
        style.top = (this.parentSize.y - anchorMax.y);
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
        style.transform = transform;
      }
      const pivot = this.getPivot(new THREE.Vector2(0.5,0.5));
      if (pivot.x !== 0.5 || pivot.y !== 0.5) {
        style.transformOrigin = (pivot.x * 100) + '% '+(pivot.y * 100) + '%';
      }
    }
    return style;
  }

  applyHtmlStyle() {
    if (this.parentNode !== null && this.parentSize !== null) {
      if (this.visible) {
        const style: CssStyle= this.getStyle();
        this.cssClazzName = ThreeUtil.addCssStyle(this.parentNode, style, this.cssClazzName, 'transform', 'inline');
      } else {
        ThreeUtil.toggleCssStyle(this.parentNode, this.cssClazzName, false);
      }
    }
  }

  private cssClazzName : string = null;


}
