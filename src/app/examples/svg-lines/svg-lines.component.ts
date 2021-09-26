import { Component } from '@angular/core';
import { BaseComponent, RendererTimer } from 'ngx3js';

@Component({
  selector: 'app-svg-lines',
  templateUrl: './svg-lines.component.html',
  styleUrls: ['./svg-lines.component.scss']
})
export class SvgLinesComponent extends BaseComponent<{}> {

  constructor() {
    super({},[]);
  }

  ngOnInit() {
    const vertices = [];
    const divisions = 50;
    for ( let i = 0; i <= divisions; i ++ ) {
      const v = ( i / divisions ) * ( Math.PI * 2 );
      const x = Math.sin( v );
      const z = Math.cos( v );
      vertices.push( x, 0, z );
    }
    this.vertices = vertices;
    this.lines = [];
    for(let i = 0 ; i < 3 ; i++) {
      this.lines.push({
        name : "line" + i,
        scale : i / 3,
        color : Math.random() * 0xffffff
      });
    }
  }

  lines : { name : string, scale : number, color : number }[] = [];  

  vertices : number[] = [];

  onRender(timer : RendererTimer) {
    super.onRender(timer);
    if (this.meshChildren && this.meshChildren.length > 0) {
      let count = 0;
      const time = timer.elapsedTime;
      this.meshChildren.forEach(child => {
        child.rotation.x = count + ( time / 3 );
        child.rotation.z = count + ( time / 4 );
        count ++;
      });
    }
  }
}
