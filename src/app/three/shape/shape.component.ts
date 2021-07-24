import { Component, ContentChildren, Input, OnInit, QueryList } from '@angular/core';
import * as THREE from 'three';
import { AbstractGeometryComponent } from '../geometry.abstract';
import { ThreeUtil, ThreeVector } from '../interface';
import { AbstractSubscribeComponent } from '../subscribe.abstract';

/**
 * ShapeComponent
 */
@Component({
  selector: 'ngx3js-shape',
  templateUrl: './shape.component.html',
  styleUrls: ['./shape.component.scss'],
})
export class ShapeComponent extends AbstractSubscribeComponent implements OnInit {
  /**
   * Input  of shape component
   *
   * Notice - case insensitive.
   * 
   */
  @Input() public type: string = 'fromPoints';

  /**
   * Input  of shape component
   */
  @Input() private points: ThreeVector[] = null;

  /**
   * Input  of shape component
   */
  @Input() private x: number = null;

  /**
   * Input  of shape component
   */
  @Input() private y: number = null;

  /**
   * Input  of shape component
   */
  @Input() private aCPx: number = null;

  /**
   * Input  of shape component
   */
  @Input() private aCPy: number = null;

  /**
   * Input  of shape component
   */
  @Input() private aX: number = null;

  /**
   * Input  of shape component
   */
  @Input() private aY: number = null;

  /**
   * Input  of shape component
   */
  @Input() private aCP1x: number = null;

  /**
   * Input  of shape component
   */
  @Input() private aCP1y: number = null;

  /**
   * Input  of shape component
   */
  @Input() private aCP2x: number = null;

  /**
   * Input  of shape component
   */
  @Input() private aCP2y: number = null;

  /**
   * Input  of shape component
   */
  @Input() private aRadius: number = null;

  /**
   * Input  of shape component
   */
  @Input() private aStartAngle: number = null;

  /**
   * Input  of shape component
   */
  @Input() private aEndAngle: number = null;

  /**
   * Input  of shape component
   */
  @Input() private aClockwise: boolean = null;

  /**
   * Input  of shape component
   */
  @Input() private xRadius: number = null;

  /**
   * Input  of shape component
   */
  @Input() private yRadius: number = null;

  /**
   * Input  of shape component
   */
  @Input() private aRotation: number = null;

  /**
   * Content children of shape component
   */
  @ContentChildren(ShapeComponent, { descendants: false }) private holes: QueryList<ShapeComponent>;

  /**
   * Creates an instance of shape component.
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
    super.ngOnInit('shape');
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

  /**
   * Gets points
   * @param def 
   * @returns points 
   */
  private getPoints(def: ThreeVector[]): THREE.Vector2[] {
    const points = [];
    (this.points === null ? def : this.points).forEach((p) => {
      points.push(new THREE.Vector2(p.x, p.y));
    });
    return points;
  }

  /**
   * Gets holes
   * @returns holes 
   */
  private getHoles(): THREE.Path {
    const holes = new THREE.Path();
    if (this.holes !== null && this.holes.length > 0) {
      this.holes.forEach((hole) => {
        hole.getShape(holes);
      });
    }
    return holes;
  }

  /**
   * Sets parent
   * @param parent 
   * @returns true if parent 
   */
  public setParent(parent: AbstractGeometryComponent): boolean {
    if (super.setParent(parent)) {
      return true;
    } else {
      return false;
    }
  }

  /**
   * Gets shape
   * @param shape 
   * @returns shape 
   */
  public getShape(shape: THREE.Shape | THREE.Path): THREE.Shape | THREE.Path {
    switch (this.type.toLowerCase()) {
      case 'frompoints':
        shape.setFromPoints(this.getPoints([]));
        break;
      case 'moveto':
        shape.moveTo(ThreeUtil.getTypeSafe(this.x, 0), ThreeUtil.getTypeSafe(this.y, 0));
        break;
      case 'lineto':
        shape.lineTo(ThreeUtil.getTypeSafe(this.x, 0), ThreeUtil.getTypeSafe(this.y, 0));
        break;
      case 'quadraticcurveto':
        shape.quadraticCurveTo(ThreeUtil.getTypeSafe(this.aCPx, 0), ThreeUtil.getTypeSafe(this.aCPy, 0), ThreeUtil.getTypeSafe(this.aX, 0), ThreeUtil.getTypeSafe(this.aY, 0));
        break;
      case 'beziercurveto':
        shape.bezierCurveTo(ThreeUtil.getTypeSafe(this.aCPy, 0), ThreeUtil.getTypeSafe(this.aCP1y, 0), ThreeUtil.getTypeSafe(this.aCP2x, 0), ThreeUtil.getTypeSafe(this.aCP2y, 0), ThreeUtil.getTypeSafe(this.aX, 0), ThreeUtil.getTypeSafe(this.aY, 0));
        break;
      case 'splinethru':
        shape.splineThru(this.getPoints([]));
        break;
      case 'arc':
        shape.arc(ThreeUtil.getTypeSafe(this.aX, 0), ThreeUtil.getTypeSafe(this.aY, 0), ThreeUtil.getTypeSafe(this.aRadius, 0), ThreeUtil.getAngleSafe(this.aStartAngle, 0), ThreeUtil.getAngleSafe(this.aEndAngle, 0), ThreeUtil.getTypeSafe(this.aClockwise, false));
        break;
      case 'absarc':
        shape.absarc(ThreeUtil.getTypeSafe(this.aX, 0), ThreeUtil.getTypeSafe(this.aY, 0), ThreeUtil.getTypeSafe(this.aRadius, 0), ThreeUtil.getAngleSafe(this.aStartAngle, 0), ThreeUtil.getAngleSafe(this.aEndAngle, 0), ThreeUtil.getTypeSafe(this.aClockwise, false));
        break;
      case 'ellipse':
        shape.ellipse(ThreeUtil.getTypeSafe(this.aX, 0), ThreeUtil.getTypeSafe(this.aY, 0), ThreeUtil.getTypeSafe(this.xRadius, 0), ThreeUtil.getTypeSafe(this.yRadius, 0), ThreeUtil.getAngleSafe(this.aStartAngle, 0), ThreeUtil.getAngleSafe(this.aEndAngle, 0), ThreeUtil.getTypeSafe(this.aClockwise, false), ThreeUtil.getTypeSafe(this.aRotation, 0));
        break;
      case 'absellipse':
        shape.absellipse(ThreeUtil.getTypeSafe(this.aX, 0), ThreeUtil.getTypeSafe(this.aY, 0), ThreeUtil.getTypeSafe(this.xRadius, 0), ThreeUtil.getTypeSafe(this.yRadius, 0), ThreeUtil.getAngleSafe(this.aStartAngle, 0), ThreeUtil.getAngleSafe(this.aEndAngle, 0), ThreeUtil.getTypeSafe(this.aClockwise, false), ThreeUtil.getTypeSafe(this.aRotation, 0));
        break;
      case 'holes':
      case 'hole':
        if (shape instanceof THREE.Shape) {
          shape.holes.push(this.getHoles());
        }
        break;
    }
    return shape;
  }
}
