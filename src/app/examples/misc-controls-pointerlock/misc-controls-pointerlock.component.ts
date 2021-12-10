import { Component, ElementRef, ViewChild } from '@angular/core';
import {
	BaseComponent,
	ControlComponent, I3JS, THREE, PointerLockControls, RendererEvent,
	RendererTimer
} from 'ngx3js';

@Component({
	selector: 'app-misc-controls-pointerlock',
	templateUrl: './misc-controls-pointerlock.component.html',
	styleUrls: ['./misc-controls-pointerlock.component.scss'],
})
export class MiscControlsPointerlockComponent extends BaseComponent<{}> {
	/**
	 * View child of renderer component
	 */
	@ViewChild('blocker') private blocker: ElementRef = null;

	constructor() {
		super({}, []);
	}

	initFloor(floorGeometry: I3JS.IBufferGeometry) {
		floorGeometry = floorGeometry.toNonIndexed(); // ensure each face has unique vertices
		floorGeometry.rotateX(-Math.PI / 2);
		let position = floorGeometry.attributes.position;
		const vertex = new THREE.Vector3();
		const color = new THREE.Color();
		for (let i = 0, l = position.count; i < l; i++) {
			vertex.fromBufferAttribute(position, i);
			vertex.x += Math.random() * 20 - 10;
			vertex.y += Math.random() * 2;
			vertex.z += Math.random() * 20 - 10;
			position.setXYZ(i, vertex.x, vertex.y, vertex.z);
		}
		floorGeometry = floorGeometry.toNonIndexed(); // ensure each face has unique vertices
		position = floorGeometry.attributes.position;
		const colorsFloor = [];
		for (let i = 0, l = position.count; i < l; i++) {
			color.setHSL(
				Math.random() * 0.3 + 0.5,
				0.75,
				Math.random() * 0.25 + 0.75
			);
			colorsFloor.push(color.r, color.g, color.b);
		}
		floorGeometry.setAttribute(
			'color',
			new THREE.Float32BufferAttribute(colorsFloor, 3)
		);
		return floorGeometry;
	}

	initBox(boxGeometry: I3JS.IBufferGeometry) {
		const position = boxGeometry.attributes.position;
		const colorsBox = [];
		const color = new THREE.Color();
		for (let i = 0, l = position.count; i < l; i++) {
			color.setHSL(
				Math.random() * 0.3 + 0.5,
				0.75,
				Math.random() * 0.25 + 0.75
			);
			colorsBox.push(color.r, color.g, color.b);
		}
		boxGeometry.setAttribute(
			'color',
			new THREE.Float32BufferAttribute(colorsBox, 3)
		);
	}

	ngOnInit() {
		this.boxInfos = [];
		for (let i = 0; i < 500; i++) {
			this.boxInfos.push({
				x: Math.floor(Math.random() * 20 - 10) * 20,
				y: Math.floor(Math.random() * 20) * 20 + 10,
				z: Math.floor(Math.random() * 20 - 10) * 20,
				color:
					'hsl(' +
					(Math.random() * 0.2 + 0.5) +
					',0.75,' +
					(Math.random() * 0.25 + 0.75) +
					')',
			});
		}
	}

	setPointerLock(control: ControlComponent) {
		this.pointerLockControls = control.getControl();
		this.pointerLockControls.addEventListener('lock', () => {
			this.controlLock(true);
		});
		this.pointerLockControls.addEventListener('unlock', () => {
			this.controlLock(false);
		});
	}

	pointerLockControls: PointerLockControls = null;

	controlLockStart() {
		this.pointerLockControls.lock();
	}

	controlLock(isLocked: boolean) {
		if (isLocked) {
			this.blocker.nativeElement.style.display = 'none';
		} else {
			this.blocker.nativeElement.style.display = 'block';
		}
	}
	moveForward = false;
	moveBackward = false;
	moveLeft = false;
	moveRight = false;
	canJump = false;
	velocity = new THREE.Vector3();
	direction = new THREE.Vector3();
	raycaster = new THREE.Raycaster(
		new THREE.Vector3(),
		new THREE.Vector3(0, -1, 0),
		0,
		10
	);

	keyDownEvent(event: RendererEvent) {
		switch (event.type) {
			case 'keyup':
				switch (event.event.code) {
					case 'ArrowUp':
					case 'KeyW':
						this.moveForward = false;
						break;
					case 'ArrowLeft':
					case 'KeyA':
						this.moveLeft = false;
						break;
					case 'ArrowDown':
					case 'KeyS':
						this.moveBackward = false;
						break;
					case 'ArrowRight':
					case 'KeyD':
						this.moveRight = false;
						break;
				}
				break;
			case 'keydown':
				switch (event.event.code) {
					case 'ArrowUp':
					case 'KeyW':
						this.moveForward = true;
						break;
					case 'ArrowLeft':
					case 'KeyA':
						this.moveLeft = true;
						break;
					case 'ArrowDown':
					case 'KeyS':
						this.moveBackward = true;
						break;

					case 'ArrowRight':
					case 'KeyD':
						this.moveRight = true;
						break;
					case 'Space':
						if (this.canJump === true) {
							this.velocity.y += 350;
						}
						this.canJump = false;
						break;
				}
				break;
		}
	}

	boxInfos: {
		color: string;
		x: number;
		y: number;
		z: number;
	}[] = [];

	onRender(timer: RendererTimer) {
		super.onRender(timer);
		if (this.pointerLockControls !== null) {
			const controls = this.pointerLockControls;
			if (controls.isLocked === true) {
				const raycaster = this.raycaster;
				raycaster.ray.origin.copy(controls.getObject().position);
				raycaster.ray.origin.y -= 10;
				const intersections = raycaster.intersectObjects(this.meshChildren);
				const onObject = intersections.length > 0;
				const delta = timer.delta;
				const velocity = this.velocity;
				const direction = this.direction;
				velocity.x -= velocity.x * 10.0 * delta;
				velocity.z -= velocity.z * 10.0 * delta;

				velocity.y -= 9.8 * 100.0 * delta; // 100.0 = mass

				direction.z = Number(this.moveForward) - Number(this.moveBackward);
				direction.x = Number(this.moveRight) - Number(this.moveLeft);
				direction.normalize(); // this ensures consistent movements in all directions

				if (this.moveForward || this.moveBackward)
					velocity.z -= direction.z * 400.0 * delta;
				if (this.moveLeft || this.moveRight)
					velocity.x -= direction.x * 400.0 * delta;

				if (onObject === true) {
					velocity.y = Math.max(0, velocity.y);
					this.canJump = true;
				}
				controls.moveRight(-velocity.x * delta);
				controls.moveForward(-velocity.z * delta);
				controls.getObject().position.y += velocity.y * delta; // new behavior
				if (controls.getObject().position.y < 10) {
					velocity.y = 0;
					controls.getObject().position.y = 10;
					this.canJump = true;
				}
			}
		}
	}
}
