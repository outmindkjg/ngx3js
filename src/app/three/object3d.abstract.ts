import {
	AfterContentInit,
	Component,
	ContentChildren,
	Input,
	OnChanges,
	OnDestroy,
	OnInit,
	QueryList,
	SimpleChanges
} from '@angular/core';
import * as THREE from 'three';
import { ControllerComponent } from './controller/controller.component';
import { LookatComponent } from './lookat/lookat.component';
import { PositionComponent } from './position/position.component';
import { RotationComponent } from './rotation/rotation.component';
import { ScaleComponent } from './scale/scale.component';
import { AbstractTweenComponent } from './tween.abstract';

@Component({
	template: '',
})
export abstract class AbstractObject3dComponent extends AbstractTweenComponent implements OnInit, OnChanges, AfterContentInit, OnDestroy {

	@Input() visible: boolean = true;
	@ContentChildren(ControllerComponent, { descendants: false }) controller: QueryList<ControllerComponent>;
	@ContentChildren(PositionComponent, { descendants: false }) position: QueryList<PositionComponent>;
	@ContentChildren(RotationComponent, { descendants: false }) rotation: QueryList<RotationComponent>;
	@ContentChildren(ScaleComponent, { descendants: false }) scale: QueryList<ScaleComponent>;
	@ContentChildren(LookatComponent, { descendants: false }) lookat: QueryList<LookatComponent>;

	ngOnInit(): void {
		super.ngOnInit();
	}

	ngOnChanges(changes: SimpleChanges): void {
		if (changes) {
			if (this.object3d) {
				if (changes.visible) {
					this.object3d.visible = this.visible;
				}
			}
		}
		super.ngOnChanges(changes);
	}

	ngAfterContentInit(): void {
		if (this.controller !== null && this.controller !== undefined) {
			this.controller.changes.subscribe((e) => {
				this.synkObject3D(['controller']);
			});
		}
		super.ngAfterContentInit();
	}

	ngOnDestroy(): void {
		if (this.object3d != null && this.refObject3d != null) {
			this.refObject3d.remove(this.object3d);
		}
		super.ngOnDestroy();
	}

	getPosition(): THREE.Vector3 {
		if (this.object3d !== null) {
			return this.object3d.position;
		} else if (this.position !== null && this.position.length > 0) {
			return this.position.first.getPosition();
		} else {
			return new THREE.Vector3(0, 0, 0);
		}
	}

	getScale(): THREE.Vector3 {
		if (this.object3d !== null) {
			return this.object3d.scale;
		} else if (this.scale !== null && this.scale.length > 0) {
			return this.scale.first.getScale();
		} else {
			return new THREE.Vector3(1, 1, 1);
		}
	}

	getRotation(): THREE.Euler {
		if (this.object3d !== null) {
			return this.object3d.rotation;
		} else if (this.scale !== null && this.scale.length > 0) {
			return this.rotation.first.getRotation();
		} else {
			return new THREE.Euler(0, 0, 0);
		}
	}

	protected object3d: THREE.Object3D = null;

	synkObject3D(synkTypes: string[]) {
		if (this.object3d !== null) {
			synkTypes.forEach((synkType) => {
				switch (synkType) {
					case 'position':
						this.position.forEach((position) => {
							position.setObject3D(this.object3d);
						});
						break;
					case 'rotation':
						this.rotation.forEach((rotation) => {
							rotation.setObject3D(this.object3d);
						});
						break;
					case 'scale':
						this.scale.forEach((scale) => {
							scale.setObject3D(this.object3d);
						});
						break;
					case 'lookat':
						this.lookat.forEach((lookat) => {
							lookat.setObject3D(this.object3d);
						});
						break;
					case 'controller' :
						this.controller.forEach((controller) => {
							controller.setObject3D(this.object3d);
						});
						break;
				}
			});
		}
	}

}
