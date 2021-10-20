import { Component } from '@angular/core';
import {
	ArcballControls, BaseComponent,
	ControlComponent, RendererTimer
} from 'ngx3js';

@Component({
	selector: 'app-misc-controls-arcball',
	templateUrl: './misc-controls-arcball.component.html',
	styleUrls: ['./misc-controls-arcball.component.scss'],
})
export class MiscControlsArcballComponent extends BaseComponent<{
	gizmoVisible: boolean;
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
}> {
	constructor() {
		super(
			{
				gizmoVisible: true,
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
			[
				{ name: 'enabled', type: 'checkbox', title: 'Enable controls' },
				{ name: 'enableGrid', type: 'checkbox', title: 'Enable Grid' },
				{ name: 'enableRotate', type: 'checkbox', title: 'Enable rotate' },
				{ name: 'enablePan', type: 'checkbox', title: 'Enable pan' },
				{ name: 'enableZoom', type: 'checkbox', title: 'Enable zoom' },
				{ name: 'cursorZoom', type: 'checkbox', title: 'Cursor zoom' },
				{ name: 'adjustNearFar', type: 'checkbox', title: 'adjust near/far' },
				{
					name: 'scaleFactor',
					type: 'number',
					min: 1.1,
					max: 10,
					step: 0.1,
					title: 'Scale factor',
				},
				{
					name: 'minDistance',
					type: 'number',
					min: 0,
					max: 50,
					step: 0.5,
					title: 'Min distance',
				},
				{
					name: 'maxDistance',
					type: 'number',
					min: 0,
					max: 50,
					step: 0.5,
					title: 'Max distance',
				},
				{
					name: 'minZoom',
					type: 'number',
					min: 0,
					max: 50,
					step: 0.5,
					title: 'Min zoom',
				},
				{
					name: 'maxZoom',
					type: 'number',
					min: 0,
					max: 50,
					step: 0.5,
					title: 'Max zoom',
				},
				{ name: 'gizmoVisible', type: 'checkbox', title: 'Show gizmos' },
			]
		);
	}

	changeControl(type: string) {
		switch (type) {
			case 'enabled':
				this.arcballControl.enabled = this.controls.enabled;
				break;
			case 'enableGrid':
				this.arcballControl.enableGrid = this.controls.enableGrid;
				break;
			case 'enableRotate':
				this.arcballControl.enableRotate = this.controls.enableRotate;
				break;
			case 'enablePan':
				this.arcballControl.enablePan = this.controls.enablePan;
				break;
			case 'enableZoom':
				this.arcballControl.enableZoom = this.controls.enableZoom;
				break;
			case 'cursorZoom':
				this.arcballControl.cursorZoom = this.controls.cursorZoom;
				break;
			case 'adjustNearFar':
				this.arcballControl.adjustNearFar = this.controls.adjustNearFar;
				break;
			case 'scaleFactor':
				this.arcballControl.scaleFactor = this.controls.scaleFactor;
				break;
			case 'minDistance':
				this.arcballControl.minDistance = this.controls.minDistance;
				break;
			case 'maxDistance':
				this.arcballControl.maxDistance = this.controls.maxDistance;
				break;
			case 'minZoom':
				this.arcballControl.minZoom = this.controls.minZoom;
				break;
			case 'maxZoom':
				this.arcballControl.maxZoom = this.controls.maxZoom;
				break;
		}
	}

	arcballControl: ArcballControls = null;

	setControl(control: ControlComponent) {
		console.log(control.getControl());
	}

	ngOnInit() {}

	onRender(timer: RendererTimer) {
		super.onRender(timer);
		const delta = timer.delta;
	}
}
