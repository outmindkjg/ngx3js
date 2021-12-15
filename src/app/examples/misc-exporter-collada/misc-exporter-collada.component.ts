import { Component } from '@angular/core';
import { NgxBaseComponent, NgxLocalStorageService } from 'ngx3js';

@Component({
	selector: 'app-misc-exporter-collada',
	templateUrl: './misc-exporter-collada.component.html',
	styleUrls: ['./misc-exporter-collada.component.scss'],
})
export class MiscExporterColladaComponent extends NgxBaseComponent<{
	shininess: number;
	ka: number;
	kd: number;
	ks: number;
	metallic: boolean;

	hue: number;
	saturation: number;
	lightness: number;

	lhue: number;
	lsaturation: number; // non-zero so that fractions will be shown
	llightness: number;
	lx: number;
	ly: number;
	lz: number;
	newTess: number;
	bottom: boolean;
	lid: boolean;
	body: boolean;
	fitLid: boolean;
	nonblinn: boolean;
	newShading: string;
	export: () => void;
}> {
	constructor(private localStorageService: NgxLocalStorageService) {
		super(
			{
				shininess: 40.0,
				ka: 0.17,
				kd: 0.51,
				ks: 0.2,
				metallic: true,
				hue: 0.121,
				saturation: 0.73,
				lightness: 0.66,
				lhue: 0.04,
				lsaturation: 0.01,
				llightness: 1.0,
				lx: 0.32,
				ly: 0.39,
				lz: 0.7,
				newTess: 15,
				bottom: true,
				lid: true,
				body: true,
				fitLid: false,
				nonblinn: false,
				newShading: 'glossy',
				export: () => {
					this.localStorageService.getExportObject(
						'teapot_' +
							this.controls.newShading +
							'_' +
							this.materialType.toLowerCase() +
							'.dae',
						this.meshObject3d
					);
				},
			},
			[
				{
					name: 'Material control',
					type: 'folder',
					children: [
						{
							name: 'shininess',
							title: 'shininess',
							type: 'number',
							min: 1.0,
							max: 400.0,
							step: 1,
						},
						{
							name: 'kd',
							title: 'diffuse strength',
							type: 'number',
							min: 0.0,
							max: 1.0,
							step: 0.025,
						},
						{
							name: 'ks',
							title: 'specular strength',
							type: 'number',
							min: 0.0,
							max: 1.0,
							step: 0.025,
						},
						{ name: 'metallic', title: 'shininess', type: 'checkbox' },
					],
				},
				{
					name: 'Material color',
					type: 'folder',
					children: [
						{
							name: 'hue',
							title: 'hue',
							type: 'number',
							min: 1.0,
							max: 1.0,
							step: 0.025,
						},
						{
							name: 'saturation',
							title: 'saturation',
							type: 'number',
							min: 1.0,
							max: 1.0,
							step: 0.025,
						},
						{
							name: 'lightness',
							title: 'lightness',
							type: 'number',
							min: 1.0,
							max: 1.0,
							step: 0.025,
						},
					],
				},
				{
					name: 'Lighting',
					type: 'folder',
					children: [
						{
							name: 'lhue',
							title: 'hue',
							type: 'number',
							min: 1.0,
							max: 1.0,
							step: 0.025,
						},
						{
							name: 'lsaturation',
							title: 'saturation',
							type: 'number',
							min: 1.0,
							max: 1.0,
							step: 0.025,
						},
						{
							name: 'llightness',
							title: 'lightness',
							type: 'number',
							min: 1.0,
							max: 1.0,
							step: 0.025,
						},
						{
							name: 'ka',
							title: 'ambient',
							type: 'number',
							min: 1.0,
							max: 1.0,
							step: 0.025,
						},
					],
				},
				{
					name: 'Light direction',
					type: 'folder',
					children: [
						{
							name: 'lx',
							title: 'x',
							type: 'number',
							min: -1.0,
							max: 1.0,
							step: 0.025,
						},
						{
							name: 'ly',
							title: 'y',
							type: 'number',
							min: -1.0,
							max: 1.0,
							step: 0.025,
						},
						{
							name: 'lz',
							title: 'z',
							type: 'number',
							min: -1.0,
							max: 1.0,
							step: 0.025,
						},
					],
				},
				{
					name: 'Tessellation control',
					type: 'folder',
					children: [
						{
							name: 'newTess',
							title: 'Tessellation Level',
							type: 'select',
							select: [2, 3, 4, 5, 6, 8, 10, 15, 20, 30, 40, 50],
						},
						{ name: 'lid', title: 'display lid', type: 'checkbox' },
						{ name: 'body', title: 'display body', type: 'checkbox' },
						{ name: 'bottom', title: 'display bottom', type: 'checkbox' },
						{ name: 'fitLid', title: 'snug lid', type: 'checkbox' },
						{ name: 'nonblinn', title: 'original scale', type: 'checkbox' },
					],
				},
				{
					name: 'newShading',
					title: 'Shading',
					type: 'select',
					select: [
						'wireframe',
						'flat',
						'smooth',
						'glossy',
						'textured',
						'normal',
						'reflective',
					],
					change: () => {
						this.changeShading();
					},
				},
				{ name: 'export', title: 'export', type: 'button' },
			]
		);
	}
	ngOnInit() {
		this.changeShading();
	}
	materialType: string = 'MeshBasicMaterial';
	overrideParams: any = {};
	changeMaterialColor() {
		switch (this.controls.newShading) {
			case 'wireframe': // wireMaterial
				this.overrideParams.color = '0xFFFFFF';
				break;
			case 'flat': // flatMaterial
				this.overrideParams.color =
					'hsl(' +
					this.controls.hue +
					',' +
					this.controls.saturation +
					',' +
					this.controls.lightness +
					')';
				break;
			case 'smooth': // gouraudMaterial
				this.overrideParams.color =
					'hsl(' +
					this.controls.hue +
					',' +
					this.controls.saturation +
					',' +
					this.controls.lightness +
					')';
				break;
			case 'glossy': // phongMaterial
				this.overrideParams.color = this.overrideParams.color =
					'hsl(' +
					this.controls.hue +
					',' +
					this.controls.saturation +
					',' +
					this.controls.lightness +
					')';
				this.overrideParams.shininess = this.controls.shininess;
				break;
			case 'textured': // texturedMaterial
				this.overrideParams.color =
					'hsl(' +
					this.controls.hue +
					',' +
					this.controls.saturation +
					',' +
					this.controls.lightness +
					')';
				this.overrideParams.shininess = this.controls.shininess;
				break;
			case 'normal': //normalMaterial
				this.overrideParams.specular = this.overrideParams.color =
					'hsl(' +
					this.controls.hue +
					',' +
					this.controls.saturation +
					',' +
					this.controls.lightness +
					')';
				this.overrideParams.shininess = this.controls.shininess;
				break;
			case 'reflective': // reflectiveMaterial
				this.overrideParams.color =
					'hsl(' +
					this.controls.hue +
					',' +
					this.controls.saturation +
					',' +
					this.controls.lightness +
					')';
				break;
		}
		if (this.controls.metallic) {
			switch (this.controls.newShading) {
				case 'wireframe': // wireMaterial
				case 'flat': // flatMaterial
				case 'smooth': // gouraudMaterial
				case 'reflective': // reflectiveMaterial
					break;
				case 'glossy': // phongMaterial
				case 'textured': // texturedMaterial
				case 'normal': //normalMaterial
					this.overrideParams.specular = this.overrideParams.color;
					break;
			}
		} else {
			switch (this.controls.newShading) {
				case 'wireframe': // wireMaterial
				case 'flat': // flatMaterial
				case 'smooth': // gouraudMaterial
				case 'reflective': // reflectiveMaterial
					break;
				case 'glossy': // phongMaterial
				case 'textured': // texturedMaterial
				case 'normal': //normalMaterial
					this.overrideParams.specular = '0xffffff';
					break;
			}
		}
	}

	changeShading() {
		switch (this.controls.newShading) {
			case 'wireframe':
				this.materialType = 'MeshBasicMaterial';
				this.overrideParams = { color: '0xFFFFFF', wireframe: true };
				break;
			case 'flat':
				this.materialType = 'MeshPhongMaterial';
				this.overrideParams = {
					color: '0xFFFFFF',
					specular: '0x000000',
					flatShading: true,
					side: 'doubleside',
				};
				break;
			case 'smooth':
				this.materialType = 'MeshLambertMaterial';
				this.overrideParams = { color: '0xFFFFFF', side: 'doubleside' };
				break;
			case 'glossy':
				this.materialType = 'MeshPhongMaterial';
				this.overrideParams = { color: '0xFFFFFF', side: 'doubleside' };
				break;
			case 'textured':
				this.materialType = 'MeshPhongMaterial';
				this.overrideParams = {
					color: '0xFFFFFF',
					map: {
						type: 'texture',
						value: 'textures/uv_grid_opengl.jpg',
						options: 'RepeatWrapping,anisotropy=16,sRGBEncoding',
					},
					side: 'doubleside',
				};
				break;
			case 'normal':
				this.materialType = 'MeshPhongMaterial';
				this.overrideParams = {
					color: '0xFFFFFF',
					map: 'textures/floors/FloorsCheckerboard_S_Diffuse.jpg',
					normalMap: 'textures/floors/FloorsCheckerboard_S_Normal.jpg',
					side: 'doubleside',
				};
				break;
			case 'reflective':
				this.materialType = 'MeshPhongMaterial';
				this.overrideParams = {
					color: '0xFFFFFF',
					envMap: {
						type: 'cubeimage',
						value: 'textures/cube/pisa/',
						cubeImage: ['', 'png'],
						options: 'sRGBEncoding',
					},
					side: 'doubleside',
				};
				break;
		}
		this.changeMaterialColor();
	}
}
