import { Component } from '@angular/core';
import { MeshBasicMaterial, Object3D, Texture } from 'three';
import { BaseComponent, GeometryComponent, MeshComponent, RendererEvent } from '../../three';
import { TextureComponent } from '../../three/texture/texture.component';

@Component({
  selector: 'app-webgl-raycast-texture',
  templateUrl: './webgl-raycast-texture.component.html',
  styleUrls: ['./webgl-raycast-texture.component.scss']
})
export class WebglRaycastTextureComponent extends BaseComponent<{
  wrapS : string;
  wrapT : string;
  offset : {
    x : number;
    y : number;
  },
  repeat : {
    x : number;
    y : number;
  },
  rotation : number;
}> {

  constructor() {
    super({
      wrapS : 'Repeat',
      wrapT : 'Repeat',
      offset : {
        x : 0,
        y : 0
      },
      repeat : {
        x : 1,
        y : 1
      },
      rotation : 0
    },[
      { name : 'wrapS', title : 'WrapS', type : 'select' , select : ['ClampToEdge','Repeat','MirroredRepeat']},
      { name : 'wrapT', title : 'WrapT', type : 'select' , select : ['ClampToEdge','Repeat','MirroredRepeat']},
      { name : 'Offset', type : 'folder', control : 'offset', children : [
        { name : 'x', type : 'number', min : -1, max : 1, step : 0.05},
        { name : 'y', type : 'number', min : -1, max : 1, step : 0.05}
      ]},
      { name : 'Repeat', type : 'folder', control : 'repeat', children : [
        { name : 'x', type : 'number', min : -1, max : 1, step : 0.1},
        { name : 'y', type : 'number', min : -1, max : 1, step : 0.1}
      ]},
      { name : 'rotation', title : 'Rotation', type : 'number', min : 0, max : 360, step : 1}
    ]);
  }

  setGeometry(type : string, geometryCom : GeometryComponent) {
    const geometry = geometryCom.getGeometry();
    const uvs = geometry.attributes.uv.array as any;
    switch(type) {
      case 'circle' :
				for ( let i = 0; i < uvs.length; i ++ ) {
					uvs[ i ] = ( uvs[ i ] - 0.25 ) * 2;
				}
        break;
      default :
        for ( let i = 0; i < uvs.length; i ++ ) {
          uvs[ i ] *= 2;
        }
        break;
    }
  }

  setTexture(texture : TextureComponent) {

    const textureOrg = texture.getTexture();
    if (textureOrg.image ) {
      if (textureOrg.image instanceof HTMLImageElement) {
        this.canvas.canvas = document.createElement( "canvas" );
        this.canvas.texture  = textureOrg;
        this.canvas.image  = textureOrg.image;
        const width = this.canvas.image.naturalWidth;
        const height = this.canvas.image.naturalHeight;
        this.canvas.canvas.width = width;
        this.canvas.canvas.height = height;
        this.canvas.width = width;
        this.canvas.height = height;
        this.canvas.context2D = this.canvas.canvas.getContext( "2d" );
        this.canvas.crossRadius = Math.ceil( Math.min( width, height / 30 ) );
        this.canvas.crossMax = Math.ceil( 0.70710678 * this.canvas.crossRadius );
        this.canvas.crossMin = Math.ceil( this.canvas.crossMax / 10 );
        this.canvas.crossThickness = Math.ceil( this.canvas.crossMax / 10 );
      }
      this.draw();
    }
  }
  canvas  = {
    canvas: null,
    image : null,
    width : 0,
    height : 0,
    context2D: null,
    xCross: 0,
    yCross: 0,
    crossRadius: 57,
    crossMax: 40,
    crossMin: 4,
    crossThickness: 4,
    texture : null
  }

  draw() {
    if (this.canvas.image !== null && this.canvas.texture != null) {
      const context2D = this.canvas.context2D;
      context2D.clearRect( 0, 0, this.canvas.width, this.canvas.height );
			// Background.
      context2D.drawImage( this.canvas.image, 0, 0 );
      // Yellow cross.
      context2D.lineWidth = this.canvas.crossThickness * 3;
      context2D.strokeStyle = "#FFFF00";
      context2D.beginPath();
      context2D.moveTo( this.canvas.xCross - this.canvas.crossMax - 2, this.canvas.yCross - this.canvas.crossMax - 2 );
      context2D.lineTo( this.canvas.xCross - this.canvas.crossMin, this.canvas.yCross - this.canvas.crossMin );

      context2D.moveTo( this.canvas.xCross + this.canvas.crossMin, this.canvas.yCross + this.canvas.crossMin );
      context2D.lineTo( this.canvas.xCross + this.canvas.crossMax + 2, this.canvas.yCross + this.canvas.crossMax + 2 );

      context2D.moveTo( this.canvas.xCross - this.canvas.crossMax - 2, this.canvas.yCross + this.canvas.crossMax + 2 );
      context2D.lineTo( this.canvas.xCross - this.canvas.crossMin, this.canvas.yCross + this.canvas.crossMin );

      context2D.moveTo( this.canvas.xCross + this.canvas.crossMin, this.canvas.yCross - this.canvas.crossMin );
      context2D.lineTo( this.canvas.xCross + this.canvas.crossMax + 2, this.canvas.yCross - this.canvas.crossMax - 2 );

      context2D.stroke();

      this.canvas.texture.image = this.canvas.canvas;
      this.canvas.texture.needsUpdate = true;
    }
  }

  setCrossPosition(x : number, y : number) {
    this.canvas.xCross = x * this.canvas.width;
    this.canvas.yCross = y * this.canvas.height;
    this.draw();
  }


  setMesh(mesh : MeshComponent) {
    super.setMesh(mesh);
    this.children = mesh.getMesh().children;
  }

  children : Object3D[] = [];

  setMouseMove(event : RendererEvent) {
    if (this.camera !== null && this.children.length > 0) {
      const intersect = this.camera.getIntersection(event.mouse, this.children);
      if (intersect !== null) {
        const uv = intersect.uv;
        ((intersect.object as any).material as MeshBasicMaterial).map.transformUv( uv );
        this.setCrossPosition(uv.x, uv.y);
      }
    }
  }
}
