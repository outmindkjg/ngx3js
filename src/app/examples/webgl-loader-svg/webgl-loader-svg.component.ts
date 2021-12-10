import { Component } from '@angular/core';
import { BaseComponent  , I3JS, THREE } from 'ngx3js';

@Component({
	selector: 'app-webgl-loader-svg',
	templateUrl: './webgl-loader-svg.component.html',
	styleUrls: ['./webgl-loader-svg.component.scss'],
})
export class WebglLoaderSvgComponent extends BaseComponent<{
	currentURL: string;
	drawFillShapes: boolean;
	drawStrokes: boolean;
	fillShapesWireframe: boolean;
	strokesWireframe: boolean;
}> {
	constructor() {
		super(
			{
				currentURL: 'models/svg/tiger.svg',
				drawFillShapes: true,
				drawStrokes: true,
				fillShapesWireframe: false,
				strokesWireframe: false,
			},
			[
				{
					name: 'currentURL',
					type: 'select',
					title: 'SVG File',
					select: {
						Tiger: 'models/svg/tiger.svg',
						'Three.js': 'models/svg/threejs.svg',
						'Joins and caps': 'models/svg/lineJoinsAndCaps.svg',
						Hexagon: 'models/svg/hexagon.svg',
						'Test 1': 'models/svg/tests/1.svg',
						'Test 2': 'models/svg/tests/2.svg',
						'Test 3': 'models/svg/tests/3.svg',
						'Test 4': 'models/svg/tests/4.svg',
						'Test 5': 'models/svg/tests/5.svg',
						'Test 6': 'models/svg/tests/6.svg',
						'Test 7': 'models/svg/tests/7.svg',
						'Test 8': 'models/svg/tests/8.svg',
						Units: 'models/svg/tests/units.svg',
						Defs: 'models/svg/tests/testDefs/Svg-defs.svg',
						Defs2: 'models/svg/tests/testDefs/Svg-defs2.svg',
						Defs3: 'models/svg/tests/testDefs/Wave-defs.svg',
						Defs4: 'models/svg/tests/testDefs/defs4.svg',
						'Zero Radius': 'models/svg/zero-radius.svg',
					},
				},
				{ name: 'drawStrokes', type: 'checkbox', title: 'Draw strokes' },
				{ name: 'drawFillShapes', type: 'checkbox', title: 'Draw fill shapes' },
				{
					name: 'strokesWireframe',
					type: 'checkbox',
					title: 'Wireframe strokes',
				},
				{
					name: 'fillShapesWireframe',
					type: 'checkbox',
					title: 'Wireframe fill shapes',
				},
			]
		);
	}
}
