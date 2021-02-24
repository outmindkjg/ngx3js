import { Component, ContentChildren, Input, OnInit, QueryList } from '@angular/core';
import * as THREE from 'three';
import { GeometriesVector3, GeometryComponent } from '../geometry/geometry.component';

@Component({
  selector: 'three-shape',
  templateUrl: './shape.component.html',
  styleUrls: ['./shape.component.scss']
})
export class ShapeComponent implements OnInit {

  @Input() public type:string = 'fromPoints';
  @Input() private points:GeometriesVector3[] = null;
  @Input() private x:number = null;
  @Input() private y:number = null;
  @Input() private aCPx:number = null;
  @Input() private aCPy:number = null;
  @Input() private aX:number = null;
  @Input() private aY:number = null;
  @Input() private aCP1x:number = null;
  @Input() private aCP1y:number = null;
  @Input() private aCP2x:number = null;
  @Input() private aCP2y:number = null;
  @Input() private aRadius:number = null;
  @Input() private aStartAngle:number = null;
  @Input() private aEndAngle:number = null;
  @Input() private aClockwise:boolean = null;
  @Input() private xRadius:number = null; n
  @Input() private yRadius:number = null;
  @Input() private aRotation:number = null;

  @ContentChildren(ShapeComponent,{descendants: false}) private holes: QueryList<ShapeComponent>;

  constructor() { }

  ngOnInit(): void {
  }

  private getPoints(def: GeometriesVector3[]): THREE.Vector2[] {
    const points = [];
    (this.points === null ? def : this.points).forEach(p => {
      points.push(new THREE.Vector2(p.x, p.y))
    });
    return points;
  }

  private getX(def: number): number {
    const x = this.x === null ? def : this.x;
    return x;
  }

  private getY(def: number): number {
    const y = this.y === null ? def : this.y;
    return y;
  }

  private getACPx(def: number): number {
    const aCPx = this.aCPx === null ? def : this.aCPx;
    return aCPx;
  }

  private getACPy(def: number): number {
    const aCPy = this.aCPy === null ? def : this.aCPy;
    return aCPy;
  }

  private getAX(def: number): number {
    const aX = this.aX === null ? def : this.aX;
    return aX;
  }

  private getAY(def: number): number {
    const aY = this.aY === null ? def : this.aY;
    return aY;
  }

  private getACP1x(def: number): number {
    const aCP1x = this.aCP1x === null ? def : this.aCP1x;
    return aCP1x;
  }

  private getACP1y(def: number): number {
    const aCP1y = this.aCP1y === null ? def : this.aCP1y;
    return aCP1y;
  }

  private getACP2x(def: number): number {
    const aCP2x = this.aCP2x === null ? def : this.aCP2x;
    return aCP2x;
  }

  private getACP2y(def: number): number {
    const aCP2y = this.aCP2y === null ? def : this.aCP2y;
    return aCP2y;
  }

  private getARadius(def: number): number {
    const aRadius = this.aRadius === null ? def : this.aRadius;
    return aRadius;
  }

  private getAStartAngle(def: number): number {
    const aStartAngle = this.aStartAngle === null ? def : this.aStartAngle;
    return aStartAngle / 180 * Math.PI;
  }

  private getAEndAngle(def: number): number {
    const aEndAngle = this.aEndAngle === null ? def : this.aEndAngle;
    return aEndAngle / 180 * Math.PI;
  }

  private getAClockwise(def: boolean): boolean {
    const aClockwise = this.aClockwise === null ? def : this.aClockwise;
    return aClockwise;
  }

  private getXRadius(def: number): number {
    const xRadius = this.xRadius === null ? def : this.xRadius;
    return xRadius;
  }

  private getYRadius(def: number): number {
    const yRadius = this.yRadius === null ? def : this.yRadius;
    return yRadius;
  }

  private getARotation(def: number): number {
    const aRotation = this.aRotation === null ? def : this.aRotation;
    return aRotation;
  }

  private getHoles(): THREE.Path {
    const holes = new THREE.Path();
    if (this.holes !== null && this.holes.length > 0) {
      this.holes.forEach(hole => {
        hole.getShape(holes);
      })
    }
    return holes;
  }

  private parent : GeometryComponent= null;

  setParent(parent : GeometryComponent){
    if (this.parent !== parent) {
      this.parent = parent;
    }
  }

  getShape(shape: THREE.Shape | THREE.Path): THREE.Shape | THREE.Path{
    switch (this.type.toLowerCase()) {
      case 'frompoints':
        shape.setFromPoints(this.getPoints([]));
        break;
      case 'moveto':
        shape.moveTo(this.getX(0), this.getY(0));
        break;
      case 'lineto':
        shape.lineTo(this.getX(0), this.getY(0));
        break;
      case 'quadraticcurveto':
        shape.quadraticCurveTo(
          this.getACPx(0),
          this.getACPy(0),
          this.getAX(0),
          this.getAY(0)
        );
        break;
      case 'beziercurveto':
        shape.bezierCurveTo(
          this.getACP1x(0),
          this.getACP1y(0),
          this.getACP2x(0),
          this.getACP2y(0),
          this.getAX(0),
          this.getAY(0)
        );
        break;
      case 'splinethru':
        shape.splineThru(
          this.getPoints([])
        );
        break;
      case 'arc':
        shape.arc(
          this.getAX(0),
          this.getAY(0),
          this.getARadius(0),
          this.getAStartAngle(0),
          this.getAEndAngle(0),
          this.getAClockwise(false)
        );
        break;
      case 'absarc':
        shape.absarc(
          this.getAX(0),
          this.getAY(0),
          this.getARadius(0),
          this.getAStartAngle(0),
          this.getAEndAngle(0),
          this.getAClockwise(false)
        );
        break;
      case 'ellipse':
        shape.ellipse(
          this.getAX(0),
          this.getAY(0),
          this.getXRadius(0),
          this.getYRadius(0),
          this.getAStartAngle(0),
          this.getAEndAngle(0),
          this.getAClockwise(false),
          this.getARotation(0)
        );
        break;
      case 'absellipse':
        shape.absellipse(
          this.getAX(0),
          this.getAY(0),
          this.getXRadius(0),
          this.getYRadius(0),
          this.getAStartAngle(0),
          this.getAEndAngle(0),
          this.getAClockwise(false),
          this.getARotation(0)
        );
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
