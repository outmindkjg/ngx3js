import { Component } from '@angular/core';
import { NgxBaseComponent, NgxMeshComponent, NgxRendererComponent, NgxThreeGui } from 'ngx3js';

@Component({
	selector: 'app-webgl-morphtargets-face',
	templateUrl: './webgl-morphtargets-face.component.html',
	styleUrls: ['./webgl-morphtargets-face.component.scss'],
})
export class WebglMorphtargetsFaceComponent extends NgxBaseComponent<{}> {
	constructor() {
		super({}, [{
			type : 'folder',
			name : 'morphtargets',
			children : []
		}], false, false);
	}

	setRender(renderer: NgxRendererComponent) {
		super.setRender(renderer);
		this.gui = this.renderer.gui;
	}

	gui : NgxThreeGui = null;

	setMesh(mesh : NgxMeshComponent) {
		super.setMesh(mesh);
		const head = this.meshObject3d.getObjectByName( 'mesh_2' ) as any;
		if (head !== null && head !== undefined && this.gui !== null) {
			const influences = head.morphTargetInfluences;
			const gui = this.gui.folders[0];
			for ( const [ key, value ] of Object.entries( head.morphTargetDictionary ) ) {
				gui.add( influences, value as any, 0, 1, 0.01 )
					.name( key.replace( 'blendShape1.', '' ) )
					.listen( influences );
			}
		} else {
			console.log(head);
		}

	}
}
