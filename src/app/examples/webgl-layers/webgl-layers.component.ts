import { Component } from '@angular/core';
import { BaseComponent } from '../../three';

@Component({
  selector: 'app-webgl-layers',
  templateUrl: './webgl-layers.component.html',
  styleUrls: ['./webgl-layers.component.scss']
})
export class WebglLayersComponent extends BaseComponent<{
  red : () => void,
  green : () => void,
  blue : () => void,
  enable : () => void,
  disable : () => void
}> {

  constructor() {
    super({
      red : () => {
        this.enableLayer(null, [0]);
      },
      green : () => {
        this.enableLayer(null, [1]);
      },
      blue : () => {
        this.enableLayer(null, [2]);
      },
      enable : () => {
        this.enableLayer(true, null)
      },
      disable : () => {
        this.enableLayer(false, null)
      }
    },[
      { name : 'red', title : 'toggle Red'},
      { name : 'green', title : 'toggle Green'},
      { name : 'blue', title : 'toggle Blue'},
      { name : 'enable', title : 'enable All'},
      { name : 'disable', title : 'disable All'},
    ]);
  }

  ngOnInit() {
    const colors = [ 0xff0000, 0x00ff00, 0x0000ff ];
    const layerInfo : {
      color : number,
      layers : number[],
      position : { x : number , y : number, z : number},
      rotation : { x : number , y : number, z : number},
      scale : { x : number , y : number, z : number},
    }[] = [];

    for ( let i = 0; i < 300; i ++ ) {
      const layer = ( i % 3 );
      layerInfo.push({
        color : colors[ layer ],
        position : {
          x : Math.random() * 800 - 400,
          y : Math.random() * 800 - 400,
          z : Math.random() * 800 - 400
        },
        rotation : {
          x : Math.random() * 2 * 180,
          y : Math.random() * 2 * 180,
          z : Math.random() * 2 * 180,
        },
        scale : {
          x : Math.random() + 0.5,
          y : Math.random() + 0.5,
          z : Math.random() + 0.5,
        },
        layers : [layer]
      })
    }
    this.layers = layerInfo;
  }

  layers : {
    color : number,
    layers : number[],
    position : { x : number , y : number, z : number},
    rotation : { x : number , y : number, z : number},
    scale : { x : number , y : number, z : number},
  }[] = [];

  enableLayer(bl = null, layers : number[] = null) {
    if (this.camera !== null) {
      const camera = this.camera.getCamera();
      if (layers == null) {
        if (bl !== null) {
          if (bl) {
            camera.layers.enableAll();
          } else {
            camera.layers.disableAll();
          }
        }
      } else if (bl !== null) {
        if (bl) {
          layers.forEach(layer => {
            camera.layers.enable(layer);
          });
        } else {
          layers.forEach(layer => {
            camera.layers.disable(layer);
          });
        }
      } else {
        layers.forEach(layer => {
          camera.layers.toggle(layer);
        });
      }
    }
  }
}
