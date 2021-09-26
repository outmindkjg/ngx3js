import { Component } from '@angular/core';
import { BaseComponent } from 'ngx3js';

@Component({
	selector: 'app-webgl-animation-skinning-additive-blending',
	templateUrl: './webgl-animation-skinning-additive-blending.component.html',
	styleUrls: ['./webgl-animation-skinning-additive-blending.component.scss'],
})
export class WebglAnimationSkinningAdditiveBlendingComponent extends BaseComponent<{
	action: string;
	sneak_pose: number;
	sad_pose: number;
	agree: number;
	head_shake: number;
	duration: number;
}> {
	constructor() {
		super(
			{
				action: 'idle',
				sneak_pose: 0,
				sad_pose: 0,
				agree: 0,
				head_shake: 0,
				duration: 1,
			},
			[
				{ name: 'action', type: 'select', select: ['None', 'idle', 'run', 'walk'] },
				{
					name: 'Additive Action Weights',
					type: 'folder',
					children: [
						{ name: 'sneak_pose', title: 'Sneak Pose', type: 'number', min: 0.0, max: 2, step: 0.01 },
						{ name: 'sad_pose', title: 'Sad Pose', type: 'number', min: 0.0, max: 1, step: 0.01 },
						{ name: 'agree', title: 'Agree', type: 'number', min: 0.0, max: 1, step: 0.01 },
						{ name: 'head_shake', title: 'Head Shake', type: 'number', min: 0.0, max: 1, step: 0.01 },
					],
					isOpen: true,
				},
				{ name: 'duration', type: 'number', min: 0.2, max: 5 },
			]
		);
	}
}
