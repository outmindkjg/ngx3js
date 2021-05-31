import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import * as THREE from 'three';
import { CssStyle, ThreeUtil } from '../interface';
import { AbstractSubscribeComponent } from '../subscribe.abstract';

@Component({
  selector: 'three-transform',
  templateUrl: './transform.component.html',
  styleUrls: ['./transform.component.scss']
})
export class TransformComponent extends AbstractSubscribeComponent implements OnInit {

  @Input() private visible:boolean = true;
  @Input() private anchorSeparat:boolean = false;
  @Input() private x:number = null;
  @Input() private y:number = null;
  @Input() private z:number = null;
  @Input() private width:number = null;
  @Input() private height:number = null;
  @Input() private left:number = null;
  @Input() private top:number = null;
  @Input() private right:number = null;
  @Input() private bottom:number = null;
  @Input() private anchorMinX:number = null;
  @Input() private anchorMinY:number = null;
  @Input() private anchorMaxX:number = null;
  @Input() private anchorMaxY:number = null;
  @Input() private pivotX:number = null;
  @Input() private pivotY:number = null;
  @Input() private rotationX:number = null;
  @Input() private rotationY:number = null;
  @Input() private rotationZ:number = null;
  @Input() private scaleX:number = null;
  @Input() private scaleY:number = null;
  @Input() private scaleZ:number = null;

  private getLeft(def? : number) : number {
    return ThreeUtil.getTypeSafe(this.left, def);
  }

  private getTop(def? : number) : number {
    return ThreeUtil.getTypeSafe(this.top, def);
  }

  private getRight(def? : number) : number {
    return ThreeUtil.getTypeSafe(this.right, def);
  }

  private getBottom(def? : number) : number {
    return ThreeUtil.getTypeSafe(this.bottom, def);
  }


  private getPosition(def? : THREE.Vector3) : THREE.Vector3 {
    return ThreeUtil.getVector3Safe(this.x, this.y, this.z, def);
  }

  private getSize(def? : THREE.Vector2) : THREE.Vector2 {
    return ThreeUtil.getVector2Safe(this.width, this.height, def);
  }

  private getAnchorMin(def? : THREE.Vector2) : THREE.Vector2 {
    return ThreeUtil.getVector2Safe(this.anchorMinX, this.anchorMinY, def);
  }

  private getAnchorMax(def? : THREE.Vector2) : THREE.Vector2 {
    return ThreeUtil.getVector2Safe(this.anchorMaxX, this.anchorMaxY, def);
  }

  private getPivot(def? : THREE.Vector2) : THREE.Vector2 {
    return ThreeUtil.getVector2Safe(this.pivotX, this.pivotY, def);
  }

  private getRotation(def? : THREE.Euler) : THREE.Euler {
    return ThreeUtil.getEulerSafe(this.rotationX, this.rotationY, this.rotationZ, def);
  }

  private getScale(def? : THREE.Vector3) : THREE.Vector3 {
    return ThreeUtil.getVector3Safe(this.scaleX, this.scaleY, this.scaleZ, def);
  }

  constructor() { 
    super();
  }

  ngOnInit(): void {
    super.ngOnInit();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes ) {
      this.applyHtmlStyle();
    }
    super.ngOnChanges(changes);
  }

  ngOnDestroy(): void {
    if (this.parentNode !== null) {
      if (ThreeUtil.isNotNull(this.cssClazzName)) {
        ThreeUtil.removeCssStyle(this.parentNode, this.cssClazzName);
        this.cssClazzName = null;
      }
      this.parentNode = null;
    }
    super.ngOnDestroy();
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
