import * as THREE from 'three';
import { StarGeometry } from './geometry.star';

/**
 * StarDepth geometry
 */
export class StarDepthGeometry extends StarGeometry {
	/**
	 * @param [innerRadius=0.5]
	 * @param [outerRadius=1]
	 * @param [depth=1]
	 * @param [segments=5]
	 * @param [thetaStart=0]
	 * @param [thetaLength=Math.PI * 2]
	 */
	constructor(innerRadius: number = 0.5, outerRadius: number = 1, depth : number = 1, segments: number = 5, thetaStart: number = 0, thetaLength: number = Math.PI * 2) {
		super(innerRadius, outerRadius, segments, thetaStart, thetaLength);
		this.type = 'StarDepthGeometry';
		depth = Math.max(0.001, depth);
		const halfDepth = depth / 2;
		const attrPosition = this.getAttribute('position');
		const attrUvs = this.getAttribute('uv');
		const frontVertices = [];
		const backVertices = [];
		const posLen = attrPosition.count;
		const normals = [];
		const frontUvs = [];
		const backUvs = [];
		for (let i = 0; i < posLen; i++) {
			const x = attrPosition.getX(i);
			const y = attrPosition.getY(i);
			const z = attrPosition.getZ(i);
			frontVertices.push(x, y, z - halfDepth);
			backVertices.push(x, y, z + halfDepth);
			normals.push(0, 0, 0, 0, 0, 0);
			const ux = attrUvs.getX(i);
			const uy = attrUvs.getY(i);
			frontUvs.push(ux, uy);
			backUvs.push(ux, uy);
		}
		const uvs = [];
		uvs.push(...frontUvs);
		uvs.push(...backUvs);
		const vertices = [];
		vertices.push(...frontVertices);
		vertices.push(...backVertices);
		const attrIndex = this.getIndex();
		const indices = [];
		const frontIndices = [];
		const backIndices = [];
		const sideIndices = [];
		const idxLen = attrIndex.count;
		for (let i = 0; i < idxLen; i++) {
			frontIndices.push(attrIndex.getX(i) + posLen);
			backIndices.push(attrIndex.getX(idxLen - i - 1));
		}
		const isClosed = (thetaLength < Math.PI * 2) ? false : true; 
		for (let i = 1; i < (isClosed ? posLen : posLen - 1); i++) {
			const topEnd = i + 1 >= posLen ? (i + 2) % posLen : i + 1;
			sideIndices.push(i + posLen, i, topEnd);
			sideIndices.push(topEnd, topEnd + posLen, posLen + i);
		}
		if (!isClosed) {
			sideIndices.push(1, posLen + 1, 0);
			sideIndices.push(0, posLen + 1, posLen);
			sideIndices.push(0, posLen, posLen - 1);
			sideIndices.push(posLen - 1, posLen, posLen * 2 - 1);
		}
		indices.push(...frontIndices);
		indices.push(...backIndices);
		indices.push(...sideIndices);
		this.setIndex(indices);
		this.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
		this.setAttribute('normal', new THREE.Float32BufferAttribute(normals, 3));
		this.setAttribute('uv', new THREE.Float32BufferAttribute(uvs, 2));
		this.computeVertexNormals();
	}
}
