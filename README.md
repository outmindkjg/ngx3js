ngx3js
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
current theejs verion "^0.131.0"
I found some errors on @types/three. Before use this source. You muse fix them by you self.
current theejs verion "^0.131.0"
```javascript

// node_modules/@types/three/examples/jsm/objects/ReflectorForSSRPass.d.ts
 + 59   export { Reflector as ReflectorForSSRPass };

// node_modules/@types/three/examples/jsm/nodes/inputs/ColorNode.d.ts
 + 7    constructor(color: any, g?: number, b?: number);

// node_modules/@types/three/examples/jsm/loaders/NodeMaterialLoader.d.ts - create
 + 1    export class NodeMaterialLoader {}

// node_modules/@types/three/examples/jsm/libs/dat.gui.module.d.ts
 + 1    export class GUI {}

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

// tsconfig.json
{
  ....
  "compilerOptions": {
    ....
    "paths": {
      "fs": ["./node_modules/fs-web"]
    },
    .....
  }
  ....
}
```

### Document ###
```sh
npm install -g @angular/cli
npm install ammojs-typed
npm install three
npm install --save three three.ar.js
npm install @types/three
npm install @types/dat.gui –save-dev
npm install @types/physijs –save-dev
npm install @types/stats-js –save-dev
npm run maxmem
npm run maxbuild
npm run maxbuildprod

npm install typedoc --save-dev
npx typedoc --out docs --exclude "**/*+(index|.spec|.e2e).ts"
npx typedoc --exclude "**/*+(index|.spec|.e2e).ts"
npx typedoc --json docs_api.json --exclude "**/*+(index|.spec|.e2e).ts"

rm -rf src/app/**/*spec.ts
rm -rf src/app/**/*.js

git remote set-url origin https://github.com/outmindkjg/ngx3js.git
git remote -v

ng g directive three/drawing-canvas
ng g c three/viewer
ng g c three/size

// ng g c three/chart/bar
// ng g c three/chart/line
// ng g c three/chart/scatter
// ng g c three/chart/bubble
// ng g c three/chart/pie
// ng g c three/chart/doughnut
// ng g c three/chart/polarArea
// ng g c three/chart/radar
// ng g c three/chart/controller

// ng g c three/chart/axes
// ng g c three/chart/legend
// ng g c three/chart/title


ng g c examples/webgl-portal
ng g c examples/webxr-ar-lighting
ng g c examples/webxr_vr_handinput_pointerclick
ng g c examples/webxr_vr_handinput_pointerdrag
ng g c examples/webxr_vr_handinput_pressbutton
ng g c examples/webxr_vr_layers
ng g c examples/misc_exporter_usdz

```


### Cloning this repository ###

Cloning the repo with all its history results in a ~2 GB download. If you don't need the whole history you can use the `depth` parameter to significantly reduce download size.

```sh
git clone --depth=1 https://github.com/outmindkjg/ngx3js.git
```

### Change log ###

[Releases](https://github.com/outmindkjg/ngx3js/releases)


[npm]: https://img.shields.io/npm/v/ngx3js
[npm-url]: https://www.npmjs.com/package/ngx3js
[build-size]: https://badgen.net/bundlephobia/minzip/ngx3js
[build-size-url]: https://bundlephobia.com/result?p=ngx3js
[npm-downloads]: https://img.shields.io/npm/dw/ngx3js
[npmtrends-url]: https://www.npmtrends.com/ngx3js
