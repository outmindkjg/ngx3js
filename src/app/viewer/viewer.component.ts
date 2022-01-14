import {
	AfterViewInit,
	Component,
	ElementRef,
	OnInit,
	ViewChild,
} from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { NgxRendererComponent, NgxThreeUtil } from 'ngx3js';
import { Subscription } from 'rxjs';

@Component({
	selector: 'app-example-viewer',
	templateUrl: './viewer.component.html',
	styleUrls: ['./viewer.component.scss'],
})
export class ExampleViewerComponent implements OnInit, AfterViewInit {
	private subscription: Subscription;

	constructor(private router: Router) {
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

	ngOnInit(): void {}

	public fullUrl: string = '';
	private safeId: string = '';
	public isLoaded: boolean = false;
	public isFullScreen: boolean = false;

	@ViewChild('github') gitHub: ElementRef = null;
	@ViewChild('ngxGithub') ngxGithub: ElementRef = null;

	changeRouter(url: string) {
		this.isLoaded = false;
		this.safeId = '';
		if (url.startsWith('/viewer/')) {
			this.safeId = url.substring(8);
			this.isFullScreen = false;
		} else if (url.startsWith('/fullviewer/')) {
			this.safeId = url.substring(12);
			this.isFullScreen = true;
		} else {
			this.fullUrl = '#';
			this.isFullScreen = false;
		}
		this.fullUrl = '#' + 'examples/' + this.safeId;
		this.ngAfterViewInit();
		setTimeout(() => {
			this.isLoaded = true;
		}, 4000);
	}
	isfullScreenMode : boolean = false;
	toggleScreen() {
		if (window.frameElement && window.frameElement.classList) {
			this.isfullScreenMode = !this.isfullScreenMode;
			const frameElement = window.frameElement;
			if (this.isfullScreenMode) {
				frameElement.classList.add('active-full-screen');
			} else {
				frameElement.classList.remove('active-full-screen');
			}
		}
		return false;
	}
	downloadThumbFile() {
		if (NgxThreeUtil.lastRenderer !== null) {
			const lastRenderer = NgxThreeUtil.lastRenderer as NgxRendererComponent;
			lastRenderer.getCanvasJson((json) => {}, {
				width: 400,
				height: 250,
				name: 'auto',
				type: 'jpg',
			});
		}
		return false;
	}

	ngAfterViewInit() {
		if (
			this.ngxGithub !== null &&
			this.ngxGithub !== undefined &&
			this.gitHub !== null &&
			this.gitHub !== undefined
		) {
			const safeId = this.safeId;
			const title = safeId.split('_').join(' / ');
			if (safeId.startsWith('ngx_')) {
				this.gitHub.nativeElement.style.pointerEvents = 'none';
				this.gitHub.nativeElement.href =
					'https://github.com/outmindkjg/ngx3js/tree/master/src/app/examples/' +
					safeId.replace(/_/gi, '-') +
					'';
				this.gitHub.nativeElement.title =
					'View source code for "' + title + '" on GitHub ngx3js';
			} else {
				this.gitHub.nativeElement.style.pointerEvents = 'all';
				this.gitHub.nativeElement.href =
					'https://github.com/mrdoob/three.js/blob/master/examples/' +
					safeId +
					'.html';
				this.gitHub.nativeElement.title =
					'View source code for "' + title + '" on GitHub';
			}
			this.ngxGithub.nativeElement.href =
				'https://github.com/outmindkjg/ngx3js/tree/master/src/app/examples/' +
				safeId.replace(/_/gi, '-') +
				'';
			this.ngxGithub.nativeElement.title =
				'View source code for "' + title + '" on GitHub ngx3js';
		}
	}
}
