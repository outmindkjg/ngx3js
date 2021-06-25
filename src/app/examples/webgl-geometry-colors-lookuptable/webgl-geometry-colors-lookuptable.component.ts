import { Component } from '@angular/core';
import { BaseComponent, MeshComponent } from '../../three';
import * as THREE from 'three';
import { Lut } from 'three/examples/jsm/math/Lut';

@Component({
  selector: 'app-webgl-geometry-colors-lookuptable',
  templateUrl: './webgl-geometry-colors-lookuptable.component.html',
  styleUrls: ['./webgl-geometry-colors-lookuptable.component.scss'],
})
export class WebglGeometryColorsLookuptableComponent extends BaseComponent<{
  colorMap: string;
}> {
  constructor() {
    super({ colorMap: 'rainbow' }, [
      {
        name: 'colorMap',
        type: 'select',
        select: ['rainbow', 'cooltowarm', 'blackbody', 'grayscale'],
        change: () => {
          this.updateColors();
        },
      },
    ]);
  }

  ngOnInit() {
    this.setGeometry = (geometry: THREE.BufferGeometry) => {
      if (geometry.attributes.position) {
        const colors = [];
        for (let i = 0, n = geometry.attributes.position.count; i < n; ++i) {
          colors.push(0, 0, 0);
        }
        geometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));
        geometry.getAttribute('color').needsUpdate = true;
        this.geometry = geometry;
        this.updateColors();
      }
    };
  }
  lut = new Lut();

  geometry: THREE.BufferGeometry = null;

  setMesh(mesh: MeshComponent) {
    super.setMesh(mesh);
  }

  updateColors() {
    if (this.geometry !== null) {
      const geometry = this.geometry;
      if (geometry && geometry.attributes.pressure && geometry.attributes.color) {
        this.lut.setColorMap(this.controls.colorMap);
        this.lut.setMax(2000);
        this.lut.setMin(0);
        const pressures = geometry.attributes.pressure;
        const colors = geometry.attributes.color;
        for (let i = 0; i < pressures.array.length; i++) {
          const colorValue = pressures.array[i];
          const color = this.lut.getColor(colorValue);
          if (color === undefined) {
            console.log('Unable to determine color for value:', colorValue);
          } else {
            colors.setXYZ(i, color.r, color.g, color.b);
          }
        }
        colors.needsUpdate = true;
      }
    }
  }

  setGeometry: any = null;
}
