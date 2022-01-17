import { Component } from '@angular/core';
import {
	NgxBaseComponent,
	NgxThreeUtil,
	I3JS,
	THREE,
	NgxMeshComponent,
	IRendererTimer,
} from 'ngx3js';

@Component({
	selector: 'app-webgl-sprites-nodes',
	templateUrl: './webgl-sprites-nodes.component.html',
	styleUrls: ['./webgl-sprites-nodes.component.scss'],
})
export class WebglSpritesNodesComponent extends NgxBaseComponent<{}> {
	constructor() {
		super({}, [], false, false);
	}

	walkingManTextureURL = NgxThreeUtil.getStoreUrl('textures/WalkingManSpriteSheet.png');
	walkingManTexture: I3JS.Texture = null;
	library: { [key: string]: I3JS.Texture } = {};
	frame:I3JS.NodeFrame = null;

	ngOnInit(): void {
		this.frame  =  new THREE.NodeFrame();
		const textureLoader: I3JS.TextureLoader = NgxThreeUtil.getLoader(
			'textureLoader',
			THREE.TextureLoader
		);
		const walkingManTexture = (this.walkingManTexture = textureLoader.load(
			this.walkingManTextureURL
		));
		walkingManTexture.wrapS = walkingManTexture.wrapT = THREE.RepeatWrapping;
		this.library[this.walkingManTextureURL] = walkingManTexture;
	}

	setMesh(mesh: NgxMeshComponent): void {
		super.setMesh(mesh);
		this.meshChildren.forEach((sprite: any, idx) => {
			switch (idx) {
				case 0:
					sprite.material.color = new THREE.TextureNode(this.walkingManTexture);
					sprite.material.color.uv = this.createHorizontalSpriteSheetNode(
						8,
						10
					);
					this.sprite1 = sprite;
					break;
				case 1:
					sprite.material.color = new THREE.TextureNode(this.walkingManTexture);
					sprite.material.color.uv = this.createHorizontalSpriteSheetNode(
						8,
						30
					);
					sprite.material.color = new THREE.MathNode(
						sprite.material.color,
						THREE.MathNode.INVERT
					);
					sprite.material.spherical = false; // look at camera horizontally only, very used in vegetation
					// horizontal zigzag sprite
					sprite.material.position = new THREE.OperatorNode(
						new THREE.OperatorNode(
							new THREE.MathNode(new THREE.TimerNode(3), THREE.MathNode.SIN), // 3 is speed (time scale)
							new THREE.Vector2Node(0.3, 0), // horizontal scale (position)
							THREE.OperatorNode.MUL
						),
						new THREE.PositionNode(),
						THREE.OperatorNode.ADD
					);
					this.sprite2 = sprite;
					break;
				case 2:
					const sineWaveFunction = new THREE.FunctionNode( [
						// https://stackoverflow.com/questions/36174431/how-to-make-a-wave-warp-effect-in-shader
						"vec2 sineWave(vec2 uv, vec2 phase) {",
						// wave distortion
						"	float x = sin( 25.0*uv.y + 30.0*uv.x + 6.28*phase.x) * 0.01;",
						"	float y = sin( 25.0*uv.y + 30.0*uv.x + 6.28*phase.y) * 0.03;",
						"	return vec2(uv.x+x, uv.y+y);",
						"}"
					].join( "\n" ) );
					sprite.material.color = new THREE.TextureNode( this.walkingManTexture );
					sprite.material.color.uv = new THREE.FunctionCallNode( sineWaveFunction, {
						"uv": this.createHorizontalSpriteSheetNode( 8, 10 ),
						"phase": new THREE.TimerNode()
					}  as any);
					sprite.material.fog = true;
					this.sprite3 = sprite;
					break;
			}
			this.spriteToJSON( sprite);

		});
	}

	sprite1 : any = null;
	sprite2 : any = null;
	sprite3 : any = null;

	spriteToJSON( sprite ) {
		return ;
		// serialize

		const json = sprite.material.toJSON();

		// replace uuid to url (facilitates the load of textures using url otherside uuid)

		// THREE.NodeMaterialLoaderUtils.replaceUUID( json, this.walkingManTexture, this.walkingManTextureURL );

		// deserialize

		const material = (new THREE.NodeMaterialLoader( null,this. library ) as any ).parse( json );

		// replace material

		sprite.material.dispose();

		sprite.material = material;

	}

	createHorizontalSpriteSheetNode(hCount: number, speed: number) {
		const speedNode = new THREE.Vector2Node(speed, 0); // frame per second
		const scale = new THREE.Vector2Node(1 / hCount, 1); // 8 horizontal images in sprite-sheet

		const uvTimer = new THREE.OperatorNode(
			new THREE.TimerNode(),
			speedNode,
			THREE.OperatorNode.MUL
		);

		const uvIntegerTimer = new THREE.MathNode(uvTimer, THREE.MathNode.FLOOR);

		const uvFrameOffset = new THREE.OperatorNode(
			uvIntegerTimer,
			scale,
			THREE.OperatorNode.MUL
		);

		const uvScale = new THREE.OperatorNode(
			new THREE.UVNode(),
			scale,
			THREE.OperatorNode.MUL
		);

		const uvFrame = new THREE.OperatorNode(
			uvScale,
			uvFrameOffset,
			THREE.OperatorNode.ADD
		);

		return uvFrame;
	}


	onRender(timer: IRendererTimer): void {
		super.onRender(timer);
		if (this.sprite1 !== null && this.sprite2 !== null && this.sprite3 !== null) {
			this.frame.update( timer.delta )
			this.frame.updateNode( this.sprite1.material )
			this.frame.updateNode( this.sprite2.material )
			this.frame.updateNode( this.sprite3.material );
			// rotate sprite
			this.sprite3.rotation.z -= Math.PI * .005;
		}

	}
}
