import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import * as THREE from 'three';
import { Lensflare, LensflareElement } from 'three/examples/jsm/objects/Lensflare';
import { AbstractSubscribeComponent } from '../subscribe.abstract';
import { TextureComponent } from '../texture/texture.component';

@Component({
  selector: 'ngx3js-lensflareelement',
  templateUrl: './lensflareelement.component.html',
  styleUrls: ['./lensflareelement.component.scss'],
})
export class LensflareelementComponent extends AbstractSubscribeComponent implements OnInit {
  @Input() private image: string = null;
  @Input() private size: number = null;
  @Input() private distance: number = null;
  @Input() private color: string | number = null;

  constructor() {
    super();
  }

  ngOnInit(): void {
    super.ngOnInit('lensflareelement');
  }

  ngOnDestroy(): void {
    super.ngOnDestroy();
  }

  ngOnChanges(changes: SimpleChanges): void {
    super.ngOnChanges(changes);
    if (changes && this.lensflare) {
      this.addChanges(changes);
    }
  }

  ngAfterContentInit(): void {
    super.ngAfterContentInit();
  }

  private getImage(def: string): string {
    return this.image === null ? def : this.image;
  }

  private getSize(def: number): number {
    return this.size === null ? def : this.size;
  }

  private getDistance(def: number): number {
    return this.distance === null ? def : this.distance;
  }

  private getColor(def: string | number): THREE.Color {
    const color = this.getConvColor(this.color, def);
    if (color !== null) {
      return new THREE.Color(color);
    } else {
      return null;
    }
  }

  private getConvColor(paramColor: string | number, def: string | number): string | number {
    const color = paramColor === null ? def : paramColor;
    if (typeof color === 'string') {
      if (color.startsWith('0x')) {
        return parseInt(color, 16);
      } else {
        return color;
      }
    } else {
      return color;
    }
  }

  getTexture(): THREE.Texture {
    return TextureComponent.getTextureImage(this.getImage(''));
  }

  private lensflareElement: LensflareElement = null;
  private lensflare: Lensflare = null;

  setLensflare(lensflare: Lensflare) {
    if (this.lensflare !== lensflare) {
      this.lensflare = lensflare;
      this.lensflare.addElement(this.getLensflareElement());
    }
  }

  getLensflareElement(): LensflareElement {
    if (this.lensflareElement === null || this._needUpdate) {
      this.needUpdate = false;
      this.lensflareElement = new LensflareElement(this.getTexture(), this.getSize(100), this.getDistance(0), this.getColor(null));
      super.setObject(this.lensflareElement);
    }
    return this.lensflareElement;
  }
}
