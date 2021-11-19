import { Component } from '@angular/core';
import { BaseComponent, RendererTimer } from 'ngx3js';

/**
 * Rotate options
 */
 interface RotateOptions<T> {
	/** type */
	type?: string;

	/** speed */
	speed?: number;

	/** function Type */
	funType? : T;
	
}

@Component({
	selector: 'app-ngx-directives',
	templateUrl: './ngx-directives.component.html',
	styleUrls: ['./ngx-directives.component.scss'],
})
export class NgxDirectivesComponent extends BaseComponent<{
	ngx3jsRotate1 : RotateOptions<string>,
	ngx3jsRotate2 : RotateOptions<string>,
}> {
	constructor() {
		super(
			{
				ngx3jsRotate1 : {
					type : 'y',
					funType : 'sin',
					speed : 0.1
				},
				ngx3jsRotate2 : {
					type : 'xyz',
					funType : 'sin',
					speed : 0.4
				},
			},
			[
				{
					name: 'ngx3jsRotate1',
					type: 'folder',
					control: 'ngx3jsRotate1',
					children: [
						{ name: 'type', type: 'select', select : ['x','y','z','xy','xz','yz','xyz','function','none'], change : () => { this.changeRotate('ngx3jsRotate1')} },
						{ name: 'funType', type: 'select', select : ['sin','cos'], change : () => { this.changeRotate('ngx3jsRotate1')} },
						{ name: 'speed', type: 'number', min : -1, max : 1, step : 0.1, change : () => { this.changeRotate('ngx3jsRotate1')} },
					],
				},		
				{
					name: 'ngx3jsRotate2',
					type: 'folder',
					control: 'ngx3jsRotate2',
					children: [
						{ name: 'type', type: 'select', select : ['x','y','z','xy','xz','yz','xyz','function','none'], change : () => { this.changeRotate('ngx3jsRotate2')} },
						{ name: 'funType', type: 'select', select : ['sin','cos'], change : () => { this.changeRotate('ngx3jsRotate2')} },
						{ name: 'speed', type: 'number', min : -1, max : 1, step : 0.1, change : () => { this.changeRotate('ngx3jsRotate2')} },
					],
				},		
			],
			true,
			false
		);
	}

	ngOnInit() {
		this.changeRotate('ngx3jsRotate1');
		this.changeRotate('ngx3jsRotate2');
	}
	
	getFunctionRotate(type : string) : (object3d : THREE.Object3D, elapsedTime : number, timer : RendererTimer)=>void {
		switch(type) {
			case 'cos' :
				return (object3d : THREE.Object3D, elapsedTime : number, timer : RendererTimer) => {
					const angle = Math.cos(elapsedTime * 0.5) * Math.PI ;
					object3d.rotation.set(angle, angle * 0.1, angle * 0.5);
				}
			case 'sin' :
			default :
				return (object3d : THREE.Object3D, elapsedTime : number, timer : RendererTimer) => {
					const angle = Math.sin(elapsedTime * 0.5) * Math.PI ;
					object3d.rotation.set(angle, angle * 0.1, angle * 0.5);
				}
	
		}
	}

	changeRotate(type : string) {
		switch(type) {
			case 'ngx3jsRotate1' :
				this.ngx3jsRotate1 = { type : this.controls.ngx3jsRotate1.type, speed : this.controls.ngx3jsRotate1.speed, funType : this.getFunctionRotate(this.controls.ngx3jsRotate1.funType) };
				break;
			case 'ngx3jsRotate2' :
				this.ngx3jsRotate2 = { type : this.controls.ngx3jsRotate2.type, speed : this.controls.ngx3jsRotate2.speed, funType : this.getFunctionRotate(this.controls.ngx3jsRotate2.funType) };
				break;
		}
	}

	ngx3jsRotate1 : RotateOptions<(object3d : THREE.Object3D, elapsedTime : number, timer : RendererTimer)=>void> = {
		type : 'y',
		speed : 0
	}
	ngx3jsRotate2 : RotateOptions<(object3d : THREE.Object3D, elapsedTime : number, timer : RendererTimer)=>void> = {
		type : 'y',
		speed : 0
	}

}
