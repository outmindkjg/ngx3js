import { Component } from '@angular/core';
import { BaseComponent, THREE } from 'ngx3js';

@Component({
	selector: 'app-webgl-tiled-forward',
	templateUrl: './webgl-tiled-forward.component.html',
	styleUrls: ['./webgl-tiled-forward.component.scss'],
})
export class WebglTiledForwardComponent extends BaseComponent<{}> {
	constructor() {
		super({}, []);
	}

	ngOnInit() {
		this.headInfos = [];
		const RADIUS = 75;
		const heads = [
			{ type: 'physical', uniforms: { "diffuse": 0x888888, "metalness": 1.0, "roughness": 0.66 }, defines: { TILED_FORWARD : 1} },
			{ type: 'standard', uniforms: { "diffuse": 0x666666, "metalness": 0.1, "roughness": 0.33 }, defines: { TILED_FORWARD : 1 } },
			{ type: 'phong', uniforms: { "diffuse": 0x777777, "shininess": 20 }, defines: { TILED_FORWARD : 1} },
			{ type: 'phong', uniforms: { "diffuse": 0x555555, "shininess": 10 }, defines: { TILED_FORWARD : 1, TOON: 1 } }
		];
		const tIndex = Math.round( Math.random() * 3 );
		for (let i = 0; i < 4; i++) {
			const head = heads[i];
			this.headInfos.push({
				shader : head.type,
				uniforms : Object.assign(head.uniforms, { tileData : this.tileData, tileTexture : this.tileTexture, lightTexture : this.lightTexture  }),
				defines : head.defines,
				opacity : i === tIndex ? 0.9 : 1,
				transparent  : i === tIndex ? true : false,
				color : new THREE.Color().setHSL( Math.random(), 1.0, 0.5 ).getHex(),
				side : i === tIndex? 'FrontSide' : 'DoubleSide',
				x: Math.sin((i * Math.PI) / 2) * RADIUS,
				ry: 90 * i,
				z: Math.cos((i * Math.PI) / 2) * RADIUS,
			});
		}
		const width = 1024;
		const height = 1024;
		const cols = Math.ceil( width / 32 );
		const rows = Math.ceil( height / 32 );
		this.tileData.value = [ width, height, 0.5 / Math.ceil( width / 32 ), 0.5 / Math.ceil( height / 32 ) ];
		this.tileTexture.value = new THREE.DataTexture( new Uint8Array( cols * rows * 4 ), cols, rows );
		this.lightTexture.value = new THREE.DataTexture( new Float32Array( 32 * 2 * 4 ), 32, 2, THREE.RGBAFormat, THREE.FloatType );
	}

	tileData: { value: number[] } = { value : []};
	tileTexture: { value: any } =  { value : null} ;
	lightTexture: { value: any } =  { value : null} ;

	headInfos: {
		shader : string;
		uniforms : any;
		defines : any;
		opacity : number;
		transparent : boolean;
		color : number;
		side : string;
		x: number;
		ry: number;
		z: number;
	}[] = [];
}
