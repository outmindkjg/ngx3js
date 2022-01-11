import { Component } from '@angular/core';
import { NgxBaseComponent, NgxHelperComponent, NgxTweenComponent } from 'ngx3js';

@Component({
	selector: 'app-webgl-lights-spotlights',
	templateUrl: './webgl-lights-spotlights.component.html',
	styleUrls: ['./webgl-lights-spotlights.component.scss'],
})
export class WebglLightsSpotlightsComponent extends NgxBaseComponent<{}> {
	constructor() {
		super({}, [], false, false);
	}

	lightInfos: { x: number; y: number; z: number; color: number }[] = [];

	ngOnInit() {
		this.lightInfos.push({
			x: 15,
			y: 15,
			z: 15,
			color: 0xff7f00,
		});
		this.lightInfos.push({
			x: 0,
			y: 40,
			z: 35,
			color: 0x00ff7f,
		});
		this.lightInfos.push({
			x: -15,
			y: 40,
			z: 45,
			color: 0x7f00ff,
		});
	}

	tweens: NgxTweenComponent[] = [];
	setLightTween(tween: NgxTweenComponent) {
		if (this.tweens.indexOf(tween) === -1) {
			this.tweens.push(tween);
		}
		if (this.tweens.length === 6) {
			this.tweenPlay();
		}
	}

	lightHelpers: NgxHelperComponent[] = [];
	setLightHelpers(helper: NgxHelperComponent) {
		if (this.lightHelpers.indexOf(helper) === -1) {
			this.lightHelpers.push(helper);
		}
	}

	onTweenEvent(lightHelper : NgxHelperComponent) {
		lightHelper.setUpdate(0);
	}

	tweenPlay() {
		if (this.tweens !== null && this.tweens.length > 0) {
			this.tweens.forEach((tween) => {
				if (tween.targets === 'position') {
					tween.setTween(
						{
							x: Math.random() * 30 - 15,
							y: Math.random() * 10 + 15,
							z: Math.random() * 30 - 15,
						},
						(Math.random() * 3 + 2)
					);
				} else {
					tween.setTween(
						{
							angle: Math.random() * 0.7 + 0.1,
							penumbra: Math.random() + 1,
						},
						Math.random() * 3 + 2
					);
				}
			});
		}
		this.getTimeout(5000).then(() => {
			this.tweenPlay();
		});
	}
}
