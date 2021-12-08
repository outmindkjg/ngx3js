import {
	AfterViewInit,
	Component,
	ElementRef,
	OnInit,
	ViewChild,
} from '@angular/core';
import { UVsDebug } from 'ngx3js';
import * as THREE from 'three';

@Component({
	selector: 'app-misc-uv-test',
	templateUrl: './misc-uv-tests.component.html',
	styleUrls: ['./misc-uv-tests.component.scss'],
})
export class MiscUvTestsComponent implements OnInit, AfterViewInit {
	@ViewChild('mainDisplay') private displayEle: ElementRef;

	constructor() {}

	ngOnInit() {}

	addTest(name: string, geometry: THREE.BufferGeometry) {
		const d = document.createElement('div');
		d.innerHTML = '<h3>' + name + '</h3>';
		d.appendChild(UVsDebug(geometry, 1024));
		this.displayEle.nativeElement.appendChild(d);
	}

	ngAfterViewInit() {
		const points = [];
		for (let i = 0; i < 10; i++) {
			points.push(new THREE.Vector2(Math.sin(i * 0.2) * 15 + 50, (i - 5) * 2));
		}
		this.addTest(
			'new THREE.PlaneGeometry( 100, 100, 4, 4 )',
			new THREE.PlaneGeometry(100, 100, 4, 4)
		);
		this.addTest(
			'new THREE.SphereGeometry( 75, 12, 6 )',
			new THREE.SphereGeometry(75, 12, 6)
		);
		this.addTest(
			'new THREE.IcosahedronGeometry( 30, 1 )',
			new THREE.IcosahedronGeometry(30, 1)
		);
		this.addTest(
			'new THREE.OctahedronGeometry( 30, 2 )',
			new THREE.OctahedronGeometry(30, 2)
		);
		this.addTest(
			'new THREE.CylinderGeometry( 25, 75, 100, 10, 5 )',
			new THREE.CylinderGeometry(25, 75, 100, 10, 5)
		);
		this.addTest(
			'new THREE.BoxGeometry( 100, 100, 100, 4, 4, 4 )',
			new THREE.BoxGeometry(100, 100, 100, 4, 4, 4)
		);
		this.addTest(
			'new THREE.LatheGeometry( points, 8 )',
			new THREE.LatheGeometry(points, 8)
		);
		this.addTest(
			'new THREE.TorusGeometry( 50, 20, 8, 8 )',
			new THREE.TorusGeometry(50, 20, 8, 8)
		);
		this.addTest(
			'new THREE.TorusKnotGeometry( 50, 10, 12, 6 )',
			new THREE.TorusKnotGeometry(50, 10, 12, 6)
		);
	}
}
