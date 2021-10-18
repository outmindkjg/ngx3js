import { Component } from '@angular/core';
import { BaseComponent, MeshComponent, RendererTimer } from 'ngx3js';

@Component({
	selector: 'app-webgl-materials-blending-custom',
	templateUrl: './webgl-materials-blending-custom.component.html',
	styleUrls: ['./webgl-materials-blending-custom.component.scss'],
})
export class WebglMaterialsBlendingCustomComponent extends BaseComponent<{
	foreground: string;
	background: string;
	equation: string;
	premultiply: boolean;
}> {
	constructor() {
		super(
			{
				foreground: 'textures/lensflare/lensflare0_alpha.png',
				background: 'transparent2',
				equation: 'Add',
				premultiply: false,
			},
			[
				{
					name: 'foreground',
					type: 'select',
					select: {
						disturb: 'textures/disturb.jpg',
						disturbJpg: 'textures/sprite0.jpg',
						disturbPng: 'textures/sprite0.png',
						lensflare: 'textures/lensflare/lensflare0.png',
						lensflareAlpha: 'textures/lensflare/lensflare0_alpha.png',
						ball: 'textures/sprites/ball.png',
						snowflake7Alpha: 'textures/sprites/snowflake7_alpha.png',
					},
				},
				{
					name: 'background',
					type: 'select',
					select: [
						'disturb',
						'transparent1',
						'transparent2',
						'crate',
						'lavatile',
						'water',
						'cloud',
					],
					change: () => {
						this.setBackground(this.controls.background);
					},
				},
				{
					name: 'equation',
					type: 'select',
					select: ['Add', 'Subtract', 'ReverseSubtract', 'Min', 'Max'],
				},
				{ name: 'premultiply', type: 'checkbox' },
			]
		);
	}

	ngOnInit() {
		this.setBackground(this.controls.background);
		this.meshInfos = [];
		this.setMeshInfo();
	}

	backgrounds: {
		[key: string]: {
			repeatX?: number;
			repeatY?: number;
			wrapS?: string;
			wrapT?: string;
			image?: string;
			program?: any;
		};
	} = {
		disturb: {
			image: 'textures/disturb.jpg',
			repeatX: 8,
			repeatY: 4,
			wrapS: 'Repeat',
			wrapT: 'Repeat',
		},
		transparent1: {
			program: this.canvasProgram1,
			repeatX: 128,
			repeatY: 64,
			wrapS: 'Repeat',
			wrapT: 'Repeat',
		},
		transparent2: {
			program: this.canvasProgram2,
			repeatX: 128,
			repeatY: 64,
			wrapS: 'Repeat',
			wrapT: 'Repeat',
		},
		crate: {
			image: 'textures/crate.gif',
			repeatX: 32,
			repeatY: 16,
			wrapS: 'Repeat',
			wrapT: 'Repeat',
		},
		lavatile: {
			image: 'textures/lava/lavatile.jpg',
			repeatX: 8,
			repeatY: 4,
			wrapS: 'Repeat',
			wrapT: 'Repeat',
		},
		water: {
			image: 'textures/water.jpg',
			repeatX: 8,
			repeatY: 4,
			wrapS: 'Repeat',
			wrapT: 'Repeat',
		},
		cloud: {
			image: 'textures/lava/cloud.png',
			repeatX: 2,
			repeatY: 1,
			wrapS: 'Repeat',
			wrapT: 'Repeat',
		},
	};

	setBackground(id: string) {
		this.backgroundInfo = this.backgrounds[id];
	}

	backgroundInfo: {
		repeatX?: number;
		repeatY?: number;
		wrapS?: string;
		wrapT?: string;
		image?: string;
		program?: any;
	} = null;

	src = [
		{ name: 'Zero', constant: 'Zero' },
		{ name: 'One', constant: 'One' },
		{ name: 'SrcColor', constant: 'SrcColor' },
		{ name: 'OneMinusSrcColor', constant: 'OneMinusSrcColor' },
		{ name: 'SrcAlpha', constant: 'SrcAlpha' },
		{ name: 'OneMinusSrcAlpha', constant: 'OneMinusSrcAlpha' },
		{ name: 'DstAlpha', constant: 'DstAlpha' },
		{ name: 'OneMinusDstAlpha', constant: 'OneMinusDstAlpha' },
		{ name: 'DstColor', constant: 'DstColor' },
		{ name: 'OneMinusDstColor', constant: 'OneMinusDstColor' },
		{ name: 'SrcAlphaSaturate', constant: 'SrcAlphaSaturate' },
	];

	dst = [
		{ name: 'Zero', constant: 'Zero' },
		{ name: 'One', constant: 'One' },
		{ name: 'SrcColor', constant: 'SrcColor' },
		{ name: 'OneMinusSrcColor', constant: 'OneMinusSrcColor' },
		{ name: 'SrcAlpha', constant: 'SrcAlpha' },
		{ name: 'OneMinusSrcAlpha', constant: 'OneMinusSrcAlpha' },
		{ name: 'DstAlpha', constant: 'DstAlpha' },
		{ name: 'OneMinusDstAlpha', constant: 'OneMinusDstAlpha' },
		{ name: 'DstColor', constant: 'DstColor' },
		{ name: 'OneMinusDstColor', constant: 'OneMinusDstColor' },
	];

	setMeshInfo() {
		for (let i = 0; i < this.dst.length; i++) {
			const blendDst = this.dst[i];
			for (let j = 0; j < this.src.length; j++) {
				const blendSrc = this.src[j];
				this.meshInfos.push({
					blendSrc: blendSrc.constant,
					blendDst: blendDst.constant,
					position: {
						x: (j - this.src.length / 2) * 110 + 110,
						y: ((i - this.dst.length / 2) * 110 + 80) * -1,
						z: 1,
					},
				});
			}
		}
		for (let j = 0; j < this.src.length; j++) {
			const blendSrc = this.src[j];
			this.labelSrcInfos.push({
				position: {
					x: (j - this.src.length / 2) * 110 + 110,
					y: ((0 - this.dst.length / 2) * 110 + 50 - 70 + 30) * -1,
					z: 1,
				},
				name: blendSrc.name,
			});
		}
		for (let i = 0; i < this.dst.length; i++) {
			const blendDst = this.dst[i];
			this.labelDstInfos.push({
				position: {
					x: (0 - this.src.length / 2) * 110 - 125 + 110,
					y: ((i - this.dst.length / 2) * 110 + 165 - 120) * -1,
					z: 1,
				},
				name: blendDst.name,
			});
		}
	}

	meshInfos: {
		blendSrc: string;
		blendDst: string;
		position: {
			x: number;
			y: number;
			z: number;
		};
	}[] = [];

	labelSrcInfos: {
		name: string;
		position: {
			x: number;
			y: number;
			z: number;
		};
	}[] = [];

	labelDstInfos: {
		name: string;
		position: {
			x: number;
			y: number;
			z: number;
		};
	}[] = [];

	canvasProgram1(ctx1: CanvasRenderingContext2D) {
		ctx1.fillStyle = '#eee';
		ctx1.fillRect(0, 0, 128, 128);
		ctx1.fillStyle = '#999';
		ctx1.fillRect(0, 0, 64, 64);
		ctx1.fillStyle = '#aaa';
		ctx1.fillRect(32, 32, 32, 32);
		ctx1.fillStyle = '#999';
		ctx1.fillRect(64, 64, 64, 64);
		ctx1.fillStyle = '#bbb';
		ctx1.fillRect(96, 96, 32, 32);
	}

	canvasProgram2(ctx2: CanvasRenderingContext2D) {
		ctx2.fillStyle = '#444';
		ctx2.fillRect(0, 0, 128, 128);
		ctx2.fillStyle = '#000';
		ctx2.fillRect(0, 0, 64, 64);
		ctx2.fillStyle = '#111';
		ctx2.fillRect(32, 32, 32, 32);
		ctx2.fillStyle = '#000';
		ctx2.fillRect(64, 64, 64, 64);
		ctx2.fillStyle = '#222';
		ctx2.fillRect(96, 96, 32, 32);
	}

	labelProgramSrc(ctx: CanvasRenderingContext2D, text: string) {
		ctx.fillStyle = 'rgba( 0, 150, 0, 1 )';
		ctx.fillRect(0, 0, 128, 32);
		ctx.fillStyle = 'white';
		ctx.font = '12pt arial bold';
		ctx.fillText(text, 8, 22);
	}

	labelProgramDst(ctx: CanvasRenderingContext2D, text: string) {
		ctx.fillStyle = 'rgba( 150, 0, 0, 1 )';
		ctx.fillRect(0, 0, 128, 32);
		ctx.fillStyle = 'white';
		ctx.font = '12pt arial bold';
		ctx.fillText(text, 8, 22);
	}

	setMesh(mesh: MeshComponent) {
		super.setMesh(mesh);
		this.mapBg = (this.mesh.getObject3d() as any).material.map;
	}

	mapBg: any = null;

	onRender(timer: RendererTimer) {
		super.onRender(timer);
		if (this.mapBg !== null && this.mapBg.repeat) {
			const time = timer.elapsedTime * 0.25;
			const ox = (time * -0.01 * this.mapBg.repeat.x) % 1;
			const oy = (time * -0.01 * this.mapBg.repeat.y) % 1;
			this.mapBg.offset.set(ox, oy);
		}
	}
}
