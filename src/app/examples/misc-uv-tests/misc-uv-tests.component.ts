import {
	AfterViewInit,
	Component,
	ElementRef,
	OnInit,
	ViewChild
} from '@angular/core';
import { I3JS, N3js, UVsDebug } from 'ngx3js';

@Component({
	selector: 'app-misc-uv-test',
	templateUrl: './misc-uv-tests.component.html',
	styleUrls: ['./misc-uv-tests.component.scss'],
})
export class MiscUvTestsComponent implements OnInit, AfterViewInit {
	@ViewChild('mainDisplay') private displayEle: ElementRef;

	constructor() {}

	ngOnInit() {}

	addTest(name: string, geometry: I3JS.IBufferGeometry) {
		const d = document.createElement('div');
		d.innerHTML = '<h3>' + name + '</h3>';
		d.appendChild(UVsDebug(geometry, 1024));
		this.displayEle.nativeElement.appendChild(d);
	}

	ngAfterViewInit() {
		const points = [];
		for (let i = 0; i < 10; i++) {
			points.push(N3js.getVector2(Math.sin(i * 0.2) * 15 + 50, (i - 5) * 2));
		}
		this.addTest(
			'N3js.getPlaneGeometry( 100, 100, 4, 4 )',
			N3js.getPlaneGeometry(100, 100, 4, 4)
		);
		this.addTest(
			'N3js.getSphereGeometry( 75, 12, 6 )',
			N3js.getSphereGeometry(75, 12, 6)
		);
		this.addTest(
			'N3js.getIcosahedronGeometry( 30, 1 )',
			N3js.getIcosahedronGeometry(30, 1)
		);
		this.addTest(
			'N3js.getOctahedronGeometry( 30, 2 )',
			N3js.getOctahedronGeometry(30, 2)
		);
		this.addTest(
			'N3js.getCylinderGeometry( 25, 75, 100, 10, 5 )',
			N3js.getCylinderGeometry(25, 75, 100, 10, 5)
		);
		this.addTest(
			'N3js.getBoxGeometry( 100, 100, 100, 4, 4, 4 )',
			N3js.getBoxGeometry(100, 100, 100, 4, 4, 4)
		);
		this.addTest(
			'N3js.getLatheGeometry( points, 8 )',
			N3js.getLatheGeometry(points, 8)
		);
		this.addTest(
			'N3js.getTorusGeometry( 50, 20, 8, 8 )',
			N3js.getTorusGeometry(50, 20, 8, 8)
		);
		this.addTest(
			'N3js.getTorusKnotGeometry( 50, 10, 12, 6 )',
			N3js.getTorusKnotGeometry(50, 10, 12, 6)
		);
	}
}
