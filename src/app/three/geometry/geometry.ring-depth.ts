import * as THREE from 'three';

/**
 * RingDepth geometry
 */
export class RingDepthGeometry extends THREE.RingGeometry {
	/**
	 * @param [innerRadius=0.5]
	 * @param [outerRadius=1]
	 * @param [depth=1]
	 * @param [thetaSegments=8]
	 * @param [phiSegments=1]
	 * @param [thetaStart=0]
	 * @param [thetaLength=Math.PI * 2]
	 */
	constructor(innerRadius: number = 0.5, outerRadius: number = 1, depth: number = 1, thetaSegments: number = 8, phiSegments: number = 1, thetaStart: number = 0, thetaLength: number = Math.PI * 2) {
		super(innerRadius, outerRadius, thetaSegments, phiSegments, thetaStart, thetaLength);
		this.type = 'RingDepthGeometry';
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
		const isClosed = thetaLength < Math.PI * 2 ? false : true;
		const gridX = Math.floor(thetaSegments) + 1;
		const gridY = Math.floor(phiSegments) + 1;
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
    if (!isClosed) {
      for (let i = 0; i < sideLen; i++) {
        const endIdx = (i + 1) % sideLen;
        sideIndices.push(frontSides[endIdx], frontSides[i], backSides[i]);
        sideIndices.push(backSides[i], backSides[endIdx], frontSides[endIdx]);
      }
    } else {
      const skipSide = gridX + gridY - 2;
      for (let i = 0; i < gridX; i++) {
        const endIdx = (i + 1) % sideLen;
        sideIndices.push(frontSides[endIdx], frontSides[i], backSides[i]);
        sideIndices.push(backSides[i], backSides[endIdx], frontSides[endIdx]);

        sideIndices.push(frontSides[endIdx + skipSide], frontSides[i + skipSide], backSides[i + skipSide]);
        sideIndices.push(backSides[i + skipSide], backSides[endIdx + skipSide], frontSides[endIdx + skipSide]);
      }
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
