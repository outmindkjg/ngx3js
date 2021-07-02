import * as THREE from 'three';
import { ThreeUtil } from '../interface';

export type GeometryFunctionType = (geometry : THREE.BufferGeometry , options? : any) => THREE.BufferGeometry;

export const GeometryConf: {
  [key: string]: GeometryFunctionType | string;
} = {
  rainbowcolor1 : (geometry : THREE.BufferGeometry, options? : any) => {
    const count = geometry.attributes.position.count;
    const radius = GeometryUtils.getGeometryRadius(geometry, options);
    geometry.setAttribute( 'color', new THREE.BufferAttribute( new Float32Array( count * 3 ), 3 ) );
    const color = new THREE.Color();
    const positions = geometry.attributes.position;
    const colors = geometry.attributes.color;
    for ( let i = 0; i < count; i ++ ) {
      color.setHSL( ( positions.getY( i ) / radius + 1 ) / 2, 1.0, 0.5 );
      colors.setXYZ( i, color.r, color.g, color.b );
    }
    return geometry;
  },
  rainbow : "rainbowcolor1",
  rainbow1 : "rainbowcolor1",
  rainbowcolor2 : (geometry : THREE.BufferGeometry, options? : any) => {
    const count = geometry.attributes.position.count;
    const radius = GeometryUtils.getGeometryRadius(geometry, options);
    geometry.setAttribute( 'color', new THREE.BufferAttribute( new Float32Array( count * 3 ), 3 ) );
    const color = new THREE.Color();
    const positions = geometry.attributes.position;
    const colors = geometry.attributes.color;
    for ( let i = 0; i < count; i ++ ) {
      color.setHSL( 0, ( positions.getY( i ) / radius + 1 ) / 2, 0.5 );
      colors.setXYZ( i, color.r, color.g, color.b );
    }
    return geometry;
  },
  rainbow2 : "rainbowcolor2",
  rainbowcolor3 : (geometry : THREE.BufferGeometry, options? : any) => {
    const count = geometry.attributes.position.count;
    const radius = GeometryUtils.getGeometryRadius(geometry, options);
    geometry.setAttribute( 'color', new THREE.BufferAttribute( new Float32Array( count * 3 ), 3 ) );
    const color = new THREE.Color();
    const positions = geometry.attributes.position;
    const colors = geometry.attributes.color;
    for ( let i = 0; i < count; i ++ ) {
      color.setRGB( 1, 0.8 - ( positions.getY( i ) / radius + 1 ) / 2, 0 );
      colors.setXYZ( i, color.r, color.g, color.b );
    }
    return geometry;
  },
  terrainsin : (geometry : THREE.BufferGeometry, options? : any) => {
    switch (geometry.type) {
      case 'PlaneGeometry' :
        geometry.rotateX(-Math.PI/2);
        break;
    }
    const positions = geometry.getAttribute('position') as THREE.BufferAttribute;
    const count = positions.count;
    const radius = GeometryUtils.getGeometryRadius(geometry, options);
    geometry.computeBoundingBox();
    const box = geometry.boundingBox;
    const center = box.min.clone().add(box.max).multiplyScalar(0.2);
    const minHeight = ThreeUtil.getTypeSafe(options.minHeight, radius * -0.1);
    const maxHeight = ThreeUtil.getTypeSafe(options.maxHeight, radius * 0.3);
    const repeat = ThreeUtil.getTypeSafe(options.repeat , 4);
    const hRange = maxHeight - minHeight;
    const distLength =  Math.PI * 2 / radius * repeat;
    for(let i = 0 ; i < count ; i++) {
      const x = positions.getX(i) - center.x;
      const z = positions.getZ(i) - center.z;
      const dist = Math.sqrt(x * x + z * z);
      const y = positions.getY(i) + (Math.sin(dist * distLength) + 0.5) * hRange + minHeight ;
      positions.setY(i, y);
    }
    positions.needsUpdate = true;
    geometry.computeVertexNormals();
    return geometry;
  },
  rainbow3 : "rainbowcolor3",
};

export class GeometryUtils {
  static getGeometryRadius(geometry : THREE.BufferGeometry, options : any): number {
    let radius = options.radius || 0;
    if (radius <= 0) {
      geometry.computeBoundingSphere();
      radius = geometry.boundingSphere.radius;
    }
    return radius;
  }

  static addGeometry(key: string, func: GeometryFunctionType, alias? : string[]) {
    key = key.toLowerCase();
    if (ThreeUtil.isNotNull(alias)) {
      alias.forEach((aliasKey) => {
        if (aliasKey !== null && aliasKey.length > 3) {
          GeometryConf[aliasKey.toLowerCase()] = key;
        }
      });
    }
    GeometryConf[key] = func;
  }

  static getGeometryFunction(key: string): GeometryFunctionType {
    key = key.toLowerCase();
    if (ThreeUtil.isNotNull(GeometryConf[key])) {
      const func = GeometryConf[key.toLowerCase()];
      if (typeof func === 'string') {
        return this.getGeometryFunction(func);
      } else {
        return func;
      }
    } else {
      console.error('unknown curve :' + key);
      return (geometry) => { return geometry ;};
    }
  }

  static getGeometry(key: string, geometry : THREE.BufferGeometry, options? : any): THREE.BufferGeometry {
    const keyList = key.split(',');
    keyList.forEach(funcName => {
      const func = this.getGeometryFunction(funcName);
      options = options || {}
      func(geometry, options);
    })
    return geometry;
  }
}

