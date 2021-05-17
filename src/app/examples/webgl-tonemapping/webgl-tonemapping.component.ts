import { Component } from '@angular/core';
import {
  ACESFilmicToneMapping,
  CineonToneMapping,
  LinearToneMapping,
  NoToneMapping,
  ReinhardToneMapping,
  WebGLRenderer,
} from 'three';
import { BaseComponent } from '../../three';

@Component({
  selector: 'app-webgl-tonemapping',
  templateUrl: './webgl-tonemapping.component.html',
  styleUrls: ['./webgl-tonemapping.component.scss'],
})
export class WebglTonemappingComponent extends BaseComponent<{
  toneMapping: string;
  exposure: number;
}> {
  constructor() {
    super(
      {
        toneMapping: 'ACESFilmic',
        exposure: 1.0,
      },
      [
        {
          name: 'toneMapping',
          type: 'select',
          select: [
            'None',
            'Linear',
            'Reinhard',
            'Cineon',
            'ACESFilmic',
            'Custom',
          ], change : () => {
            this.changeRenderer();
          }
        },
        { name: 'exposure', type: 'number', min: 0, max: 2, step: 0.01 , change: () => {
          this.changeRenderer();
        }},
      ]
    );
  }

  changeRenderer() {
    if (this.renderer !== null) {
      const renderer = this.renderer.getRenderer() as WebGLRenderer;
      switch (this.controls.toneMapping) {
        case 'None':
          renderer.toneMapping = NoToneMapping;
          break;
        case 'Linear':
          renderer.toneMapping = LinearToneMapping;
          break;
        case 'Reinhard':
          renderer.toneMapping = ReinhardToneMapping;
          break;
        case 'Cineon':
          renderer.toneMapping = CineonToneMapping;
          break;
        case 'ACESFilmic':
          renderer.toneMapping = ACESFilmicToneMapping;
          break;
        case 'Custom':
          // renderer.toneMapping = CustomToneMapping;
          break;
      }
      renderer.toneMappingExposure = this.controls.exposure;
    }
  }
}
