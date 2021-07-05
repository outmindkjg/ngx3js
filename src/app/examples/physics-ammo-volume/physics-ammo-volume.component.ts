import { Component } from '@angular/core';
import { BaseComponent, RendererEvent } from '../../three';

@Component({
  selector: 'app-physics-ammo-volume',
  templateUrl: './physics-ammo-volume.component.html',
  styleUrls: ['./physics-ammo-volume.component.scss']
})
export class PhysicsAmmoVolumeComponent extends BaseComponent<{}> {

  constructor() {
    super({})
  }

  ballInfos : { x : number, y : number, z : number, vx : number, vy : number, vz : number }[] = [];

  onMouseClick(event : RendererEvent) {
    switch (event.type) {
      case 'pointerdown' :
        if (this.camera !== null) {
          const raycaster = this.camera.getRaycaster(event.mouse);
          if (this.ballInfos.length > 10) {
            this.ballInfos.shift();
          }
          this.ballInfos.push({
           x : raycaster.ray.direction.x + raycaster.ray.origin.x,
           y : raycaster.ray.direction.y + raycaster.ray.origin.y,
           z : raycaster.ray.direction.z + raycaster.ray.origin.z,
           vx : raycaster.ray.direction.x * 24,
           vy : raycaster.ray.direction.y * 24,
           vz : raycaster.ray.direction.z * 24,
          })
        }
        break;
    }
  }

  
}