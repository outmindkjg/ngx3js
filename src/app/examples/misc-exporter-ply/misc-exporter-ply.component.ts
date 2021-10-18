import { Component } from '@angular/core';
import { BaseComponent, LocalStorageService } from 'ngx3js';

@Component({
	selector: 'app-misc-exporter-ply',
	templateUrl: './misc-exporter-ply.component.html',
	styleUrls: ['./misc-exporter-ply.component.scss'],
})
export class MiscExporterPlyComponent extends BaseComponent<{
	ascii: () => void;
	binaryBig: () => void;
	binaryLittle: () => void;
}> {
	constructor(private localStorageService: LocalStorageService) {
		super(
			{
				ascii: () => {
					this.localStorageService.getExportObject(
						'box.ply',
						this.scene.getScene()
					);
				},
				binaryBig: () => {
					this.localStorageService.getExportObject(
						'box.ply',
						this.scene.getScene(),
						{ binary: true }
					);
				},
				binaryLittle: () => {
					this.localStorageService.getExportObject(
						'box.ply',
						this.scene.getScene(),
						{ binary: true, littleEndian: true }
					);
				},
			},
			[
				{ name: 'ascii', title: 'export ASCII', type: 'button' },
				{
					name: 'binaryBig',
					title: 'export binary (Big Endian)',
					type: 'button',
				},
				{
					name: 'binaryLittle',
					title: 'export binary (Little Endian)',
					type: 'button',
				},
			]
		);
	}
}
