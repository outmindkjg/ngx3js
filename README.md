three.js
========

[![NPM Package][npm]][npm-url]
[![Build Size][build-size]][build-size-url]
[![NPM Downloads][npm-downloads]][npmtrends-url]
[![Language Grade][lgtm]][lgtm-url]

#### JavaScript 3D library ####

The aim of the project is to create an easy to use, lightweight, cross-browser, general purpose 3D library. The current builds only include a WebGL renderer but WebGPU (experimental), SVG and CSS3D renderers are also available in the examples.

[Examples](https://outmindkjg.github.io/ngx3js-doc/#/examples/) &mdash;
[Documentation](https://outmindkjg.github.io/ngx3js-doc/#/docs)

### FIX dependencies ###
I found some errors on three.js. Before use this source. You muse fix them by you self.
current theejs verion "^0.130.0"
```javascript
# node_modules/ammojs-typed/ammo/ammo.d.ts
+ 7		function castObject(obj1 : any, obj2 : any) : btCollisionObject;

# node_modules/three/examples/jsm/loaders/TiltLoader.js
-+ 408	const loader = new TextureLoader().setPath( '/assets/examples/textures/tiltbrush/' );

# node_modules/@types/three/examples/jsm/geometries/TeapotGeometry.d.ts
-+ 408	const loader = new TextureLoader().setPath( '/assets/examples/textures/tiltbrush/' );
-+ 4 	constructor( size?: number, segments?: number, bottom?: boolean, lid?: boolean, body?: boolean, fitLid?: boolean, blinn?: boolean );

# node_modules\three\examples\jsm\exporters\OBJExporter.js
-+ 138 	} else if (vertices !== undefined){


```

### Usage ###

This code creates a scene, a camera, and a geometric cube, and it adds the cube to the scene. It then creates a `WebGL` renderer for the scene and camera, and it adds that viewport to the `document.body` element. Finally, it animates the cube within the scene for the camera.

```javascript
# src/app/app.module.ts

import { Ngx3JsModule } from './three/ngx3js.module';

@NgModule({
	....
	imports: [..., Ngx3JsModule],
	....
})


# angular.json
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
[lgtm]: https://img.shields.io/lgtm/alerts/github/outmindkjg/ngx3js
[lgtm-url]: https://lgtm.com/projects/g/outmindkjg/ngx3js/
