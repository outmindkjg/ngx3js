import * as THREE from 'three';
import { ThreeUtil } from '../interface';

/**
 * CircleDepth geometry
 */
export class OutlineGeometry extends THREE.WireframeGeometry {
	/**
	 * @param [innerRadius=0.5]
	 * @param [outerRadius=1]
	 * @param [segments=5]
	 * @param [thetaStart=0]
	 * @param [thetaLength=Math.PI * 2]
	 */
	constructor(geometry: THREE.BufferGeometry, scale: number = 1) {
		super(geometry);
		this.type = 'OutlineGeometry';
		if (scale !== 1) {
			this.scale(scale, scale, scale);
		}
		const vertices: number[] = [];
		const attrPosition = this.getAttribute('position');
		const parameters: any = geometry['parameters'] || {};
		switch (geometry.type) {
			case 'StarGeometry':
			case 'CircleGeometry':
				vertices.push(attrPosition.getX(0), attrPosition.getY(0), attrPosition.getZ(0));
				vertices.push(attrPosition.getX(1), attrPosition.getY(1), attrPosition.getZ(1));
				for (let i = 6; i < attrPosition.count; i += 4) {
					vertices.push(attrPosition.getX(i), attrPosition.getY(i), attrPosition.getZ(i));
					vertices.push(attrPosition.getX(i + 1), attrPosition.getY(i + 1), attrPosition.getZ(i + 1));
				}
				if (parameters.thetaLength < Math.PI * 2) {
					vertices.push(attrPosition.getX(0), attrPosition.getY(0), attrPosition.getZ(0));
					vertices.push(attrPosition.getX(2), attrPosition.getY(2), attrPosition.getZ(2));
					const endIdx = attrPosition.count - 1;
					vertices.push(attrPosition.getX(endIdx), attrPosition.getY(endIdx), attrPosition.getZ(endIdx));
					vertices.push(attrPosition.getX(2), attrPosition.getY(2), attrPosition.getZ(2));
				}
				break;
			case 'BoxGeometry' :
				{
					const width_half = (parameters.width / 2) * scale;
					const height_half = (parameters.height / 2) * scale;
					const depth_half = (parameters.depth / 2) * scale;
					const p1 = new THREE.Vector3(-width_half, height_half, -depth_half);
					const p2 = new THREE.Vector3(-width_half, -height_half,-depth_half);
					const p3 = new THREE.Vector3(width_half, -height_half, -depth_half);
					const p4 = new THREE.Vector3(width_half, height_half, -depth_half);
					const p5 = new THREE.Vector3(-width_half, height_half, depth_half);
					const p6 = new THREE.Vector3(-width_half, -height_half, depth_half);
					const p7 = new THREE.Vector3(width_half, -height_half, depth_half);
					const p8 = new THREE.Vector3(width_half, height_half, depth_half);
					vertices.push(p1.x, p1.y, p1.z, p2.x, p2.y, p2.z);
					vertices.push(p2.x, p2.y, p2.z, p3.x, p3.y, p3.z);
					vertices.push(p3.x, p3.y, p3.z, p4.x, p4.y, p4.z);
					vertices.push(p4.x, p4.y, p4.z, p1.x, p1.y, p1.z);
					vertices.push(p5.x, p5.y, p5.z, p6.x, p6.y, p6.z);
					vertices.push(p6.x, p6.y, p6.z, p7.x, p7.y, p7.z);
					vertices.push(p7.x, p7.y, p7.z, p8.x, p8.y, p8.z);
					vertices.push(p8.x, p8.y, p8.z, p5.x, p5.y, p5.z);
					vertices.push(p1.x, p1.y, p1.z, p5.x, p5.y, p5.z);
					vertices.push(p2.x, p2.y, p2.z, p6.x, p6.y, p6.z);
					vertices.push(p3.x, p3.y, p3.z, p7.x, p7.y, p7.z);
					vertices.push(p4.x, p4.y, p4.z, p8.x, p8.y, p8.z);
				}
				break;			
			case 'PlaneGeometry':
				{
					const width_half = (parameters.width / 2) * scale;
					const height_half = (parameters.height / 2) * scale;
					const p1 = new THREE.Vector3(-width_half, height_half, 0);
					const p2 = new THREE.Vector3(-width_half, -height_half, 0);
					const p3 = new THREE.Vector3(width_half, -height_half, 0);
					const p4 = new THREE.Vector3(width_half, height_half, 0);
					vertices.push(p1.x, p1.y, p1.z, p2.x, p2.y, p2.z);
					vertices.push(p2.x, p2.y, p2.z, p3.x, p3.y, p3.z);
					vertices.push(p3.x, p3.y, p3.z, p4.x, p4.y, p4.z);
					vertices.push(p4.x, p4.y, p4.z, p1.x, p1.y, p1.z);
				}
				break;
			case 'SphereGeometry' :
				{
					const p1 = new THREE.Vector3();
					const p2 = new THREE.Vector3();
					const zero = new THREE.Vector3(0,0,0);
					const plane = new THREE.Plane();
					for (let i = 0; i < attrPosition.count; i += 2) {
						p1.set(attrPosition.getX(i), attrPosition.getY(i), attrPosition.getZ(i));
						p2.set(attrPosition.getX(i+1), attrPosition.getY(i+1), attrPosition.getZ(i+1));
						plane.setFromCoplanarPoints(p1, p2, zero);
						if (this.isZero(p1.y - p2.y) || this.isZero(plane.normal.x) || this.isZero(plane.normal.y)) {
							vertices.push(p1.x, p1.y, p1.z, p2.x, p2.y, p2.z);
						}
					}
				}
				break;
			default:
				for (let i = 0; i < attrPosition.count; i += 2) {
					console.log(i, attrPosition.getX(i).toFixed(2), attrPosition.getY(i).toFixed(2), attrPosition.getX(i + 1).toFixed(2), attrPosition.getY(i + 1).toFixed(2));
				}
				break;
		}
		if (vertices.length > 0) {
			this.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
		}
		// console.log(this.getAttribute('position').count);
		// console.log(geometry.getAttribute('position').count);
	}

	private isZero(v : number) {
		return Math.round(v * 10000) === 0;
	}
}
