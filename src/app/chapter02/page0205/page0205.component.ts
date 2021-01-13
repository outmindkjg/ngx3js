import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-page0205',
  templateUrl: './page0205.component.html',
  styleUrls: ['./page0205.component.scss']
})
export class Page0205Component implements OnInit {

  constructor() { }

  controls = {
    'clone' : () => {
        this.cloneVertices = [];
        this.vertices.forEach(vert => {
          this.cloneVertices.push({ x : vert.x, y : vert.y, z : vert.z});
        })
    }
  }

  controlsParams = []

  cloneVertices : { x: number, y: number, z: number }[] = [];

  vertices: { x: number, y: number, z: number }[] = [
    { x: 1, y: 3, z: 1 },
    { x: 1, y: 3, z: -1 },
    { x: 1, y: -1, z: 1 },
    { x: 1, y: -1, z: -1 },
    { x: -1, y: 3, z: -1 },
    { x: -1, y: 3, z: 1 },
    { x: -1, y: -1, z: -1 },
    { x: -1, y: -1, z: 1 }
  ];
  faces: { a: number, b: number, c: number }[] = [
    { a: 0, b: 2, c: 1 },
    { a: 2, b: 3, c: 1 },
    { a: 4, b: 6, c: 5 },
    { a: 6, b: 7, c: 5 },
    { a: 4, b: 5, c: 1 },
    { a: 5, b: 0, c: 1 },
    { a: 7, b: 6, c: 2 },
    { a: 6, b: 3, c: 2 },
    { a: 5, b: 7, c: 0 },
    { a: 7, b: 2, c: 0 },
    { a: 1, b: 3, c: 4 },
    { a: 3, b: 6, c: 4 },
  ];

  name = "box-00";
  renderSeq = 0;
  ngOnInit(): void {
    this.controlsParams.push({
      name : 'clone', type : 'button'
    });
    this.vertices.forEach((vert, idx) => {
      this.controls['vert' + idx] = vert;
      this.controlsParams.push({
        name: 'Vertices ' + (idx + 1),
        type: 'folder',
        control: 'vert' + idx,
        children: [
          { name: 'x', type: 'number', min: -10, max: 10, change: () => { this.reRender(); } },
          { name: 'y', type: 'number', min: -10, max: 10, change: () => { this.reRender(); } },
          { name: 'z', type: 'number', min: -10, max: 10, change: () => { this.reRender(); } }
        ]
      })
    });
  }

  reRender() {
    this.renderSeq++;
    this.name = 'box-' + this.renderSeq;
  }


}
