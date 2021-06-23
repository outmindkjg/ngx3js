import { Component } from '@angular/core';
import { Color, DataTexture, MathUtils, RGBFormat, Texture, Vector2, WebGLRenderer } from 'three';
import { BaseComponent, RendererTimer } from '../../three';
import { TextureComponent } from '../../three/texture/texture.component';

@Component({
  selector: 'app-webgl-materials-texture-partialupdate',
  templateUrl: './webgl-materials-texture-partialupdate.component.html',
  styleUrls: ['./webgl-materials-texture-partialupdate.component.scss']
})
export class WebglMaterialsTexturePartialupdateComponent extends BaseComponent<{}> {

  constructor() {
    super({},[]);
  }

  setDiffuseMap(texture : TextureComponent) {
    this.diffuseMap = texture.getTexture();
    const width = 32;
    const height = 32;
    const data = new Uint8Array( width * height * 3 );
    this.dataTexture = new DataTexture( data, width, height, RGBFormat );

  }
  diffuseMap : Texture = null;

  last : number = 0;
  position = new Vector2();
  color = new Color();
  dataTexture : DataTexture = null;

  updateDataTexture( texture ) {
    const color = this.color;
    const size = texture.image.width * texture.image.height;
    const data = texture.image.data;
    // generate a random color and update texture data
    color.setHex( Math.random() * 0xffffff );

    const r = Math.floor( color.r * 255 );
    const g = Math.floor( color.g * 255 );
    const b = Math.floor( color.b * 255 );
    for ( let i = 0; i < size; i ++ ) {
      const stride = i * 3;
      data[ stride ] = r;
      data[ stride + 1 ] = g;
      data[ stride + 2 ] = b;
    }
  }

  onRender(timer : RendererTimer) {
    super.onRender(timer);
    if (this.diffuseMap !== null && timer.renderer instanceof WebGLRenderer) {
      const elapsedTime = timer.elapsedTime;
      if ( elapsedTime - this.last > 0.1 ) {
        this.last = elapsedTime;
        const position = this.position;
        position.x = ( 32 * MathUtils.randInt( 1, 16 ) ) - 32;
        position.y = ( 32 * MathUtils.randInt( 1, 16 ) ) - 32;
        this.updateDataTexture( this.dataTexture );
        timer.renderer.copyTextureToTexture( position, this.dataTexture, this.diffuseMap );
      }
    }
  }

}
