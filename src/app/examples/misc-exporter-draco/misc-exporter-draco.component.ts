import { Component } from '@angular/core';
import { BaseComponent, LocalStorageService  , I3JS, N3js } from 'ngx3js';

@Component({
	selector: 'app-misc-exporter-draco',
	templateUrl: './misc-exporter-draco.component.html',
	styleUrls: ['./misc-exporter-draco.component.scss'],
})
export class MiscExporterDracoComponent extends BaseComponent<{
	export: () => void;
}> {
	constructor(private localStorageService: LocalStorageService) {
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
		);
	}
}
