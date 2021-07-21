import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import * as THREE from 'three';
import { Lensflare, LensflareElement } from 'three/examples/jsm/objects/Lensflare';
import { AbstractSubscribeComponent } from '../subscribe.abstract';
import { AbstractTextureComponent } from '../texture.abstract';

@Component({
  selector: 'ngx3js-lensflareelement',
  templateUrl: './lensflareelement.component.html',
  styleUrls: ['./lensflareelement.component.scss'],
})
export class LensflareelementComponent extends AbstractSubscribeComponent implements OnInit {

  /**
   * 
   */
  @Input() private image: string = null;

  /**
   * 
   */
  @Input() private size: number = null;

  /**
   * 
   */
  @Input() private distance: number = null;

  /**
   * 
   */
  @Input() private color: string | number = null;

  constructor() {
    super();
  }

  /**
   * A callback method that is invoked immediately after the
   * default change detector has checked the directive's
   * data-bound properties for the first time,
   * and before any of the view or content children have been checked.
   * It is invoked only once when the directive is instantiated.
   */
  ngOnInit(): void {
    super.ngOnInit('lensflareelement');
  }

  /**
   * A callback method that performs custom clean-up, invoked immediately
   * before a directive, pipe, or service instance is destroyed.
   */
  ngOnDestroy(): void {
    super.ngOnDestroy();
  }

  /**
   * A callback method that is invoked immediately after the
   * default change detector has checked data-bound properties
   * if at least one has changed, and before the view and content
   * children are checked.
   * 
   * @param changes The changed properties.
   */
  ngOnChanges(changes: SimpleChanges): void {
    super.ngOnChanges(changes);
    if (changes && this.lensflare) {
      this.addChanges(changes);
    }
  }

  /**
   * A callback method that is invoked immediately after
   * Angular has completed initialization of all of the directive's
   * content.
   * It is invoked only once when the directive is instantiated.
   */
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
    return AbstractTextureComponent.getTextureImage(this.getImage(''));
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
