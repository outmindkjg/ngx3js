import { Component, forwardRef, Input, OnInit, SimpleChanges } from '@angular/core';
import { AbstractChartComponent } from '../../chart.abstract';
import { AbstractControllerComponent } from '../../controller.component.abstract';
import { RendererTimer, ThreeUtil } from '../../interface';

@Component({
	selector: 'ngx3js-chart-controller',
	templateUrl: './controller.component.html',
	styleUrls: ['./controller.component.scss'],
	providers: [{ provide: AbstractControllerComponent, useExisting: forwardRef(() => ChartControllerComponent) }],
})
export class ChartControllerComponent extends AbstractControllerComponent implements OnInit {
	/**
	 * Input  of controller component
	 *
	 * Notice - case insensitive.
	 *
	 */
	@Input() private type: string = 'auto';

	/**
	 * Input  of controller component
	 *
	 * Notice - case insensitive.
	 *
	 */
	@Input() private duration: number = 2;

	/**
	 * Creates an instance of controller component.
	 */
	constructor() {
		super();
	}

	/**
	 * A callback method that is invoked immediately after the
	 * default change detector has checked the directive's
	 * data-bound properties for the first time,
	 * and before any of the view or content children have been checked.
	 * It is invoked only once when the directive is instantiated.
	 */
	ngOnInit(): void {
		super.ngOnInit('controller');
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
		if (changes && this.refObject3d !== null) {
			this.addChanges(changes);
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
	 * Applys changes
	 * @param changes
	 * @returns
	 */
	public applyChanges(changes: string[]) {
		if (this.refObject3d !== null) {
			if (ThreeUtil.isIndexOf(changes, 'clearinit')) {
				this.getController();
				return;
			}
			if (ThreeUtil.isIndexOf(changes, ['type', 'object3d', 'object2d'])) {
				this.needUpdate = true;
				return;
			}
			if (ThreeUtil.isIndexOf(changes, 'init')) {
				changes = ThreeUtil.pushUniq(changes, []);
			}
			super.applyChanges(changes);
		}
	}

	/**
	 * Duration  of controller component
	 */
	private _duration: number = 1;

	/**
	 * Duration  of controller component
	 */
	private _chartComponent: AbstractChartComponent = null;

	/**
	 * Gets controller
	 */
	public getController(): void {
		if (this.refObject3d !== null && (this._chartComponent === null || this._needUpdate)) {
			this.needUpdate = false;
			const component = ThreeUtil.getThreeComponent(this.refObject3d);
			this._duration = ThreeUtil.getTypeSafe(this.duration, 1);
      this.elapsedTime = 0;
			if (component instanceof AbstractChartComponent) {
				this._chartComponent = component;
			}
			super.setObject({
				controller: this._chartComponent,
			});
		}
	}

  private elapsedTime : number = 0;

	/**
	 * Updates controller component
	 * @param rendererTimer
	 */
	public update(rendererTimer: RendererTimer) {
		if (this._chartComponent !== null) {
      const delta = rendererTimer.delta / this._duration;
      this.elapsedTime += delta;
			this._chartComponent.update(rendererTimer, this.elapsedTime, delta);
		} else {
			this.consoleLogTime('chart controller', rendererTimer);
		}
	}
}
