import { Component } from '@angular/core';
import { NgxBaseComponent, NgxLocalStorageService } from 'ngx3js';

@Component({
	selector: 'app-misc-exporter-draco',
	templateUrl: './misc-exporter-draco.component.html',
	styleUrls: ['./misc-exporter-draco.component.scss'],
})
export class MiscExporterDracoComponent extends NgxBaseComponent<{
	export: () => void;
}> {
	constructor(private localStorageService: NgxLocalStorageService) {
		super(
			{
				export: () => {
					this.localStorageService.getExportObject(
						'file.drc',
						this.meshObject3d
					);
				},
			},
			[{ name: 'export', type: 'button' }]
			,false , false);
	}
}
