import { Component, forwardRef, Input, OnInit, SimpleChanges } from '@angular/core';
import { AbstractChartComponent } from '../../chart.abstract';
import { AbstractObject3dComponent } from '../../object3d.abstract';

@Component({
	selector: 'ngx3js-chart-doughnut',
	templateUrl: './doughnut.component.html',
	styleUrls: ['./doughnut.component.scss'],
	providers: [{ provide: AbstractObject3dComponent, useExisting: forwardRef(() => ChartDoughnutComponent) }],
})
export class ChartDoughnutComponent extends AbstractChartComponent implements OnInit {
	@Input() public type: string = '';

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
		super.ngOnInit('chart-axes');
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
		if (changes && this.chart) {
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
}
