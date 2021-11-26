import {
	AfterViewInit,
	Component, OnInit
} from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs';


@Component({
	selector: 'app-example-viewer',
	templateUrl: './viewer.component.html',
	styleUrls: ['./viewer.component.scss'],
})
export class ExampleViewerComponent implements OnInit, AfterViewInit {

	private subscription: Subscription;

	constructor(
		private router: Router,
	) {
		this.subscription = this.router.events.subscribe((event: any) => {
			if (event instanceof NavigationEnd) {
				this.changeRouter(event.urlAfterRedirects || event.url);
			}
		});
	}

	ngOnDestroy(): void {
		if (this.subscription !== null) {
			this.subscription.unsubscribe();
			this.subscription = null;
		}
	}

	ngOnInit(): void {
	}

	public fullUrl: string = '';

	changeRouter(url: string) {
		if (url.startsWith('/viewer/')) {
			this.fullUrl = '#' + 'examples/' + url.substr(8);	
		} else {
			this.fullUrl = '#';
		}
	}

	ngAfterViewInit() {}

}
