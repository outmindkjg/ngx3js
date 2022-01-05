import { Component } from '@angular/core';
import { NgxBaseComponent, NgxLocalStorageService } from 'ngx3js';

@Component({
	selector: 'app-misc-exporter-stl',
	templateUrl: './misc-exporter-stl.component.html',
	styleUrls: ['./misc-exporter-stl.component.scss'],
})
export class MiscExporterStlComponent extends NgxBaseComponent<{
	ascii: () => void;
	binary: () => void;
}> {
	constructor(private localStorageService: NgxLocalStorageService) {
		super(
			{
				ascii: () => {
					this.localStorageService.getExportObject(
						'box.stl',
						this.scene.getScene()
					);
				},
				binary: () => {
					this.localStorageService.getExportObject(
						'box.stl',
						this.scene.getScene(),
						{ binary: true }
					);
				},
			},
			[
				{ name: 'ascii', title: 'export ASCII', type: 'button' },
				{ name: 'binary', title: 'export binary', type: 'button' },
			]
			,false , false);
	}
}
