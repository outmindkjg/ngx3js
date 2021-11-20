import { Component } from '@angular/core';
import { BaseComponent, RendererTimer, Object3dFunction, ObjectFunction } from 'ngx3js';

/**
 * Rotate options
 */
interface RotateOptions {
	/** type */
	type?: string;

	/** speed */
	speed?: number;
}

/**
 * Directive options
 */
interface DirectiveOptions {
	/** type */
	type?: string;

	/** yoyo */
	yoyo?: boolean;

	/** yoyo */
	min?: number;

	/** yoyo */
	max?: number;

	/** speed */
	speed?: number;
}

/**
 * Rotate options
 */
interface ObjectOptions {
	/** rotate */
	rotate?: RotateOptions;
	scale?: DirectiveOptions;
	position?: DirectiveOptions;
}

@Component({
	selector: 'app-ngx-directives',
	templateUrl: './ngx-directives.component.html',
	styleUrls: ['./ngx-directives.component.scss'],
})
export class NgxDirectivesComponent extends BaseComponent<{
	directionalIntensity : DirectiveOptions,
	ambientIntensity : DirectiveOptions,
	floorOpacity  : DirectiveOptions,
	main: ObjectOptions;
	object1: ObjectOptions;
	object2: ObjectOptions;
	object3: ObjectOptions;
	object4: ObjectOptions;
}> {
	constructor() {
		super(
			{
				directionalIntensity : {
					type: 'none',
					speed: 0.1,
					yoyo: true,
					min: 0.5,
					max: 1,
				},
				ambientIntensity : {
					type: 'none',
					speed: 0.1,
					yoyo: true,
					min: 0,
					max: 1,
				},
				floorOpacity : {
					type: 'none',
					speed: 0.1,
					yoyo: true,
					min: 0,
					max: 1,
				},
				main: {
					rotate: {
						type: 'y',
						speed: 0.1,
					},
					scale: {
						type: 'none',
						speed: 0.1,
						yoyo: true,
						min: 0.5,
						max: 1.5,
					},
					position: {
						type: 'none',
						speed: 0.5,
						yoyo: true,
						min: 0,
						max: 3,
					},
				},
				object1: {
					rotate: {
						type: 'x',
						speed: 0.4,
					},
					scale: {
						type: 'z',
						speed: 0.1,
						yoyo: true,
						min: 0.5,
						max: 1.5,
					},
					position: {
						type: 'circle',
						speed: 0.5,
						yoyo: true,
						min: 0,
						max: 3,
					},
				},
				object2: {
					rotate: {
						type: 'y',
						speed: 0.4,
					},
					scale: {
						type: 'y',
						speed: 0.1,
						yoyo: true,
						min: 0.5,
						max: 1.5,
					},
					position: {
						type: 'y',
						speed: 0.5,
						yoyo: true,
						min: 0,
						max: 3,
					},
				},
				object3: {
					rotate: {
						type: 'z',
						speed: 0.4,
					},
					scale: {
						type: 'z',
						speed: 0.1,
						yoyo: true,
						min: 0.5,
						max: 1.5,
					},
					position: {
						type: 'z',
						speed: 0.5,
						yoyo: true,
						min: 0,
						max: 3,
					},
				},
				object4: {
					rotate: {
						type: 'xyz',
						speed: 0.4,
					},
					scale: {
						type: 'xyz',
						speed: 0.1,
						yoyo: true,
						min: 0.5,
						max: 1.5,
					},
					position: {
						type: 'xyz',
						speed: 0.5,
						yoyo: true,
						min: 0,
						max: 3,
					},
				},
			},
			[
				{
					name: 'directionalIntensity',
					type: 'folder',
					control: 'directionalIntensity',
					children: [
						{
							name: 'type',
							type: 'select',
							select: [
								'intensity',
								'sin',
								'none',
							],
							change: () => {
								this.changeNumber('directionalIntensity');
							},
						},
						{
							name: 'speed',
							type: 'number',
							min: -1,
							max: 1,
							step: 0.1,
							change: () => {
								this.changeNumber('directionalIntensity');
							},
						},
						{
							name: 'yoyo',
							type: 'checkbox',
							change: () => {
								this.changeNumber('directionalIntensity');
							},
						},
						{
							name: 'min',
							type: 'number',
							min: 0,
							max: 0.5,
							step: 0.1,
							change: () => {
								this.changeNumber('directionalIntensity');
							},
						},
						{
							name: 'max',
							type: 'number',
							min: 0.5,
							max: 1.5,
							step: 0.1,
							change: () => {
								this.changeNumber('directionalIntensity');
							},
						},
					]
				},
				{
					name: 'ambientIntensity',
					type: 'folder',
					control: 'ambientIntensity',
					children: [
						{
							name: 'type',
							type: 'select',
							select: [
								'intensity',
								'sin',
								'none',
							],
							change: () => {
								this.changeNumber('ambientIntensity');
							},
						},
						{
							name: 'speed',
							type: 'number',
							min: -1,
							max: 1,
							step: 0.1,
							change: () => {
								this.changeNumber('ambientIntensity');
							},
						},
						{
							name: 'yoyo',
							type: 'checkbox',
							change: () => {
								this.changeNumber('ambientIntensity');
							},
						},
						{
							name: 'min',
							type: 'number',
							min: 0,
							max: 0.5,
							step: 0.1,
							change: () => {
								this.changeNumber('ambientIntensity');
							},
						},
						{
							name: 'max',
							type: 'number',
							min: 0.5,
							max: 1.5,
							step: 0.1,
							change: () => {
								this.changeNumber('ambientIntensity');
							},
						},
					]
				},
				{
					name: 'floorOpacity',
					type: 'folder',
					control: 'floorOpacity',
					children: [
						{
							name: 'type',
							type: 'select',
							select: [
								'opacity',
								'none',
							],
							change: () => {
								this.changeNumber('floorOpacity');
							},
						},
						{
							name: 'speed',
							type: 'number',
							min: -1,
							max: 1,
							step: 0.1,
							change: () => {
								this.changeNumber('floorOpacity');
							},
						},
						{
							name: 'yoyo',
							type: 'checkbox',
							change: () => {
								this.changeNumber('floorOpacity');
							},
						},
						{
							name: 'min',
							type: 'number',
							min: 0,
							max: 0.5,
							step: 0.1,
							change: () => {
								this.changeNumber('floorOpacity');
							},
						},
						{
							name: 'max',
							type: 'number',
							min: 0.5,
							max: 1,
							step: 0.1,
							change: () => {
								this.changeNumber('floorOpacity');
							},
						},
					]
				},
				
				{
					name: 'main',
					type: 'folder',
					control: 'main',
					children: [
						{
							name: 'rotate',
							type: 'folder',
							control: 'rotate',
							children: [
								{
									name: 'type',
									type: 'select',
									select: [
										'x',
										'y',
										'z',
										'xy',
										'xz',
										'yz',
										'xyz',
										'sin',
										'cos',
										'none',
									],
									change: () => {
										this.changeRotate('main');
									},
								},
								{
									name: 'speed',
									type: 'number',
									min: -1,
									max: 1,
									step: 0.1,
									change: () => {
										this.changeRotate('main');
									},
								},
							],
						},
						{
							name: 'scale',
							type: 'folder',
							control: 'scale',
							children: [
								{
									name: 'type',
									type: 'select',
									select: [
										'x',
										'y',
										'z',
										'xy',
										'xz',
										'yz',
										'xyz',
										'sin',
										'cos',
										'none',
									],
									change: () => {
										this.changeScale('main');
									},
								},
								{
									name: 'speed',
									type: 'number',
									min: -1,
									max: 1,
									step: 0.1,
									change: () => {
										this.changeScale('main');
									},
								},
								{
									name: 'yoyo',
									type: 'checkbox',
									change: () => {
										this.changeScale('main');
									},
								},
								{
									name: 'min',
									type: 'number',
									min: 0,
									max: 0.5,
									step: 0.1,
									change: () => {
										this.changeScale('main');
									},
								},
								{
									name: 'max',
									type: 'number',
									min: 0.5,
									max: 1.5,
									step: 0.1,
									change: () => {
										this.changeScale('main');
									},
								},
							],
						},
						{
							name: 'position',
							type: 'folder',
							control: 'position',
							children: [
								{
									name: 'type',
									type: 'select',
									select: [
										'x',
										'y',
										'z',
										'xy',
										'xz',
										'yz',
										'xyz',
										'circle',
										'none',
									],
									change: () => {
										this.changePosition('main');
									},
								},
								{
									name: 'speed',
									type: 'number',
									min: -1,
									max: 1,
									step: 0.1,
									change: () => {
										this.changePosition('main');
									},
								},
								{
									name: 'yoyo',
									type: 'checkbox',
									change: () => {
										this.changePosition('main');
									},
								},
								{
									name: 'min',
									type: 'number',
									min: -3,
									max: 0,
									step: 0.1,
									change: () => {
										this.changePosition('main');
									},
								},
								{
									name: 'max',
									type: 'number',
									min: 0,
									max: 3,
									step: 0.1,
									change: () => {
										this.changePosition('main');
									},
								},
							],
						},						
					],
				},
				{
					name: 'object1',
					type: 'folder',
					control: 'object1',
					children: [
						{
							name: 'rotate',
							type: 'folder',
							control: 'rotate',
							children: [
								{
									name: 'type',
									type: 'select',
									select: [
										'x',
										'y',
										'z',
										'xy',
										'xz',
										'yz',
										'xyz',
										'sin',
										'cos',
										'none',
									],
									change: () => {
										this.changeRotate('object1');
									},
								},
								{
									name: 'speed',
									type: 'number',
									min: -1,
									max: 1,
									step: 0.1,
									change: () => {
										this.changeRotate('object1');
									},
								},
							],
						},
						{
							name: 'scale',
							type: 'folder',
							control: 'scale',
							children: [
								{
									name: 'type',
									type: 'select',
									select: [
										'x',
										'y',
										'z',
										'xy',
										'xz',
										'yz',
										'xyz',
										'sin',
										'cos',
										'none',
									],
									change: () => {
										this.changeScale('object1');
									},
								},
								{
									name: 'speed',
									type: 'number',
									min: -1,
									max: 1,
									step: 0.1,
									change: () => {
										this.changeScale('object1');
									},
								},
								{
									name: 'yoyo',
									type: 'checkbox',
									change: () => {
										this.changeScale('object1');
									},
								},
								{
									name: 'min',
									type: 'number',
									min: 0,
									max: 0.5,
									step: 0.1,
									change: () => {
										this.changeScale('object1');
									},
								},
								{
									name: 'max',
									type: 'number',
									min: 0.5,
									max: 1.5,
									step: 0.1,
									change: () => {
										this.changeScale('object1');
									},
								},
							],
						},
						{
							name: 'position',
							type: 'folder',
							control: 'position',
							children: [
								{
									name: 'type',
									type: 'select',
									select: [
										'x',
										'y',
										'z',
										'xy',
										'xz',
										'yz',
										'xyz',
										'circle',
										'none',
									],
									change: () => {
										this.changePosition('object1');
									},
								},
								{
									name: 'speed',
									type: 'number',
									min: -1,
									max: 1,
									step: 0.1,
									change: () => {
										this.changePosition('object1');
									},
								},
								{
									name: 'yoyo',
									type: 'checkbox',
									change: () => {
										this.changePosition('object1');
									},
								},
								{
									name: 'min',
									type: 'number',
									min: -3,
									max: 0,
									step: 0.1,
									change: () => {
										this.changePosition('object1');
									},
								},
								{
									name: 'max',
									type: 'number',
									min: 0,
									max: 3,
									step: 0.1,
									change: () => {
										this.changePosition('object1');
									},
								},
							],
						},
					],
				},
				{
					name: 'object2',
					type: 'folder',
					control: 'object2',
					children: [
						{
							name: 'rotate',
							type: 'folder',
							control: 'rotate',
							children: [
								{
									name: 'type',
									type: 'select',
									select: [
										'x',
										'y',
										'z',
										'xy',
										'xz',
										'yz',
										'xyz',
										'sin',
										'cos',
										'none',
									],
									change: () => {
										this.changeRotate('object2');
									},
								},
								{
									name: 'speed',
									type: 'number',
									min: -1,
									max: 1,
									step: 0.1,
									change: () => {
										this.changeRotate('object2');
									},
								},
							],
						},
						{
							name: 'scale',
							type: 'folder',
							control: 'scale',
							children: [
								{
									name: 'type',
									type: 'select',
									select: [
										'x',
										'y',
										'z',
										'xy',
										'xz',
										'yz',
										'xyz',
										'sin',
										'cos',
										'none',
									],
									change: () => {
										this.changeScale('object2');
									},
								},
								{
									name: 'speed',
									type: 'number',
									min: -1,
									max: 1,
									step: 0.1,
									change: () => {
										this.changeScale('object2');
									},
								},
								{
									name: 'yoyo',
									type: 'checkbox',
									change: () => {
										this.changeScale('object2');
									},
								},
								{
									name: 'min',
									type: 'number',
									min: 0,
									max: 0.5,
									step: 0.1,
									change: () => {
										this.changeScale('object2');
									},
								},
								{
									name: 'max',
									type: 'number',
									min: 0.5,
									max: 1.5,
									step: 0.1,
									change: () => {
										this.changeScale('object2');
									},
								},
							],
						},
						{
							name: 'position',
							type: 'folder',
							control: 'position',
							children: [
								{
									name: 'type',
									type: 'select',
									select: [
										'x',
										'y',
										'z',
										'xy',
										'xz',
										'yz',
										'xyz',
										'circle',
										'none',
									],
									change: () => {
										this.changePosition('object2');
									},
								},
								{
									name: 'speed',
									type: 'number',
									min: -1,
									max: 1,
									step: 0.1,
									change: () => {
										this.changePosition('object2');
									},
								},
								{
									name: 'yoyo',
									type: 'checkbox',
									change: () => {
										this.changePosition('object2');
									},
								},
								{
									name: 'min',
									type: 'number',
									min: -3,
									max: 0,
									step: 0.1,
									change: () => {
										this.changePosition('object2');
									},
								},
								{
									name: 'max',
									type: 'number',
									min: 0,
									max: 3,
									step: 0.1,
									change: () => {
										this.changePosition('object2');
									},
								},
							],
						},
					],
				},
				{
					name: 'object3',
					type: 'folder',
					control: 'object3',
					children: [
						{
							name: 'rotate',
							type: 'folder',
							control: 'rotate',
							children: [
								{
									name: 'type',
									type: 'select',
									select: [
										'x',
										'y',
										'z',
										'xy',
										'xz',
										'yz',
										'xyz',
										'sin',
										'cos',
										'none',
									],
									change: () => {
										this.changeRotate('object3');
									},
								},
								{
									name: 'speed',
									type: 'number',
									min: -1,
									max: 1,
									step: 0.1,
									change: () => {
										this.changeRotate('object3');
									},
								},
							],
						},
						{
							name: 'scale',
							type: 'folder',
							control: 'scale',
							children: [
								{
									name: 'type',
									type: 'select',
									select: [
										'x',
										'y',
										'z',
										'xy',
										'xz',
										'yz',
										'xyz',
										'sin',
										'cos',
										'none',
									],
									change: () => {
										this.changeScale('object3');
									},
								},
								{
									name: 'speed',
									type: 'number',
									min: -1,
									max: 1,
									step: 0.1,
									change: () => {
										this.changeScale('object3');
									},
								},
								{
									name: 'yoyo',
									type: 'checkbox',
									change: () => {
										this.changeScale('object3');
									},
								},
								{
									name: 'min',
									type: 'number',
									min: 0,
									max: 0.5,
									step: 0.1,
									change: () => {
										this.changeScale('object3');
									},
								},
								{
									name: 'max',
									type: 'number',
									min: 0.5,
									max: 1.5,
									step: 0.1,
									change: () => {
										this.changeScale('object3');
									},
								},
							],
						},
						{
							name: 'position',
							type: 'folder',
							control: 'position',
							children: [
								{
									name: 'type',
									type: 'select',
									select: [
										'x',
										'y',
										'z',
										'xy',
										'xz',
										'yz',
										'xyz',
										'circle',
										'none',
									],
									change: () => {
										this.changePosition('object3');
									},
								},
								{
									name: 'speed',
									type: 'number',
									min: -1,
									max: 1,
									step: 0.1,
									change: () => {
										this.changePosition('object3');
									},
								},
								{
									name: 'yoyo',
									type: 'checkbox',
									change: () => {
										this.changePosition('object3');
									},
								},
								{
									name: 'min',
									type: 'number',
									min: -3,
									max: 0,
									step: 0.1,
									change: () => {
										this.changePosition('object3');
									},
								},
								{
									name: 'max',
									type: 'number',
									min: 0,
									max: 3,
									step: 0.1,
									change: () => {
										this.changePosition('object3');
									},
								},
							],
						},
					],
				},
				{
					name: 'object4',
					type: 'folder',
					control: 'object4',
					children: [
						{
							name: 'rotate',
							type: 'folder',
							control: 'rotate',
							children: [
								{
									name: 'type',
									type: 'select',
									select: [
										'x',
										'y',
										'z',
										'xy',
										'xz',
										'yz',
										'xyz',
										'sin',
										'cos',
										'none',
									],
									change: () => {
										this.changeRotate('object4');
									},
								},
								{
									name: 'speed',
									type: 'number',
									min: -1,
									max: 1,
									step: 0.1,
									change: () => {
										this.changeRotate('object4');
									},
								},
							],
						},
						{
							name: 'scale',
							type: 'folder',
							control: 'scale',
							children: [
								{
									name: 'type',
									type: 'select',
									select: [
										'x',
										'y',
										'z',
										'xy',
										'xz',
										'yz',
										'xyz',
										'sin',
										'cos',
										'none',
									],
									change: () => {
										this.changeScale('object4');
									},
								},
								{
									name: 'speed',
									type: 'number',
									min: -1,
									max: 1,
									step: 0.1,
									change: () => {
										this.changeScale('object4');
									},
								},
								{
									name: 'yoyo',
									type: 'checkbox',
									change: () => {
										this.changeScale('object4');
									},
								},
								{
									name: 'min',
									type: 'number',
									min: 0,
									max: 0.5,
									step: 0.1,
									change: () => {
										this.changeScale('object4');
									},
								},
								{
									name: 'max',
									type: 'number',
									min: 0.5,
									max: 1.5,
									step: 0.1,
									change: () => {
										this.changeScale('object4');
									},
								},
							],
						},
						{
							name: 'position',
							type: 'folder',
							control: 'position',
							children: [
								{
									name: 'type',
									type: 'select',
									select: [
										'x',
										'y',
										'z',
										'xy',
										'xz',
										'yz',
										'xyz',
										'circle',
										'none',
									],
									change: () => {
										this.changePosition('object4');
									},
								},
								{
									name: 'speed',
									type: 'number',
									min: -1,
									max: 1,
									step: 0.1,
									change: () => {
										this.changePosition('object4');
									},
								},
								{
									name: 'yoyo',
									type: 'checkbox',
									change: () => {
										this.changePosition('object4');
									},
								},
								{
									name: 'min',
									type: 'number',
									min: -3,
									max: 0,
									step: 0.1,
									change: () => {
										this.changePosition('object4');
									},
								},
								{
									name: 'max',
									type: 'number',
									min: 0,
									max: 3,
									step: 0.1,
									change: () => {
										this.changePosition('object4');
									},
								},
							],
						},
					],
				},
			],
			true,
			false
		);
	}

	ngOnInit() {
		this.changeRotate('main');
		this.changeRotate('object1');
		this.changeRotate('object2');
		this.changeRotate('object3');
		this.changeRotate('object4');

		this.changeScale('main');
		this.changeScale('object1');
		this.changeScale('object2');
		this.changeScale('object3');
		this.changeScale('object4');

		this.changePosition('main');
		this.changePosition('object1');
		this.changePosition('object2');
		this.changePosition('object3');
		this.changePosition('object4');

		this.changeNumber('directionalIntensity');		
		this.changeNumber('ambientIntensity');		
		this.changeNumber('floorOpacity');		
		
		
	}

	getObject3dRotateOption(
		option: RotateOptions
	): RotateOptions | string | Object3dFunction {
		switch (option.type) {
			case 'none':
				return 'stop';
			case 'cos':
				return (
					object3d: THREE.Object3D,
					elapsedTime: number,
					timer: RendererTimer
				) => {
					const angle = Math.cos(elapsedTime * option.speed) * Math.PI;
					object3d.rotation.set(angle, angle * 0.1, angle * 0.5);
				};
			case 'sin':
				return (
					object3d: THREE.Object3D,
					elapsedTime: number,
					timer: RendererTimer
				) => {
					const angle = Math.sin(elapsedTime  * option.speed) * Math.PI;
					object3d.rotation.set(angle, angle * 0.1, angle * 0.5);
				};
			default:
				return { type: option.type, speed: option.speed };
		}
	}

	changeRotate(type: string) {
		switch (type) {
			case 'main':
				this.ngx3jsMainRotate = this.getObject3dRotateOption(
					this.controls.main.rotate
				);
				break;
			case 'object1':
				this.ngx3jsObject1Rotate = this.getObject3dRotateOption(
					this.controls.object1.rotate
				);
				break;
			case 'object2':
				this.ngx3jsObject2Rotate = this.getObject3dRotateOption(
					this.controls.object2.rotate
				);
				break;
			case 'object3':
				this.ngx3jsObject3Rotate = this.getObject3dRotateOption(
					this.controls.object3.rotate
				);
				break;
			case 'object4':
				this.ngx3jsObject4Rotate = this.getObject3dRotateOption(
					this.controls.object4.rotate
				);
				break;
		}
	}

	getObject3dScaleOption(
		option: DirectiveOptions
	): DirectiveOptions | string | Object3dFunction {
		switch (option.type) {
			case 'none':
				return 'stop';
			case 'cos':
				return (
					object3d: THREE.Object3D,
					elapsedTime: number,
					_: RendererTimer
				) => {
					const scale = Math.cos(elapsedTime * option.speed) + 1;
					object3d.scale.set(scale, scale, scale);
				};
			case 'sin':
				return (
					object3d: THREE.Object3D,
					elapsedTime: number,
					_: RendererTimer
				) => {
					const scale = Math.sin(elapsedTime * option.speed) + 1;
					object3d.scale.set(scale, scale, scale);
				};
			default:
				return {
					type: option.type,
					speed: option.speed,
					yoyo: option.yoyo,
					min: option.min,
					max: option.max,
				};
		}
	}

	changeScale(type: string) {
		switch (type) {
			case 'main':
				this.ngx3jsMainScale = this.getObject3dScaleOption(
					this.controls.main.scale
				);
				break;
			case 'object1':
				this.ngx3jsObject1Scale = this.getObject3dScaleOption(
					this.controls.object1.scale
				);
				break;
			case 'object2':
				this.ngx3jsObject2Scale = this.getObject3dScaleOption(
					this.controls.object2.scale
				);
				break;
			case 'object3':
				this.ngx3jsObject3Scale = this.getObject3dScaleOption(
					this.controls.object3.scale
				);
				break;
			case 'object4':
				this.ngx3jsObject4Scale = this.getObject3dScaleOption(
					this.controls.object4.scale
				);
				break;
		}
	}

	getObject3dPositionOption(
		option: DirectiveOptions
	): DirectiveOptions | string | Object3dFunction {
		switch (option.type) {
			case 'none':
				return 'stop';
			case 'circle':
				return (
					object3d: THREE.Object3D,
					elapsedTime: number,
					_: RendererTimer
				) => {
					const timeValue = elapsedTime * option.speed;
					const x = Math.cos(timeValue)  * 5;
					const z = Math.sin(timeValue)  * 5;
					const y = Math.sin(timeValue * 5)*2  + 2;
					object3d.position.set(x, y, z);
				};
			case 'rect':
				return (
					object3d: THREE.Object3D,
					elapsedTime: number,
					_: RendererTimer
				) => {
					const scale = Math.sin(elapsedTime * option.speed) + 1;
					object3d.position.set(scale, scale, scale);
				};
			default:
				return {
					type: option.type,
					speed: option.speed,
					yoyo: option.yoyo,
					min: option.min,
					max: option.max,
				};
		}
	}
	
	changePosition(type: string) {
		switch (type) {
			case 'main':
				this.ngx3jsMainPosition = this.getObject3dPositionOption(
					this.controls.main.position
				);
				break;
			case 'object1':
				this.ngx3jsObject1Position = this.getObject3dPositionOption(
					this.controls.object1.position
				);
				break;
			case 'object2':
				this.ngx3jsObject2Position = this.getObject3dPositionOption(
					this.controls.object2.position
				);
				break;
			case 'object3':
				this.ngx3jsObject3Position = this.getObject3dPositionOption(
					this.controls.object3.position
				);
				break;
			case 'object4':
				this.ngx3jsObject4Position = this.getObject3dPositionOption(
					this.controls.object4.position
				);
				break;
		}
	}

	getObjectNumberOption(
		option: DirectiveOptions
	): DirectiveOptions | string | ObjectFunction {
		switch (option.type) {
			case 'none':
				return 'stop';
			case 'sin':
				return (
					object: any,
					elapsedTime: number,
					_: RendererTimer
				) => {
					const timeValue = elapsedTime * option.speed;
					object.intensity = Math.sin(timeValue)  * 0.5 + 0.5;
				};
			default:
				return {
					type: option.type,
					speed: option.speed,
					yoyo: option.yoyo,
					min: option.min,
					max: option.max,
				};
		}
	}

	changeNumber(type: string) {
		switch (type) {
			case 'directionalIntensity':
				this.ngx3jsDirectionalIntensity = this.getObjectNumberOption(
					this.controls.directionalIntensity
				);
				break;
			case 'ambientIntensity' :
				this.ngx3jsAmbientIntensity = this.getObjectNumberOption(
					this.controls.ambientIntensity
				);
				break;
			case 'floorOpacity' :
				this.ngx3jsFloorOpacity = this.getObjectNumberOption(
					this.controls.floorOpacity
				);
				break;
		}
	}

	ngx3jsMainRotate: RotateOptions | string | Object3dFunction = null;
	ngx3jsObject1Rotate: RotateOptions | string | Object3dFunction = null;
	ngx3jsObject2Rotate: RotateOptions | string | Object3dFunction = null;
	ngx3jsObject3Rotate: RotateOptions | string | Object3dFunction = null;
	ngx3jsObject4Rotate: RotateOptions | string | Object3dFunction = null;

	ngx3jsMainScale: DirectiveOptions | string | Object3dFunction = null;
	ngx3jsObject1Scale: DirectiveOptions | string | Object3dFunction = null;
	ngx3jsObject2Scale: DirectiveOptions | string | Object3dFunction = null;
	ngx3jsObject3Scale: DirectiveOptions | string | Object3dFunction = null;
	ngx3jsObject4Scale: DirectiveOptions | string | Object3dFunction = null;

	ngx3jsMainPosition: DirectiveOptions | string | Object3dFunction = null;
	ngx3jsObject1Position: DirectiveOptions | string | Object3dFunction = null;
	ngx3jsObject2Position: DirectiveOptions | string | Object3dFunction = null;
	ngx3jsObject3Position: DirectiveOptions | string | Object3dFunction = null;
	ngx3jsObject4Position: DirectiveOptions | string | Object3dFunction = null;

	ngx3jsDirectionalIntensity: DirectiveOptions | string | ObjectFunction = null;
	ngx3jsAmbientIntensity: DirectiveOptions | string | ObjectFunction = null;
	ngx3jsFloorOpacity: DirectiveOptions | string | ObjectFunction = null;

}
