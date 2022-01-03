import { Component } from '@angular/core';
import {
	I3JS,
	NgxBaseComponent,
	NgxCameraComponent,
	NgxMeshComponent,
	IRendererTimer,
	THREE,
	IRendererEvent,
} from 'ngx3js';

@Component({
	selector: 'app-webgl-camera',
	templateUrl: './webgl-camera.component.html',
	styleUrls: ['./webgl-camera.component.scss'],
})
export class WebglCameraComponent extends NgxBaseComponent<{
	cameraType: string;
}> {
	constructor() {
		super({ cameraType: 'perspective' }, [
			{
				name: 'cameraType',
				title: 'CamaraType',
				type: 'select',
				select: ['perspective', 'orthographic'],
				listen: true,
				change: () => {
					this.changeCameraType();
				},
			},
		], false, false);
	}

	eventListener(event: IRendererEvent) {
		switch (event.type) {
			case 'keydown':
				switch (event.keyInfo.code) {
					case 'KeyO':
						this.controls.cameraType = 'orthographic';
						this.changeCameraType();
						break;
					case 'KeyP':
						this.controls.cameraType = 'perspective';
						this.changeCameraType();
						break;
				}
				break;
		}
	}

	vertices: number[] = [];

	changeCameraType() {
		if (this.cameraPerspective !== null && this.cameraOrthographic !== null) {
			this.cameraOrthographic.setVisible(false, false);
			this.cameraPerspective.setVisible(false, false);
			switch (this.controls.cameraType) {
				case 'perspective':
					this.cameraControl = this.cameraPerspective;
					break;
				case 'orthographic':
					this.cameraControl = this.cameraOrthographic;
					break;
			}
			this.cameraControl.setVisible(true, true);
		}
	}

	ngOnInit() {
		this.vertices = [];
		for (let i = 0; i < 10000; i++) {
			this.vertices.push(THREE.MathUtils.randFloatSpread(2000)); // x
			this.vertices.push(THREE.MathUtils.randFloatSpread(2000)); // y
			this.vertices.push(THREE.MathUtils.randFloatSpread(2000)); // z
		}
	}

	public sphere1: NgxMeshComponent = null;

	setSphere1(sphere1: NgxMeshComponent) {
		this.sphere1 = sphere1;
	}

	public cameraRig: NgxMeshComponent = null;

	setCameraRig(cameraRig: NgxMeshComponent) {
		this.cameraRig = cameraRig;
	}

	public cameraMain: NgxCameraComponent = null;

	setCameraMain(cameraMain: NgxCameraComponent) {
		this.cameraMain = cameraMain;
		this.changeCameraType();
	}

	public cameraPerspective: NgxCameraComponent = null;

	setCameraPerspective(cameraPerspective: NgxCameraComponent) {
		this.cameraPerspective = cameraPerspective;
		this.changeCameraType();
	}

	public cameraOrthographic: NgxCameraComponent = null;

	setCameraOrthographic(cameraOrthographic: NgxCameraComponent) {
		this.cameraOrthographic = cameraOrthographic;
		this.changeCameraType();
	}

	public cameraControl: NgxCameraComponent = null;

	onRender(timer: IRendererTimer) {
		super.onRender(timer);
		const r = timer.elapsedTime * 0.5;
		if (this.mesh !== null) {
			this.mesh.setPosition(
				700 * Math.cos(r),
				700 * Math.sin(r),
				700 * Math.sin(r)
			);
		}
		if (this.sphere1 !== null) {
			this.sphere1.setPosition(70 * Math.cos(2 * r), 150, 70 * Math.sin(r));
		}
		if (this.cameraRig !== null && this.mesh !== null) {
			const sphere1Position = this.mesh.getPosition();
			this.cameraRig.setLookat(
				sphere1Position.x,
				sphere1Position.y,
				sphere1Position.z
			);
		}
		if (
			this.cameraPerspective !== null &&
			this.cameraOrthographic !== null &&
			this.mesh !== null
		) {
			if (this.cameraPerspective === this.cameraControl) {
				const cameraPerspective: I3JS.PerspectiveCamera =
					this.cameraPerspective.getCamera();
				cameraPerspective.fov = 35 + 30 * Math.sin(0.5 * r);
				cameraPerspective.far = this.mesh.getPosition().length();
				cameraPerspective.updateProjectionMatrix();
			} else if (this.cameraOrthographic === this.cameraControl) {
				const cameraOrthographic: I3JS.OrthographicCamera =
					this.cameraOrthographic.getCamera();
				cameraOrthographic.far = this.mesh.getPosition().length();
				cameraOrthographic.updateProjectionMatrix();
			}
		}
	}
}
