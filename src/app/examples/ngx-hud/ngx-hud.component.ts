import { Component } from '@angular/core';
import { BaseComponent, RendererTimer } from 'ngx3js';

@Component({
	selector: 'app-ngx-hud',
	templateUrl: './ngx-hud.component.html',
	styleUrls: ['./ngx-hud.component.scss'],
})
export class NgxHudComponent extends BaseComponent<{
	color : boolean;
	size : boolean;
	type : boolean;
}> {
	constructor() {
		super({
			color : true,
			size : true,
			type : true
		}, [
			{ name : 'type', title : 'Show Geometry Type', type : 'checkbox'},
			{ name : 'color', title : 'Show Color', type : 'checkbox'},
			{ name : 'size', title : 'Show Size', type : 'checkbox'}
		], true, false);
	}

	geometryType : string = 'BoxGeometry';
	radius : number = 10;
	color : string = '0xff0000';
	line : string = '0x000000';
	lineDash : string = 'solid';
	
	setLineDash(lineDash : string) {
		this.lineDash = lineDash;
		return false;
	}

	setRadius(radius : number) {
		this.radius = radius;
		return false;
	}

	setColor(color : string) {
		this.color = color;
		return false;
	}

	setLine(color : string) {
		this.line = color;
		return false;
	}

	setType(type : string) {
		this.geometryType = type;
		return false;
	}

	onRender(timer : RendererTimer) {
		super.onRender(timer);
		if (this.meshObject3d !== null) {
			const elapsedTime = timer.elapsedTime;
			this.meshObject3d.rotation.y = elapsedTime / 5;
			this.meshObject3d.rotation.x = elapsedTime / 10;
		}
	}

}
