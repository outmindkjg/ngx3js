import * as THREE from 'three';

/**
 * RingDepth geometry
 */
export class RingDepthGeometry extends THREE.RingGeometry {


  /**
   * @param [innerRadius=0.5]
   * @param [outerRadius=1]
   * @param [thetaSegments=8]
   * @param [phiSegments=1]
   * @param [thetaStart=0]
   * @param [thetaLength=Math.PI * 2]
   */
  constructor(
    innerRadius?: number,
    outerRadius?: number,
    depth?: number,
    thetaSegments?: number,
    phiSegments?: number,
    thetaStart?: number,
    thetaLength?: number,
  ) {
    super(
      innerRadius,
      outerRadius,
      thetaSegments,
      phiSegments,
      thetaStart,
      thetaLength,
    );
    this.type = 'RingDepthGeometry';
    depth = Math.max(0.001, depth);
    const depthGeometry = this.clone();
    depthGeometry.translate(0,0, - depth);
    const newIndices : number[] = [];
    const positionCount = this.getAttribute('position').count ;
    const oldIndices = depthGeometry.getIndex().array;
    for(let i = oldIndices.length -1 ; i >= 0 ; i--) {
      newIndices.push(oldIndices[i] + positionCount);
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
