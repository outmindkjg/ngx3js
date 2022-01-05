import { Component } from '@angular/core';
import { I3JS, NgxBaseComponent, NgxLocalStorageService } from 'ngx3js';

@Component({
	selector: 'app-misc-exporter-gltf',
	templateUrl: './misc-exporter-gltf.component.html',
	styleUrls: ['./misc-exporter-gltf.component.scss'],
})
export class MiscExporterGltfComponent extends NgxBaseComponent<{
	scene1: () => void;
	scenes: () => void;
	object: () => void;
	waltHead: () => void;
	objects: () => void;
	scene_object: () => void;
	trs: boolean;
	onlyVisible: boolean;
	truncateDrawRange: boolean;
	binary: boolean;
	maxTextureSize: number;
}> {
	constructor(private localStorageService: NgxLocalStorageService) {
		super(
			{
				scene1: () => {
					this.exportGLTF('scene1', 'scene1');
				},
				scenes: () => {
					this.exportGLTF(['scene1', 'scene2'], 'scene1_scene2');
				},
				object: () => {
					this.exportGLTF(['sphere'], 'sphere');
				},
				waltHead: () => {
					this.exportGLTF(['waltHead'], 'waltHead');
				},
				objects: () => {
					this.exportGLTF(['sphere', 'gridHelper'], 'objects');
				},
				scene_object: () => {
					this.exportGLTF(['scene1', 'gridHelper'], 'scene_object');
				},
				trs: false,
				onlyVisible: true,
				truncateDrawRange: true,
				binary: false,
				maxTextureSize: 4096,
			},
			[
				{ name: 'scene1', type: 'button' },
				{ name: 'scenes', type: 'button' },
				{ name: 'object', type: 'button' },
				{ name: 'waltHead', type: 'button' },
				{ name: 'objects', type: 'button' },
				{ name: 'scene_object', type: 'button' },
				{ name: 'trs', title: 'TRS', type: 'checkbox' },
				{ name: 'onlyVisible', title: 'Only Visible', type: 'checkbox' },
				{
					name: 'truncateDrawRange',
					title: 'Truncate drawRange',
					type: 'checkbox',
				},
				{
					name: 'binary',
					title: 'Binary (<code>.glb</code>)',
					type: 'checkbox',
				},
				{
					name: 'maxTextureSize',
					title: 'Max texture size',
					type: 'number',
					min: 2,
					max: 8182,
					step: 1,
				},
			]
			,false , false);
	}

	exportGLTF(name: string | string[], fileName: string) {
		const objects: I3JS.Object3D[] = [];
		const objNames: string[] = [];
		if (Array.isArray(name)) {
			name.forEach((txt) => {
				objNames.push(txt);
			});
		} else {
			objNames.push(name);
		}
		const scene1: I3JS.Scene = this.scene.getObject3d();
		objNames.forEach((objName) => {
			switch (objName) {
				case 'scene1':
					objects.push(scene1);
				default:
					const obj = scene1.getObjectByName(objName);
					if (obj !== null) {
						objects.push(obj);
					}
					break;
			}
		});

		this.localStorageService.getExportObject(fileName + '.gltf', objects, {
			trs: this.controls.trs,
			onlyVisible: this.controls.onlyVisible,
			truncateDrawRange: this.controls.truncateDrawRange,
			binary: this.controls.binary,
			maxTextureSize: this.controls.maxTextureSize,
		});
	}

	ngOnInit() {
		this.lineStripPosition = [];
		for (let i = 0; i < 100; i++) {
			this.lineStripPosition.push(i, Math.sin(i / 2) * 20, 0);
		}
		this.lineLoopPosition = [];
		const radius = 70;
		for (let i = 0; i < 100; i++) {
			const s = (i * Math.PI * 2) / 100;
			this.lineLoopPosition.push(radius * Math.sin(s), radius * Math.cos(s), 0);
		}
		const numElements = 6;
		const outOfRange = 3;
		this.truncatedPosition = [];
		this.truncatedPosition.push(
			0,
			0,
			0,
			0,
			80,
			0,
			80,
			0,
			0,
			80,
			0,
			0,
			0,
			80,
			0,
			80,
			80,
			0
		);
		this.truncatedColors = [];
		this.truncatedColors.push(
			1,
			0,
			0,
			1,
			0,
			0,
			1,
			1,
			0,
			1,
			1,
			0,
			0,
			0,
			1,
			0,
			0,
			1
		);
		this.pointCloudPosition = [];
		for (let i = 0; i < 100; i++) {
			this.pointCloudPosition.push(
				-50 + Math.random() * 100,
				Math.random() * 100,
				-50 + Math.random() * 100
			);
		}
		this.lathePoints = [];
		for (let i = 0; i < 50; i++) {
			this.lathePoints.push({
				x: Math.sin(i * 0.2) * Math.sin(i * 0.1) * 15 + 50,
				y: (i - 5) * 2,
			});
		}
	}

	lineStripPosition: number[] = [];
	lineLoopPosition: number[] = [];
	truncatedPosition: number[] = [];
	truncatedColors: number[] = [];
	pointCloudPosition: number[] = [];
	lathePoints: { x: number; y: number }[] = [];
}
