import { Component } from '@angular/core';
import { I3JS, NgxBaseComponent, NgxMeshComponent, IRendererTimer, THREE } from 'ngx3js';

@Component({
	selector: 'app-webgl-points-dynamic',
	templateUrl: './webgl-points-dynamic.component.html',
	styleUrls: ['./webgl-points-dynamic.component.scss'],
})
export class WebglPointsDynamicComponent extends NgxBaseComponent<{}> {
	constructor() {
		super({}, [], false, false);
	}

	ngOnInit() {
		this.createMesh('male', 4.05, -500, -350, 600, 0xff7744);
		this.createMesh('male', 4.05, 500, -350, 0, 0xff5522);
		this.createMesh('male', 4.05, -250, -350, 1500, 0xff9922);
		this.createMesh('male', 4.05, -250, -350, -1500, 0xff99ff);
		this.createMesh('female', 4.05, -1000, -350, 0, 0xffdd44);
		this.createMesh('female', 4.05, 0, -350, 0, 0xffffff);
		this.createMesh('female', 4.05, 1000, -350, 400, 0xff4422);
		this.createMesh('female', 4.05, 250, -350, 1500, 0xff9955);
		this.createMesh('female', 4.05, 250, -350, 2500, 0xff77dd);
	}

	private createMesh(
		geoType: string,
		scale: number,
		x: number,
		y: number,
		z: number,
		color: number
	) {
		const clones = [
			[6000, 0, -4000],
			[5000, 0, 0],
			[1000, 0, 5000],
			[1000, 0, -5000],
			[4000, 0, 2000],
			[-4000, 0, 1000],
			[-5000, 0, -5000],
			[0, 0, 0],
		];
		const groupId = geoType + '_' + color.toString();
		for (let i = 0; i < clones.length; i++) {
			const isClone = i < clones.length - 1 ? true : false;
			const c = isClone ? 0x252525 : color;
			this.meshInfos.push({
				geometry: null,
				mesh: null,
				geoType: geoType,
				position: {
					x: x + clones[i][0],
					y: y + clones[i][1],
					z: z + clones[i][1],
				},
				scale: scale,
				color: c,
				verticesDown: 0,
				verticesUp: 0,
				direction: 0,
				speed: isClone ? 0.5 + Math.random() : 15,
				isClone: isClone,
				groupId: groupId,
				delay: Math.floor(200 + 200 * Math.random()),
				start: Math.floor(100 + 200 * Math.random()),
			});
		}
	}

	meshInfos: {
		geometry?: I3JS.BufferGeometry;
		mesh?: I3JS.Points;
		geoType: string;
		position: { x: number; y: number; z: number };
		scale: number;
		color: number;
		verticesDown: number;
		verticesUp: number;
		direction: number;
		speed: number;
		delay: number;
		start: number;
		groupId: string;
		isClone: boolean;
	}[] = [];

	setGeometry(idx: number, mesh: NgxMeshComponent) {
		const realMesh = mesh.getObject3d() as any ;
		this.getTimeout(3000).then(() => {
			const geometry = realMesh.geometry;
			if (geometry == null && geometry == undefined) {
				return;
			}
			const positions = geometry.getAttribute('position');
			if (positions !== null && positions !== undefined) {
				const info = this.meshInfos[idx];
				if (!info.isClone) {
					const groupId = info.groupId;
					const meshGeometry = new THREE.BufferGeometry();
					meshGeometry.setAttribute('position', positions.clone());
					(meshGeometry.getAttribute('position') as any).setUsage(
						THREE.DynamicDrawUsage
					);
					meshGeometry.setAttribute('initialPosition', positions.clone());
					realMesh.geometry = meshGeometry;
					info.geometry = meshGeometry;
					this.meshInfos.forEach((child) => {
						if (
							child.groupId == groupId &&
							child.geometry === null &&
							child.mesh !== null
						) {
							child.geometry = meshGeometry;
							child.mesh.geometry = meshGeometry;
						}
					});
				}
				info.mesh = realMesh;
			}
		});
	}

	onRender(timer: IRendererTimer) {
		super.onRender(timer);
		let delta = timer.delta * 10;
		delta = delta < 2 ? delta : 2;
		this.meshInfos.forEach((data) => {
			if (data.mesh !== null && data.mesh !== undefined && data.isClone) {
				data.mesh.rotation.y += -0.1 * delta * data.speed;
			}
		});
		this.meshInfos.forEach((data) => {
			if (
				data.geometry !== null &&
				data.geometry !== undefined &&
				!data.isClone
			) {
				const geometry = data.geometry;
				const positions = geometry.attributes.position;
				const initialPositions = geometry.attributes.initialPosition;
				const count = positions.count;
				if (data.start > 0) {
					data.start -= 1;
				} else {
					if (data.direction === 0) {
						data.direction = -1;
					}
				}
				for (let i = 0; i < count; i++) {
					const px = positions.getX(i);
					const py = positions.getY(i);
					const pz = positions.getZ(i);
					if (data.direction < 0) {
						if (py > 0) {
							positions.setXYZ(
								i,
								px + 1.5 * (0.5 - Math.random()) * data.speed * delta,
								py + 3.0 * (0.25 - Math.random()) * data.speed * delta,
								pz + 1.5 * (0.5 - Math.random()) * data.speed * delta
							);
						} else {
							data.verticesDown += 1;
						}
					}
					// rising up
					if (data.direction > 0) {
						const ix = initialPositions.getX(i);
						const iy = initialPositions.getY(i);
						const iz = initialPositions.getZ(i);
						const dx = Math.abs(px - ix);
						const dy = Math.abs(py - iy);
						const dz = Math.abs(pz - iz);
						const d = dx + dy + dx;
						if (d > 1) {
							positions.setXYZ(
								i,
								px -
									((px - ix) / dx) *
										data.speed *
										delta *
										(0.85 - Math.random()),
								py -
									((py - iy) / dy) * data.speed * delta * (1 + Math.random()),
								pz -
									((pz - iz) / dz) * data.speed * delta * (0.85 - Math.random())
							);
						} else {
							data.verticesUp += 1;
						}
					}
				}
				// all vertices down
				if (data.verticesDown >= count) {
					if (data.delay <= 0) {
						data.direction = 1;
						data.speed = 5;
						data.verticesDown = 0;
						data.delay = 320;
					} else {
						data.delay -= 1;
					}
				}
				// all vertices up
				if (data.verticesUp >= count) {
					if (data.delay <= 0) {
						data.direction = -1;
						data.speed = 15;
						data.verticesUp = 0;
						data.delay = 120;
					} else {
						data.delay -= 1;
					}
				}
				positions.needsUpdate = true;
			}
		});
	}
}
