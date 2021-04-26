import { Component } from '@angular/core';
import { BaseComponent } from '../../three';

@Component({
  selector: 'app-webgl-materials-grass',
  templateUrl: './webgl-materials-grass.component.html',
  styleUrls: ['./webgl-materials-grass.component.scss']
})
export class WebglMaterialsGrassComponent extends BaseComponent<{}> {

  constructor() {
    super({},[]);
  }

  ngOnInit() {
    this.grassInfos = [];
    for ( let i = 0; i < 15; i ++ ) {
      const color = 'hsl(0.3,0.75,'+(( i / 15 ) * 0.4 + 0.1)+')';
      this.grassInfos.push({
        color : color,
        y : i * 0.25
      })
    }
  }

  getCrassTexture(context : CanvasRenderingContext2D) {
    const width = 512;
    const height = 512;
    for ( let i = 0; i < 20000; i ++ ) {
      context.fillStyle = 'hsl(0,0%,' + ( Math.random() * 50 + 50 ) + '%)';
      context.beginPath();
      context.arc( Math.random() * width, Math.random() * height, Math.random() + 0.15, 0, Math.PI * 2, true );
      context.fill();
    }
    context.globalAlpha = 0.075;
    context.globalCompositeOperation = 'lighter';
  }

  grassInfos : { color : string, y : number}[] = []; 

}
