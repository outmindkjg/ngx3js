import { Component } from '@angular/core';
import { NgxBaseComponent } from 'ngx3js';

@Component({
	selector: 'app-webgl-loader-md2',
	templateUrl: './webgl-loader-md2.component.html',
	styleUrls: ['./webgl-loader-md2.component.scss'],
})
export class WebglLoaderMd2Component extends NgxBaseComponent<{
	animation: string;
	weaponIdx: number;
	skinIdx: number;
	weapon: string;
	skin: string;
}> {
	constructor() {
		super(
			{
				animation: 'stand',
				weaponIdx: 0,
				skinIdx: 0,
				weapon: 'weapon',
				skin: 'ratamahatta',
			},
			[
				{
					name: 'animation',
					type: 'select',
					select: [
						'stand',
						'run',
						'attack',
						'pain',
						'jump',
						'flip',
						'salute',
						'taunt',
						'wave',
						'point',
						'crstand',
						'crwalk',
						'crattack',
						'crpain',
						'crdeath',
						'death',
					],
				},
				{
					name: 'weapon',
					type: 'select',
					select: [
						'weapon',
						'w_bfg',
						'w_blaster',
						'w_chaingun',
						'w_glauncher',
						'w_hyperblaster',
						'w_machinegun',
						'w_railgun',
						'w_rlauncher',
						'w_shotgun.md2',
						'w_sshotgun.md2',
					],
					change: () => {
						this.config.weapons.forEach((weapon, idx) => {
							if (weapon[0].startsWith(this.controls.weapon)) {
								this.controls.weaponIdx = idx;
							}
						});
					},
				},
				{
					name: 'skin',
					type: 'select',
					select: ['ratamahatta', 'ctf_b', 'ctf_r', 'dead', 'gearwhore'],
					change: () => {
						this.config.skins.forEach((skin, idx) => {
							if (skin.startsWith(this.controls.skin)) {
								this.controls.skinIdx = idx;
							}
						});
					},
				},
			]
			,false , false);
	}

	config = {
		type: 'MD2Character',
		scale: 3,
		baseUrl: 'models/md2/ratamahatta/',
		body: 'ratamahatta.md2',
		skins: [
			'ratamahatta.png',
			'ctf_b.png',
			'ctf_r.png',
			'dead.png',
			'gearwhore.png',
		],
		weapons: [
			['weapon.md2', 'weapon.png'],
			['w_bfg.md2', 'w_bfg.png'],
			['w_blaster.md2', 'w_blaster.png'],
			['w_chaingun.md2', 'w_chaingun.png'],
			['w_glauncher.md2', 'w_glauncher.png'],
			['w_hyperblaster.md2', 'w_hyperblaster.png'],
			['w_machinegun.md2', 'w_machinegun.png'],
			['w_railgun.md2', 'w_railgun.png'],
			['w_rlauncher.md2', 'w_rlauncher.png'],
			['w_shotgun.md2', 'w_shotgun.png'],
			['w_sshotgun.md2', 'w_sshotgun.png'],
		],
	};
}
