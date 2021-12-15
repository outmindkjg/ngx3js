import { Component } from '@angular/core';
import { NgxBaseComponent, NgxMeshComponent, NgxThreeUtil } from 'ngx3js';

@Component({
	selector: 'app-css3d-molecules',
	templateUrl: './css3d-molecules.component.html',
	styleUrls: ['./css3d-molecules.component.scss'],
})
export class Css3dMoleculesComponent extends NgxBaseComponent<{
	atoms: boolean;
	bones: boolean;
	labels: boolean;
	molecule: string;
}> {
	constructor() {
		super(
			{
				atoms: true,
				bones: true,
				labels: true,
				molecule: 'ethanol.pdb',
			},
			[
				{
					name: 'molecule',
					type: 'select',
					select: {
						Ethanol: 'ethanol.pdb',
						Aspirin: 'aspirin.pdb',
						Caffeine: 'caffeine.pdb',
						Nicotine: 'nicotine.pdb',
						LSD: 'lsd.pdb',
						Cocaine: 'cocaine.pdb',
						Cholesterol: 'cholesterol.pdb',
						Lycopene: 'lycopene.pdb',
						Glucose: 'glucose.pdb',
						'Aluminium oxide': 'Al2O3.pdb',
						Cubane: 'cubane.pdb',
						Copper: 'cu.pdb',
						Fluorite: 'caf2.pdb',
						Salt: 'nacl.pdb',
						'YBCO superconductor': 'ybco.pdb',
						Buckyball: 'buckyball.pdb',
						//"Diamond": "diamond.pdb",
						Graphite: 'graphite.pdb',
					},
				},
				{
					name: 'atoms',
					type: 'checkbox',
					change: () => {
						this.changeVisible();
					},
				},
				{
					name: 'bones',
					type: 'checkbox',
					change: () => {
						this.changeVisible();
					},
				},
				{
					name: 'labels',
					type: 'checkbox',
					change: () => {
						this.changeVisible();
					},
				},
			]
		);
	}

	changeVisible() {
		this.meshObject3d.traverse((child) => {
			switch (child.name) {
				case 'bone':
					child.visible = this.controls.bones;
					break;
				case 'atom':
					child.visible = this.controls.atoms;
					break;
				case 'label':
					child.visible = this.controls.labels;
					break;
			}
		});
	}

	setMesh(mesh: NgxMeshComponent) {
		super.setMesh(mesh);
		this.subscribeRefer(
			'loaded',
			NgxThreeUtil.getSubscribe(
				mesh,
				() => {
					this.changeVisible();
				},
				'loaded'
			)
		);
	}
}
