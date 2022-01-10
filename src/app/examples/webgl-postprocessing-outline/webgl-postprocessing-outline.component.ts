import { Component } from '@angular/core';
import { I3JS, NgxBaseComponent, NgxPassComponent, IRendererEvent, THREE, IRendererTimer, NgxRendererComponent } from 'ngx3js';

@Component({
	selector: 'app-webgl-postprocessing-outline',
	templateUrl: './webgl-postprocessing-outline.component.html',
	styleUrls: ['./webgl-postprocessing-outline.component.scss'],
})
export class WebglPostprocessingOutlineComponent extends NgxBaseComponent<{
	edgeStrength: number;
	edgeGlow: number;
	edgeThickness: number;
	pulsePeriod: number;
	rotate: boolean;
	usePatternTexture: boolean;
	visibleEdgeColor: string;
	hiddenEdgeColor: string;
}> {
	constructor() {
		super(
			{
				edgeStrength: 3.0,
				edgeGlow: 0.0,
				edgeThickness: 1.0,
				pulsePeriod: 0,
				rotate: true,
				usePatternTexture: false,
				visibleEdgeColor: '#ffffff',
				hiddenEdgeColor: '#190a05',
			},
			[
				{ name: 'edgeStrength', type: 'number', min: 0.01, max: 10 },
				{ name: 'edgeGlow', type: 'number', min: 0.0, max: 1 },
				{ name: 'edgeThickness', type: 'number', min: 1, max: 4 },
				{ name: 'pulsePeriod', type: 'number', min: 0.0, max: 5 },
				{ name: 'rotate', type: 'checkbox' },
				{ name: 'usePatternTexture', type: 'checkbox' },
				{ name: 'visibleEdgeColor', type: 'color' },
				{ name: 'hiddenEdgeColor', type: 'color' },
			]
			,false , false);
	}

	ngOnInit() {
		this.sphereInfos = [];
		for (let i = 0; i < 20; i++) {
			this.sphereInfos.push({
				x: Math.random() * 4 - 2,
				y: Math.random() * 4 - 2,
				z: Math.random() * 4 - 2,
				color: 'hsl(' + Math.random() + ',1.0,0.3)',
				scale: Math.random() * 0.3 + 0.1,
			});
		}
	}
	sphereInfos: {
		x: number;
		y: number;
		z: number;
		color: string;
		scale: number;
	}[] = [];

	outlinePass: any = null;
	setOutlinePass(pass: NgxPassComponent) {
		this.outlinePass = pass.getPass();
		this.outlinePass.selectedObjects = this.selectedObjects;
	}

	onPointerMove( event : IRendererEvent ) {
		this.mouse = event.mouse;
		this.checkIntersection();
	}

	mouse : I3JS.Vector2 = new THREE.Vector2();
	addSelectedObject( object ) {
		this.selectedObjects.length = 0;
		this.selectedObjects.push( object );
	}

	setRender(render : NgxRendererComponent) {
		super.setRender(render);
		this.subscribeRefer('rederderSize',  this.renderer.sizeSubscribe().subscribe(size => {
			if (this.shaderPass !== null) {
				this.shaderPass.uniforms['resolution'].value.set(1/size.x, 1/size.y);
			}
		}));
	}

	setShaderPass(shaderPass : NgxPassComponent) {
		this.shaderPass = shaderPass.getPass();
	}

	shaderPass : I3JS.ShaderPass = null;


	checkIntersection() {
		if (this.camera !== null ) {
			const intersects = this.camera.getIntersections(this.mouse, this.meshObject3d , true );
			if ( intersects.length > 0 ) {
				const selectedObject = intersects[ 0 ].object;
				this.addSelectedObject( selectedObject );
				this.outlinePass.selectedObjects = this.selectedObjects;
			} else {
				// outlinePass.selectedObjects = [];
			}
		}
	}

	selectedObjects: I3JS.Object3D[] = [];

	onRender(timer: IRendererTimer): void {
		super.onRender(timer);
		if ( this.meshObject3d && this.controls.rotate ) {
			this.meshObject3d.rotation.y += timer.delta * 0.1;
		}
	}

}
