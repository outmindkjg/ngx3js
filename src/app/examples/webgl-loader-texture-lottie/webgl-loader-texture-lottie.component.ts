import { Component } from '@angular/core';
import { BaseComponent, TextureComponent } from 'ngx3js';

@Component({
	selector: 'app-webgl-loader-texture-lottie',
	templateUrl: './webgl-loader-texture-lottie.component.html',
	styleUrls: ['./webgl-loader-texture-lottie.component.scss'],
})
export class WebglLoaderTextureLottieComponent extends BaseComponent<{
	pause: () => void;
	play: () => void;
	scrubber: number;
}> {
	constructor() {
		super(
			{
				pause: () => {
					if (this.animation !== null) {
						this.animation.pause();
					}
				},
				play: () => {
					if (this.animation !== null) {
						this.animation.play();
					}
				},
				scrubber: 0,
			},
			[
				{ name: 'pause', type: 'button' },
				{ name: 'play', type: 'button' },
				{
					name: 'scrubber',
					type: 'number',
					min: 0,
					max: 100,
					listen: true,
					change: () => {
						if (this.animation !== null) {
							this.animation.goToAndStop(
								(this.controls.scrubber / 100) * this.totalFrames,
								true
							);
						}
					},
				},
			]
		);
	}

	setLottie(texture: TextureComponent) {
		this.animation = (texture.getTexture() as any).animation;
		this.totalFrames = this.animation?.totalFrames;
		this.animation?.addEventListener('enterFrame', () => {
			this.controls.scrubber =
				(this.animation.currentFrame / this.totalFrames) * 100;
		});
	}

	animation: any = null;
	totalFrames: number = 1;
}
