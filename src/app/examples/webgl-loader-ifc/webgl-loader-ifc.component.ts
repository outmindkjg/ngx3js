import { Component } from '@angular/core';
import { NgxBaseComponent, NgxMeshComponent } from 'ngx3js';

@Component({
	selector: 'app-webgl-loader-ifc',
	templateUrl: './webgl-loader-ifc.component.html',
	styleUrls: ['./webgl-loader-ifc.component.scss'],
})
export class WebglLoaderIfcComponent extends NgxBaseComponent<{}> {
	constructor() {
		super({}, []);
	}

	setMesh(mesh: NgxMeshComponent) {
		super.setMesh(mesh);
	}
}
