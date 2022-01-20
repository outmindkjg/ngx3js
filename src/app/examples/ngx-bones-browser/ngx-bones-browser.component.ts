import { Component } from '@angular/core';
import {
	I3JS, IRendererTimer, NgxBaseComponent, NgxMeshComponent, NgxThreeUtil, THREE
} from 'ngx3js';
interface BoneControl {
	positionX: number;
	positionY: number;
	positionZ: number;
	rotationX: number;
	rotationY: number;
	rotationZ: number;
	scaleX: number;
	scaleY: number;
	scaleZ: number;
}
@Component({
	selector: 'app-ngx-bones-browser',
	templateUrl: './ngx-bones-browser.component.html',
	styleUrls: ['./ngx-bones-browser.component.scss'],
})
export class NgxBonesBrowserComponent extends NgxBaseComponent<{
	pose: () => void;
	animateBones: boolean;
	bone0: BoneControl;
	bone1: BoneControl;
	bone2: BoneControl;
	bone3: BoneControl;
	bone4: BoneControl;
}> {
	constructor() {
		super(
			{
				pose: () => {
					if (this.skeleton !== null) {
						this.skeleton.pose();
						this._lastTime = 0;
					}
				},
				animateBones: false,
				bone0: {
					positionX: 0,
					positionY: -16,
					positionZ: 0,
					rotationX: 0,
					rotationY: 0,
					rotationZ: 0,
					scaleX: 1,
					scaleY: 1,
					scaleZ: 1,
				},
				bone1: {
					positionX: 0,
					positionY: 8,
					positionZ: 0,
					rotationX: 0,
					rotationY: 0,
					rotationZ: 0,
					scaleX: 1,
					scaleY: 1,
					scaleZ: 1,
				},
				bone2: {
					positionX: 0,
					positionY: 8,
					positionZ: 0,
					rotationX: 0,
					rotationY: 0,
					rotationZ: 0,
					scaleX: 1,
					scaleY: 1,
					scaleZ: 1,
				},
				bone3: {
					positionX: 0,
					positionY: 8,
					positionZ: 0,
					rotationX: 0,
					rotationY: 0,
					rotationZ: 0,
					scaleX: 1,
					scaleY: 1,
					scaleZ: 1,
				},
				bone4: {
					positionX: 0,
					positionY: 8,
					positionZ: 0,
					rotationX: 0,
					rotationY: 0,
					rotationZ: 0,
					scaleX: 1,
					scaleY: 1,
					scaleZ: 1,
				},
			},
			[
				{
					type: 'folder',
					name: 'General Options',
					children: [
						{ type: 'checkbox', name: 'animateBones', title: 'Animate Bones' },
						{ type: 'button', name: 'pose', title: '.pose()' },
					],
				},
				{
					type: 'folder',
					name: 'Bone 0',
					control: 'bone0',
					children: [
						{
							type: 'number',
							name: 'positionX',
							min: -10,
							max: 10,
							title: 'position.x',
							change: () => {
								this.changeControl('bone0', 'positionX');
							},
						},
						{
							type: 'number',
							name: 'positionY',
							min: -26,
							max: -6,
							title: 'position.y',
							change: () => {
								this.changeControl('bone0', 'positionY');
							},
						},
						{
							type: 'number',
							name: 'positionZ',
							min: -10,
							max: 10,
							title: 'position.z',
							change: () => {
								this.changeControl('bone0', 'positionZ');
							},
						},
						{
							type: 'number',
							name: 'rotationX',
							min: -90,
							max: 90,
							title: 'rotation.x',
							change: () => {
								this.changeControl('bone0', 'rotationX');
							},
						},
						{
							type: 'number',
							name: 'rotationY',
							min: -90,
							max: 90,
							title: 'rotation.y',
							change: () => {
								this.changeControl('bone0', 'rotationY');
							},
						},
						{
							type: 'number',
							name: 'rotationZ',
							min: -90,
							max: 90,
							title: 'rotation.z',
							change: () => {
								this.changeControl('bone0', 'rotationZ');
							},
						},
						{
							type: 'number',
							name: 'scaleX',
							min: 0,
							max: 2,
							title: 'scale.x',
							change: () => {
								this.changeControl('bone0', 'scaleX');
							},
						},
						{
							type: 'number',
							name: 'scaleY',
							min: 0,
							max: 2,
							title: 'scale.y',
							change: () => {
								this.changeControl('bone0', 'scaleY');
							},
						},
						{
							type: 'number',
							name: 'scaleZ',
							min: 0,
							max: 2,
							title: 'scale.z',
							change: () => {
								this.changeControl('bone0', 'scaleZ');
							},
						},
					],
				},
				{
					type: 'folder',
					name: 'Bone 1',
					control: 'bone1',
					children: [
						{
							type: 'number',
							name: 'positionX',
							min: -10,
							max: 10,
							title: 'position.x',
							change: () => {
								this.changeControl('bone1', 'positionX');
							},
						},
						{
							type: 'number',
							name: 'positionY',
							min: -2,
							max: 18,
							title: 'position.y',
							change: () => {
								this.changeControl('bone1', 'positionY');
							},
						},
						{
							type: 'number',
							name: 'positionZ',
							min: -10,
							max: 10,
							title: 'position.z',
							change: () => {
								this.changeControl('bone1', 'positionZ');
							},
						},
						{
							type: 'number',
							name: 'rotationX',
							min: -90,
							max: 90,
							title: 'rotation.x',
							change: () => {
								this.changeControl('bone1', 'rotationX');
							},
						},
						{
							type: 'number',
							name: 'rotationY',
							min: -90,
							max: 90,
							title: 'rotation.y',
							change: () => {
								this.changeControl('bone1', 'rotationY');
							},
						},
						{
							type: 'number',
							name: 'rotationZ',
							min: -90,
							max: 90,
							title: 'rotation.z',
							change: () => {
								this.changeControl('bone1', 'rotationZ');
							},
						},
						{
							type: 'number',
							name: 'scaleX',
							min: 0,
							max: 2,
							title: 'scale.x',
							change: () => {
								this.changeControl('bone1', 'scaleX');
							},
						},
						{
							type: 'number',
							name: 'scaleY',
							min: 0,
							max: 2,
							title: 'scale.y',
							change: () => {
								this.changeControl('bone1', 'scaleY');
							},
						},
						{
							type: 'number',
							name: 'scaleZ',
							min: 0,
							max: 2,
							title: 'scale.z',
							change: () => {
								this.changeControl('bone1', 'scaleZ');
							},
						},
					],
				},
				{
					type: 'folder',
					name: 'Bone 2',
					control: 'bone2',
					children: [
						{
							type: 'number',
							name: 'positionX',
							min: -10,
							max: 10,
							title: 'position.x',
							change: () => {
								this.changeControl('bone2', 'positionX');
							},
						},
						{
							type: 'number',
							name: 'positionY',
							min: -2,
							max: 18,
							title: 'position.y',
							change: () => {
								this.changeControl('bone2', 'positionY');
							},
						},
						{
							type: 'number',
							name: 'positionZ',
							min: -10,
							max: 10,
							title: 'position.z',
							change: () => {
								this.changeControl('bone2', 'positionZ');
							},
						},
						{
							type: 'number',
							name: 'rotationX',
							min: -90,
							max: 90,
							title: 'rotation.x',
							change: () => {
								this.changeControl('bone2', 'rotationX');
							},
						},
						{
							type: 'number',
							name: 'rotationY',
							min: -90,
							max: 90,
							title: 'rotation.y',
							change: () => {
								this.changeControl('bone2', 'rotationY');
							},
						},
						{
							type: 'number',
							name: 'rotationZ',
							min: -90,
							max: 90,
							title: 'rotation.z',
							change: () => {
								this.changeControl('bone2', 'rotationZ');
							},
						},
						{
							type: 'number',
							name: 'scaleX',
							min: 0,
							max: 2,
							title: 'scale.x',
							change: () => {
								this.changeControl('bone2', 'scaleX');
							},
						},
						{
							type: 'number',
							name: 'scaleY',
							min: 0,
							max: 2,
							title: 'scale.y',
							change: () => {
								this.changeControl('bone2', 'scaleY');
							},
						},
						{
							type: 'number',
							name: 'scaleZ',
							min: 0,
							max: 2,
							title: 'scale.z',
							change: () => {
								this.changeControl('bone2', 'scaleZ');
							},
						},
					],
				},
				{
					type: 'folder',
					name: 'Bone 3',
					control: 'bone3',
					children: [
						{
							type: 'number',
							name: 'positionX',
							min: -10,
							max: 10,
							title: 'position.x',
							change: () => {
								this.changeControl('bone3', 'positionX');
							},
						},
						{
							type: 'number',
							name: 'positionY',
							min: -2,
							max: 18,
							title: 'position.y',
							change: () => {
								this.changeControl('bone3', 'positionY');
							},
						},
						{
							type: 'number',
							name: 'positionZ',
							min: -10,
							max: 10,
							title: 'position.z',
							change: () => {
								this.changeControl('bone3', 'positionZ');
							},
						},
						{
							type: 'number',
							name: 'rotationX',
							min: -90,
							max: 90,
							title: 'rotation.x',
							change: () => {
								this.changeControl('bone3', 'rotationX');
							},
						},
						{
							type: 'number',
							name: 'rotationY',
							min: -90,
							max: 90,
							title: 'rotation.y',
							change: () => {
								this.changeControl('bone3', 'rotationY');
							},
						},
						{
							type: 'number',
							name: 'rotationZ',
							min: -90,
							max: 90,
							title: 'rotation.z',
							change: () => {
								this.changeControl('bone3', 'rotationZ');
							},
						},
						{
							type: 'number',
							name: 'scaleX',
							min: 0,
							max: 2,
							title: 'scale.x',
							change: () => {
								this.changeControl('bone3', 'scaleX');
							},
						},
						{
							type: 'number',
							name: 'scaleY',
							min: 0,
							max: 2,
							title: 'scale.y',
							change: () => {
								this.changeControl('bone3', 'scaleY');
							},
						},
						{
							type: 'number',
							name: 'scaleZ',
							min: 0,
							max: 2,
							title: 'scale.z',
							change: () => {
								this.changeControl('bone3', 'scaleZ');
							},
						},
					],
				},
				{
					type: 'folder',
					name: 'Bone 4',
					control: 'bone4',
					children: [
						{
							type: 'number',
							name: 'positionX',
							min: -10,
							max: 10,
							title: 'position.x',
							change: () => {
								this.changeControl('bone4', 'positionX');
							},
						},
						{
							type: 'number',
							name: 'positionY',
							min: -2,
							max: 18,
							title: 'position.y',
							change: () => {
								this.changeControl('bone4', 'positionY');
							},
						},
						{
							type: 'number',
							name: 'positionZ',
							min: -10,
							max: 10,
							title: 'position.z',
							change: () => {
								this.changeControl('bone4', 'positionZ');
							},
						},
						{
							type: 'number',
							name: 'rotationX',
							min: -90,
							max: 90,
							title: 'rotation.x',
							change: () => {
								this.changeControl('bone4', 'rotationX');
							},
						},
						{
							type: 'number',
							name: 'rotationY',
							min: -90,
							max: 90,
							title: 'rotation.y',
							change: () => {
								this.changeControl('bone4', 'rotationY');
							},
						},
						{
							type: 'number',
							name: 'rotationZ',
							min: -90,
							max: 90,
							title: 'rotation.z',
							change: () => {
								this.changeControl('bone4', 'rotationZ');
							},
						},
						{
							type: 'number',
							name: 'scaleX',
							min: 0,
							max: 2,
							title: 'scale.x',
							change: () => {
								this.changeControl('bone4', 'scaleX');
							},
						},
						{
							type: 'number',
							name: 'scaleY',
							min: 0,
							max: 2,
							title: 'scale.y',
							change: () => {
								this.changeControl('bone4', 'scaleY');
							},
						},
						{
							type: 'number',
							name: 'scaleZ',
							min: 0,
							max: 2,
							title: 'scale.z',
							change: () => {
								this.changeControl('bone4', 'scaleZ');
							},
						},
					],
				},
			],
			false,
			false
		);
	}

	ngOnInit(): void {
		this.height = this.segmentHeight * this.segmentCount;
		this.halfHeight = this.height * 0.5;
	}

	segmentHeight = 8;
	segmentCount = 4;
	height = this.segmentHeight * this.segmentCount;
	halfHeight = this.height * 0.5;

	private changeControl(name: string, type: string) {
		if (this.bones.length < 5) {
			return;
		}
		let control: BoneControl = null;
		let bone: I3JS.Bone = null;
		switch (name) {
			case 'bone0':
				control = this.controls.bone0;
				bone = this.bones[0];
				break;
			case 'bone1':
				control = this.controls.bone1;
				bone = this.bones[1];
				break;
			case 'bone2':
				control = this.controls.bone2;
				bone = this.bones[2];
				break;
			case 'bone3':
				control = this.controls.bone3;
				bone = this.bones[3];
				break;
			case 'bone4':
				control = this.controls.bone4;
				bone = this.bones[4];
				break;
		}
		if (control !== null && bone !== null) {
			switch (type) {
				case 'positionX':
					bone.position.x = control.positionX;
					break;
				case 'positionY':
					bone.position.y = control.positionY;
					break;
				case 'positionZ':
					bone.position.z = control.positionZ;
					break;
				case 'rotationX':
					bone.rotation.x = NgxThreeUtil.getAngle2RadianSafe(control.rotationX);
					break;
				case 'rotationY':
					bone.rotation.y = NgxThreeUtil.getAngle2RadianSafe(control.rotationY);
					break;
				case 'rotationZ':
					bone.rotation.z = NgxThreeUtil.getAngle2RadianSafe(control.rotationZ);
					break;
				case 'scaleX':
					bone.scale.x = control.scaleX;
					break;
				case 'scaleY':
					bone.scale.y = control.scaleY;
					break;
				case 'scaleZ':
					bone.scale.z = control.scaleZ;
					break;
			}
		}
	}

	setGeometry = (geometry: I3JS.BufferGeometry) => {
		// const geometry = geo.getGeometry();
		const position = geometry.attributes.position;

		const vertex = new THREE.Vector3();

		const skinIndices = [];
		const skinWeights = [];

		for (let i = 0; i < position.count; i++) {
			vertex.fromBufferAttribute(position, i);

			const y = vertex.y + this.halfHeight;

			const skinIndex = Math.floor(y / this.segmentHeight);
			const skinWeight = (y % this.segmentHeight) / this.segmentHeight;

			skinIndices.push(skinIndex, skinIndex + 1, 0, 0);
			skinWeights.push(1 - skinWeight, skinWeight, 0, 0);
		}

		geometry.setAttribute(
			'skinIndex',
			new THREE.Uint16BufferAttribute(skinIndices, 4)
		);
		geometry.setAttribute(
			'skinWeight',
			new THREE.Float32BufferAttribute(skinWeights, 4)
		);
	};

	private createBones(): I3JS.Bone[] {
		const bones: I3JS.Bone[] = [];
		let prevBone = new THREE.Bone();
		bones.push(prevBone);
		prevBone.position.y = -this.halfHeight;
		for (let i = 0; i < this.segmentCount; i++) {
			const bone = new THREE.Bone();
			bone.position.y = this.segmentHeight;
			bones.push(bone);
			prevBone.add(bone);
			prevBone = bone;
		}
		return bones;
	}

	private bones: I3JS.Bone[] = [];
	private skeleton: I3JS.Skeleton = null;

	setMesh(mesh: NgxMeshComponent): void {
		super.setMesh(mesh);
		const bones = this.bones = this.createBones();
		const skeleton = (this.skeleton = new THREE.Skeleton(bones));
		const skinnedMesh = this.meshObject3d as I3JS.SkinnedMesh;
		skinnedMesh.add(bones[0]);
		skinnedMesh.bind(skeleton);
	}

	private _lastTime = 0;
	onRender(timer: IRendererTimer): void {
		super.onRender(timer);
		if (this.controls.animateBones && this.meshObject3d !== null) {
			this._lastTime += timer.delta;
			for (let i = 0; i < this.skeleton.bones.length; i++) {
				this.skeleton.bones[i].rotation.z =
					(Math.sin(this._lastTime) * 2) / this.skeleton.bones.length;
			}
		}
	}
}
