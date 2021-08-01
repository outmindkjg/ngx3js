import * as THREE from 'three';

/**
 * CircleDepth geometry
 */
export class StarGeometry extends THREE.CircleGeometry {
	/**
	 * @param [innerRadius=0.5]
	 * @param [outerRadius=1]
	 * @param [segments=5]
	 * @param [thetaStart=0]
	 * @param [thetaLength=Math.PI * 2]
	 */
	constructor(innerRadius: number = 0.5, outerRadius: number = 1, segments: number = 5, thetaStart: number = 0, thetaLength: number = Math.PI * 2) {
		super(outerRadius, segments * 2 , thetaStart, thetaLength);
		this.type = 'StarGeometry';
		segments = Math.max( 3, segments );
		const vertices = this.getAttribute('position');
		const uvs = this.getAttribute('uv');
		const rate = innerRadius / outerRadius ;
		for ( let i = 0; i <= segments; i++ ) {
			const idx = i * 2 + 1;
			const vx = vertices.getX(idx) * rate;
			const vy = vertices.getY(idx) * rate;
			const vz = vertices.getZ(idx) * rate;
			vertices.setXYZ(idx, vx, vy, vz);
			const uvx = ( vx / outerRadius + 1 ) / 2;
			const uvy = ( vy / outerRadius + 1 ) / 2;
			uvs.setXY(idx, uvx, uvy);
		}
		this.computeVertexNormals();

	}
}
