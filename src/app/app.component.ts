import { Component } from '@angular/core';
import { MenuVo } from './common-interface';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public menuList : MenuVo[] = [
    { url : 'ch01', name : 'Creating Your First 3D Scene with Three.js'},
    { url : 'ch02', name : 'Basic Components That Make Up a Three.js Scene'},
    { url : 'ch03', name : 'Working with the Different Light Sources Available in Three.js'},
    { url : 'ch04', name : 'Working with Three.js Materials'},
    { url : 'ch05', name : 'Learning to Work with Geometries'},
    { url : 'ch06', name : 'Advanced Geometries and Binary Operations'},
    { url : 'ch07', name : 'Particles, Sprites, and the Point Cloud'},
    { url : 'ch08', name : 'Creating and Loading Advanced Meshes and Geometries'},
    { url : 'ch09', name : 'Animations and Moving the Camera'},
    { url : 'ch10', name : 'Loading and Working with Textures'},
    { url : 'ch11', name : 'Custom Shaders and Render Postprocessing'},
    { url : 'ch12', name : 'Adding Physics and Sounds to Your Scene'}
  ];

}
