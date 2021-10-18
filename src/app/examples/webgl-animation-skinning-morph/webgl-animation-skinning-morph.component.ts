import { Component } from '@angular/core';
import { BaseComponent, MixerComponent, THREE, ThreeUtil } from 'ngx3js';

@Component({
	selector: 'app-webgl-animation-skinning-morph',
	templateUrl: './webgl-animation-skinning-morph.component.html',
	styleUrls: ['./webgl-animation-skinning-morph.component.scss'],
})
export class WebglAnimationSkinningMorphComponent extends BaseComponent<{
	status: string;
	jump: () => void;
	yes: () => void;
	no: () => void;
	wave: () => void;
	punch: () => void;
	thumbsUp: () => void;
	angry: number;
	surprised: number;
	sad: number;
}> {
	constructor() {
		super(
			{
				status: 'Walking',
				jump: () => {
					this.fadeToAction('Jump', 0.2);
				},
				yes: () => {
					this.fadeToAction('yes', 0.2);
				},
				no: () => {
					this.fadeToAction('no', 0.2);
				},
				wave: () => {
					this.fadeToAction('wave', 0.2);
				},
				punch: () => {
					this.fadeToAction('punch', 0.2);
				},
				thumbsUp: () => {
					this.fadeToAction('thumbsUp', 0.2);
				},
				angry: 0,
				surprised: 0,
				sad: 0,
			},
			[
				{
					name: 'status',
					type: 'select',
					select: [
						'Idle',
						'Walking',
						'Running',
						'Dance',
						'Death',
						'Sitting',
						'Standing',
					],
				},
				{
					name: 'Emotes',
					type: 'folder',
					children: [
						{ name: 'jump', type: 'button' },
						{ name: 'yes', type: 'button' },
						{ name: 'no', type: 'button' },
						{ name: 'wave', type: 'button' },
						{ name: 'punch', type: 'button' },
						{ name: 'thumbsUp', type: 'button' },
					],
					isOpen: true,
				},
				{
					name: 'Expressions',
					type: 'folder',
					children: [
						{
							name: 'angry',
							type: 'number',
							min: 0,
							max: 1,
							step: 0.01,
							change: () => {
								this.updateExpressions('Angry', this.controls.angry);
							},
						},
						{
							name: 'surprised',
							type: 'number',
							min: 0,
							max: 1,
							step: 0.01,
							change: () => {
								this.updateExpressions('Surprised', this.controls.surprised);
							},
						},
						{
							name: 'sad',
							type: 'number',
							min: 0,
							max: 1,
							step: 0.01,
							change: () => {
								this.updateExpressions('Sad', this.controls.sad);
							},
						},
					],
					isOpen: true,
				},
			]
		);
	}

	fadeToAction(
		endAction: string,
		duration?: number,
		restoreAction?: string,
		restoreDuration?: number
	) {
		if (this.mixer !== null) {
			restoreAction = ThreeUtil.getTypeSafe(
				restoreAction,
				this.controls.status
			);
			restoreDuration = ThreeUtil.getTypeSafe(restoreDuration, 0.2);
			this.mixer.fadeToAction(
				endAction,
				duration,
				restoreAction,
				restoreDuration
			);
		}
	}

	updateExpressions(name: string, value: number) {
		if (this.mixer !== null && this.mesh !== null) {
			const face = this.mesh.getObjectByName('Head_4') as THREE.Mesh;
			if (ThreeUtil.isNotNull(face)) {
				const morphTargetDictionary = face.morphTargetDictionary;
				const idx = morphTargetDictionary[name];
				if (ThreeUtil.isNotNull(idx)) {
					face.morphTargetInfluences[idx] = value;
				}
			}
		}
	}

	mixer: MixerComponent = null;

	setMixer(mixer: MixerComponent) {
		this.mixer = mixer;
	}
}
