import { MeshComponent } from './../../three/mesh/mesh.component';
import { RendererTimer } from './../../three/interface';
import { Component } from '@angular/core';
import { BaseComponent } from '../../three';
import * as THREE from 'three';
import { CameraComponent } from '../../three/camera/camera.component';

@Component({
  selector: 'app-webgl-camera',
  templateUrl: './webgl-camera.component.html',
  styleUrls: ['./webgl-camera.component.scss']
})
export class WebglCameraComponent extends BaseComponent<{
  cameraType : string
}> {

  constructor() {
    super({ cameraType : 'perspective' },[
      { name : 'cameraType', title : 'CamaraType', type : 'select', select : ['perspective','orthographic'],
        change : () => {
          this.changeCameraType();
        }
      }
    ]);
  }

  vertices : number[] = [];

  changeCameraType() {
    if (this.cameraPerspective !== null && this.cameraOrthographic !== null) {
      this.cameraOrthographic.setVisible(false, false);
      this.cameraPerspective.setVisible(false, false);
      switch(this.controls.cameraType) {
        case 'perspective' :
          this.cameraControl = this.cameraPerspective;
          break;
        case 'orthographic' :
            this.cameraControl = this.cameraOrthographic;
            break;
      }
      this.cameraControl.setVisible(true, true);
    }
  }

  ngOnInit() {
    this.vertices = [];
    for ( let i = 0; i < 10000; i ++ ) {
      this.vertices.push( THREE.MathUtils.randFloatSpread( 2000 ) ); // x
      this.vertices.push( THREE.MathUtils.randFloatSpread( 2000 ) ); // y
      this.vertices.push( THREE.MathUtils.randFloatSpread( 2000 ) ); // z
    }
  }

  public sphere1 : MeshComponent = null;

  setSphere1(sphere1 : MeshComponent) {
    this.sphere1 = sphere1;
  }

  public cameraRig : MeshComponent = null;

  setCameraRig(cameraRig : MeshComponent) {
    this.cameraRig = cameraRig;
  }

  public cameraMain : CameraComponent = null;

  setCameraMain(cameraMain : CameraComponent) {
    this.cameraMain = cameraMain;
    this.changeCameraType();
  }
  
  public cameraPerspective : CameraComponent = null;

  setCameraPerspective(cameraPerspective : CameraComponent) {
    this.cameraPerspective = cameraPerspective;
    this.changeCameraType();
  }

  public cameraOrthographic : CameraComponent = null;

  setCameraOrthographic(cameraOrthographic : CameraComponent) {
    this.cameraOrthographic = cameraOrthographic;
    this.changeCameraType();
  }

  public cameraControl : CameraComponent = null;

  onRender(timer: RendererTimer) {
    super.onRender(timer);
    const r = timer.elapsedTime * 0.5;
    if (this.mesh !== null) {
      this.mesh.setPosition(
        700 * Math.cos( r ),
        700 * Math.sin( r ),
        700 * Math.sin( r )
      );
    }
    if (this.sphere1 !== null) {
      this.sphere1.setPosition(
        70 * Math.cos( 2 * r ),
        150,
        70 * Math.sin( r )
      )
    }
    if (this.cameraRig !== null && this.mesh !== null) {
      const sphere1Position = this.mesh.getPosition();
      this.cameraRig.setLookat(sphere1Position.x, sphere1Position.y, sphere1Position.z);
    }
    if (this.cameraPerspective !== null && this.cameraOrthographic !== null && this.mesh !== null) {
      if (this.cameraPerspective === this.cameraControl) {
        const cameraPerspective:THREE.PerspectiveCamera = this.cameraPerspective.getCamera();
        cameraPerspective.fov =35 + 30 * Math.sin( 0.5 * r );
        cameraPerspective.far = this.mesh.getPosition().length();
        cameraPerspective.updateProjectionMatrix();
      } else if (this.cameraOrthographic === this.cameraControl) {
        const cameraOrthographic:THREE.OrthographicCamera = this.cameraOrthographic.getCamera();
        cameraOrthographic.far = this.mesh.getPosition().length();
        cameraOrthographic.updateProjectionMatrix();
      }
    }
  }
}

