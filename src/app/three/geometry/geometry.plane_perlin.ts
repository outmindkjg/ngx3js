import * as THREE from 'three';
import { BufferGeometryUtils } from 'three/examples/jsm/utils/BufferGeometryUtils';
import { ImprovedNoise } from 'three/examples/jsm/math/ImprovedNoise';

/**
 * Plane perlin geometry
 */
export class PlanePerlinGeometry {
  
  /**
   * Data  of plane perlin geometry
   */
  public data : number[] = [];
  /**
   * Creates an instance of plane perlin geometry.
   * @param worldWidth 
   * @param worldDepth 
   * @param [quality] 
   */
  constructor(private worldWidth : number, private worldDepth : number, private quality = 2) {
    this.data = this.generateHeight(this.worldWidth, this.worldDepth, this.quality);
  }

  /**
   * Gets y
   * @param x 
   * @param z 
   * @returns  
   */
  public getY( x, z ) { 
    return ( this.data[ x + z * this.worldWidth ] * 0.2 ) | 0;
  }

  /**
   * Generates height
   * @param width 
   * @param height 
   * @param [quality] 
   * @returns height 
   */
  public generateHeight( width : number, height : number, quality : number = 2 ):number[] {
    const data : number[] = [], perlin = new ImprovedNoise(),
      size = width * height, z = Math.random() * 100;
    for ( let j = 0; j < 4; j ++ ) {
      if ( j === 0 ) for ( let i = 0; i < size; i ++ ) data[ i ] = 0;
      for ( let i = 0; i < size; i ++ ) {
        const x = i % width, y = ( i / width ) | 0;
        data[ i ] += perlin.noise( x / quality, y / quality, z ) * quality;
      }
      quality *= 4;
    }
    return data;
  } 

  /**
   * Gets terrain
   * @param planeWidth 
   * @param planeHeight 
   * @param planeDepth 
   * @returns terrain 
   */
  public getTerrain(planeWidth : number, planeHeight : number, planeDepth : number ) : THREE.BufferGeometry {
    const geometry = new THREE.PlaneGeometry( planeWidth, planeDepth, this.worldWidth - 1, this.worldDepth - 1 );
    geometry.rotateX( - Math.PI / 2 );
    const vertices = geometry.attributes.position.array as any[];
    for ( let i = 0, j = 0, l = vertices.length; i < l; i ++, j += 3 ) {
      vertices[ j + 1 ] = this.data[ i ] * planeHeight;
    }
    /*
    if (geometry['computeFaceNormals'] !== undefined) {
      geometry['computeFaceNormals']();
    }
    */
    return geometry;
  }

  /**
   * Gets minecraft
   * @param planeWidth 
   * @param planeHeight 
   * @param planeDepth 
   * @returns minecraft 
   */
  public getMinecraft(planeWidth : number, planeHeight : number, planeDepth : number ) : THREE.BufferGeometry {
    const planeGeometry = new THREE.PlaneGeometry(planeWidth, planeDepth);
    const geometry : {
      px : THREE.BufferGeometry,
      nx : THREE.BufferGeometry,
      py : THREE.BufferGeometry,
      pz : THREE.BufferGeometry,
      nz : THREE.BufferGeometry,
    } = {
      px : this.getGeometry(
        planeGeometry, 
        [1,3],
        {x : 0, y : Math.PI / 2, z : 0},
        {x : 50, y : 0, z : 0}
      ),
      nx : this.getGeometry(
        planeGeometry, 
        [1,3],
        {x : 0, y : -Math.PI/2, z : 0},
        {x : -50, y : 0, z : 0}
      ),
      py : this.getGeometry(
        planeGeometry, 
        [5,7],
        {x : - Math.PI / 2, y : 0, z : 0},
        {x : 0, y : 50, z : 0}
      ),
      pz : this.getGeometry(
        planeGeometry, 
        [1,3],
        {x : 0, y : 0, z : 0},
        {x : 0, y : 0, z : 50}
      ),
      nz : this.getGeometry(
        planeGeometry, 
        [1,3],
        {x : 0, y : Math.PI, z : 0},
        {x : 0, y : 0, z : -50}
      )
    }
    const geometries : THREE.BufferGeometry[] = [];
    const worldDepth = this.worldDepth;
    const worldWidth = this.worldWidth;
    const worldHalfWidth = worldWidth / 2;
    const worldHalfDepth = worldDepth / 2;
    const matrix = new THREE.Matrix4();
    for ( let z = 0; z < worldDepth; z ++ ) {
      for ( let x = 0; x < worldWidth; x ++ ) {
        const h = this.getY( x, z );
        matrix.makeTranslation(
          x * planeWidth - worldHalfWidth * planeWidth,
          h * planeHeight,
          z * planeDepth - worldHalfDepth * planeDepth
        );
        const px = this.getY( x + 1, z );
        const nx = this.getY( x - 1, z );
        const pz = this.getY( x, z + 1 );
        const nz = this.getY( x, z - 1 );
        geometries.push( geometry.py.clone().applyMatrix4( matrix ) );
        if ( ( px !== h && px !== h + 1 ) || x === 0 ) {
          geometries.push( geometry.px.clone().applyMatrix4( matrix ) );
        }
        if ( ( nx !== h && nx !== h + 1 ) || x === worldWidth - 1 ) {
          geometries.push( geometry.nx.clone().applyMatrix4( matrix ) );
        }
        if ( ( pz !== h && pz !== h + 1 ) || z === worldDepth - 1 ) {
          geometries.push( geometry.pz.clone().applyMatrix4( matrix ) );
        }
        if ( ( nz !== h && nz !== h + 1 ) || z === 0 ) {
          geometries.push( geometry.nz.clone().applyMatrix4( matrix ) );
        }
      }
    }
    return BufferGeometryUtils.mergeBufferGeometries( geometries );
  }

  /**
   * Gets minecraft ao
   * @param planeWidth 
   * @param planeHeight 
   * @param planeDepth 
   * @param light 
   * @param shadow 
   * @returns minecraft ao 
   */
  public getMinecraftAo(planeWidth : number, planeHeight : number, planeDepth : number, light : THREE.Color, shadow : THREE.Color ) : THREE.BufferGeometry {
    const planeGeometry = new THREE.PlaneGeometry(planeWidth, planeDepth).toNonIndexed();
    planeGeometry.setAttribute( 'color', planeGeometry.attributes.position.clone() );
    const geometry : {
      px : THREE.BufferGeometry,
      nx : THREE.BufferGeometry,
      py : THREE.BufferGeometry,
      py2 : THREE.BufferGeometry,
      pz : THREE.BufferGeometry,
      nz : THREE.BufferGeometry,
    } = {
      px : this.getGeometry(
        planeGeometry, 
        [1,5,11],
        {x : 0, y : Math.PI / 2, z : 0},
        {x : 50, y : 0, z : 0},
        [ light, shadow, light, shadow, shadow, light ]
      ),
      nx : this.getGeometry(
        planeGeometry, 
        [1,5,11],
        {x : 0, y : -Math.PI/2, z : 0},
        {x : -50, y : 0, z : 0},
        [ light, shadow, light, shadow, shadow, light ]
      ),
      py : this.getGeometry(
        planeGeometry, 
        [3,7,9],
        {x : - Math.PI / 2, y : 0, z : 0},
        {x : 0, y : 50, z : 0},
        [ light, light, light, light, light, light ]
      ),
      py2 : this.getGeometry(
        planeGeometry, 
        [3,7,9],
        {x : - Math.PI / 2, y : Math.PI / 2, z : 0},
        {x : 0, y : 50, z : 0},
        [ light, light, light, light, light, light ]
      ),
      pz : this.getGeometry(
        planeGeometry, 
        [1,5,11],
        {x : 0, y : 0, z : 0},
        {x : 0, y : 0, z : 50},
        [ light, shadow, light, shadow, shadow, light ]
      ),
      nz : this.getGeometry(
        planeGeometry, 
        [1,5,11],
        {x : 0, y : Math.PI, z : 0},
        {x : 0, y : 0, z : -50},
        [ light, shadow, light, shadow, shadow, light ]
      )
    }
    const geometries : THREE.BufferGeometry[] = [];
    const worldDepth = this.worldDepth;
    const worldWidth = this.worldWidth;
    const worldHalfWidth = worldWidth / 2;
    const worldHalfDepth = worldDepth / 2;
    const matrix = new THREE.Matrix4();
    for ( let z = 0; z < worldDepth; z ++ ) {
      for ( let x = 0; x < worldWidth; x ++ ) {
        const h = this.getY( x, z );
        matrix.makeTranslation(
          x * planeWidth - worldHalfWidth * planeWidth,
          h * planeHeight,
          z * planeDepth - worldHalfDepth * planeDepth
        );
        const px = this.getY( x + 1, z );
        const nx = this.getY( x - 1, z );
        const pz = this.getY( x, z + 1 );
        const nz = this.getY( x, z - 1 );
        const pxpz = this.getY( x + 1, z + 1 );
        const nxpz = this.getY( x - 1, z + 1 );
        const pxnz = this.getY( x + 1, z - 1 );
        const nxnz = this.getY( x - 1, z - 1 );
        const a = nx > h || nz > h || nxnz > h ? 0 : 1;
        const b = nx > h || pz > h || nxpz > h ? 0 : 1;
        const c = px > h || pz > h || pxpz > h ? 0 : 1;
        const d = px > h || nz > h || pxnz > h ? 0 : 1;
        if ( a + c > b + d ) {
          const colors = [];
          colors[ 0 ] = b === 0 ? shadow : light;
          colors[ 1 ] = c === 0 ? shadow : light;
          colors[ 2 ] = a === 0 ? shadow : light;
          colors[ 3 ] = c === 0 ? shadow : light;
          colors[ 4 ] = d === 0 ? shadow : light;
          colors[ 5 ] = a === 0 ? shadow : light;
          const color = geometry.py2.attributes.color as any;
          color.copyColorsArray( colors );
          geometries.push( geometry.py2.clone().applyMatrix4( matrix ) );
        } else {
          const colors = [];
          colors[ 0 ] = a === 0 ? shadow : light;
          colors[ 1 ] = b === 0 ? shadow : light;
          colors[ 2 ] = d === 0 ? shadow : light;
          colors[ 3 ] = b === 0 ? shadow : light;
          colors[ 4 ] = c === 0 ? shadow : light;
          colors[ 5 ] = d === 0 ? shadow : light;
          const color = geometry.py.attributes.color as any;
          color.copyColorsArray( colors );
          geometries.push( geometry.py.clone().applyMatrix4( matrix ) );
        }
        if ( ( px != h && px != h + 1 ) || x == 0 ) {
          const colors = [];
          colors[ 0 ] = pxpz > px && x > 0 ? shadow : light;
          colors[ 1 ] = shadow;
          colors[ 2 ] = pxnz > px && x > 0 ? shadow : light;
          colors[ 3 ] = shadow;
          colors[ 4 ] = shadow;
          colors[ 5 ] = pxnz > px && x > 0 ? shadow : light;
          const color = geometry.px.attributes.color as any;
          color.copyColorsArray( colors );
          geometries.push( geometry.px.clone().applyMatrix4( matrix ) );
        }
        if ( ( nx != h && nx != h + 1 ) || x == worldWidth - 1 ) {
          const colors = [];
          colors[ 0 ] = nxnz > nx && x < worldWidth - 1 ? shadow : light;
          colors[ 1 ] = shadow;
          colors[ 2 ] = nxpz > nx && x < worldWidth - 1 ? shadow : light;
          colors[ 3 ] = shadow;
          colors[ 4 ] = shadow;
          colors[ 5 ] = nxpz > nx && x < worldWidth - 1 ? shadow : light;
          const color = geometry.nx.attributes.color as any;
          color.copyColorsArray( colors );
          geometries.push( geometry.nx.clone().applyMatrix4( matrix ) );
        }
        if ( ( pz != h && pz != h + 1 ) || z == worldDepth - 1 ) {
          const colors = [];
          colors[ 0 ] = nxpz > pz && z < worldDepth - 1 ? shadow : light;
          colors[ 1 ] = shadow;
          colors[ 2 ] = pxpz > pz && z < worldDepth - 1 ? shadow : light;
          colors[ 3 ] = shadow;
          colors[ 4 ] = shadow;
          colors[ 5 ] = pxpz > pz && z < worldDepth - 1 ? shadow : light;
          const color = geometry.pz.attributes.color as any;
          color.copyColorsArray( colors );
          geometries.push( geometry.pz.clone().applyMatrix4( matrix ) );
        }
        if ( ( nz != h && nz != h + 1 ) || z == 0 ) {
          const colors = [];
          colors[ 0 ] = pxnz > nz && z > 0 ? shadow : light;
          colors[ 1 ] = shadow;
          colors[ 2 ] = nxnz > nz && z > 0 ? shadow : light;
          colors[ 3 ] = shadow;
          colors[ 4 ] = shadow;
          colors[ 5 ] = nxnz > nz && z > 0 ? shadow : light;
          const color = geometry.nz.attributes.color as any;
          color.copyColorsArray( colors );
          geometries.push( geometry.nz.clone().applyMatrix4( matrix ) );
        }
      }
    }
    return BufferGeometryUtils.mergeBufferGeometries( geometries );
  }

  /**
   * Gets geometry
   * @param planeGeometry 
   * @param uv 
   * @param rotate 
   * @param translate 
   * @param [colors] 
   * @returns geometry 
   */
  public getGeometry(planeGeometry : THREE.BufferGeometry, uv : number[], rotate : { x : number, y : number, z : number}, translate : { x : number, y : number, z : number}, colors ? : THREE.Color[]): THREE.PlaneGeometry {
    const geometry = planeGeometry.clone() as THREE.PlaneGeometry;
    if (colors !== null && colors !== undefined && colors.length > 0) {
      geometry.setAttribute( 'color', planeGeometry.attributes.position.clone() );
      const color = geometry.attributes.color as any;
      color.copyColorsArray( colors);
    }
    const attributesUv = geometry.attributes.uv as any;
    uv.forEach(idx => {
      attributesUv.array[ idx ] = 0.5;
    });
    if (rotate.x !== 0) {
      geometry.rotateX( rotate.x );
    }
    if (rotate.y !== 0) {
      geometry.rotateY( rotate.y );
    }
    if (rotate.z !== 0) {
      geometry.rotateZ( rotate.z );
    }
    geometry.translate(translate.x,translate.y,translate.z);
    return geometry;
  }

  /**
   * Gets texture
   * @param sun 
   * @param color 
   * @param add 
   * @returns texture 
   */
  public getTexture(sun : THREE.Vector3, color : THREE.Color , add : THREE.Color): HTMLCanvasElement {
    let context, image, imageData, shade;
    const vector3 = new THREE.Vector3( 0, 0, 0 );
    sun.normalize();
    const canvas = document.createElement( 'canvas' );
    canvas.width = this.worldWidth;
    canvas.height = this.worldDepth;
    context = canvas.getContext( '2d' );
    context.fillStyle = '#000';
    context.fillRect( 0, 0, this.worldWidth, this.worldDepth );
    image = context.getImageData( 0, 0, canvas.width, canvas.height );
    imageData = image.data;
    const r = color.r * 255;
    const g = color.g * 255;
    const b = color.b * 255;
    const r_add = Math.min(255,add.r * 255 - r);
    const g_add = Math.min(255,add.g * 255 - g);
    const b_add = Math.min(255,add.b * 255 - b);

    for ( let i = 0, j = 0, l = imageData.length; i < l; i += 4, j ++ ) {
      vector3.x = this.data[ j - 2 ] - this.data[ j + 2 ];
      vector3.y = 2;
      vector3.z = this.data[ j - this.worldWidth * 2 ] - this.data[ j + this.worldWidth * 2 ];
      vector3.normalize();
      shade = vector3.dot( sun );
      imageData[ i ] = Math.min(255,( r + shade * r_add ) * ( 0.5 + this.data[ j ] * 0.007 ));
      imageData[ i + 1 ] = Math.min(255,( g + shade * g_add ) * ( 0.5 + this.data[ j ] * 0.007 ));
      imageData[ i + 2 ] = Math.min(255,( b + shade * b_add ) * ( 0.5 + this.data[ j ] * 0.007 ));
    }
    context.putImageData( image, 0, 0 );
    const canvasScaled = document.createElement( 'canvas' );
    canvasScaled.width = this.worldWidth * 4;
    canvasScaled.height = this.worldDepth * 4;
    context = canvasScaled.getContext( '2d' );
    context.scale( 4, 4 );
    context.drawImage( canvas, 0, 0 );
    image = context.getImageData( 0, 0, canvasScaled.width, canvasScaled.height );
    imageData = image.data;
    for ( let i = 0, l = imageData.length; i < l; i += 4 ) {
      const v = ~ ~ ( Math.random() * 5 );
      imageData[ i ] += v;
      imageData[ i + 1 ] += v;
      imageData[ i + 2 ] += v;
    }
    context.putImageData( image, 0, 0 );
    return canvasScaled;
  }  
}

 