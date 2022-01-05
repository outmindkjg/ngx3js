import { Component } from '@angular/core';
import {
	NgxBaseComponent,
	NgxMeshComponent,
	IRendererEvent,
	IRendererTimer,
	THREE,
	NgxMaterialComponent,
	ShaderMaterial
} from 'ngx3js';

@Component({
	selector: 'app-webgl-performance-shader',
	templateUrl: './webgl-performance-shader.component.html',
	styleUrls: ['./webgl-performance-shader.component.scss'],
})
export class WebglPerformanceShaderComponent extends NgxBaseComponent<{}> {
	constructor() {
		super({}, [], false, false);
	}

	fragmentShader = `
	uniform float time;

	uniform float fogDensity;
	uniform vec3 fogColor;

	uniform sampler2D texture1;
	uniform sampler2D texture2;

	varying vec2 vUv;

	void main( void ) {

		vec2 position = - 1.0 + 2.0 * vUv;

		vec4 noise = texture2D( texture1, vUv );
		vec2 T1 = vUv + vec2( 1.5, - 1.5 ) * time * 0.02;
		vec2 T2 = vUv + vec2( - 0.5, 2.0 ) * time * 0.01;

		T1.x += noise.x * 2.0;
		T1.y += noise.y * 2.0;
		T2.x -= noise.y * 0.2;
		T2.y += noise.z * 0.2;

		float p = texture2D( texture1, T1 * 2.0 ).a;

		vec4 color = texture2D( texture2, T2 * 2.0 );
		vec4 temp = color * ( vec4( p, p, p, p ) * 2.0 ) + ( color * color - 0.1 );

		if( temp.r > 1.0 ) { temp.bg += clamp( temp.r - 2.0, 0.0, 100.0 ); }
		if( temp.g > 1.0 ) { temp.rb += temp.g - 1.0; }
		if( temp.b > 1.0 ) { temp.rg += temp.b - 1.0; }

		gl_FragColor = temp;

		float depth = gl_FragCoord.z / gl_FragCoord.w;
		const float LOG2 = 1.442695;
		float fogFactor = exp2( - fogDensity * fogDensity * depth * depth * LOG2 );
		fogFactor = 1.0 - clamp( fogFactor, 0.0, 1.0 );

		gl_FragColor = mix( gl_FragColor, vec4( fogColor, gl_FragColor.w ), fogFactor );

	}	
	`;

	vertexShader = `
	uniform vec2 uvScale;
	varying vec2 vUv;

	void main()
	{

		vUv = uvScale * uv;
		vec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );
		gl_Position = projectionMatrix * mvPosition;

	}
	`;

	uniforms = {
		'fogDensity': { value: 0.001 },
		'fogColor': { value: new THREE.Vector3( 0, 0, 0 ) },
		'time': { value: 1.0 },
		'uvScale': { value: new THREE.Vector2( 3.0, 1.0 ) },
		'texture1': { type : 'texture', value: 'textures/lava/cloud.png', options : 'wraprepeat' },
		'texture2': { type : 'texture', value: 'textures/lava/lavatile.jpg', options : 'wraprepeat' }
	};

	ngOnInit() {
		this.meshInfos = [];
		for (let i = 0; i < 1000; i++) {
			const scale = Math.random() * 0.2 + 0.1;
			this.meshInfos.push({
				position: {
					x: Math.random() * 20 - 10,
					y: Math.random() * 20 - 10,
					z: Math.random() * 20 - 10,
				},
				rotation: {
					x: Math.random() * 360,
					y: Math.random() * 360,
					z: Math.random() * 360,
				},
				scale: {
					x: scale,
					y: scale,
					z: scale,
				},
			});
		}
	}

	meshInfos: {
		position: { x: number; y: number; z: number };
		rotation: { x: number; y: number; z: number };
		scale: { x: number; y: number; z: number };
	}[] = [];

	setMesh(mesh: NgxMeshComponent) {
		super.setMesh(mesh);
		this.meshChildren = mesh.getObject3d().children;
	}

	setMaterial(material: NgxMaterialComponent) {
		this.material = material.getMaterial();
	}
	material : ShaderMaterial = null;
	mouseX: number = 0;
	mouseY: number = 0;

	onMouseMove(event: IRendererEvent) {
		this.mouseX = event.mouse.x * event.width * 2;
		this.mouseY = event.mouse.y * event.height * 2;
	}

	onRender(timer: IRendererTimer) {
		super.onRender(timer);
		if (this.camera !== null && this.material !== null) {
			const uniforms = this.material.uniforms;
			this.material.needsUpdate = true;
			const delta = 5 * timer.delta;
			uniforms[ 'time' ].value += 0.2 * delta;
		}
	}
}
