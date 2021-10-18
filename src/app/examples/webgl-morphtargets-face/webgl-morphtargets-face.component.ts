import { Component } from '@angular/core';
import { BaseComponent } from 'ngx3js';
// import { MeshoptDecoder } from '.three/examples/jsm/libs/meshopt_decoder.module';

@Component({
	selector: 'app-webgl-morphtargets-face',
	templateUrl: './webgl-morphtargets-face.component.html',
	styleUrls: ['./webgl-morphtargets-face.component.scss'],
})
export class WebglMorphtargetsFaceComponent extends BaseComponent<{}> {
	constructor() {
		super({}, []);
	}

	meshoptDecoder : null
}
