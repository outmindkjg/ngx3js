import { Component } from '@angular/core';
import { BaseComponent, MixerComponent  , I3JS, N3js } from 'ngx3js';

@Component({
	selector: 'app-webgl-animation-skinning-blending',
	templateUrl: './webgl-animation-skinning-blending.component.html',
	styleUrls: ['./webgl-animation-skinning-blending.component.scss'],
})
export class WebglAnimationSkinningBlendingComponent extends BaseComponent<{
	activate: boolean;
	continue: boolean;
	singleStep: boolean;
	stepSize: number;
	fromWalkToIdle: () => void;
	fromIdleToWalk: () => void;
	fromWalkToRun: () => void;
	fromRunToWalk: () => void;
	useDefaultDuration: boolean;
	setCustomDuration: number;
	modifyIdleWeight: number;
	modifyWalkWeight: number;
	modifyRunWeight: number;
	modifyTimeScale: number;
}> {
	constructor() {
		super(
			{
				activate: true,
				continue: true,
				singleStep: false,
				stepSize: 0.05,
				fromWalkToIdle: () => {
					this.fadeToAction('walk', 'idle', 1.0);
				},
				fromIdleToWalk: () => {
					this.fadeToAction('idle', 'walk', 0.5);
				},
				fromWalkToRun: () => {
					this.fadeToAction('walk', 'run', 2.5);
				},
				fromRunToWalk: () => {
					this.fadeToAction('run', 'walk', 5.0);
				},
				useDefaultDuration: true,
				setCustomDuration: 3.5,
				modifyIdleWeight: 0.0,
				modifyWalkWeight: 1.0,
				modifyRunWeight: 0.0,
				modifyTimeScale: 1.0,
			},
			[
				{
					name: 'Pausing/Stepping',
					type: 'folder',
					children: [
						{ name: 'continue', type: 'checkbox', title: 'pause/continue' },
						{ name: 'singleStep', type: 'checkbox', title: 'make single step' },
						{
							name: 'stepSize',
							type: 'number',
							title: 'modify step size',
							min: 0.01,
							max: 0.1,
							step: 0.001,
						},
					],
				},
				{
					name: 'Crossfading',
					type: 'folder',
					children: [
						{
							name: 'fromWalkToIdle',
							type: 'button',
							title: 'from walk to idle',
						},
						{
							name: 'fromIdleToWalk',
							type: 'button',
							title: 'from idle to walk',
						},
						{
							name: 'fromWalkToRun',
							type: 'button',
							title: 'from walk to run',
						},
						{
							name: 'fromRunToWalk',
							type: 'button',
							title: 'from run to walk',
						},
						{
							name: 'useDefaultDuration',
							type: 'button',
							title: 'use default duration',
						},
						{
							name: 'setCustomDuration',
							type: 'number',
							min: 0,
							max: 10,
							step: 0.01,
							title: 'set custom duration',
						},
					],
				},
				{
					name: 'Blend Weights',
					type: 'folder',
					children: [
						{
							name: 'modifyIdleWeight',
							type: 'number',
							min: 0.0,
							max: 1.0,
							step: 0.01,
							title: 'modify idle weight',
						},
						{
							name: 'modifyWalkWeight',
							type: 'number',
							min: 0.0,
							max: 1.0,
							step: 0.01,
							title: 'modify walk weight',
						},
						{
							name: 'modifyRunWeight',
							type: 'number',
							min: 0.0,
							max: 1.0,
							step: 0.01,
							title: 'modify run weight',
						},
					],
				},
				{
					name: 'General Speed',
					type: 'folder',
					children: [
						{
							name: 'modifyTimeScale',
							type: 'number',
							min: 0.0,
							max: 1.5,
							step: 0.01,
							title: 'modify time scale',
						},
					],
				},
			]
		);
	}

	mixer: MixerComponent = null;

	setMixer(mixer: MixerComponent) {
		this.mixer = mixer;
	}

	fadeToAction(endAction: string, restoreAction?: string, duration?: number) {
		if (this.mixer !== null) {
			this.mixer.fadeToAction(endAction, duration, restoreAction, duration);
		}
	}
}
