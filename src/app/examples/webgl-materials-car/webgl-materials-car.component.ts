import { Component } from '@angular/core';
import { BaseComponent, MeshComponent, RendererTimer, ThreeUtil } from '../../three';
import { HelperComponent } from '../../three/helper/helper.component';

@Component({
  selector: 'app-webgl-materials-car',
  templateUrl: './webgl-materials-car.component.html',
  styleUrls: ['./webgl-materials-car.component.scss']
})
export class WebglMaterialsCarComponent extends BaseComponent<{
  body : string;
  glass : string;
  detail : string;
}> {

  constructor() {
    super({
      body : '#ff0000',
      glass : '#ffffff',
      detail : '#ffffff'
    },[
      { name : 'body', type : 'color'},
      { name : 'detail', type : 'color'},
      { name : 'glass', type : 'color'}
    ]);
  }

  setGridHelp(helper : HelperComponent) {
    this.grid = helper.getHelper();
  }

  setMesh(mesh : MeshComponent) {
    super.setMesh(mesh);
    const carModel = mesh.getObject3d();
    const body = carModel.getObjectByName( 'body' );
    if (ThreeUtil.isNotNull(body)) {
      this.wheels = [
        carModel.getObjectByName( 'wheel_fl' ),
        carModel.getObjectByName( 'wheel_fr' ),
        carModel.getObjectByName( 'wheel_rl' ),
        carModel.getObjectByName( 'wheel_rr' )
      ];
    }
  }

  grid : any = null;
  wheels : any[] = null;

  onRender(timer : RendererTimer) {
    super.onRender(timer);
    const time = - timer.elapsedTime;
    if (this.wheels !== null && this.wheels.length > 0) {
      this.wheels.forEach(wheel => {
        wheel.rotation.x = time * Math.PI;;  
      })      
    }
    if (this.grid !== null) {
      this.grid.position.z = - ( time ) % 5;
    }
  }

}
