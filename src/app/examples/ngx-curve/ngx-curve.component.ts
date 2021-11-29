import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BaseComponent, RendererTimer } from 'ngx3js';

@Component({
	selector: 'app-ngx-curve',
	templateUrl: './ngx-curve.component.html',
	styleUrls: ['./ngx-curve.component.scss'],
})
export class NgxCurveComponent extends BaseComponent<{
	curve: {
		type: string;
		options : string;
	},
	tube : {
		radius : number;
		radiusSegments : number;
		tubularSegments : number;
		color : number;
		closed : boolean;
		wireframe : boolean;
		showGuide : boolean;
	}
}> {
	constructor(private route: ActivatedRoute) {
		super(
			{
				curve: {
					type: 'grannyknot',
					options : 'None'
				},
				tube : {
					radius : 0.05,
					radiusSegments : 10,
					tubularSegments : 100,
					color : 0xff0000,
					closed : false,
					wireframe : true,
					showGuide : true
				}
			},
			[
				{
					name: 'curve',
					type: 'folder',
					control: 'curve',
					children: [
						{
							name: 'type',
							type: 'select',
							select: [
								'grannyknot',
								'heart',
								'viviani',
								'knot',
								'helix',
								'trefoilknot',
								'torusknot',
								'cinquefoilknot',
								'trefoilpolynomialknot',
								'decoratedtorusknot4b',
								'decoratedtorusknot4a',
								'figureeightpolynomialknot',
								'decoratedtorusknot5a',
								'decoratedtorusknot5c',
								'circle',
								'line',
								'triangle',
								'square',
								'pentagon',
								'hexagon',
								'heptagon',
								'octagon',
								'nonagon',
								'decagon',
								'undecagon',
								'dodecagon',
								'linearin',
								'quadin',
								'quadinout',
								'quadout',
								'cubicin',
								'cubicinout',
								'cubicout',
								'quartin',
								'quartinout',
								'quartout',
								'quintin',
								'quintinout',
								'quintout',
								'strongin',
								'stronginout',
								'strongout',
								'power1in',
								'power1inout',
								'power1out',
								'power2in',
								'power2inout',
								'power2out',
								'power3in',
								'power3inout',
								'power3out',
								'power4in',
								'power4inout',
								'power4out',
								'power0none',
								'backin',
								'backinout',
								'backout',
								'elasticin',
								'elasticinout',
								'elasticout',
								'bouncein',
								'bounceinout',
								'bounceout',
								'circin',
								'circinout',
								'circout',
								'expoin',
								'expoinout',
								'expoout',
								'sinein',
								'sineinout',
								'sineout',
								'rollercoaster'
							],
							listen : true
						},
						{
							name: 'options',
							type: 'select',
							select: [
								'None',
								'absx',
								'absy',
								'absz',
								'absx,absy',
								'absx,absz',
								'absy,absz',
								'absx,absy,absz',
							],
						},						
					],
				},
				{
					name: 'tube',
					type: 'folder',
					control: 'tube',
					children: [
						{ name : 'radius', type : 'number', min : 0.001, max : 0.2, step : 0.001 },
						{ name : 'radiusSegments', type : 'number', min : 3, max : 40, step : 1 },
						{ name : 'tubularSegments', type : 'number', min : 30, max : 200, step : 1 },
						{ name : 'color', type : 'color'},
						{ name : 'closed', type : 'checkbox'},
						{ name : 'wireframe', type : 'checkbox'},
						{ name : 'showGuide', type : 'checkbox', title : 'Show Guide'},
					]
				},
			],
			true,
			false
		);
	}

	ngOnInit() {
		this.subscribeRefer('router', this.route.params.subscribe((params) => {
			if (params['type']) {
				this.controls.curve.type = params['type'];
			}
		}))
	}

	onRender(timer : RendererTimer) {
		super.onRender(timer);
		if (this.meshObject3d !== null) {
			const elapsedTime = timer.elapsedTime;
			this.meshObject3d.rotation.y = elapsedTime / 5;
		}
	}

}
