import { Component } from '@angular/core';
import { DirectionalLight, Mesh } from 'three';
import { BaseComponent, RendererEvent } from '../../three';
import { LightComponent } from '../../three/light/light.component';

@Component({
  selector: 'app-webgl-pmrem-test',
  templateUrl: './webgl-pmrem-test.component.html',
  styleUrls: ['./webgl-pmrem-test.component.scss']
})
export class WebglPmremTestComponent extends BaseComponent<{}> {

  constructor() {
    super({},[]);
  }

  ngOnInit() {
    this.meshInfos = [];
    for ( let x = 0; x <= 10; x ++ ) {
      for ( let y = 0; y <= 2; y ++ ) {
        this.meshInfos.push({
          roughness: x / 10,
          metalness: y < 1 ? 1 : 0,
          color: y < 2 ? 0xffffff : 0x000000,
          x : x - 5,
          y : 1 - y
        })
      }
    }
  }

  meshInfos : {
    color : number;
    roughness : number;
    metalness : number;
    x : number;
    y : number;
  }[] = [];

  setLight(light : LightComponent) {
    this.directionalLight = light.getLight() as DirectionalLight;
  }

  directionalLight : DirectionalLight = null;

  mouseEvent(event : RendererEvent) {
    if (this.meshObject3d !== null && this.directionalLight !== null) {
      switch(event.type) {
        case 'mouseover' :
          this.meshObject3d.traverse((child) => {
						if ( child instanceof Mesh ) {
              (child.material as any).envMapIntensity = 1;
            }
          });
          this.directionalLight.intensity = 0;
          break;
        case 'mouseout' :
          this.meshObject3d.traverse((child) => {
						if ( child instanceof Mesh ) {
              (child.material as any).envMapIntensity = 0;
            }
          });
          this.directionalLight.intensity = 1;
          break;
      }
    }
  }

}
