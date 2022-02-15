import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
	I3JS,
	N3JS,
	NgxBaseComponent,
	NgxRendererComponent, NgxThreeUtil
} from 'ngx3js';

interface IconInfo {
	name?: string,
	version?: number,
	popularity?: number,
	codepoint?: number,
	unsupported_families?: string[],
	categories?: string[],
	tags?: string[],
	icon? : string; 
	sizes_px?: number[]
}

@Component({
	selector: 'app-ngx-icons',
	templateUrl: './ngx-icons.component.html',
	styleUrls: ['./ngx-icons.component.scss'],
})
export class NgxIconsComponent extends NgxBaseComponent<{
	color: number;
	size: number;
	height: number;
	autoRotate: boolean;
	category : string;
	icon : string;
	align: {
		leftRight: 'center';
		topBottom: 'middle';
		frontBack: 'double';
	};
	curveSegments: number;
	bevel: {
		bevelEnabled: boolean;
		bevelThickness: number;
		bevelSize: number;
		bevelOffset: number;
		bevelSegments: number;
	};
}> {
	constructor(private route: ActivatedRoute) {
		super(
			{
				color: 0x448797,
				size: 2.5,
				height: 0.3,
				align: {
					leftRight: 'center',
					topBottom: 'middle',
					frontBack: 'double',
				},
				category : 'All',
				icon : '',
				curveSegments: 12,
				autoRotate: true,
				bevel: {
					bevelEnabled: true,
					bevelThickness: 0.02,
					bevelSize: 0.02,
					bevelOffset: 0,
					bevelSegments: 3,
				},
			},
			[
				{
					name: 'Icon',
					type: 'folder',
					children: []
				},
				{ name: 'color', type: 'color', title: 'Color' },
				{
					name: 'size',
					type: 'number',
					title: 'Size',
					min: 0.01,
					max: 3,
					step: 0.1,
				},
				{
					name: 'height',
					type: 'number',
					title: 'Height',
					min: 0.01,
					max: 0.5,
					step: 0.01,
				},
				{
					name: 'curveSegments',
					type: 'number',
					title: 'Curve Segments',
					min: 1,
					max: 20,
					step: 1,
				},
				{
					name: 'align',
					type: 'folder',
					control: 'align',
					children: [
						{
							name: 'leftRight',
							type: 'select',
							title: 'left-right',
							select: ['left', 'center', 'right'],
						},
						{
							name: 'topBottom',
							type: 'select',
							title: 'top-bottom',
							select: ['top', 'middle', 'bottom'],
						},
						{
							name: 'frontBack',
							type: 'select',
							title: 'front-back',
							select: ['front', 'double', 'back'],
						},
					],
				},
				{
					name: 'bevel',
					type: 'folder',
					control: 'bevel',
					children: [
						{
							name: 'bevelEnabled',
							type: 'checkbox',
							title: 'Enabled',
						},
						{
							name: 'bevelThickness',
							type: 'number',
							title: 'Thickness',
							min: 0,
							max: 0.1,
							step: 0.001,
						},
						{
							name: 'bevelSize',
							type: 'number',
							title: 'Size',
							min: 0,
							max: 0.1,
							step: 0.001,
						},
						{
							name: 'bevelOffset',
							type: 'number',
							title: 'Offset',
							min: 0,
							max: 0.1,
							step: 0.001,
						},
						{
							name: 'bevelSegments',
							type: 'number',
							title: 'Segments',
							min: 0,
							max: 10,
							step: 1,
						},
					],
				},
				{ name: 'autoRotate', type: 'checkbox' },

			],
			false,
			false
		);
	}

	ngOnInit(): void {
		this.subscribeRefer(
			'router',
			this.route.params.subscribe((params) => {
				if (params['type']) {
					this.controls.icon = params['type'];
					if (this.exampleList.length > 0) {
						const icon = this.controls.icon;
						const iconInfo = this.exampleMap[icon];
						if (iconInfo !== undefined && iconInfo.categories !== undefined && iconInfo.categories.length > 0) {
							this.controls.category = iconInfo.categories[0] || 'All';
						}
						this.changeIconCategory();
					}
				}
			})
		);
	}

	private jsonFileLoad(url: string, callBack: (data: any) => void) {
		const fileLoader: I3JS.FileLoader = NgxThreeUtil.getLoader(
			'fileLoader',
			N3JS.FileLoader
		);
		fileLoader.load(NgxThreeUtil.getStoreUrl(url), (text: string) => {
			try {
				callBack(JSON.parse(text));
			} catch (error) {
				return;
			}
		});
	}

	private exampleList: IconInfo[] = [];
	private exampleMap: { [key : string] : IconInfo} = {};
	
	iconInfo : IconInfo =  null;

	private iconFolder : I3JS.GUI = null;
	private iconController : I3JS.GUIController = null;

	public setRender(renderer: NgxRendererComponent): void {
		super.setRender(renderer);
		this.getTimeout().then(() => {
			this.jsonFileLoad('material_icons.json', (data: IconInfo[]) => {
				this.exampleList = [];
				const iconCategorys : string[] = [];
				iconCategorys.push('All');
				data.forEach(iconInfo => {
					iconInfo.categories.forEach(category => {
						if (!iconCategorys.includes(category)) {
							iconCategorys.push(category);
						}
					});
					iconInfo.icon = String.fromCodePoint(iconInfo.codepoint);
					this.exampleMap[iconInfo.name] = iconInfo;
					this.exampleList.push(iconInfo);
				});
				let icon = this.controls.icon;
				if (icon === '' || icon === null) {
					const iconNames:string[] = [];
					this.exampleList.forEach(icon => {
						iconNames.push(icon.name);
					});
					var randIdx = Math.floor(Math.random() * iconNames.length);
					icon = this.controls.icon = iconNames[randIdx];
				} 
				const iconInfo = this.exampleMap[this.controls.icon];
				if (iconInfo !== undefined && iconInfo.categories !== undefined && iconInfo.categories.length > 0) {
					this.controls.category = iconInfo.categories[0] || 'All';
				}
				this.iconFolder = NgxThreeUtil.getGuiFolder(this.renderer.gui, 'Icon');
				NgxThreeUtil.clearGui(this.iconFolder);
				this.iconFolder.add(this.controls, 'category', iconCategorys).name('Category').onChange(() => {
					this.changeIconCategory();
				}).listen(true);
				this.changeIconCategory();
			});

		});
	}

	iconNames : string[] = [];
	
	changeIconCategory() {
		if (this.iconController !== null) {
			this.iconController.destroy();
		}
		const iconNames = this.iconNames;
		iconNames.length = 0;
		if (this.controls.category === '' || this.controls.category === 'All') {
			this.exampleList.forEach(icon => {
				iconNames.push(icon.name);
			});
		} else {
			const category = this.controls.category;
			this.exampleList.forEach(icon => {
				if (icon.categories && icon.categories.includes(category)) {
					iconNames.push(icon.name);
				}
			})
		}
		if (!iconNames.includes(this.controls.icon)) {
			this.controls.icon = iconNames[0];
		}
		this.iconController = this.iconFolder.add(this.controls, 'icon', this.iconNames).name('Name').onChange(() => {
			this.changeIconName();
		}).listen(true);
		this.changeIconName();
	}

	changeIconName() {
		const icon = this.controls.icon;
		if (this.exampleMap[icon] !== undefined) {
			this.iconInfo = this.exampleMap[icon];
		}
	}


}


