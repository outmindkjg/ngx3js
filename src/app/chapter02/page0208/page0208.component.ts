import { Component, OnInit } from '@angular/core';
import { GeometriesVector3, GuiControlParam, RendererTimer } from '../../three';

@Component({
  selector: 'app-page0208',
  templateUrl: './page0208.component.html',
  styleUrls: ['./page0208.component.scss']
})
export class Page0208Component implements OnInit {

  controls = {
    switchCamera: () => {
      switch (this.controls.perspective) {
        case 'Perspective':
          this.controls.perspective = 'Orthographic';
          break;
        case 'Orthographic':
          this.controls.perspective = 'Perspective';
          break;
      }
    },
    perspective: 'Perspective'
  }

  controlsParams: GuiControlParam[] = [
    { name: 'switchCamera', type: 'button' },
    { name: 'perspective', type: 'button', listen: true },

  ];

  cubeInfo: { x: number, y: number, z: number, color: number }[] = [];

  lookAt : GeometriesVector3 = {
    x : 0,
    y : 10, 
    z : 0
  }

  constructor() { }

  ngOnInit(): void {
    for (let j = 0; j < 180 / 5; j++) {
      for (let i = 0; i < 180 / 5; i++) {
        const color = Math.random() * 0.75 + 0.25;
        const z = -(180 / 2) + 2 + (j * 5);
        const x = -(180 / 2) + 2 + (i * 5);
        const y = 2;
        this.cubeInfo.push({
          x: x,
          y: y,
          z: z,
          color: Math.round(color * 256) * 256 
        })
      }
    }
  }

  onRender(timer : RendererTimer) {
    const x = 10 + ( 100 * (Math.sin(timer.elapsedTime)));
    this.lookAt.x = x;
  }
}
