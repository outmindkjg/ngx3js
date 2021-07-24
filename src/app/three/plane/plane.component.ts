import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import * as THREE from 'three';
import { ThreeUtil } from '../interface';
import { AbstractSubscribeComponent } from '../subscribe.abstract';

/**
 * PlaneComponent
 */
@Component({
  selector: 'ngx3js-plane',
  templateUrl: './plane.component.html',
  styleUrls: ['./plane.component.scss'],
})
export class PlaneComponent extends AbstractSubscribeComponent implements OnInit {

  /**
   * Input  of plane component
   */
  @Input() private x: number = null;

  /**
   * Input  of plane component
   */
  @Input() private y: number = null;

  /**
   * Input  of plane component
   */
  @Input() private z: number = null;

  /**
   * Input  of plane component
   */
  @Input() private w: number = null;

  /**
   * Creates an instance of plane component.
   */
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
    super.ngOnInit('plane');
  }

  /**
   * A callback method that performs custom clean-up, invoked immediately
   * before a directive, pipe, or service instance is destroyed.
   */
  ngOnDestroy(): void {
    super.ngOnDestroy();
  }

  /**
   * A callback method that is invoked immediately after the
   * default change detector has checked data-bound properties
   * if at least one has changed, and before the view and content
   * children are checked.
   * 
   * @param changes The changed properties.
   */
  ngOnChanges(changes: SimpleChanges): void {
    super.ngOnChanges(changes);
    if (changes && this.plane) {
      this.addChanges(changes);
    }
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

  /**
   * Plane  of plane component
   */
  private plane: THREE.Plane = null;

  /**
   * World plane of plane component
   */
  private worldPlane: THREE.Plane = null;
  
  /**
   * Sets plane
   * @param x 
   * @param y 
   * @param z 
   * @param w 
   */
  public setPlane(x: number, y: number, z: number, w: number) {
    if (ThreeUtil.isNotNull(x)) {
      this.x = x;
    }
    if (ThreeUtil.isNotNull(y)) {
      this.y = y;
    }
    if (ThreeUtil.isNotNull(z)) {
      this.z = z;
    }
    if (ThreeUtil.isNotNull(w)) {
      this.w = w;
    }
    this.needUpdate = true;
    this.getPlane();
    if (this.worldPlane !== null) {
      this.worldPlane.copy(this.plane);
    }
  }

  /**
   * Gets world plane
   * @param [matrixWorld] 
   * @returns world plane 
   */
  public getWorldPlane(matrixWorld?: THREE.Matrix4): THREE.Plane {
    if (this.worldPlane === null) {
      this.worldPlane = new THREE.Plane();
    }
    this.worldPlane.copy(this.getPlane());
    if (matrixWorld !== null && matrixWorld !== undefined) {
      this.worldPlane.applyMatrix4(matrixWorld);
    }
    return this.worldPlane;
  }

  /**
   * Gets plane
   * @returns plane 
   */
  public getPlane(): THREE.Plane {
    if (this.plane === null || this._needUpdate) {
      this.needUpdate = false;
      this.plane = new THREE.Plane(ThreeUtil.getVector3Safe(this.x, this.y, this.z), ThreeUtil.getTypeSafe(this.w, 0));
      this.setObject(this.plane);
    }
    this.plane.set(ThreeUtil.getVector3Safe(this.x, this.y, this.z), ThreeUtil.getTypeSafe(this.w, 0));
    return this.plane;
  }
}
