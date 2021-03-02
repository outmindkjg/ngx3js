import { Component } from '@angular/core';
import { BaseComponent, MeshComponent, RendererTimer } from '../../three';

@Component({
  selector: 'app-webgl-effects-stereo',
  templateUrl: './webgl-effects-stereo.component.html',
  styleUrls: ['./webgl-effects-stereo.component.scss']
})
export class WebglEffectsStereoComponent extends BaseComponent<{ refractionRatio : number}> {

  constructor() {
    super({
      refractionRatio : 0.95
    },[
      { name : 'refractionRatio', type : 'number', min : 0.001, max : 1, step : 0.001}
    ]);
  }

  models : {x : number, y : number, z : number, scale : number}[] = [];

  ngOnInit() {
    this.models = [];
    for ( let i = 0; i < 500; i ++ ) {
      this.models.push({
        x : Math.random() * 10000 - 5000,
        y : Math.random() * 10000 - 5000,
        z : Math.random() * 10000 - 5000,
        scale : Math.random() * 3 + 1
      })
    }
  }

  spheres : MeshComponent[] = [];
  setSpheres(spheres : MeshComponent) {
    this.spheres.push(spheres);
  }

  onRender(timer : RendererTimer) {
    super.onRender(timer);
    const elapsedTime = timer.elapsedTime / 100;
    this.spheres.forEach((sphere, i) => {
      sphere.setPosition(
        5000 * Math.cos( elapsedTime + i ),
        5000 * Math.sin( elapsedTime + i * 1.1 ),
        null
      )
    })

  }
}
