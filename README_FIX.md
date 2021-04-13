----------------------

node_modules/three/examples/jsm/misc/MorphAnimMesh.d.ts
node_modules/three/examples/jsm/utils/SceneUtils.d.ts

----------------------

node_modules/ammojs-typed/ammo/ammo.d.ts
line 7 :
function castObject(obj1 : any, obj2 : any) : btCollisionObject;

D7PNK-JWYGX-9GWDH-4WG8W-82QDV

----------------------

node_modules\three\examples\jsm\loaders\SVGLoader.d.ts
Line 6 :
	Vector2
Line 40
	static pointsToStroke( points: Vector2[], style: StrokeStyle, arcDivisions?: number, minDistance?: number ): BufferGeometry;
	static pointsToStrokeWithBuffers( points: Vector2[], style: StrokeStyle, arcDivisions?: number, minDistance?: number, vertices?: number[], normals?: number[], uvs?: number[], vertexOffset?: number ): number;

----------------------

node_modules/three/examples/jsm/lines/WireframeGeometry2.d.ts

import {
	BufferGeometry
} from '../../../src/Three';

import { LineSegmentsGeometry } from './LineSegmentsGeometry';

export class WireframeGeometry2 extends LineSegmentsGeometry {

	constructor( geometry: BufferGeometry );
	readonly sWireframeGeometry2: boolean;

}

----------------------


node_modules/three/examples/jsm/loaders/TiltLoader.js

const loader = new TextureLoader().setPath( '/assets/examples/textures/tiltbrush/' );

----------------------

node_modules\three\examples\jsm\loaders\VOXLoader.d.ts

export class VOXMesh extends Mesh {
	constructor( chunk );
}

----------------------

