import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import * as THREE from 'three';
import { AbstractSubscribeComponent } from '../subscribe.abstract';
import { ThreeColor, ThreeUtil } from './../interface';

/**
 * FogComponent
 */
@Component({
  selector: 'ngx3js-fog',
  templateUrl: './fog.component.html',
  styleUrls: ['./fog.component.scss'],
})
export class FogComponent extends AbstractSubscribeComponent implements OnInit {
  /**
   * The Fog type.
   *
   * @see THREE.Fog - fog (default),
   * @see THREE.FogExp2 - fogexp2, exp, exp2
   */
  @Input() public type: string = 'fog';

  /**
   * Fog color.  Example: If set to black, far away objects will be rendered black.
   */
  @Input() private color: ThreeColor = null;

  /**
   * Defines how fast the fog will grow dense.
   * Default is 0.00025.
   */
  @Input() private density: number = 0.00025;

  /**
   * The minimum distance to start applying fog. Objects that are less than 'near' units from the active camera won't be affected by fog.
   * Default is 1.
   */
  @Input() private near: number = 1;

  /**
   * The maximum distance at which fog stops being calculated and applied. Objects that are more than 'far' units away from the active camera won't be affected by fog.
   * Default is 1000.
   */
  @Input() private far: number = 1000;

  /**
   * Creates an instance of fog component.
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
    super.ngOnInit('fog');
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
    if (changes && this.fog) {
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
   * Gets color
   * @param [def] 
   * @returns color 
   */
  private getColor(def?: number | string): THREE.Color {
    return ThreeUtil.getColorSafe(this.color, def);
  }

  /**
   * Fog  of fog component
   */
  private fog: THREE.FogBase = null;

  /**
   * Ref scene of fog component
   */
  private refScene: THREE.Scene = null;

  /**
   * Sets scene
   * @param refScene 
   */
  public setScene(refScene: THREE.Scene) {
    if (this.refScene !== refScene) {
      this.refScene = refScene;
      this.refScene.fog = this.getFog();
    }
  }

  /**
   * Gets fog
   * @returns fog 
   */
  public getFog(): THREE.FogBase {
    if (this.fog === null || this._needUpdate) {
      this.needUpdate = false;
      switch (this.type.toLowerCase()) {
        case 'exp':
        case 'exp2':
        case 'fogexp2':
          this.fog = new THREE.FogExp2(ThreeUtil.getColorSafe(this.color,0xffffff).getHex(), ThreeUtil.getTypeSafe(this.density));
          break;
        case 'fog':
        default:
          this.fog = new THREE.Fog(ThreeUtil.getColorSafe(this.color,0xffffff), ThreeUtil.getTypeSafe(this.near), ThreeUtil.getTypeSafe(this.far));
          break;
      }
      super.setObject(this.fog);
    }
    return this.fog;
  }
}
