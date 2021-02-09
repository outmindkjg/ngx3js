import { Component, OnInit } from '@angular/core';
import { AbstractThreeController } from '../../three/controller.abstract';
import { GeometriesVector3, GuiControlParam, RendererTimer } from './../../three';

@Component({
  selector: 'app-page1301',
  templateUrl: './page1301.component.html',
  styleUrls: ['./page1301.component.scss']
})
export class Page1301Component implements OnInit {

  controller = Page1301Controller;

  controls = {
    rotate: true,
    wireframe: false,
  }

  controlsParams: GuiControlParam[] = [
    { name: "rotate", type: "checkbox" },
    { name: "wireframe", type: "checkbox" },
  ]

  buttonClick(e)  {
    console.log(e);
  }

  constructor() { }

  ngOnInit(): void {

  }

  rotation: GeometriesVector3 = {
    x: 0, y: 0, z: 0
  }

  onRender(timer: RendererTimer) {
    if (this.controls.rotate) {
      this.rotation.y += timer.delta * 20;
      this.rotation.x = this.rotation.z = this.rotation.y;
    }

  }
}


export class Page1301Controller extends AbstractThreeController {

}
