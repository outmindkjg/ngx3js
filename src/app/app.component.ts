import { Component } from '@angular/core';
import { MenuVo } from './common-interface';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public menuList : MenuVo[] = [
    { url : 'ch01', name : '01. Creating Your First 3D Scene with Three.js'},
    { url : 'ch02', name : '02. Basic Components That Make Up a Three.js Scene'},
    { url : 'ch03', name : '03. Working with the Different Light Sources Available in Three.js'},
    { url : 'ch04', name : '04. Working with Three.js Materials'},
    { url : 'ch05', name : '05. Learning to Work with Geometries'},
    { url : 'ch06', name : '06. Advanced Geometries and Binary Operations'},
    { url : 'ch07', name : '07. Particles, Sprites, and the Point Cloud'},
    { url : 'ch08', name : '08. Creating and Loading Advanced Meshes and Geometries'},
    { url : 'ch09', name : '09. Animations and Moving the Camera'},
    { url : 'ch10', name : '10. Loading and Working with Textures'},
    { url : 'ch11', name : '11. Custom Shaders and Render Postprocessing'},
    { url : 'ch12', name : '12. Adding Physics and Sounds to Your Scene'},
    { url : 'ch13', name : '13. Canvas 2D'}
  ];

}
