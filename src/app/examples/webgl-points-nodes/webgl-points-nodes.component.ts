import { Component } from '@angular/core';
import { I3JS, NgxBaseComponent, NgxMeshComponent, IRendererTimer, THREE, NgxThreeUtil, NODES } from 'ngx3js';

@Component({
	selector: 'app-webgl-points-nodes',
	templateUrl: './webgl-points-nodes.component.html',
	styleUrls: ['./webgl-points-nodes.component.scss'],
})
export class WebglPointsNodesComponent extends NgxBaseComponent<{
	sizeAttenuation : boolean;
	lerpPosition : number;
}> {
	constructor() {
		super({
			sizeAttenuation : true,
			lerpPosition : 0
		}, [
			{ type : 'checkbox', name : 'sizeAttenuation', change : () => {
				this.material.sizeAttenuation = this.controls.sizeAttenuation;
				this.material.needsUpdate = true;
			}},
			{ type : 'number', name : 'lerpPosition', min : 0, max : 1, step : 0.001, change : () => {
				this.lerpPosition.value = this.controls.lerpPosition;	
			}}
		], false, false);
	}
	frame : I3JS.NodeFrame = null;
	ngOnInit() {
		this.frame = new NODES.NodeFrame();
		const teapotGeometry = new THREE.TeapotGeometry( 50, 7 );
		this.positionAttribute = teapotGeometry.getAttribute( 'position' ) as I3JS.BufferAttribute;
		const particleCount = this.positionAttribute.count;
		const speed = [];
		const intensity = [];
		const size = [];
		for ( let i = 0; i < particleCount; i ++ ) {
			speed.push( 20 + Math.random() * 50 );
			intensity.push( Math.random() * .15 );
			size.push( 30 + Math.random() * 230 );
		}
		this.targetPosition = new THREE.SphereGeometry( 50, 130, 16 ).getAttribute('position')  as I3JS.BufferAttribute ;
		this.speed = speed;
		this.intensity = intensity;
		this.size = size;
	}

	positionAttribute : I3JS.BufferAttribute = null;
	speed : number[] = [];
	intensity : number[] = [];
	size : number[] = [];
	targetPosition : I3JS.BufferAttribute = null;

	setMesh(mesh: NgxMeshComponent) {
		super.setMesh(mesh);
		const object3d = mesh.getObject3d() as any;
		const geometry = object3d.geometry;
		geometry.setAttribute( 'position', this.positionAttribute );
		geometry.setAttribute( 'targetPosition', this.targetPosition );
		geometry.setAttribute( 'particleSpeed', new THREE.Float32BufferAttribute( this.speed, 1 ) );
		geometry.setAttribute( 'particleIntensity', new THREE.Float32BufferAttribute( this.intensity, 1 ) );
		geometry.setAttribute( 'particleSize', new THREE.Float32BufferAttribute( this.size, 1 ) );

		const fireMap = new THREE.TextureLoader().load( NgxThreeUtil.getStoreUrl('textures/sprites/firetorch_1.jpg'));

		// nodes

		const targetPosition = new NODES.AttributeNode( 'targetPosition', 'vec3' );
		const particleSpeed = new NODES.AttributeNode( 'particleSpeed', 'float' );
		const particleIntensity = new NODES.AttributeNode( 'particleIntensity', 'float' );
		const particleSize = new NODES.AttributeNode( 'particleSize', 'float' );

		const time = new NODES.TimerNode();
		const spriteSheetCount = new NODES.Vector2Node( new THREE.Vector2( 6, 6 ) ).setConst( true );
		const fireUV = new NODES.SpriteSheetUVNode( 
			spriteSheetCount, // count
			new NODES.PointUVNode(), // uv
			new NODES.OperatorNode( '*', time, particleSpeed ) // current frame
		);
		const fireSprite = new NODES.TextureNode( fireMap, fireUV );
		const fire = new NODES.OperatorNode( '*', fireSprite, particleIntensity );

		const lerpPosition = this.lerpPosition = new NODES.FloatNode( 0 );

		const positionNode = new NODES.MathNode( NODES.MathNode.MIX, new NODES.PositionNode( NODES.PositionNode.LOCAL ), targetPosition, lerpPosition );

		// material

		const material = new NODES.PointsNodeMaterial( {
			depthWrite: false,
			transparent: true,
			sizeAttenuation: true,
			blending: THREE.AdditiveBlending
		} );

		material.colorNode = fire;
		material.sizeNode = particleSize;
		material.positionNode = positionNode;
		object3d.material = material;
		this.material = material;
		NODES.OnNodeBuildBeforeRender(this.frame, this.material);
	}

	material : I3JS.PointsNodeMaterial = null;
	lerpPosition : I3JS.FloatNode = null;

	onRender(timer: IRendererTimer) {
		super.onRender(timer);
		if (this.frame !== null && this.material !== null) {
			this.frame.update(timer.delta);
		}

	}
}
