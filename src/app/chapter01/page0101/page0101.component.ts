import { Component, OnInit, ViewChild } from '@angular/core';
import { MeshComponent } from 'src/app/three/mesh/mesh.component';
import { GuiControlParam } from 'src/app/three/renderer/renderer.component';
import * as THREE from 'three';
@Component({
  selector: 'app-page0101',
  templateUrl: './page0101.component.html',
  styleUrls: ['./page0101.component.scss']
})
export class Page0101Component implements OnInit {

  @ViewChild('plane') plane: MeshComponent;

  guiControl: any = {
    width: 0,
    height: 0
  };

  guiParams: GuiControlParam[] = [
    {
      name: 'width',
      type: 'number',
      min: 0,
      max: 30,
      step: 5,
      finishChange: () => {
        const geometry = this.plane.getGeometry();
        if (geometry instanceof THREE.PlaneGeometry) {
          geometry.parameters.width = this.guiControl.width;
        }
      }
    },
    {
      name: 'height',
      type: 'number',
      min: 0,
      max: 30,
      step: 5,
      finishChange: () => {
        console.log(this.plane)
      }
    },
  ]

  constructor() { }

  render(deltaTime: {
    delta: number,
    elapsedTime: number
  }) {

  }

  ngOnInit(): void {
  }

}
