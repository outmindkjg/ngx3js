import { AfterContentInit, Component, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { ThreeUtil } from './interface';
import { AbstractObject3dComponent } from './object3d.abstract';


/**
 * AbstractObject3dComponent
 */
@Component({
	template: '',
})
export abstract class AbstractChartComponent extends AbstractObject3dComponent implements OnInit, OnChanges, AfterContentInit, OnDestroy {
	/**
	 * Object3 d attr of abstract object3d component
	 */
	protected CHART_ATTR: string[] = [
		'name',
		'position',
		'onbeforerender',
		'rotation',
		'scale',
		'layers',
		'visible',
		'castshadow',
		'receiveshadow',
		'frustumculled',
		'renderorder',
		'customdepthmaterial',
		'customdistancematerial',
		'material',
		'helper',
		'lodistance',
		'helper',
		'mixer',
		'animationgroup',
		'prefab',
	];

	/**
	 * Creates an instance of abstract object3d component.
	 */
	constructor() {
		super();
		this.CHART_ATTR.push(...this.OBJECT3D_ATTR);
	}

	/**
	 * A callback method that is invoked immediately after the
	 * default change detector has checked the directive's
	 * data-bound properties for the first time,
	 * and before any of the view or content children have been checked.
	 * It is invoked only once when the directive is instantiated.
	 *
	 * @param subscribeType
	 */
	ngOnInit(subscribeType?: string): void {
		super.ngOnInit(subscribeType || 'chart');
	}

	/**
	 * A callback method that performs custom clean-up, invoked immediately
	 * before a directive, pipe, or service instance is destroyed.
	 */
	ngOnDestroy(): void {
		super.ngOnDestroy();
	}

	/**
	 * A callback method that is invoked immediately after the
	 * default change detector has checked data-bound properties
	 * if at least one has changed, and before the view and content
	 * children are checked.
	 *
	 * @param changes The changed properties.
	 */
	ngOnChanges(changes: SimpleChanges): void {
		super.ngOnChanges(changes);
		if (changes && this.object3d !== null) {
			
		}
	}

	/**
	 * A callback method that is invoked immediately after
	 * Angular has completed initialization of all of the directive's
	 * content.
	 * It is invoked only once when the directive is instantiated.
	 */
	ngAfterContentInit(): void {
		super.ngAfterContentInit();
	}

	/**
	 * Applys changes3d
	 * @param changes
	 * @returns
	 */
	protected applyChanges3d(changes: string[]) {
		if (this.object3d !== null) {
			if (ThreeUtil.isIndexOf(changes, ['clearinit'])) {
				return;
			}
			if (ThreeUtil.isIndexOf(changes, ['init'])) {
				changes = ThreeUtil.pushUniq(changes, [
				]);
			}
			changes.forEach((change) => {
				switch (change.toLowerCase()) {
				}
			});
			super.applyChanges(changes);
		}
	}

}
