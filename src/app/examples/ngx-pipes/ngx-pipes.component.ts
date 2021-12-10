import { Component } from '@angular/core';
import { BaseComponent, RendererTimer  , I3JS, THREE } from 'ngx3js';

@Component({
	selector: 'app-ngx-pipes',
	templateUrl: './ngx-pipes.component.html',
	styleUrls: ['./ngx-pipes.component.scss'],
})
export class NgxPipesComponent extends BaseComponent<{
	colorPipes: {
		color1: string;
		returnType: string;
		color2: string;
		opertaor: string;
		alpha: number;
	};
	anglePipes: {
		type: string;
		degree: number;
		radian: number;
		gradian: number;
		returnType: string;
	};
	asstesPipes: {
		image: string;
	};
}> {
	constructor() {
		super(
			{
				colorPipes: {
					color1: '0xffffff',
					returnType: 'hex',
					color2: '0xffffff',
					opertaor: '*',
					alpha: 1,
				},
				anglePipes: {
					type: 'degree',
					degree: 0,
					radian: 0,
					gradian: 0,
					returnType: 'radian',
				},
				asstesPipes: {
					image: 'textures/crate.gif',
				},
			},
			[
				{
					name: 'colorPipes',
					type: 'folder',
					control: 'colorPipes',
					children: [
						{ name: 'color1', type: 'color' },
						{
							name: 'opertaor',
							type: 'select',
							select: ['+', '-', '*', 'lerp'],
						},
						{ name: 'color2', type: 'color' },
						{ name: 'alpha', type: 'number', min: 0, max: 1, step: 0.1 },
						{
							name: 'returnType',
							type: 'select',
							select: ['hex', 'hexnumber', 'rgb', 'rgbf', 'hsl', 'number'],
						},
					],
				},
				{
					name: 'anglePipes',
					type: 'folder',
					control: 'anglePipes',
					children: [
						{
							name: 'type',
							type: 'select',
							select: ['degree', 'radian', 'gradian'],
							change: () => {
								this.changeAngle();
							},
						},
						{
							name: 'degree',
							type: 'number',
							min: 0,
							max: 360,
							step: 1,
							change: () => {
								this.changeAngle();
							},
						},
						{
							name: 'radian',
							type: 'number',
							min: 0,
							max: Math.PI * 2,
							step: Math.PI / 180,
							change: () => {
								this.changeAngle();
							},
						},
						{
							name: 'gradian',
							type: 'number',
							min: 0,
							max: 400,
							step: 1,
							change: () => {
								this.changeAngle();
							},
						},
						{
							name: 'returnType',
							type: 'select',
							select: ['degree', 'radian', 'gradian'],
						},
					],
				},
				{
					name: 'asstesPipes',
					type: 'folder',
					control: 'asstesPipes',
					children: [
						{
							name: 'image',
							type: 'select',
							select: [
								'textures/crate.gif',
								'textures/floors/FloorsCheckerboard_S_Diffuse.jpg',
								'textures/lava/lavatile.jpg',
								'https://avatars.githubusercontent.com/u/51981442',
							],
						},
					],
				},
			],
			true,
			false
		);
	}

	orgAngle: number = 0;

	changeAngle() {
		switch (this.controls.anglePipes.type) {
			case 'degree':
				this.orgAngle = this.controls.anglePipes.degree;
				break;
			case 'radian':
				this.orgAngle = this.controls.anglePipes.radian;
				break;
			case 'gradian':
				this.orgAngle = this.controls.anglePipes.gradian;
				break;
		}
	}

	onRender(timer: RendererTimer) {
		super.onRender(timer);
		if (this.meshObject3d !== null) {
			const elapsedTime = timer.elapsedTime;
			this.meshObject3d.rotation.y = elapsedTime / 5;
			this.meshChildren.forEach((child) => {
				child.rotation.x = elapsedTime / 2;
				child.rotation.y = elapsedTime / 4;
			});
		}
	}
}
