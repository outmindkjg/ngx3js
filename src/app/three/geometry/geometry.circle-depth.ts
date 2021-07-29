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
	constructor(radius?: number, depth?: number, segments?: number, thetaStart?: number, thetaLength?: number) {
		super(radius, segments, thetaStart, thetaLength);
		this.type = 'CircleDepthGeometry';
		depth = Math.max(0.001, depth);
		const indices = this.duplArray(this.getIndex().array);
		const vertices = this.duplArray(this.getAttribute('position').array);
		const normals = this.duplArray(this.getAttribute('normal').array);
		const uvs = this.duplArray(this.getAttribute('uv').array);
		const tmpIndices = this.getIndex().array;
		const positionCount = this.getAttribute('position').count;
		let startidx = tmpIndices.length;
		for (let i = 0; i < tmpIndices.length; i++) {
			indices[startidx + i] = positionCount + tmpIndices[startidx - i - 1];
		}
    console.log(positionCount);
		for (let i = 0; i < positionCount; i++) {
			indices.push(i, positionCount + i, i + 1);
			indices.push(i + 1, positionCount + i , positionCount + ((i + 1 >= positionCount) ? 1 : i + 1 ));
		}
    startidx = positionCount * 3;
		for (let i = 0; i < startidx; i += 3) {
			vertices[startidx + i + 2] -= depth;
		}
		this.setIndex(indices);
		this.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
		this.setAttribute('normal', new THREE.Float32BufferAttribute(normals, 3));
		this.setAttribute('uv', new THREE.Float32BufferAttribute(uvs, 2));
	}

	protected duplArray(data: ArrayLike<number>): number[] {
		const result: number[] = [];
		for (let i = 0; i < data.length; i++) {
			result.push(data[i]);
		}
		for (let i = 0; i < data.length; i++) {
			result.push(data[i]);
		}
		return result;
	}
}
