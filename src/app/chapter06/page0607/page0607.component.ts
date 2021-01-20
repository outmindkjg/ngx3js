import { Component, OnInit } from '@angular/core';
import { GeometriesVector3, GuiControlParam, RendererTimer, GeometriesParametric } from 'src/app/three';

@Component({
  selector: 'app-page0607',
  templateUrl: './page0607.component.html',
  styleUrls: ['./page0607.component.scss']
})
export class Page0607Component implements OnInit {

  controls = {
    size : 10 ,
    text : 'ThreeJs',
    height : 10 ,
    bevelThickness : 2 ,
    bevelSize : 0.5 ,
    bevelEnabled : true ,
    bevelSegments : 3 ,
    curveSegments : 12 ,
    steps : 1 ,
    font : "do_hyeon" ,
    weight : "regular" ,
    wireframe: false
  }

  text : string = "테스트";
  parametric: string | GeometriesParametric = 'mobius3d';

  controlsParams: GuiControlParam[] = [
    { name: "size", type: "number", min : 0, max : 10 },
    { name: "text", type: "button", finishChange : (e) => {
      this.text = e;
    } },
    { name: "height", type: "number", min : 0, max : 10 },
    { name: "font", type: "select", select : ['helvetiker', 'gentilis','optimer','sans','sans_mono','nanumgothic','do_hyeon'] },
    { name: "weight", type: "select", select : ['regular', 'bold'] },
    { name: "bevelThickness", type: "number", min : 0, max : 10 },
    { name: "bevelSize", type: "number", min : 0, max : 10 },
    { name: "bevelSegments", type: "number", min : 0, max : 30, step : 1 },
    { name: "bevelEnabled", type: "botton" },
    { name: "curveSegments", type: "number", min : 0, max : 30, step : 1 },
    { name: "steps", type: "number", min : 0, max : 5, step : 1 },
    { name: "wireframe", type: "button" },
  ]


  constructor() { }

  ngOnInit(): void {

  }

  points: GeometriesVector3[] = [];
  rotation: GeometriesVector3 = {
    x: 0, y: 0, z: 0
  }

  onRender(timer: RendererTimer) {
    this.rotation.y += timer.delta * 20;
    this.rotation.x = this.rotation.z = this.rotation.y;
  }
}
