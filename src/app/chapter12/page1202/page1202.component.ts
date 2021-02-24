import { Component, OnInit } from '@angular/core';
import { AudioComponent } from '../../three/audio/audio.component';
import { GeometriesVector3, GuiControlParam, RendererTimer } from './../../three';
import * as THREE from 'three';

@Component({
  selector: 'app-page1202',
  templateUrl: './page1202.component.html',
  styleUrls: ['./page1202.component.scss']
})
export class Page1202Component implements OnInit {

  controls = {
    master :  {
      volume : 1,
      visible : true
    },
    box :  {
      volume : 1,
      refDistance : 3,
      rolloffFactor : 3,
      maxDistance : 3,
      play : true,
      visible : true
    },
    rotate: true,
    wireframe: false,
  }

  controlsParams: GuiControlParam[] = [
    { name : "Listener" , type : "folder", control : "master", children : [
      { name: "volume", type: "number", min : 0, max : 3 },
      { name: "visible", type: "checkbox" },
    ], isOpen : true},
    { name : "Box" , type : "folder", control : "box", children : [
      { name: "volume", type: "number", min : 0, max : 3 },
      { name: "refDistance", type: "number", min : 0, max : 3 },
      { name: "rolloffFactor", type: "number", min : 0, max : 3 },
      { name: "maxDistance", type: "number", min : 0, max : 3 },
      { name: "play", type: "checkbox" },
      { name: "visible", type: "checkbox" },
    ], isOpen : true},
    { name: "rotate", type: "checkbox" },
    { name: "wireframe", type: "checkbox" },
  ]

  constructor() { }

  ngOnInit(): void {

  }

  analyser : THREE.AudioAnalyser = null;

  audioData : {
    uniforms : any;
    vertexShader : any;
    fragmentShader : any;
  } = null;

  fftSize : number = 128;
  
  setAudioComponent(audio : AudioComponent) {
    this.analyser = audio.getAnalyser();
    this.audioData = {
      uniforms : {
        tAudioData: { value: new THREE.DataTexture( this.analyser.data, this.fftSize / 2, 1, THREE.RedFormat ) }
      },
      vertexShader : `
varying vec2 vUv;

void main() {

  vUv = uv;

  gl_Position = vec4( position, 1.0 );

}
      `,
      fragmentShader : `
uniform sampler2D tAudioData;
varying vec2 vUv;

void main() {

  vec3 backgroundColor = vec3( 0.125, 0.125, 0.125 );
  vec3 color = vec3( 1.0, 1.0, 0.0 );

  float f = texture2D( tAudioData, vec2( vUv.x, 0.0 ) ).r;

  float i = step( vUv.y, f ) * step( f - 0.0125, vUv.y );

  gl_FragColor = vec4( mix( backgroundColor, color, i ), 1.0 );

}
      `
    }
  }

  rotation: GeometriesVector3 = {
    x: 0, y: 0, z: 0
  }

  onRender(timer: RendererTimer) {
    if (this.analyser !== null) {
      this.analyser.getFrequencyData();
      this.audioData.uniforms.tAudioData.value.needsUpdate = true;
    }
    if (this.controls.rotate) {
      this.rotation.y += timer.delta * 20;
      this.rotation.x = this.rotation.z = this.rotation.y;
    }
  }

}
