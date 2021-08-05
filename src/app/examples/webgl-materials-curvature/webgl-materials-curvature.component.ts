import { Component } from '@angular/core';
import { BaseComponent, ThreeUtil } from '../../three';
import * as THREE from 'three';

@Component({
	selector: 'app-webgl-materials-curvature',
	templateUrl: './webgl-materials-curvature.component.html',
	styleUrls: ['./webgl-materials-curvature.component.scss'],
})
export class WebglMaterialsCurvatureComponent extends BaseComponent<{
	filterConvex: () => void;
	filterConcave: () => void;
	filterBoth: () => void;
}> {
	constructor() {
		super(
			{
				filterConvex: () => {
					const curvatureFiltered = new Float32Array(this.curvatureAttribute);
					this.filterConvex(curvatureFiltered);
					this.bufferGeo.attributes.curvature.array = curvatureFiltered;
					this.bufferGeo.attributes.curvature.needsUpdate = true;
				},
				filterConcave: () => {
					const curvatureFiltered = new Float32Array(this.curvatureAttribute);
					this.filterConcave(curvatureFiltered);
					this.bufferGeo.attributes.curvature.array = curvatureFiltered;
					this.bufferGeo.attributes.curvature.needsUpdate = true;
				},
				filterBoth: () => {
					const curvatureFiltered = new Float32Array(this.curvatureAttribute);
					this.filterBoth(curvatureFiltered);
					this.bufferGeo.attributes.curvature.array = curvatureFiltered;
					this.bufferGeo.attributes.curvature.needsUpdate = true;
				},
			},
			[
				{ name: 'filterConvex', type: 'button' },
				{ name: 'filterConcave', type: 'button' },
				{ name: 'filterBoth', type: 'button' },
			]
		);
	}

	vertexShaderRaw = `
  attribute float curvature;

  varying float vCurvature;

  void main() {

    vec3 p = position;
    vec4 modelViewPosition = modelViewMatrix * vec4( p , 1.0 );
    gl_Position = projectionMatrix * modelViewPosition;
    vCurvature = curvature;

  }
  `;
	fragmentShaderRaw = `
  varying vec3 vViewPosition;
  varying float vCurvature;

  void main() {
      gl_FragColor = vec4( vCurvature * 2.0, 0.0, 0.0, 0.0 );
  }
  `;
	loadGeometry: any = null;

	ngOnInit() {
		this.loadGeometry = (bufferGeo: THREE.BufferGeometry) => {
			this._loadGeometry(bufferGeo);
		};
	}

	curvatureAttribute: any = null;
	bufferGeo: any = null;

	average(dict) {
		let sum = 0;
		let length = 0;
		Object.keys(dict).forEach((key) => {
			sum += dict[key];
			length++;
		});
		return sum / length;
	}

	//clamp a number between min and max
	clamp(number, min, max) {
		return Math.max(min, Math.min(number, max));
	}

	//filter the curvature array to only show concave values
	filterConcave(curvature) {
		for (let i = 0; i < curvature.length; i++) {
			curvature[i] = Math.abs(this.clamp(curvature[i], -1, 0));
		}
	}

	//filter the curvature array to only show convex values
	filterConvex(curvature) {
		for (let i = 0; i < curvature.length; i++) {
			curvature[i] = this.clamp(curvature[i], 0, 1);
		}
	}

	//filter the curvature array to show both the concave and convex values
	filterBoth(curvature) {
		for (let i = 0; i < curvature.length; i++) {
			curvature[i] = Math.abs(curvature[i]);
		}
	}

	_loadGeometry(bufferGeo: THREE.BufferGeometry) {
		if (ThreeUtil.isNull(bufferGeo.attributes.position)) {
			return;
		}

		this.bufferGeo = bufferGeo;
		let curvatureAttribute = null;
		bufferGeo.center();
		const dict = {};

		for (let i = 0; i < bufferGeo.attributes.position.count; i += 3) {
			//create a dictionary of every position, and its neighboring positions
			const array = bufferGeo.attributes.position.array;
			const normArray = bufferGeo.attributes.normal.array;

			const posA = new THREE.Vector3(array[3 * i], array[3 * i + 1], array[3 * i + 2]);
			const posB = new THREE.Vector3(array[3 * (i + 1)], array[3 * (i + 1) + 1], array[3 * (i + 1) + 2]);
			const posC = new THREE.Vector3(array[3 * (i + 2)], array[3 * (i + 2) + 1], array[3 * (i + 2) + 2]);

			const normA = new THREE.Vector3(normArray[3 * i], normArray[3 * i + 1], normArray[3 * i + 2]).normalize();
			const normB = new THREE.Vector3(normArray[3 * (i + 1)], normArray[3 * (i + 1) + 1], normArray[3 * (i + 1) + 2]).normalize();
			const normC = new THREE.Vector3(normArray[3 * (i + 2)], normArray[3 * (i + 2) + 1], normArray[3 * (i + 2) + 2]).normalize();

			const strA = posA.toArray().toString();
			const strB = posB.toArray().toString();
			const strC = posC.toArray().toString();

			const posB_A = new THREE.Vector3().subVectors(posB, posA);
			const posB_C = new THREE.Vector3().subVectors(posB, posC);
			const posC_A = new THREE.Vector3().subVectors(posC, posA);

			const b2a = normB.dot(posB_A.normalize());
			const b2c = normB.dot(posB_C.normalize());
			const c2a = normC.dot(posC_A.normalize());

			const a2b = -normA.dot(posB_A.normalize());
			const c2b = -normC.dot(posB_C.normalize());
			const a2c = -normA.dot(posC_A.normalize());

			if (dict[strA] === undefined) {
				dict[strA] = {};
			}

			if (dict[strB] === undefined) {
				dict[strB] = {};
			}

			if (dict[strC] === undefined) {
				dict[strC] = {};
			}

			dict[strA][strB] = a2b;
			dict[strA][strC] = a2c;
			dict[strB][strA] = b2a;
			dict[strB][strC] = b2c;
			dict[strC][strA] = c2a;
			dict[strC][strB] = c2b;
		}

		let curvatureDict = {};
		let min = 10,
			max = 0;

		Object.keys(dict).forEach((key) => {
			curvatureDict[key] = this.average(dict[key]);
		});
		const smoothCurvatureDict = Object.create(curvatureDict);

		Object.keys(dict).forEach((key) => {
			let count = 0;
			let sum = 0;
			Object.keys(dict[key]).forEach((key2) => {
				sum += smoothCurvatureDict[key2];
				count++;
			});
			smoothCurvatureDict[key] = sum / count;
		});

		curvatureDict = smoothCurvatureDict;

		// fit values to 0 and 1
		Object.keys(curvatureDict).forEach((key) => {
			const val = Math.abs(curvatureDict[key]);
			if (val < min) min = val;
			if (val > max) max = val;
		});

		const range = max - min;

		Object.keys(curvatureDict).forEach((key) => {
			const val = Math.abs(curvatureDict[key]);
			if (curvatureDict[key] < 0) {
				curvatureDict[key] = (min - val) / range;
			} else {
				curvatureDict[key] = (val - min) / range;
			}
		});

		curvatureAttribute = new Float32Array(bufferGeo.attributes.position.count);

		for (let i = 0; i < bufferGeo.attributes.position.count; i++) {
			const array = bufferGeo.attributes.position.array;
			const pos = new THREE.Vector3(array[3 * i], array[3 * i + 1], array[3 * i + 2]);
			const str = pos.toArray().toString();
			curvatureAttribute[i] = curvatureDict[str];
		}

		bufferGeo.setAttribute('curvature', new THREE.BufferAttribute(curvatureAttribute, 1));

		//starting filter is to show both concave and convex
		const curvatureFiltered = new Float32Array(curvatureAttribute);
		this.filterBoth(curvatureFiltered);
		this.curvatureAttribute = curvatureAttribute;
	}
}
