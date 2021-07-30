import * as THREE from 'three';

/**
 * CircleDepth geometry
 */
export class PlaneDepthGeometry extends THREE.PlaneGeometry {
	/**
	 * @param [width=1] — Width of the sides on the X axis.
	 * @param [height=1] — Height of the sides on the Y axis.
	 * @param [depth=1] — Depth of the sides on the Z axis.
	 * @param [widthSegments=1] — Number of segmented faces along the width of the sides.
	 * @param [heightSegments=1] — Number of segmented faces along the height of the sides.
	 */
	constructor(width: number = 1, height: number = 1, depth: number = 1, widthSegments: number = 1, heightSegments: number = 1) {
		super(width, height, widthSegments, heightSegments);
		this.type = 'PlaneDepthGeometry';
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
		const gridX = Math.floor(widthSegments) + 1;
		const gridY = Math.floor(heightSegments) + 1;
		const frontSides = [];
		const backSides = [];
		for (let i = 0; i < gridX - 1; i++) {
			frontSides.push(i);
			backSides.push(posLen + i);
		}
		for (let i = 0; i < gridY - 1; i++) {
			frontSides.push((i + 1) * gridX - 1);
			backSides.push(posLen + (i + 1) * gridX - 1);
		}
		for (let i = 0; i < gridX - 1; i++) {
			frontSides.push(posLen - i - 1);
			backSides.push(posLen * 2 - i - 1);
		}
		for (let i = 0; i < gridY - 1; i++) {
			frontSides.push((gridY - i - 1) * gridX);
			backSides.push(posLen + (gridY - i - 1) * gridX);
		}
		const sideLen = frontSides.length;
		for (let i = 0; i < sideLen; i++) {
			const endIdx = (i + 1) % sideLen;
			sideIndices.push(frontSides[endIdx], frontSides[i], backSides[i]);
			sideIndices.push(backSides[i], backSides[endIdx], frontSides[endIdx]);
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
