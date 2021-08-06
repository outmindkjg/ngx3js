three.js
========

[![NPM Package][npm]][npm-url]
[![Build Size][build-size]][build-size-url]
[![NPM Downloads][npm-downloads]][npmtrends-url]

#### JavaScript 3D library ####

The aim of the project is to create an easy to use, lightweight, cross-browser, general purpose 3D library. The current builds only include a WebGL renderer but WebGPU (experimental), SVG and CSS3D renderers are also available in the examples.

[Examples](https://outmindkjg.github.io/ngx3js-doc/#/examples/) &mdash;
[Documentation](https://outmindkjg.github.io/ngx3js-doc/#/docs)

### FIX dependencies ###
I found some errors on three.js. Before use this source. You muse fix them by you self.
current theejs verion "^0.130.0"

```javascript

// node_modules/@types/three/examples/jsm/utils/SceneUtils.d.ts
-+ 1  import { BufferGeometry, Group, InstancedMesh, Material, Object3D, Scene } from '../../../src/Three';
-+ 5  function createMultiMaterialObject(geometry: BufferGeometry, materials: Material[]): Group;

// node_modules/@types/three/examples/jsm/misc/MorphAnimMesh.d.ts
-+ 1  import { AnimationAction, AnimationMixer, BufferGeometry, Material, Mesh } from '../../../src/Three';
-+ 4  constructor(geometry: BufferGeometry, material: Material);

// node_modules/ammojs-typed/ammo/ammo.d.ts
+ 7	function castObject(obj1 : any, obj2 : any) : btCollisionObject;

// node_modules/@types/three/examples/jsm/loaders/TiltLoader.js
-+ 408	const loader = new TextureLoader().setPath( '/assets/examples/textures/tiltbrush/' );

// node_modules/@types/three/examples/jsm/geometries/TeapotGeometry.d.ts
-+ 4 	constructor( size?: number, segments?: number, bottom?: boolean, lid?: boolean, body?: boolean, fitLid?: boolean, blinn?: boolean );

// node_modules/@types/three/examples/jsm/exporters/OBJExporter.js
-+ 138 	} else if (vertices !== undefined){

// node_modules/@types/three/examples/jsm/loaders/SVGLoader.d.ts
-+ 1 	import { Loader, LoadingManager, ShapePath, BufferGeometry, Vector2, Shape } from '../../../src/Three';
-+ 40	  static pointsToStroke( points: Vector2[], style: StrokeStyle, arcDivisions?: number, minDistance?: number ): BufferGeometry;
-+ 52   static pointsToStrokeWithBuffers( points: Vector2[], style: StrokeStyle, arcDivisions?: number, minDistance?: number, vertices?: number[], normals?: number[], uvs?: number[], vertexOffset?: number ): number;

// node_modules/@types/three/examples/jsm/lines/WireframeGeometry2.d.ts
-+ 1 	import { BufferGeometry } from '../../../src/Three';
-+ 6 	constructor( geometry: BufferGeometry );

// node_modules/@types/three/examples/jsm/math/OBB.d.ts
-+ 8 	constructor( center?: Vector3, halfSize?: Vector3, rotation?: Matrix3 );
-+ 17 intersectsOBB( obb: OBB, epsilon?: number ): boolean;

// node_modules/@types/three/examples/jsm/modifiers/CurveModifier.d.ts
-+ 7	 BufferGeometry,
-+ 43   constructor( count: Number, curveCount: Number, geometry: BufferGeometry, material: Material );

// node_modules/@types/three/examples/jsm/loaders/VOXLoader.d.ts
-+ 23   export class VOXMesh extends Mesh {
-+ 24   	constructor( chunk );
-+ 25   }

// node_modules/@types/three/examples/jsm/modifiers/EdgeSplitModifier.d.ts
-+ 18	 modify( geometry: BufferGeometry, cutOffPoint: number, tryKeepNormals: boolean ): BufferGeometry;

// node_modules/@types/three/examples/jsm/modifiers/SimplifyModifier.d.ts
-+ 5  modify( geometry: BufferGeometry , count: number ): BufferGeometry;

// node_modules/@types/three/examples/jsm/objects/Water.d.ts
-+ 1 	import { BufferGeometry, Color, Mesh, Side, Texture, Vector3 } from '../../../src/Three';
-+ 20 constructor(geometry: BufferGeometry, options: WaterOptions);

// node_modules/@types/three/examples/jsm/objects/ShadowMesh.d.ts
-+ 4 constructor(mesh : Mesh);

// node_modules/@types/three/examples/jsm/objects/Water2.d.ts
-+ 1 	import { BufferGeometry, Color, Mesh, Texture, TextureEncoding, Vector2 } from '../../../src/Three';
-+ 20 	constructor(geometry: BufferGeometry, options: Water2Options);

// node_modules/@types/three/examples/jsm/postprocessing/SAOPass.d.ts
-+ 31 	saoBlur: boolean;

// node_modules/@types/three/examples/jsm/utils/UVsDebug.d.ts
-+ 1  import { BufferGeometry } from '../../../src/Three';
-+ 3  export function UVsDebug( geometry: BufferGeometry, size: number ): HTMLCanvasElement;


```

### Usage ###

This code creates a scene, a camera, and a geometric cube, and it adds the cube to the scene. It then creates a `WebGL` renderer for the scene and camera, and it adds that viewport to the `document.body` element. Finally, it animates the cube within the scene for the camera.

```javascript
// src/app/app.module.ts

import { Ngx3JsModule } from './three/ngx3js.module';

@NgModule({
	....
	imports: [..., Ngx3JsModule],
	....
})


// angular.json
{
  .......
  "projects": {
    "your-project-name": {
      ......
      "architect": {
        "build": {
		  ......
          "options": {
            "allowedCommonJsDependencies" : [
              "ammojs-typed",
              "three/examples/js/libs/lottie_canvas",
              "three/examples/js/libs/draco/draco_encoder",
              "crypto",
              "crypto-js",
              "highlight.js"
            ],
		    ......
            "assets": [
              "src/favicon.ico",
              "src/assets"
            ],
		    ......
          },
	      ......
        },
	    ......
      }
    }
  },
  ......
}
```

### Document ###
```sh
npm install -g @angular/cli
npm install ammojs-typed
npm install three
npm install @types/three
npm install @types/dat.gui –save-dev
npm install @types/physijs –save-dev
npm install @types/stats-js –save-dev
npm run maxmem
npm run maxbuild
npm run maxbuildprod

npm install typedoc --save-dev
npx typedoc --out docs
npx typedoc --exclude "**/*+(index|.spec|.e2e).ts"
npx typedoc --json docs_api.json --exclude "**/*+(index|.spec|.e2e).ts"

git remote set-url origin https://github.com/outmindkjg/ngx3js.git
git remote -v

ng g directive three/drawing-canvas
ng g c three/viewer
ng g c examples/webgl-portal
```


### Cloning this repository ###

Cloning the repo with all its history results in a ~2 GB download. If you don't need the whole history you can use the `depth` parameter to significantly reduce download size.

```sh
git clone --depth=1 https://github.com/outmindkjg/ngx3js.git
```

### Change log ###

[Releases](https://github.com/outmindkjg/ngx3js/releases)


[npm]: https://img.shields.io/npm/v/three
[npm-url]: https://www.npmjs.com/package/three
[build-size]: https://badgen.net/bundlephobia/minzip/three
[build-size-url]: https://bundlephobia.com/result?p=three
[npm-downloads]: https://img.shields.io/npm/dw/three
[npmtrends-url]: https://www.npmtrends.com/three
