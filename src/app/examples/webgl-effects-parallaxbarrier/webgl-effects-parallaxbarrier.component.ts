import { Component } from '@angular/core';
import { BaseComponent, MeshComponent, RendererTimer } from '../../three';

@Component({
  selector: 'app-webgl-effects-parallaxbarrier',
  templateUrl: './webgl-effects-parallaxbarrier.component.html',
  styleUrls: ['./webgl-effects-parallaxbarrier.component.scss']
})
export class WebglEffectsParallaxbarrierComponent extends BaseComponent<{}> {

  constructor() {
    super({},[]);
  }

  models : { x : number, y : number, z : number, scale : number }[] = [];

  ngOnInit() {
    this.models = [];
    for ( let i = 0; i < 500; i ++ ) {
      this.models.push({
        x : Math.random() * 10 - 5,
        y : Math.random() * 10 - 5,
        z : Math.random() * 10 - 5,
        scale : Math.random() * 3 + 1
      })
    }
  }

  spheres : MeshComponent[] = [];
  setSpheres(sphere : MeshComponent) {
    this.spheres.push(sphere);
  }

  onRender(timer : RendererTimer) {
    super.onRender(timer);
    const elapsedTime = 0.01 * timer.elapsedTime;
    this.spheres.forEach((sphere, idx) => {
      sphere.setPosition(
        5 * Math.cos( elapsedTime + idx ),
        5 * Math.sin( elapsedTime + idx * 1.1 ),
        null
      )
    });

  }
}