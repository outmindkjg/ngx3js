import * as THREE from 'three';

/**
 * CircleDepth geometry
 */
export class CircleDepthGeometry extends THREE.CircleGeometry {


  /**
   * @param [width=1]
   * @param [height=1]
   * @param [depth=1]
   * @param [widthSegments=1]
   * @param [heightSegments=1]
   */
  constructor(radius?: number, depth? : number , segments?: number, thetaStart?: number, thetaLength?: number) {
    super(radius, segments, thetaStart, thetaLength);
    this.type = 'CircleDepthGeometry';
    depth = Math.max(0.001, depth);
    const depthGeometry = this.clone();
    depthGeometry.translate(0,0, - depth);
    const newIndices : number[] = [];
    const positionCount = this.getAttribute('position').count ;
    const oldIndices = depthGeometry.getIndex().array;
    for(let i = oldIndices.length -1 ; i >= 0 ; i--) {
      newIndices.push(oldIndices[i] + positionCount);
    }
    for(let i = 0 ; i < positionCount ; i++) {
      const topEnd = (i+1) >= positionCount ? i - positionCount + 1 : i + 1;
      newIndices.push(i,i + positionCount, topEnd);
      newIndices.push(topEnd, i + positionCount, positionCount + ((i + 1) % positionCount));
    }
    depthGeometry.setIndex(newIndices);
    const indices = this.mergeBufferAttribute(this.getIndex(), depthGeometry.getIndex());
    const vertices = this.mergeBufferAttribute(this.getAttribute('position'), depthGeometry.getAttribute('position'));
    const normals = this.mergeBufferAttribute(this.getAttribute('normal'), depthGeometry.getAttribute('normal'));
    const uvs = this.mergeBufferAttribute(this.getAttribute('uv'), depthGeometry.getAttribute('uv'));
    this.setIndex( indices );
    this.setAttribute( 'position', new THREE.Float32BufferAttribute( vertices, 3 ) );
    this.setAttribute( 'normal', new THREE.Float32BufferAttribute( normals, 3 ) );
    this.setAttribute( 'uv', new THREE.Float32BufferAttribute( uvs, 2 ) );
  }

	protected mergeBufferAttribute(from : THREE.BufferAttribute | THREE.InterleavedBufferAttribute, to : THREE.BufferAttribute | THREE.InterleavedBufferAttribute): number[] {
		const result : number[] = [];
		for(let i = 0; i < from.array.length ; i++) {
			result.push(from.array[i]);
		}
		for(let i = 0; i < to.array.length ; i++) {
			result.push(to.array[i]);
		}
		return result ;
	}

}
