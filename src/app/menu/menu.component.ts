import {
	Component,
	ElementRef,
	Input,
	OnDestroy,
	OnInit,
	ViewChild,
} from '@angular/core';
import { MenuVo } from '../common-interface';

/**
 * Component
 */
@Component({
	selector: 'app-menu',
	templateUrl: './menu.component.html',
	styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit, OnDestroy {
	/**
	 * View child of menu component
	 */
	@ViewChild('expandButton') expandButton: ElementRef;

	/**
	 * Input  of menu component
	 */
	@Input() menuType: string = 'examples';

	/**
	 * Menu list of menu component
	 */
	menuList: MenuVo[] = [
		{ url: 'docs', name: 'docs' },
		{ url: 'examples', name: 'examples' },
	];

	/**
	 * Creates an instance of menu component.
	 * @param ele
	 */
	constructor(private ele: ElementRef) {}

	/**
	 * on init
	 */
	ngOnInit(): void {}

	/**
	 * on destroy
	 */
	ngOnDestroy(): void {}

	/**
	 * Toggles menu
	 */
	toggleMenu() {
		const ele =
			this.expandButton.nativeElement.parentNode.parentNode.parentNode;
		ele.classList.toggle('open');
	}

	/**
	 * Closes menu
	 */
	closeMenu(isOpen: boolean) {

		const ele =
			this.expandButton?.nativeElement?.parentNode?.parentNode?.parentNode;
		if (ele && ele.classList) {
			if (isOpen) {
				if (!ele.classList.contains('open')) {
					ele.classList.add('open');
				}
			} else {
				if (ele.classList.contains('open')) {
					ele.classList.remove('open');
				}
			}
		}
	}
}
