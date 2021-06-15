import { Component } from '@angular/core';
import { BaseComponent } from '../../three';

@Component({
  selector: 'app-webxr-vr-paint',
  templateUrl: './webxr-vr-paint.component.html',
  styleUrls: ['./webxr-vr-paint.component.scss'],
})
export class WebxrVrPaintComponent extends BaseComponent<{
  curve: string;
  tween: string;
  duration: number;
  position: string;
  rotation: string;
  scale: string;
  lookat: string;
}> {
  constructor() {
    super(
      {
        curve: 'triangle',
        tween: 'helixcurve',
        duration: 1,
        position: 'left',
        rotation: 'none',
        scale: 'none',
        lookat: null,
      },
      [
        {
          name: 'curve',
          type: 'select',
          select: [
            'grannyknot',
            'heartcurve',
            'vivianicurve',
            'knotcurve',
            'helixcurve',
            'trefoilknot',
            'torusknot',
            'cinquefoilknot',
            'trefoilpolynomialknot',
            'decoratedtorusknot4b',
            'decoratedtorusknot4a',
            'figureeightpolynomialknot',
            'decoratedtorusknot5a',
            'decoratedtorusknot5c',
            'circle',
            'line',
            'triangle',
            'square',
            'pentagon',
            'hexagon',
            'heptagon',
            'octagon',
            'nonagon',
            'decagon',
            'undecagon',
            'dodecagon',
            'linearin',
            'linearinout',
            'linearout',
            'lineareasenone',
            'quadin',
            'quadinout',
            'quadout',
            'cubicin',
            'cubicinout',
            'cubicout',
            'quartin',
            'quartinout',
            'quartout',
            'quintin',
            'quintinout',
            'quintout',
            'strongin',
            'stronginout',
            'strongout',
            'power1in',
            'power1inout',
            'power1out',
            'power2in',
            'power2inout',
            'power2out',
            'power3in',
            'power3inout',
            'power3out',
            'power4in',
            'power4inout',
            'power4out',
            'backin',
            'backinout',
            'backout',
            'elasticin',
            'elasticinout',
            'elasticout',
            'bouncein',
            'bounceinout',
            'bounceout',
            'circin',
            'circinout',
            'circout',
            'expoin',
            'expoinout',
            'expoout',
            'sinein',
            'sineinout',
            'sineout',
            'power0none',
          ],
        },
        {
          name: 'tween',
          type: 'select',
          select: [
            'grannyknot',
            'heartcurve',
            'vivianicurve',
            'knotcurve',
            'helixcurve',
            'trefoilknot',
            'torusknot',
            'cinquefoilknot',
            'trefoilpolynomialknot',
            'decoratedtorusknot4b',
            'decoratedtorusknot4a',
            'figureeightpolynomialknot',
            'decoratedtorusknot5a',
            'decoratedtorusknot5c',
            'circle',
            'line',
            'triangle',
            'square',
            'pentagon',
            'hexagon',
            'heptagon',
            'octagon',
            'nonagon',
            'decagon',
            'undecagon',
            'dodecagon',
            'linearin',
            'linearinout',
            'linearout',
            'lineareasenone',
            'quadin',
            'quadinout',
            'quadout',
            'cubicin',
            'cubicinout',
            'cubicout',
            'quartin',
            'quartinout',
            'quartout',
            'quintin',
            'quintinout',
            'quintout',
            'strongin',
            'stronginout',
            'strongout',
            'power1in',
            'power1inout',
            'power1out',
            'power2in',
            'power2inout',
            'power2out',
            'power3in',
            'power3inout',
            'power3out',
            'power4in',
            'power4inout',
            'power4out',
            'backin',
            'backinout',
            'backout',
            'elasticin',
            'elasticinout',
            'elasticout',
            'bouncein',
            'bounceinout',
            'bounceout',
            'circin',
            'circinout',
            'circout',
            'expoin',
            'expoinout',
            'expoout',
            'sinein',
            'sineinout',
            'sineout',
            'power0none',
          ],
        },
        { name: 'duration', type: 'number', min: 0.1, max: 50, step: 0.01 },
        {
          name: 'position',
          type: 'select',
          select: ['none', 'left', 'center', 'right', 'top', 'bottom', 'front', 'back'],
          change: () => {
            this.changeTween();
          },
        },
        {
          name: 'rotation',
          type: 'select',
          select: ['none', 'left', 'right', 'front', 'back'],
          change: () => {
            this.changeTween();
          },
        },
        {
          name: 'scale',
          type: 'select',
          select: ['none', '1x', '1.5x', '2x', '3x'],
          change: () => {
            this.changeTween();
          },
        },
      ]
    );
  }

  ngOnInit() {
    this.changeTween();
  }

  changeTween() {
    let position = null;
    switch (this.controls.position) {
      case 'left':
        position = { x: -2, y: 0, z: 0 };
        break;
      case 'center':
        position = { x: 0, y: 0, z: 0 };
        break;
      case 'right':
        position = { x: 2, y: 0, z: 0 };
        break;
      case 'top':
        position = { x: 0, y: 2, z: 0 };
        break;
      case 'bottom':
        position = { x: 0, y: -2, z: 0 };
        break;
      case 'front':
        position = { x: 0, y: 0, z: -2 };
        break;
      case 'back':
        position = { x: 0, y: 0, z: 2 };
        break;
      default:
        position = null;
    }
    let rotation = null;
    switch (this.controls.rotation) {
      case 'left':
        rotation = { x: 0, y: -90, z: 0 };
        break;
      case 'right':
        rotation = { x: 0, y: 90, z: 0 };
        break;
      case 'front':
        rotation = { x: -90, y: 0, z: 0 };
        break;
      case 'back':
        rotation = { x: 90, y: 0, z: 0 };
        break;
      default:
        rotation = null;
    }
    let scale = null;
    switch (this.controls.scale) {
      case '1x':
        scale = { x: 1, y: 1, z: 1 };
        break;
      case '1.5x':
        scale = { x: 1.5, y: 1.5, z: 1.5 };
        break;
      case '2x':
        scale = { x: 2, y: 2, z: 2 };
        break;
      case '3x':
        scale = { x: 3, y: 3, z: 3 };
        break;
      default:
        scale = null;
    }
    this.tween = {
      position: position,
      rotation : rotation,
      scale : scale
    };
    console.log(this.tween);
  }

  tween: any = null;
}
