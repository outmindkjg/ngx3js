import { Component, OnInit } from '@angular/core';
import { GeometriesVector3, GuiControlParam, RendererTimer } from './../../three';
import * as THREE from 'three';
@Component({
  selector: 'app-page0409',
  templateUrl: './page0409.component.html',
  styleUrls: ['./page0409.component.scss']
})
export class Page0409Component implements OnInit {

  controls = {
  }

  controlsParams: GuiControlParam[] = [
  ]

  constructor() { }

  vertices: GeometriesVector3[] = [];
  colors: string[] = [];

  ngOnInit(): void {
    var points = this.gosper(4, 60);
    points.forEach((e) => {
        this.vertices.push({ x : e.x, y: e.z, z : e.y });
        const color = new THREE.Color(0xffffff);
        color.setHSL(e.x / 100 + 0.5, (  e.y * 20 ) / 300, 0.8);
        this.colors.push(color.getStyle());
    });

  }

  rotation: GeometriesVector3 = {
    x: 0, y: 0, z: 0
  }

  onRender(timer: RendererTimer) {
    this.rotation.z += timer.delta * 20;
    this.rotation.x = this.rotation.y = this.rotation.z;
  }
  
  gosper(a, b) {

    var turtle = [0, 0, 0];
    var points = [];
    var count = 0;

    rg(a, b, turtle);


    return points;

    function rt(x) {
      turtle[2] += x;
    }

    function lt(x) {
      turtle[2] -= x;
    }

    function fd(dist) {
      //                ctx.beginPath();
      points.push({ x: turtle[0], y: turtle[1], z: Math.sin(count) * 5 });
      //                ctx.moveTo(turtle[0], turtle[1]);

      var dir = turtle[2] * (Math.PI / 180);
      turtle[0] += Math.cos(dir) * dist;
      turtle[1] += Math.sin(dir) * dist;

      points.push({ x: turtle[0], y: turtle[1], z: Math.sin(count) * 5 });
      //                ctx.lineTo(turtle[0], turtle[1]);
      //                ctx.stroke();

    }

    function rg(st, ln, turtle) {

      st--;
      ln = ln / 2.6457;
      if (st > 0) {
        //                    ctx.strokeStyle = '#111';
        rg(st, ln, turtle);
        rt(60);
        gl(st, ln, turtle);
        rt(120);
        gl(st, ln, turtle);
        lt(60);
        rg(st, ln, turtle);
        lt(120);
        rg(st, ln, turtle);
        rg(st, ln, turtle);
        lt(60);
        gl(st, ln, turtle);
        rt(60);
      }
      if (st == 0) {
        fd(ln);
        rt(60);
        fd(ln);
        rt(120);
        fd(ln);
        lt(60);
        fd(ln);
        lt(120);
        fd(ln);
        fd(ln);
        lt(60);
        fd(ln);
        rt(60)
      }
    }

    function gl(st, ln, turtle) {
      st--;
      ln = ln / 2.6457;
      if (st > 0) {
        lt(60);
        rg(st, ln, turtle);
        rt(60);
        gl(st, ln, turtle);
        gl(st, ln, turtle);
        rt(120);
        gl(st, ln, turtle);
        rt(60);
        rg(st, ln, turtle);
        lt(120);
        rg(st, ln, turtle);
        lt(60);
        gl(st, ln, turtle);
      }
      if (st == 0) {
        lt(60);
        fd(ln);
        rt(60);
        fd(ln);
        fd(ln);
        rt(120);
        fd(ln);
        rt(60);
        fd(ln);
        lt(120);
        fd(ln);
        lt(60);
        fd(ln);
      }
    }
  }

}
