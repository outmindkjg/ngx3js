import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import * as THREE from 'three';

@Component({
  selector: 'three-line',
  templateUrl: './line.component.html',
  styleUrls: ['./line.component.scss']
})
export class LineComponent implements OnInit {

  @Input() type: string = "axishelper";
  @Input() size: number = null;

  constructor() { }

  getSize(def : number) {
    return this.size == null ? def : this.size;
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    if (this.line != null && this.refObject3d != null) {
      this.refObject3d.remove(this.line);
    }
  }
 
  private line : THREE.LineSegments = null;

  ngOnChanges(changes: SimpleChanges): void {
    this.line = null;
  }

  private refObject3d : THREE.Object3D = null;
  
  setObject3D(refObject3d : THREE.Object3D){
    if (this.refObject3d !== refObject3d) {
      this.refObject3d = refObject3d;
      this.refObject3d.add(this.getLine());
    }
  }

  getObject3D() : THREE.Object3D {
    return this.getLine();
  }
 
  getLine() : THREE.LineSegments {
    if (this.line === null ) {
      switch(this.type) {
        case 'axishelper' :
        default :
          this.line = new THREE.AxesHelper(this.getSize(1));
          break;
      }
    }
    return this.line;
  }

}
