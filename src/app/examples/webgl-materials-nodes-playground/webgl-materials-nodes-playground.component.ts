import { Component, ElementRef, ViewChild } from '@angular/core';
import { I3JS, IRendererTimer, NgxBaseComponent, NgxMeshComponent, NgxRendererComponent, NODES } from 'ngx3js';

@Component({
	selector: 'app-webgl-materials-nodes-playground',
	templateUrl: './webgl-materials-nodes-playground.component.html',
	styleUrls: ['./webgl-materials-nodes-playground.component.scss'],
})
export class WebglMaterialsNodesPlaygroundComponent extends NgxBaseComponent<{}> {
	constructor() {
		super(
			{},
			[]
			,false , false);
	}

	frame : I3JS.NodeFrame = null;
	ngOnInit() {
		this.frame = new NODES.NodeFrame();
		NODES.SetNodeAssetLibPath('assets/examples/');
	}

	setRender(renderer: NgxRendererComponent): void {
		super.setRender(renderer);
		this.subscribeRefer('rendererSize', this.renderer.sizeSubscribe().subscribe((size => {
			this.size = size;
			this.reSizeCanvas();
		})));
	}

	ngAfterViewInit(): void {
		const nodeEditor = this.nodeEditor = new NODES.NodeEditor();
		nodeEditor.addEventListener( 'new', () => {
			this.setMaterialEditor(new NODES.ClassLib.StandardMaterialEditor());
		} );
		nodeEditor.addEventListener( 'load', () => {
			this.setMaterialEditor(nodeEditor.nodes[ 0 ], false);
		} );
		const nativeElement:HTMLDivElement = this.playground.nativeElement;
		nativeElement.appendChild( nodeEditor.domElement );
		nodeEditor.canvas.centralize();
		this.getTimeout(1000).then(() => {
			this.setMaterialEditor(new NODES.ClassLib.StandardMaterialEditor());
		});
	}

	size : I3JS.Vector2 = null;

	reSizeCanvas() {
		if (this.size !== null && this.nodeEditor && this.materialEditor) {
			this.materialEditor.setPosition( ( this.size.x / 2 ) - 150, ( this.size.y / 2 ) - 62);
		}
	}

	@ViewChild('playground') playground : ElementRef = null;
	private nodeEditor : I3JS.NodeEditor = null;
	private materialEditor : any = null;

	private setMaterialEditor(materialEditor : any, add : boolean = true) {
		this.materialEditor = materialEditor;
		if (add) {
			this.nodeEditor.add( this.materialEditor );
		}
		this.meshObject3d.material = this.materialEditor.material;
		NODES.OnNodeBuildBeforeRender(this.frame, this.materialEditor.material);
		this.reSizeCanvas();
	}

	setMesh(mesh: NgxMeshComponent): void {
		super.setMesh(mesh);
	}

	onRender(timer: IRendererTimer): void {
		super.onRender(timer);
		if (this.materialEditor) {
			this.frame.update(timer.delta);
		}
	}

}
