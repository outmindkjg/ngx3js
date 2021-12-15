import { Component } from '@angular/core';
import { NgxBaseComponent } from 'ngx3js';

@Component({
	selector: 'app-webgl-loader-ldraw',
	templateUrl: './webgl-loader-ldraw.component.html',
	styleUrls: ['./webgl-loader-ldraw.component.scss'],
})
export class WebglLoaderLdrawComponent extends NgxBaseComponent<{
	modelFileName: string;
	envMapActivated: boolean;
	separateObjects: boolean;
	displayLines: boolean;
	conditionalLines: boolean;
	smoothNormals: boolean;
	constructionStep: number;
	noConstructionSteps: string;
}> {
	constructor() {
		super(
			{
				modelFileName: 'Car',
				envMapActivated: false,
				separateObjects: false,
				displayLines: true,
				conditionalLines: true,
				smoothNormals: true,
				constructionStep: 0,
				noConstructionSteps: 'No steps.',
			},
			[
				{
					name: 'modelFileName',
					type: 'select',
					select: [
						'Car',
						'Lunar Vehicle',
						'Radar Truck',
						'Trailer',
						'Bulldozer',
						'Helicopter',
						'Plane',
						'Lighthouse',
						'X-Wing mini',
						'AT-ST mini',
						'AT-AT mini',
						'Shuttle',
						'TIE Interceptor',
						'Star fighter',
						'X-Wing',
						'AT-ST',
					],
					change: () => {
						this.changeModel(this.controls.modelFileName);
					},
				},
			]
		);
	}

	ngOnInit() {
		this.changeModel(this.controls.modelFileName);
	}

	changeModel(key) {
		const modelFileList = {
			Car: 'models/car.ldr_Packed.mpd',
			'Lunar Vehicle': 'models/1621-1-LunarMPVVehicle.mpd_Packed.mpd',
			'Radar Truck': 'models/889-1-RadarTruck.mpd_Packed.mpd',
			Trailer: 'models/4838-1-MiniVehicles.mpd_Packed.mpd',
			Bulldozer: 'models/4915-1-MiniConstruction.mpd_Packed.mpd',
			Helicopter: 'models/4918-1-MiniFlyers.mpd_Packed.mpd',
			Plane: 'models/5935-1-IslandHopper.mpd_Packed.mpd',
			Lighthouse: 'models/30023-1-Lighthouse.ldr_Packed.mpd',
			'X-Wing mini': 'models/30051-1-X-wingFighter-Mini.mpd_Packed.mpd',
			'AT-ST mini': 'models/30054-1-AT-ST-Mini.mpd_Packed.mpd',
			'AT-AT mini': 'models/4489-1-AT-AT-Mini.mpd_Packed.mpd',
			Shuttle: 'models/4494-1-Imperial Shuttle-Mini.mpd_Packed.mpd',
			'TIE Interceptor': 'models/6965-1-TIEIntercep_4h4MXk5.mpd_Packed.mpd',
			'Star fighter': 'models/6966-1-JediStarfighter-Mini.mpd_Packed.mpd',
			'X-Wing': 'models/7140-1-X-wingFighter.mpd_Packed.mpd',
			'AT-ST': 'models/10174-1-ImperialAT-ST-UCS.mpd_Packed.mpd',
		};
		this.storageName = 'models/ldraw/officialLibrary/' + modelFileList[key];
	}

	storageName: string = '';
}
