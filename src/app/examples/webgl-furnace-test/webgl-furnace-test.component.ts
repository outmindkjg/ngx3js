import { Component } from '@angular/core';
import { NgxBaseComponent, IRendererEvent, THREE } from 'ngx3js';

@Component({
	selector: 'app-webgl-furnace-test',
	templateUrl: './webgl-furnace-test.component.html',
	styleUrls: ['./webgl-furnace-test.component.scss'],
})
export class WebglFurnaceTestComponent extends NgxBaseComponent<{}> {
	constructor() {
		super({}, [], false, false);
	}

	ngOnInit() {
		this.objectInfos = [];
		for (let x = 0; x <= 10; x++) {
			for (let y = 0; y <= 10; y++) {
				this.objectInfos.push({
					roughness: x / 10,
					metalness: y / 10,
					x: x - 5,
					y: 5 - y,
				});
			}
		}
	}

	mouseEvent(event: IRendererEvent) {
		if (this.meshObject3d !== null) {
			switch (event.type) {
				case 'mouseover':
					this.meshObject3d.traverse((child : any) => {
						if (child instanceof THREE.Mesh) {
							(child.material as any).color.setHex(0xaaaaff);
						}
					});
					break;
				case 'mouseout':
					this.meshObject3d.traverse((child : any) => {
						if (child instanceof THREE.Mesh) {
							(child.material as any).color.setHex(0xffffff);
						}
					});
					break;
			}
		}
	}

	objectInfos: {
		roughness: number;
		metalness: number;
		x: number;
		y: number;
	}[] = [];
}
