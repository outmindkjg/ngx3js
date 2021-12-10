import { ThisReceiver } from '@angular/compiler';
import { Component } from '@angular/core';
import { BaseComponent, ControlComponent, RendererTimer  , I3JS, THREE } from 'ngx3js';

@Component({
	selector: 'app-misc-controls-arcball',
	templateUrl: './misc-controls-arcball.component.html',
	styleUrls: ['./misc-controls-arcball.component.scss'],
})
export class MiscControlsArcballComponent extends BaseComponent<{
	gizmoVisible: boolean;
	arcballControl: {
		enabled: boolean;
		enableGrid: boolean;
		enableRotate: boolean;
		enablePan: boolean;
		enableZoom: boolean;
		cursorZoom: boolean;
		adjustNearFar: boolean;
		scaleFactor: number;
		minDistance: number;
		maxDistance: number;
		minZoom: number;
		maxZoom: number;
	};
}> {
	constructor() {
		super(
			{
				gizmoVisible: true,
				arcballControl: {
					enabled: true,
					enableGrid: false,
					enableRotate: true,
					enablePan: true,
					enableZoom: true,
					cursorZoom: false,
					adjustNearFar: false,
					scaleFactor: 1.1,
					minDistance: 0,
					maxDistance: Infinity,
					minZoom: 0,
					maxZoom: Infinity,
				},
			},
			[
				{
					name: 'enabled',
					type: 'checkbox',
					control: 'arcballControl',
					title: 'Enable controls',
				},
				{
					name: 'enableGrid',
					type: 'checkbox',
					control: 'arcballControl',
					title: 'Enable Grid',
				},
				{
					name: 'enableRotate',
					type: 'checkbox',
					control: 'arcballControl',
					title: 'Enable rotate',
				},
				{
					name: 'enablePan',
					type: 'checkbox',
					control: 'arcballControl',
					title: 'Enable pan',
				},
				{
					name: 'enableZoom',
					type: 'checkbox',
					control: 'arcballControl',
					title: 'Enable zoom',
				},
				{
					name: 'cursorZoom',
					type: 'checkbox',
					control: 'arcballControl',
					title: 'Cursor zoom',
				},
				{
					name: 'adjustNearFar',
					type: 'checkbox',
					control: 'arcballControl',
					title: 'adjust near/far',
				},
				{
					name: 'scaleFactor',
					type: 'number',
					min: 1.1,
					max: 10,
					step: 0.1,
					control: 'arcballControl',
					title: 'Scale factor',
				},
				{
					name: 'minDistance',
					type: 'number',
					min: 0,
					max: 50,
					step: 0.5,
					control: 'arcballControl',
					title: 'Min distance',
				},
				{
					name: 'maxDistance',
					type: 'number',
					min: 0,
					max: 50,
					step: 0.5,
					control: 'arcballControl',
					title: 'Max distance',
				},
				{
					name: 'minZoom',
					type: 'number',
					min: 0,
					max: 50,
					step: 0.5,
					control: 'arcballControl',
					title: 'Min zoom',
				},
				{
					name: 'maxZoom',
					type: 'number',
					min: 0,
					max: 50,
					step: 0.5,
					control: 'arcballControl',
					title: 'Max zoom',
				},
				{
					name: 'gizmoVisible',
					type: 'checkbox',
					title: 'Show gizmos',
					change: () => {
						if (this.arcballControl !== null) {
							this.arcballControl.setGizmosVisible(this.controls.gizmoVisible);
						}
					},
				},
			]
		);
	}

	arcballControl: any = null;

	setControl(control: ControlComponent) {
		this.arcballControl = control.getControl();
		this.replaceControlsValue(this.arcballControl, 'arcballControl');
	}

	ngOnInit() {}

	onRender(timer: RendererTimer) {
		super.onRender(timer);
		const delta = timer.delta;
	}
}
