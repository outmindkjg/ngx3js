import { Component } from '@angular/core';
import {
	NgxBaseComponent,
	THREE,
	I3JS,
	NgxThreeUtil,
	TWEEN,
	NgxSharedComponent,
	IRendererInfo,
} from 'ngx3js';

@Component({
	selector: 'app-webgl-postprocessing-crossfade',
	templateUrl: './webgl-postprocessing-crossfade.component.html',
	styleUrls: ['./webgl-postprocessing-crossfade.component.scss'],
})
export class WebglPostprocessingCrossfadeComponent extends NgxBaseComponent<{
	useTexture: boolean;
	transition: number;
	texture: number;
	cycle: boolean;
	animate: boolean;
	threshold: number;
}> {
	constructor() {
		super(
			{
				useTexture: true,
				transition: 0,
				texture: 5,
				cycle: true,
				animate: true,
				threshold: 0.3,
			},
			[
				{ name: 'animate', type: 'checkbox' },
				{ name: 'transition', type: 'number', min: 0, max: 1, listen : true, step: 0.01 },
				{ name: 'useTexture', type: 'checkbox', change : () => {
					this.transition.useTexture(this.controls.useTexture);
				}},
				{
					name: 'texture',
					type: 'select',
					select: {
						Perlin: 0,
						Squares: 1,
						Cells: 2,
						Distort: 3,
						Gradient: 4,
						Radial: 5,
					},
					change : () => {
						this.transition.setTexture(this.controls.texture);
					}
				},
				{ name: 'cycle', type: 'checkbox' },
				{
					name: 'threshold',
					type: 'number',
					min: 0,
					max: 1,
					step: 0.01,
					change : () => {
						this.transition.setTextureThreshold(this.controls.threshold);
					}
				},
			],
			false,
			false
		);
	}

	setShared(shared: NgxSharedComponent) {
		const geometryList = shared.getGeometryComponents();
		let geometryA: I3JS.BufferGeometry = null;
		let geometryB: I3JS.BufferGeometry = null;
		geometryList.forEach((geometry, idx) => {
			switch (idx) {
				case 0:
					geometryA = geometry.getGeometry();
					break;
				case 1:
				default:
					geometryB = geometry.getGeometry();
					break;
			}
		});
		const sceneA = new FXScene(
			geometryA,
			new THREE.Vector3(0, -0.4, 0),
			new THREE.Color(0xffffff)
		);
		const sceneB = new FXScene(
			geometryB,
			new THREE.Vector3(0, 0.2, 0.1),
			new THREE.Color(0x000000)
		);
		this.transition = new Transition( sceneA, sceneB, this.controls );
	}

	transition : Transition = null;

	beforeRender: (info: IRendererInfo) => boolean;
	
	ngOnInit(): void {
		this.beforeRender = (info: IRendererInfo): boolean => {
			this.transition.render(info.renderer, info.timer.delta );
			return true;
		}
	}
}

class FXScene {
	clearColor: I3JS.Color = null;
	rotationSpeed: I3JS.Vector3 = null;
	fbo: I3JS.WebGLRenderTarget = null;
	mesh: I3JS.InstancedMesh = null;
	camera: I3JS.PerspectiveCamera = null;
	scene: I3JS.Scene = null;
	constructor(geometry, rotationSpeed, clearColor) {
		this.clearColor = clearColor;
		this.camera = new THREE.PerspectiveCamera(
			50,
			window.innerWidth / window.innerHeight,
			1,
			10000
		);
		this.camera.position.z = 2000;
		// Setup scene
		this.scene = new THREE.Scene();
		this.scene.add(new THREE.AmbientLight(0x555555));

		const light = new THREE.SpotLight(0xffffff, 1.5);
		light.position.set(0, 500, 2000);
		this.scene.add(light);

		this.rotationSpeed = rotationSpeed;

		const color = geometry.type === 'BoxGeometry' ? 0x0000ff : 0xff0000;
		const material = new THREE.MeshPhongMaterial({
			color: color,
			flatShading: true,
		});
		const mesh = this.generateInstancedMesh(geometry, material, 500);
		this.scene.add(mesh);
		this.mesh = mesh;
		const renderTargetParameters = {
			minFilter: THREE.LinearFilter,
			magFilter: THREE.LinearFilter,
			format: THREE.RGBFormat,
		};
		this.fbo = new THREE.WebGLRenderTarget(
			window.innerWidth,
			window.innerHeight,
			renderTargetParameters
		);
	}

	render(renderer, delta, rtt) {
		const mesh = this.mesh;
		const camera = this.camera;
		const scene = this.scene;
		mesh.rotation.x += delta * this.rotationSpeed.x;
		mesh.rotation.y += delta * this.rotationSpeed.y;
		mesh.rotation.z += delta * this.rotationSpeed.z;

		renderer.setClearColor(this.clearColor);

		if (rtt) {
			renderer.setRenderTarget(this.fbo);
			renderer.clear();
			renderer.render(scene, camera);
		} else {
			renderer.setRenderTarget(null);
			renderer.render(scene, camera);
		}
	}

	generateInstancedMesh(geometry, material, count) {
		const mesh = new THREE.InstancedMesh(geometry, material, count);

		const dummy = new THREE.Object3D();
		const color = new THREE.Color();

		for (let i = 0; i < count; i++) {
			dummy.position.x = Math.random() * 10000 - 5000;
			dummy.position.y = Math.random() * 6000 - 3000;
			dummy.position.z = Math.random() * 8000 - 4000;

			dummy.rotation.x = Math.random() * 2 * Math.PI;
			dummy.rotation.y = Math.random() * 2 * Math.PI;
			dummy.rotation.z = Math.random() * 2 * Math.PI;

			dummy.scale.x = Math.random() * 200 + 100;

			if (geometry.type === 'BoxGeometry') {
				dummy.scale.y = Math.random() * 200 + 100;
				dummy.scale.z = Math.random() * 200 + 100;
			} else {
				dummy.scale.y = dummy.scale.x;
				dummy.scale.z = dummy.scale.x;
			}

			dummy.updateMatrix();

			mesh.setMatrixAt(i, dummy.matrix);
			mesh.setColorAt(i, color.setScalar(0.1 + 0.9 * Math.random()));
		}

		return mesh;
	}
}

class Transition {
	needsTextureChange: boolean = false;
	material: I3JS.ShaderMaterial = null;
	camera: I3JS.OrthographicCamera = null;
	scene: I3JS.Scene = null;
	sceneA: FXScene = null;
	sceneB: FXScene = null;
	textures: I3JS.Texture[] = [];
	transitionParams: any = null;
	constructor(sceneA: FXScene, sceneB: FXScene, transitionParams : any) {
		this.sceneA = sceneA;
		this.sceneB = sceneB;
		this.transitionParams = transitionParams;
		this.scene = new THREE.Scene();
		const width = window.innerWidth;
		const height = window.innerHeight;
		this.camera = new THREE.OrthographicCamera(
			width / -2,
			width / 2,
			height / 2,
			height / -2,
			-10,
			10
		);

		this.textures = [];

		const loader = new THREE.TextureLoader();

		for (let i = 0; i < 6; i++) {
			this.textures[i] = loader.load(
				NgxThreeUtil.getStoreUrl(
					'textures/transition/transition' + (i + 1) + '.png'
				)
			);
		}

		this.material = new THREE.ShaderMaterial({
			uniforms: {
				tDiffuse1: {
					value: null,
				},
				tDiffuse2: {
					value: null,
				},
				mixRatio: {
					value: 0.0,
				},
				threshold: {
					value: 0.1,
				},
				useTexture: {
					value: 1,
				},
				tMixTexture: {
					value: this.textures[0],
				},
			},
			vertexShader: [
				'varying vec2 vUv;',

				'void main() {',

				'vUv = vec2( uv.x, uv.y );',
				'gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );',

				'}',
			].join('\n'),
			fragmentShader: [
				'uniform float mixRatio;',

				'uniform sampler2D tDiffuse1;',
				'uniform sampler2D tDiffuse2;',
				'uniform sampler2D tMixTexture;',

				'uniform int useTexture;',
				'uniform float threshold;',

				'varying vec2 vUv;',

				'void main() {',

				'	vec4 texel1 = texture2D( tDiffuse1, vUv );',
				'	vec4 texel2 = texture2D( tDiffuse2, vUv );',

				'	if (useTexture==1) {',

				'		vec4 transitionTexel = texture2D( tMixTexture, vUv );',
				'		float r = mixRatio * (1.0 + threshold * 2.0) - threshold;',
				'		float mixf=clamp((transitionTexel.r - r)*(1.0/threshold), 0.0, 1.0);',

				'		gl_FragColor = mix( texel1, texel2, mixf );',

				'	} else {',

				'		gl_FragColor = mix( texel2, texel1, mixRatio );',

				'	}',

				'}',
			].join('\n'),
		});

		const geometry = new THREE.PlaneGeometry(
			window.innerWidth,
			window.innerHeight
		);
		const mesh = new THREE.Mesh(geometry, this.material);
		this.scene.add(mesh);
		this.material.uniforms.tDiffuse1.value = sceneA.fbo.texture;
		this.material.uniforms.tDiffuse2.value = sceneB.fbo.texture;
		new TWEEN.Tween(transitionParams)
			.to({ transition: 1 }, 1500)
			.repeat(Infinity)
			.delay(2000)
			.yoyo(true)
			.start();
		this.needsTextureChange = false;
	}

	setTextureThreshold(value: number) {
		this.material.uniforms.threshold.value = value;
	}

	useTexture(value: boolean) {
		this.material.uniforms.useTexture.value = value ? 1 : 0;
	}

	setTexture(i) {
		this.material.uniforms.tMixTexture.value = this.textures[i];
	}

	render(renderer, delta) {
		// Transition animation
		const transitionParams = this.transitionParams;
		if (this.transitionParams.animate) {
			TWEEN.update();
			// Change the current alpha texture after each transition
			if (transitionParams.cycle) {
				if (
					transitionParams.transition == 0 ||
					transitionParams.transition == 1
				) {
					if (this.needsTextureChange) {
						transitionParams.texture =
							(transitionParams.texture + 1) % this.textures.length;
						this.material.uniforms.tMixTexture.value =
							this.textures[transitionParams.texture];
						this.needsTextureChange = false;
					}
				} else {
					this.needsTextureChange = true;
				}
			} else {
				this.needsTextureChange = true;
			}
		}

		this.material.uniforms.mixRatio.value = transitionParams.transition;

		// Prevent render both scenes when it's not necessary
		if (transitionParams.transition == 0) {
			this.sceneB.render(renderer, delta, false);
		} else if (transitionParams.transition == 1) {
			this.sceneA.render(renderer, delta, false);
		} else {
			// When 0<transition<1 render transition between two scenes

			this.sceneA.render(renderer, delta, true);
			this.sceneB.render(renderer, delta, true);

			renderer.setRenderTarget(null);
			renderer.clear();
			renderer.render(this.scene, this.camera);
		}
	}
}
