import { Component } from '@angular/core';
import { I3JS, IRendererTimer, NgxBaseComponent, NgxMeshComponent, THREE, TWEEN } from 'ngx3js';

@Component({
	selector: 'app-webgl-loader-collada-kinematics',
	templateUrl: './webgl-loader-collada-kinematics.component.html',
	styleUrls: ['./webgl-loader-collada-kinematics.component.scss'],
})
export class WebglLoaderColladaKinematicsComponent extends NgxBaseComponent<{}> {
	constructor() {
		super({}, [], false, false);
	}

	setMesh(mesh: NgxMeshComponent) {
		super.setMesh(mesh);
		const dae = mesh.getObject3d();
		dae.traverse((child: any) => {
			if (child.isMesh) {
				child.material.flatShading = true;
			}
		});
		this.kinematics = dae.userData.storageSource?.kinematics;
		if (this.kinematics) {
			this.setupTween();
		}
	}

	setPointLight(mesh : NgxMeshComponent) {
		this.particleLight = mesh.getMesh();
	}

	particleLight : I3JS.Object3D = null;

	kinematics : any = null;
	tweenParameters = {};
	kinematicsTween : any = null;
	setupTween() {
		const kinematics = this.kinematics;
		const tweenParameters = this.tweenParameters;
		const duration = THREE.MathUtils.randInt( 1000, 5000 );
		const target = {};
		for ( const prop in kinematics.joints ) {
			if ( kinematics.joints.hasOwnProperty( prop ) ) {
				if ( ! kinematics.joints[ prop ].static ) {
					const joint = kinematics.joints[ prop ];
					const old = tweenParameters[ prop ];
					const position = old ? old : joint.zeroPosition;
					tweenParameters[ prop ] = position;
					target[ prop ] = THREE.MathUtils.randInt( joint.limits.min, joint.limits.max );
				}
			}
		}
		this.kinematicsTween = new TWEEN.Tween( tweenParameters ).to( target, duration ).easing( TWEEN.Easing.Quadratic.Out );
		this.kinematicsTween.onUpdate( function ( object ) {
			for ( const prop in kinematics.joints ) {
				if ( kinematics.joints.hasOwnProperty( prop ) ) {
					if ( ! kinematics.joints[ prop ].static ) {
						kinematics.setJointValue( prop, object[ prop ] );
					}
				}
			}
		} );
		this.kinematicsTween.start();
		setTimeout( () => {
			this.setupTween()
		}, duration );
	}

	onRender(timer: IRendererTimer): void {
		super.onRender(timer);
		TWEEN.update();
		if (this.particleLight !== null) {
			const particleLight = this.particleLight;
			const elapsedTime = timer.elapsedTime / 10;
			particleLight.position.x = Math.sin( elapsedTime * 4 ) * 3009;
			particleLight.position.y = Math.cos( elapsedTime * 5 ) * 4000;
			particleLight.position.z = Math.cos( elapsedTime * 4 ) * 3009;
		}
	}
}
