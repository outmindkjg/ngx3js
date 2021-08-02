import * as THREE from 'three';
import { GeometryUtils } from './geometryUtils';

/**
 * CircleDepth geometry
 */
export class PlaneDepthGeometry extends THREE.BufferGeometry {

    /**
     * @default 'PlaneDepthGeometry'
     */
	 type: string = 'PlaneDepthGeometry';

	 parameters: {
		 width: number;
		 height: number;
		 depth: number;
		 widthSegments: number;
		 heightSegments: number;
		 depthRate : number;
	};
	 
	/**
	 * @param [width=1] — Width of the sides on the X axis.
	 * @param [height=1] — Height of the sides on the Y axis.
	 * @param [depth=1] — Depth of the sides on the Z axis.
	 * @param [widthSegments=1] — Number of segmented faces along the width of the sides.
	 * @param [heightSegments=1] — Number of segmented faces along the height of the sides.
	 * @param [depthRate=1]
	 */
	constructor(width: number = 1, height: number = 1, depth: number = 1, widthSegments: number = 1, heightSegments: number = 1, depthRate : number = 1) {
		super();
		depth = Math.max(0.001, depth);
		this.parameters = {
			width: width,
			height: height,
			depth: depth,
			widthSegments: widthSegments,
			heightSegments: heightSegments,
			depthRate : depthRate
		};
		const halfDepth = depth / 2;
		const frontGeometry = new THREE.PlaneBufferGeometry(width, height, widthSegments, heightSegments);
		frontGeometry.translate(0, 0, halfDepth);
		const backGeometry = GeometryUtils.getFlipGeometry(frontGeometry);
		const vertices = [];
		const normals = [];
		const uvs = [];
		const indices = [];
		let groupStart = 0;
		let groupEnd = 0;

		let attribute: ArrayLike<number> = null;
		const positionSize = frontGeometry.getAttribute('position').count;
		attribute = frontGeometry.getAttribute('position').array;
		const gridX = Math.floor( widthSegments ) + 1;
		const gridY = Math.floor( heightSegments ) + 1;
		const frontVertices = [];
		const backVertices = [];
		for (let i = 0; i < attribute.length; i++) {
			vertices.push(attribute[i]);
		}
		attribute = backGeometry.getAttribute('position').array;
		for (let i = 0; i < attribute.length; i++) {
			vertices.push(attribute[i]);
		}
		const frontAttribute = frontGeometry.getAttribute('position');
		const backAttribute = backGeometry.getAttribute('position');
		const sideNormals = [];
		const sideUvsFront = [];
		const sideUvsBack = [];
		const sideLen = width + height;
		const uvDepth = depth / sideLen / 2;
		const uvStepX = width / (gridX -1);
		const uvStepY = height / (gridY -1);
		for(let i = 0 ; i < gridX -1 ; i++) {
			const idx = i;
			frontVertices.push(frontAttribute.getX(idx), frontAttribute.getY(idx), frontAttribute.getZ(idx));
			backVertices.push(backAttribute.getX(idx), backAttribute.getY(idx), backAttribute.getZ(idx));
			sideNormals.push(0,0,0);
			const uvX = (i * uvStepX / sideLen);
			sideUvsFront.push(uvX,0.5 + uvDepth);
			sideUvsBack.push(uvX,0.5 - uvDepth);
		}
		for(let i = 0 ; i < gridY -1; i++) {
			const idx = (i + 1) * gridX - 1;
			frontVertices.push(frontAttribute.getX(idx), frontAttribute.getY(idx), frontAttribute.getZ(idx));
			backVertices.push(backAttribute.getX(idx), backAttribute.getY(idx), backAttribute.getZ(idx));
			sideNormals.push(0,0,0);
			const uvX = (width + i * uvStepY ) / sideLen;
			sideUvsFront.push(uvX,0.5 + uvDepth);
			sideUvsBack.push(uvX,0.5 - uvDepth);
		}
		for(let i = 0 ; i < gridX -1 ; i++) {
			const idx = gridX * gridY - i -1;
			frontVertices.push(frontAttribute.getX(idx), frontAttribute.getY(idx), frontAttribute.getZ(idx));
			backVertices.push(backAttribute.getX(idx), backAttribute.getY(idx), backAttribute.getZ(idx));
			sideNormals.push(0,0,0);
			const uvX = 2 - (width + height + i * uvStepX ) / sideLen;
			sideUvsFront.push(uvX,0.5 + uvDepth);
			sideUvsBack.push(uvX,0.5 - uvDepth);
		}
		for(let i = 0 ; i < gridY -1; i++) {
			const idx = (gridY - i -1) * gridX;
			frontVertices.push(frontAttribute.getX(idx), frontAttribute.getY(idx), frontAttribute.getZ(idx));
			backVertices.push(backAttribute.getX(idx), backAttribute.getY(idx), backAttribute.getZ(idx));
			sideNormals.push(0,0,0);
			const uvX = 2 - (width * 2 + height + i * uvStepY ) / sideLen;
			sideUvsFront.push(uvX,0.5 + uvDepth);
			sideUvsBack.push(uvX,0.5 - uvDepth);
		}
		vertices.push(...frontVertices);
		vertices.push(...backVertices);
		if (depthRate !== 1) {
			let x = 0;
			let y = 0;
			let z = 0;
			for (let i = 0 ; i < vertices.length ; i += 3) {
				x = vertices[i];
				y = vertices[i + 1];
				z = vertices[i + 2];
				if (Math.abs( x * height ) > Math.abs( y * width )) {
					vertices[i + 2] +=  -z * (1 - depthRate) * Math.abs(x / (width / 2 ));
				} else {
					vertices[i + 2] +=  -z * (1 - depthRate) * Math.abs(y / (height / 2 ));
				}
			}
		}
		attribute = frontGeometry.getAttribute('normal').array;
		for (let i = 0; i < attribute.length; i++) {
			normals.push(attribute[i]);
		}
		attribute = backGeometry.getAttribute('normal').array;
		for (let i = 0; i < attribute.length; i++) {
			normals.push(attribute[i]);
		}
		attribute = frontGeometry.getAttribute('uv').array;
		for (let i = 0; i < attribute.length; i++) {
			uvs.push(attribute[i]);
		}
		attribute = backGeometry.getAttribute('uv').array;
		for (let i = 0; i < attribute.length; i++) {
			uvs.push(attribute[i]);
		}
		normals.push(...sideNormals);
		normals.push(...sideNormals);
		uvs.push(...sideUvsFront);
		uvs.push(...sideUvsBack);
		this.clearGroups();
		attribute = frontGeometry.getIndex().array;
		for (let i = 0; i < attribute.length; i++) {
			indices.push(attribute[i]);
			groupEnd++;
		}
		this.addGroup(groupStart, groupEnd - groupStart, 0);
		groupStart = groupEnd;
		attribute = backGeometry.getIndex().array;
		for (let i = 0; i < attribute.length; i++) {
			indices.push(attribute[i] + positionSize);
			groupEnd++;
		}
		this.addGroup(groupStart, groupEnd - groupStart, 1);
		groupStart = groupEnd;
		const sideIdxLen = frontVertices.length / 3;
		const startSideSize = positionSize * 2;
		for (let i = 0 ; i < sideIdxLen ; i++) {
			const topIdx = (i + 1) % sideIdxLen;
			indices.push(startSideSize + i, startSideSize + topIdx, startSideSize + sideIdxLen + i );
			indices.push(startSideSize + sideIdxLen + topIdx, startSideSize + sideIdxLen + i, startSideSize + topIdx );
			groupEnd += 6;
		} 
		this.addGroup(groupStart, groupEnd - groupStart, 2);
		groupStart = groupEnd;
		this.setIndex(indices);
		this.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
		this.setAttribute('normal', new THREE.Float32BufferAttribute(normals, 3));
		this.setAttribute('uv', new THREE.Float32BufferAttribute(uvs, 2));
		this.computeVertexNormals();
	}
}
