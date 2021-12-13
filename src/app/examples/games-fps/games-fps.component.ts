import { Component } from '@angular/core';
import {
	BaseComponent,
	Capsule, I3JS, MeshComponent, THREE, Octree,
	RendererEvent,
	RendererTimer,
	Sphere,
	Vector3
} from 'ngx3js';


@Component({
	selector: 'app-games-fps',
	templateUrl: './games-fps.component.html',
	styleUrls: ['./games-fps.component.scss'],
})
export class GamesFpsComponent extends BaseComponent<{}> {
	constructor() {
		super({}, []);
	}

	ngOnInit() {
		this.playerCollider = new Capsule(
			new THREE.Vector3(0, 0.35, 0) as any,
			new THREE.Vector3(0, 1, 0) as any,
			0.35
		);
		this.spheresInfos = [];		
		for (let i = 0; i < 20; i++) {
			this.spheresInfos.push({
				mesh: null,
				collider: new Sphere(new Vector3(0, -100, 0), 0.2),
				velocity: new THREE.Vector3(),
			});
		}
	}

	setSpheres(mesh: MeshComponent, idx: number) {
		this.spheresInfos[idx].mesh = mesh.getMesh();
	}

	keyStates: { [key: string]: boolean } = {};
	sphereIdx: number = 0;

	setMouseEvent(event: RendererEvent) {
		switch (event.type) {
			case 'keydown':
				this.keyStates[event.event.code] = true;
				break;
			case 'keyup':
				this.keyStates[event.event.code] = false;
				break;
			case 'mousedown':
			case 'pointerdown':
				event.nativeElement.requestPointerLock();
				break;
			case 'mousemove':
			case 'pointermove':
				if (
					this.camera !== null &&
					document.pointerLockElement === event.nativeElement
				) {
					const camera: I3JS.ICamera = this.camera.getCamera();
					camera.rotation.y -= event.event.movementX / 500;
					camera.rotation.x -= event.event.movementY / 500;
				}
				break;
			case 'click':
				if (this.camera !== null) {
					const sphere = this.spheresInfos[this.sphereIdx];
					const camera: I3JS.ICamera = this.camera.getCamera();
					camera.getWorldDirection(this.playerDirection);
					sphere.collider.center.copy(this.playerCollider.end);
					sphere.velocity.copy(this.playerDirection).multiplyScalar(30);
					this.sphereIdx = (this.sphereIdx + 1) % this.spheresInfos.length;
				}
				break;
			default:
				console.log(event.type);
				break;
		}
	}

	spheresInfos: {
		mesh?: I3JS.IMesh;
		collider: I3JS.ISphere;
		velocity: I3JS.IVector3;
	}[] = [];

	worldOctree: any = null;
	playerCollider: any = null;
	playerVelocity = new THREE.Vector3();
	playerDirection = new THREE.Vector3();
	playerOnFloor = false;
	GRAVITY = 30;
	setWorld(world: MeshComponent) {
		const scene = world.getMesh();
		if (scene.children.length > 0) {
			this.worldOctree = new Octree();
			this.worldOctree.fromGraphNode(scene);
			scene.traverse((child) => {
				if (child['isMesh']) {
					child.castShadow = true;
					child.receiveShadow = true;
					if (child['material'].map) {
						child['material'].map.anisotropy = 8;
					}
				}
			});
		}
	}

	playerCollitions() {
		const result = this.worldOctree.capsuleIntersect(this.playerCollider);
		this.playerOnFloor = false;
		if (result) {
			this.playerOnFloor = result.normal.y > 0;
			if (!this.playerOnFloor) {
				this.playerVelocity.addScaledVector(
					result.normal,
					-result.normal.dot(this.playerVelocity)
				);
			}
			this.playerCollider.translate(result.normal.multiplyScalar(result.depth));
		}
	}

	updatePlayer(deltaTime: number) {
		if (this.playerOnFloor) {
			const damping = Math.exp(-3 * deltaTime) - 1;
			this.playerVelocity.addScaledVector(this.playerVelocity, damping);
		} else {
			this.playerVelocity.y -= this.GRAVITY * deltaTime;
		}
		const deltaPosition = this.playerVelocity.clone().multiplyScalar(deltaTime);
		this.playerCollider.translate(deltaPosition);
		this.playerCollitions();
		const camera: I3JS.ICamera = this.camera.getCamera();
		camera.position.copy(this.playerCollider.end);
	}

	spheresCollisions() {
		for (let i = 0; i < this.spheresInfos.length; i++) {
			const s1 = this.spheresInfos[i];
			for (let j = i + 1; j < this.spheresInfos.length; j++) {
				const s2 = this.spheresInfos[j];
				const d2 = s1.collider.center.distanceToSquared(s2.collider.center);
				const r = s1.collider.radius + s2.collider.radius;
				const r2 = r * r;
				if (d2 < r2) {
					const normal = s1.collider
						.clone()
						.center.sub(s2.collider.center)
						.normalize();
					const v1 = normal.clone().multiplyScalar(normal.dot(s1.velocity));
					const v2 = normal.clone().multiplyScalar(normal.dot(s2.velocity));
					s1.velocity.add(v2).sub(v1);
					s2.velocity.add(v1).sub(v2);
					const d = (r - Math.sqrt(d2)) / 2;
					s1.collider.center.addScaledVector(normal, d);
					s2.collider.center.addScaledVector(normal, -d);
				}
			}
		}
	}

	updateSpheres(deltaTime: number) {
		this.spheresInfos.forEach((sphere) => {
			sphere.collider.center.addScaledVector(sphere.velocity, deltaTime);
			const result = this.worldOctree.sphereIntersect(sphere.collider);
			if (result) {
				sphere.velocity.addScaledVector(
					result.normal,
					-result.normal.dot(sphere.velocity) * 1.5
				);
				sphere.collider.center.add(result.normal.multiplyScalar(result.depth));
			} else {
				sphere.velocity.y -= this.GRAVITY * deltaTime;
			}
			const damping = Math.exp(-1.5 * deltaTime) - 1;
			sphere.velocity.addScaledVector(sphere.velocity, damping);
			this.spheresCollisions();
			if (sphere.mesh !== null) {
				sphere.mesh.position.copy(sphere.collider.center);
			}
		});
	}

	getForwardVector() {
		const camera: I3JS.ICamera = this.camera.getCamera();
		camera.getWorldDirection(this.playerDirection);
		this.playerDirection.y = 0;
		this.playerDirection.normalize();
		return this.playerDirection;
	}

	getSideVector() {
		const camera: I3JS.ICamera = this.camera.getCamera();
		camera.getWorldDirection(this.playerDirection);
		this.playerDirection.y = 0;
		this.playerDirection.normalize();
		this.playerDirection.cross(camera.up);
		return this.playerDirection;
	}

	fpsControls(deltaTime: number) {
		const speed = 25;

		if (this.playerOnFloor) {
			if (this.keyStates['KeyW']) {
				this.playerVelocity.add(
					this.getForwardVector().multiplyScalar(speed * deltaTime)
				);
			}

			if (this.keyStates['KeyS']) {
				this.playerVelocity.add(
					this.getForwardVector().multiplyScalar(-speed * deltaTime)
				);
			}

			if (this.keyStates['KeyA']) {
				this.playerVelocity.add(
					this.getSideVector().multiplyScalar(-speed * deltaTime)
				);
			}

			if (this.keyStates['KeyD']) {
				this.playerVelocity.add(
					this.getSideVector().multiplyScalar(speed * deltaTime)
				);
			}

			if (this.keyStates['Space']) {
				this.playerVelocity.y = 15;
			}
		}
	}

	onRender(timer: RendererTimer) {
		super.onRender(timer);
		if (this.camera !== null && this.worldOctree !== null) {
			const STEPS_PER_FRAME = 5;
			const deltaTime = Math.min(0.05, timer.delta) / STEPS_PER_FRAME;
			for (let i = 0; i < STEPS_PER_FRAME; i++) {
				this.fpsControls(deltaTime);
				this.updatePlayer(deltaTime);
				this.updateSpheres(deltaTime);
			}
		}
	}
}
