import * as THREE from 'three';

/**
 * Rope geometry
 */
export class RopeGeometry extends THREE.BufferGeometry {

  /**
   * Parameters  of rope geometry
   */
  public parameters : { width : number, widthSegments : number}

  /**
   * @param [width=1]
   * @param [widthSegments=1]
   */
  constructor(width: number = 1, widthSegments: number = 1) {
    super();
    this.type = 'RopeGeometry';
		widthSegments = Math.max( 1, widthSegments);
    width = Math.max( 1, width);
		this.parameters = {
			width: width,
			widthSegments: widthSegments,
		};
    const ropePositions = [];
    const ropeIndices = [];
    const halfWidth = width / 2;
    const segmentLength = width / widthSegments;
    for ( let i = 0; i < widthSegments + 1; i ++ ) {
      ropePositions.push( 0, (i * segmentLength) - halfWidth, 0 );
    }
    for ( let i = 0; i < widthSegments; i ++ ) {
      ropeIndices.push( i, i + 1 );
    }
    this.setIndex( new THREE.BufferAttribute( new Uint16Array( ropeIndices ), 1 ) );
    this.setAttribute( 'position', new THREE.BufferAttribute( new Float32Array( ropePositions ), 3 ) );
    this.computeBoundingSphere();
  }
}
