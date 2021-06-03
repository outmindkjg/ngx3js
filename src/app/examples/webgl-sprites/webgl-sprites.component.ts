import { Component } from '@angular/core';
import { Sprite } from 'three';
import { BaseComponent, MeshComponent, RendererTimer } from '../../three';

@Component({
  selector: 'app-webgl-sprites',
  templateUrl: './webgl-sprites.component.html',
  styleUrls: ['./webgl-sprites.component.scss'],
})
export class WebglSpritesComponent extends BaseComponent<{}> {
  constructor() {
    super({}, []);
  }

  ngOnInit() {
    this.spritePositions = [];
    for ( let a = 0; a < 200; a ++ ) {
      const x = Math.random() - 0.5;
      const y = Math.random() - 0.5;
      const z = Math.random() - 0.5;
      if (z < 0) {
        this.spritePositions.push({
          x : x,
          y : y,
          z : z,
          color : '0xffffff',
          mapType : 'b'
        });
      } else {
        this.spritePositions.push({
          x : x,
          y : y,
          z : z,
          color : 'hsl('+(0.5 * Math.random())+',0.75,0.75)',
          mapType : 'c'
        })
      }
    }
  }
  spritePositions: {
    x: number;
    y: number;
    z: number;
    color: string;
    mapType : string;
  }[] = [];

  setMesh(mesh : MeshComponent) {
    super.setMesh(mesh);
    this.children = mesh.getObject3d().children as Sprite[];
  }

  children : Sprite[] = [];

  onRender(timer : RendererTimer) {
    super.onRender(timer);
    if (this.children.length > 0) {
      const l = this.children.length;
      const time = timer.elapsedTime;
      const group = this.mesh.getObject3d();
      group.rotation.x = time * 0.5;
      group.rotation.y = time * 0.75;
      group.rotation.z = time * 1.0;
      let imageWidth = 128;
      let imageHeight = 128;
      this.children.forEach((sprite, i) => {
        const scale = Math.sin( time + sprite.position.x * 0.01 ) * 0.3 + 1.0;
        sprite.material.rotation += 0.1 * ( i / l );
        sprite.scale.set( scale * imageWidth, scale * imageHeight, 1.0 );
        if (sprite.name !== 'c') {
          const material = sprite.material;
          material.opacity = Math.sin( time + sprite.position.x * 0.01 ) * 0.4 + 0.6;
        }
      })
    }
  }
}
