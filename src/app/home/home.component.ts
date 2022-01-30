import { Component } from '@angular/core';

export interface SearchMenu {
	id: string;
	isExtLink?: boolean;
	name: string;
	image?: string;
	selected: boolean;
	children?: SearchMenu[];
	tags: string;
}

@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
	constructor() {}

	searchMenu: {
		name: string;
		children: SearchMenu[];
	}[] = [
		{
			name: 'Learn',
			children: [
				{
					id: '/docs',
					isExtLink: false,
					name: 'documentation',
					selected: false,
					tags: '',
				},
				{
					id: '/examples',
					isExtLink: false,
					name: 'examples',
					selected: false,
					tags: '',
				},
			],
		},
		{
			name: 'Community',
			children: [
				
				{
					id: 'https://www.buymeacoffee.com/ngx3js',
					isExtLink: true,
					name: 'buy me a coffee',
					selected: false,
					tags: '',
				},
				{
					id: 'https://stackoverflow.com/questions/tagged/ngx3js',
					isExtLink: true,
					name: 'questions',
					selected: false,
					tags: '',
				},
				{
					id: 'https://join.slack.com/t/w1638413919-hbz636805/shared_invite/zt-zly8054i-SyWpaUrdCw~NCkK_yf9H0w',
					isExtLink: true,
					name: 'slack',
					selected: false,
					tags: '',
				},
			],
		},
		{
			name: 'Code',
			children: [
				{
					id: 'https://github.com/outmindkjg/ngx3js-module',
					isExtLink: true,
					name: 'Ngx3js Module',
					selected: false,
					tags: '',
				},
				{
					id: 'https://github.com/outmindkjg/ngx3js-module/archive/master.zip',
					isExtLink: true,
					name: 'Ngx3js Module Download',
					selected: false,
					tags: '',
				},
				{
					id: 'https://www.npmjs.com/package/ngx3js',
					isExtLink: true,
					name: 'Ngx3js Npm',
					selected: false,
					tags: '',
				},
				{
					id: 'https://github.com/outmindkjg/ngx3js',
					isExtLink: true,
					name: 'Ngx3js Examples',
					selected: false,
					tags: '',
				},
				{
					id: 'https://github.com/outmindkjg/ngx3js/archive/master.zip',
					isExtLink: true,
					name: 'Ngx3js Examples Download',
					selected: false,
					tags: '',
				},
				{
					id: 'https://outmindkjg.github.io/ngx3js-module/',
					isExtLink: true,
					name: 'Ngx3js Api Document',
					selected: false,
					tags: '',
				},
			],
		},
	];
}
