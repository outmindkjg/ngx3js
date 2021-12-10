import { Component } from '@angular/core';
import {
	AbstractGeometryComponent,
	AbstractMaterialComponent,
	AbstractTextureComponent,
	BaseComponent,
	RendererTimer,
	SharedComponent, I3JS, THREE } from 'ngx3js';

interface FontInfo {
	font: string;
	text: string;
}

@Component({
	selector: 'app-ngx-font',
	templateUrl: './ngx-font.component.html',
	styleUrls: ['./ngx-font.component.scss'],
})
export class NgxFontComponent extends BaseComponent<{
	color: number;
	size: number;
	height: number;
	autoRotate: boolean;
	align: {
		leftRight: 'center';
		topBottom: 'middle';
		frontBack: 'double';
	};
	curveSegments: number;
	bevel: {
		bevelEnabled: boolean;
		bevelThickness: number;
		bevelSize: number;
		bevelOffset: number;
		bevelSegments: number;
	};
	english: FontInfo;
	country: string;
	eastAsia: FontInfo;
	vietnamese: FontInfo;
}> {
	constructor() {
		super(
			{
				color: 0x619744,
				size: 1,
				height: 0.1,
				align: {
					leftRight: 'center',
					topBottom: 'middle',
					frontBack: 'double',
				},
				curveSegments: 12,
				autoRotate: true,
				bevel: {
					bevelEnabled: false,
					bevelThickness: 0.1,
					bevelSize: 0.1,
					bevelOffset: 0,
					bevelSegments: 3,
				},
				english: {
					font: 'helvetiker',
					text: 'The quick brown fox',
				},
				country: 'korea',
				eastAsia: {
					font: 'fonts/ttf/ko/Cute_Font/CuteFont-Regular.ttf',
					text: '다람쥐헌쳇바퀴.',
				},
				vietnamese: {
					font: 'fonts/ttf/vi/Baloo_2/Baloo2-Regular.ttf',
					text: 'Bầu trời thăm thẳm',
				},
			},
			[
				{ name: 'color', type: 'color', title: 'Color' },
				{
					name: 'size',
					type: 'number',
					title: 'Size',
					min: 0.01,
					max: 3,
					step: 0.1,
					finishChange: () => {
						this.changeFontSize();
					},
				},
				{
					name: 'height',
					type: 'number',
					title: 'Height',
					min: 0.01,
					max: 0.5,
					step: 0.01,
					finishChange: () => {
						this.changeFontSize();
					},
				},
				{
					name: 'curveSegments',
					type: 'number',
					title: 'Curve Segments',
					min: 1,
					max: 20,
					step: 1,
				},
				{
					name: 'align',
					type: 'folder',
					control: 'align',
					children: [
						{
							name: 'leftRight',
							type: 'select',
							title: 'left-right',
							select: ['left', 'center', 'right'],
						},
						{
							name: 'topBottom',
							type: 'select',
							title: 'top-bottom',
							select: ['top', 'middle', 'bottom'],
						},
						{
							name: 'frontBack',
							type: 'select',
							title: 'front-back',
							select: ['front', 'double', 'back'],
						},
					],
				},
				{
					name: 'bevel',
					type: 'folder',
					control: 'bevel',
					children: [
						{
							name: 'bevelEnabled',
							type: 'checkbox',
							title: 'Enabled',
						},
						{
							name: 'bevelThickness',
							type: 'number',
							title: 'Thickness',
							min: 0,
							max: 1,
							step: 0.01,
						},
						{
							name: 'bevelSize',
							type: 'number',
							title: 'Size',
							min: 0,
							max: 1,
							step: 0.01,
						},
						{
							name: 'bevelOffset',
							type: 'number',
							title: 'Offset',
							min: 0,
							max: 1,
							step: 0.01,
						},
						{
							name: 'bevelSegments',
							type: 'number',
							title: 'Segments',
							min: 0,
							max: 10,
							step: 1,
						},
					],
				},
				{ name: 'autoRotate', type: 'checkbox' },
				{
					name: 'english',
					type: 'folder',
					control: 'english',
					children: [
						{
							name: 'font',
							type: 'select',
							title: 'Font',
							select: [
								'helvetiker-regular',
								'gentilis-regular',
								'optimer-regular',
								'sans-regular',
								'sans_mono-regular',
								'serif-regular',
								'helvetiker-bold',
								'gentilis-bold',
								'optimer-bold',
								'sans-bold',
								'sans_mono-bold',
								'serif-bold',
							],
						},
						{ name: 'text', type: 'input', listen: true },
					],
				},
				{
					name: 'country',
					type: 'select',
					select: ['korean', 'japanese', 'chinese'],
					change: () => {
						switch (this.controls.country) {
							case 'korean':
								this.controls.eastAsia.font =
									'fonts/ttf/ko/Cute_Font/CuteFont-Regular.ttf';
								this.controls.eastAsia.text = '다람쥐헌쳇바퀴.';
								break;
							case 'japanese':
								this.controls.eastAsia.font =
									'fonts/ttf/jp/Rampart_One/RampartOne-Regular.ttf';
								this.controls.eastAsia.text = 'コンピュータの世界';
								break;
							case 'chinese':
								this.controls.eastAsia.font =
									'fonts/ttf/cn/ZCOOL_KuaiLe/ZCOOLKuaiLe-Regular.ttf';
								this.controls.eastAsia.text = '中文字型范例';
								break;
						}
					},
				},
				{
					name: 'eastAsia',
					type: 'folder',
					control: 'eastAsia',
					children: [
						{
							name: 'font',
							type: 'select',
							title: 'Font',
							select: [
								'fonts/nanum/nanumgothic_regular.typeface.json',
								'fonts/nanum/do_hyeon_regular.typeface.json',
								'fonts/ttf/ko/Cute_Font/CuteFont-Regular.ttf',
								'fonts/ttf/ko/Gugi/Gugi-Regular.ttf',
								'fonts/ttf/jp/Potta_One/PottaOne-Regular.ttf',
								'fonts/ttf/jp/Rampart_One/RampartOne-Regular.ttf',
								'fonts/ttf/cn/ZCOOL_KuaiLe/ZCOOLKuaiLe-Regular.ttf',
								'fonts/ttf/cn/ZCOOL_QingKe_HuangYou/ZCOOLQingKeHuangYou-Regular.ttf',
							],
						},
						{ name: 'text', type: 'input', listen: true },
					],
				},
				{
					name: 'vietnamese',
					type: 'folder',
					control: 'vietnamese',
					children: [
						{
							name: 'font',
							type: 'select',
							title: 'Font',
							select: [
								'fonts/ttf/vi/Baloo_2/Baloo2-Bold.ttf',
								'fonts/ttf/vi/Baloo_2/Baloo2-ExtraBold.ttf',
								'fonts/ttf/vi/Baloo_2/Baloo2-Medium.ttf',
								'fonts/ttf/vi/Baloo_2/Baloo2-Regular.ttf',
								'fonts/ttf/vi/Baloo_2/Baloo2-SemiBold.ttf',
								'fonts/ttf/vi/Lobster/Lobster-Regular.ttf',
							],
						},
						{ name: 'text', type: 'input', listen: true },
					],
				},
			],
			true,
			false
		);
	}

	changeFontSize() {
		this.fontMeshInfos = [];
		const fontSize = this.controls.size * 1.5;
		const marginY = (this.fontGeometry.length / 2) * fontSize;
		const fontHeight = this.controls.height * 1.2 + 1;
		const marginZ = ((this.fontMaterial.length + 2) / 2) * fontHeight;
		this.fontGeometry.forEach((geometry, y) => {
			const fontY = fontSize * y - marginY;
			this.fontMaterial.forEach((material, z) => {
				const fontZ = fontHeight * z - marginZ;
				this.fontMeshInfos.push({
					x: 0,
					y: fontY,
					z: -fontZ,
					geometry: geometry,
					material: material,
				});
			});
		});
		const meshfontZ = this.fontMaterial.length * fontHeight - marginZ;
		this.fontTextInfo = [];
		this.fontGeometry.forEach((_, y) => {
			const fontY = fontSize * y - marginY;
			let text: FontInfo = null;
			switch (y) {
				case 0:
					text = this.controls.vietnamese;
					break;
				case 1:
					text = this.controls.eastAsia;
					break;
				case 3:
				default:
					text = this.controls.english;
					break;
			}
			this.fontTextInfo.push({
				x: 0,
				y: fontY,
				z: -meshfontZ,
				text: text,
			});
		});
		const textfontZ = (this.fontMaterial.length + 1) * fontHeight - marginZ;
		this.fontTexureInfo = [];
		this.fontTexture.forEach((texture, y) => {
			const fontY = fontSize * y - marginY;
			this.fontTexureInfo.push({
				x: 0,
				y: fontY,
				z: -textfontZ,
				texture: texture,
			});
		});
	}

	fontMeshInfos: {
		x: number;
		y: number;
		z: number;
		geometry: AbstractGeometryComponent;
		material: AbstractMaterialComponent;
	}[] = [];

	fontTextInfo: {
		text: FontInfo;
		x: number;
		y: number;
		z: number;
	}[] = [];

	fontTexureInfo: {
		texture: AbstractTextureComponent;
		x: number;
		y: number;
		z: number;
	}[] = [];

	setShared(shared: SharedComponent) {
		this.fontGeometry = shared.getGeometryComponents();
		this.fontMaterial = shared.getMaterialComponents();
		this.fontTexture = shared.getTextureComponents();
		this.getTimeout().then(() => {
			this.changeFontSize();
		});
	}

	fontGeometry: AbstractGeometryComponent[] = [];
	fontMaterial: AbstractMaterialComponent[] = [];
	fontTexture: AbstractTextureComponent[] = [];

	onRender(timer: RendererTimer) {
		super.onRender(timer);
		if (this.meshObject3d !== null && this.controls.autoRotate) {
			const elapsedTime = timer.delta;
			this.meshObject3d.rotation.y += elapsedTime / 20;
		}
	}
}
