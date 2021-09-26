import { Component } from '@angular/core';
import { BaseComponent, HelperComponent, TweenComponent } from 'ngx3js';

@Component({
  selector: 'app-webgl-lights-spotlights',
  templateUrl: './webgl-lights-spotlights.component.html',
  styleUrls: ['./webgl-lights-spotlights.component.scss']
})
export class WebglLightsSpotlightsComponent extends BaseComponent<{}> {

  constructor() {
    super({},[]);
  }

  lightInfos : { x : number, y : number , z : number , color : number}[] = [];

  ngOnInit() {
    this.lightInfos.push({
      x : 15,
      y : 15,
      z : 15,
      color : 0xFF7F00
    });
    this.lightInfos.push({
      x : 0,
      y : 40,
      z : 35,
      color : 0x00FF7F
    });
    this.lightInfos.push({
      x : -15,
      y : 40,
      z : 45,
      color : 0x7F00FF
    });
  }

  tweens : TweenComponent[] = [];
  setLightTween(tween : TweenComponent) {
    if (this.tweens.indexOf(tween) === -1) {
      this.tweens.push(tween);
    }
    if (this.tweens.length === 6) {
      this.tweenPlay();
    }
  }

  lightHelpers : HelperComponent[] = [];
  setLightHelpers(helper : HelperComponent) {
    if (this.lightHelpers.indexOf(helper) === -1) {
      this.lightHelpers.push(helper);
    }
  }

  tweenPlay() {
    if (this.tweens !== null && this.tweens.length > 0) {
      this.tweens.forEach(tween => {
        if (tween.targets === 'position') {
          tween.setTween({
            x: ( Math.random() * 30 ) - 15,
            y: ( Math.random() * 10 ) + 15,
            z: ( Math.random() * 30 ) - 15
          }, Math.random() * 3 + 2)
        } else {
          tween.setTween({
            angle: (Math.random() * 0.7 ) + 0.1,
            penumbra: Math.random() + 1
          }, Math.random() * 3 + 2)
        }
      });
    }
    this.lightHelpers.forEach(lightHelper => {
      lightHelper.setUpdate();
    })
    setTimeout(() => {
      this.tweenPlay();
    }, 5000);
  }

}
