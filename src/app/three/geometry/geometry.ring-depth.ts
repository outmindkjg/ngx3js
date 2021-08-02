import * as THREE from 'three';
import { GeometryUtils } from './geometryUtils';

/**
 * RingDepth geometry
 */
export class RingDepthGeometry extends THREE.BufferGeometry {
    /**
     * @default 'RingDepthGeometry'
     */
	 type: string = 'RingDepthGeometry';

	 parameters: {
		innerRadius: number,
		outerRadius: number,
		depth: number,
		thetaSegments: number,
		phiSegments: number,
		thetaStart: number,
		thetaLength: number;
		depthRate : number;
	 };

	/**
	 * @param [innerRadius=0.5]
	 * @param [outerRadius=1]
	 * @param [depth=1]
	 * @param [thetaSegments=8]
	 * @param [phiSegments=1]
	 * @param [thetaStart=0]
	 * @param [thetaLength=Math.PI * 2]
	 * @param [depthRate=1]
	 */
	constructor(innerRadius: number = 0.5, outerRadius: number = 1, depth: number = 1, thetaSegments: number = 8, phiSegments: number = 1, thetaStart: number = 0, thetaLength: number = Math.PI * 2, depthRate : number = 1) {
		super();
		depth = Math.max(0.001, depth);
		this.parameters = {
			innerRadius: innerRadius,
			outerRadius: outerRadius,
			depth : depth,
			thetaSegments: thetaSegments,
			phiSegments: phiSegments,
			thetaStart: thetaStart,
			thetaLength: thetaLength,
			depthRate : depthRate
		};
		const halfDepth = depth / 2;
		const frontGeometry = new THREE.RingBufferGeometry(innerRadius, outerRadius, thetaSegments, phiSegments, thetaStart, thetaLength);
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
		const gridX = Math.floor( thetaSegments ) + 1;
		const gridY = Math.floor( phiSegments ) + 1;
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
		const isClosed = thetaLength >= Math.PI * 2 ? true : false;
		const outerWidth =  outerRadius * thetaLength / Math.PI;
		const height = outerRadius - innerRadius ;
		const innerWidth =  innerRadius * thetaLength / Math.PI;
		const sideLen = (outerWidth + height * 2 + innerWidth) / 2;
		const uvDepth = depth / sideLen / 4;
		const uvStepOuter = outerWidth / (gridX -1);
		const uvStepInner = innerWidth / (gridX -1);
		const uvStepY = height / (gridY -1);
		let workLen = 0;
		for(let i = 0 ; i < gridX -1 ; i++) {
			const idx = i;
			frontVertices.push(frontAttribute.getX(idx), frontAttribute.getY(idx), frontAttribute.getZ(idx));
			backVertices.push(backAttribute.getX(idx), backAttribute.getY(idx), backAttribute.getZ(idx));
			sideNormals.push(0,0,0);
			const uvX = workLen / sideLen;
			sideUvsFront.push(uvX,0.5 + uvDepth);
			sideUvsBack.push(uvX,0.5 - uvDepth);
			workLen += uvStepInner;
		}
		for(let i = 0 ; i < gridY -1; i++) {
			const idx = (i + 1) * gridX -1;
			frontVertices.push(frontAttribute.getX(idx), frontAttribute.getY(idx), frontAttribute.getZ(idx));
			backVertices.push(backAttribute.getX(idx), backAttribute.getY(idx), backAttribute.getZ(idx));
			sideNormals.push(0,0,0);
			const uvX = ( workLen / sideLen ) % 1;
			sideUvsFront.push(uvX,0.5 + uvDepth);
			sideUvsBack.push(uvX,0.5 - uvDepth);
			workLen += uvStepY;
		}
		for(let i = 0 ; i < gridX -1 ; i++) {
			const idx = gridX * gridY - i -1;
			frontVertices.push(frontAttribute.getX(idx), frontAttribute.getY(idx), frontAttribute.getZ(idx));
			backVertices.push(backAttribute.getX(idx), backAttribute.getY(idx), backAttribute.getZ(idx));
			sideNormals.push(0,0,0);
			const uvX = ( workLen / sideLen ) % 1;
			sideUvsFront.push(uvX,0.5 + uvDepth);
			sideUvsBack.push(uvX,0.5 - uvDepth);
			workLen += uvStepOuter;
		}
		for(let i = 0 ; i < gridY -1; i++) {
			const idx = (gridY - i -1) * gridX ;
			frontVertices.push(frontAttribute.getX(idx), frontAttribute.getY(idx), frontAttribute.getZ(idx));
			backVertices.push(backAttribute.getX(idx), backAttribute.getY(idx), backAttribute.getZ(idx));
			sideNormals.push(0,0,0);
			const uvX = ( workLen / sideLen ) % 1;
			sideUvsFront.push(uvX,0.5 + uvDepth);
			sideUvsBack.push(uvX,0.5 - uvDepth);
			workLen += uvStepY;
		}
		vertices.push(...frontVertices);
		vertices.push(...backVertices);
		if (depthRate !== 1) {
			let x = 0;
			let y = 0;
			let z = 0;
			let vector2 = new THREE.Vector2();
			for (let i = 0 ; i < vertices.length ; i += 3) {
				x = vertices[i];
				y = vertices[i + 1];
				z = vertices[i + 2];
				vector2.x = x;
				vector2.y = y;
				const rate = (vector2.length() - innerRadius) / (outerRadius - innerRadius) * ( 1 - depthRate);
				vertices[i + 2] +=   - z * rate;
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
		if (!isClosed) {
			for (let i = 0 ; i < sideIdxLen ; i++) {
				const topIdx = (i + 1) % sideIdxLen;
				indices.push(startSideSize + i, startSideSize + topIdx, startSideSize + sideIdxLen + i );
				indices.push(startSideSize + sideIdxLen + topIdx, startSideSize + sideIdxLen + i, startSideSize + topIdx );
				groupEnd += 6;
			} 
		} else {
			for (let i = 0 ; i < gridX -1 ; i++) {
				const topIdx = (i + 1) % sideIdxLen;
				indices.push(startSideSize + i, startSideSize + topIdx, startSideSize + sideIdxLen + i );
				indices.push(startSideSize + sideIdxLen + topIdx, startSideSize + sideIdxLen + i, startSideSize + topIdx );
				groupEnd += 6;
			} 
			const outerStart = gridX + gridY -2;
			for (let i = outerStart ; i < outerStart + gridX -1 ; i++) {
				const topIdx = (i + 1) % sideIdxLen;
				indices.push(startSideSize + i, startSideSize + topIdx, startSideSize + sideIdxLen + i );
				indices.push(startSideSize + sideIdxLen + topIdx, startSideSize + sideIdxLen + i, startSideSize + topIdx );
				groupEnd += 6;
			} 
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
