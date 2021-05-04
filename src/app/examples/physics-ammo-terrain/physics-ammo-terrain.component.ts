import { Component } from '@angular/core';
import { BaseComponent } from '../../three';

@Component({
  selector: 'app-physics-ammo-terrain',
  templateUrl: './physics-ammo-terrain.component.html',
  styleUrls: ['./physics-ammo-terrain.component.scss']
})
export class PhysicsAmmoTerrainComponent extends BaseComponent<{}> {

  constructor() {
    super({},[]);
  }

}
