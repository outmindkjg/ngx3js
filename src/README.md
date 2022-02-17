ngx3js
========

[![NPM Package][npm]][npm-url]
[![NPM Downloads][npm-downloads]][npmtrends-url]

### Angular & Javascript 3D library ###

The aim of the project is to create an easy to use, lightweight, cross-browser, general purpose 3D library in angular. The current builds only include a WebGL renderer but WebGPU (experimental), SVG and CSS3D renderers are also available in the examples.

[![Buy Me A Coffee][buymeacoffee-image]][buymeacoffee-url]


[Home](https://outmindkjg.github.io/ngx3js-doc/#) &mdash;
[Examples](https://outmindkjg.github.io/ngx3js-doc/#/examples/) &mdash;
[Documentation](https://outmindkjg.github.io/ngx3js-doc/#/docs) &mdash;
[API Documentation](https://outmindkjg.github.io/ngx3js-doc/docs)

## Usage ##

This code creates a scene, a camera, and a geometric cube, and it adds the cube to the scene. It then creates a `WebGL` renderer for the scene and camera, and it adds that viewport to the `document.body` element. Finally, it animates the cube within the scene for the camera.


To Install you can choose one from two method. 

### Ngx3js Install - Method 1 - Recommanded ###
```sh
# install shell script
npm install -g @angular/cli
npm install --save ngx3js
node ./node_modules/ngx3js/bin/patch.js
npm install 
```

### Ngx3js Install - Method 2 ###
```sh
# install by npm
npm install -g @angular/cli
npm install --save ngx3js
npm install --save three@0.137.5
npm install --save-dev @types/three@0.137.0
```

### Imports Ngx3JsModule - Required ###

To use ngx3js have to import Ngx3JsModule in src/app/app.module.ts or some other place modle.ts
```ts
// src/app/app.module.ts

import { Ngx3JsModule } from 'ngx3js';

@NgModule({
	....
	imports: [..., Ngx3JsModule],
	....
})
```

### Change Default Assets Url - optional ###

If you chhange assets in angular.json file must be setted!

```ts
// src/app/app.component.ts

import { ThreeUtil } from 'ngx3js';

export class AppComponent {
	ngOnInit(): void {
	  // any where use ngx3js for just one time
	  ThreeUtil.setAssetUrl('assets/examples/');
	}
}
```


### Change angular.json for basic assets ###

if you need lottie_canvas add "node_modules/ngx3js/assets/js/libs/lottie_canvas.js" to scripts like below.
if you need DRACOExporter add "node_modules/ngx3js/assets/js/libs/draco/draco_encoder.js" to scripts like below.

the assets url can be changed by your site. 

// angular.json
```json
{
  "projects": {
    "your-project-name": {
      "architect": {
        "build": {
          "options": {
            "assets": [
                {
                    "glob": "**/*",
                    "input": "./node_modules/ngx3js/assets",
                    "output": "/assets/examples/"
                }
            ],
            "scripts": [
              "node_modules/ngx3js/assets/js/libs/lottie_canvas.js",
              "node_modules/ngx3js/assets/js/libs/draco/draco_encoder.js"
            ] 
          },
        },
      }
    }
  },
}
```

### Change tsconfig.json for fs - optional ###

// tsconfig.json
```json
{
  "compilerOptions": {
    "paths": {
      "fs": ["./node_modules/fs-web"]
    }
  }
}
```

### Add Code to your template ###


```html
<!-- src/app/app.component.html -->
<div style="width: 700px; height: 500px; display: block; position: relative">
  <ngx3js-renderer
    [controlType]="'orbit'"
    [controlOptions]="{
      enablePan: false,
      enableDamping: true,
      minDistance: 10,
      maxDistance: 500
    }"
    [statsMode]="0"
    [antialias]="true"
    [clearColor]="'0x000000'"
    [shadowMapEnabled]="true"
  >
    <ngx3js-lookat [x]="0" [y]="0" [z]="0"></ngx3js-lookat>
    <ngx3js-camera
      [type]="'perspective'"
      [fov]="40"
      [near]="1"
      [far]="1000"
      [viewport]="true"
      [x]="0"
      [y]="0"
      [width]="'100%'"
      [height]="'100%'"
    >
      <ngx3js-position [x]="-50" [y]="0" [z]="50"></ngx3js-position>
    </ngx3js-camera>
    <ngx3js-scene #scene>
      <ngx3js-light [type]="'AmbientLight'" [color]="'0x6688cc'"></ngx3js-light>
      <ngx3js-light
        [type]="'directional'"
        [color]="'0xffffff'"
        [intensity]="1"
        [castShadow]="true"
      >
        <ngx3js-position [x]="-3" [y]="10" [z]="-10"></ngx3js-position>
      </ngx3js-light>
      <ngx3js-mesh>
        <ngx3js-position [x]="0" [y]="0" [z]="0"></ngx3js-position>
        <ngx3js-geometry
          [type]="'Icosahedron'"
          [radius]="20"
          [detail]="2"
        ></ngx3js-geometry>
        <ngx3js-material
          [type]="'meshlambert'"
          [color]="'0xffffff'"
          [wireframe]="true"
        ></ngx3js-material>
      </ngx3js-mesh>
      <ngx3js-mesh>
        <ngx3js-position [x]="0" [y]="0" [z]="0"></ngx3js-position>
        <ngx3js-geometry
          [type]="'TextGeometry'"
          [text]="'Ngx3Js'"
          [font]="'gentilis_regular'"
          [size]="20"
          [height]="5"
          [center]="true"
        ></ngx3js-geometry>
        <ngx3js-material
          [type]="'meshlambert'"
          [color]="'0xff0000'"
        ></ngx3js-material>
      </ngx3js-mesh>
    </ngx3js-scene>
  </ngx3js-renderer>
</div>
```

## Cloning this repository ##

Cloning the repo with all its history results in a ~2 GB download. If you don't need the whole history you can use the `depth` parameter to significantly reduce download size.

### ngx3js-module ###

```sh
git clone --depth=1 https://github.com/outmindkjg/ngx3js-module.git
cd ngx3js-module
```

### ngx3js - examples and api docs ###

ngx3js module required to be reinstall.
```sh
git clone --depth=1 https://github.com/outmindkjg/ngx3js.git

cd ngx3js
npm uninstall ngx3js && npm install ngx3js
node ./node_modules/ngx3js/bin/patch.js
```


## Releases &amp; ISSUE &amp; Ask Question ##

 - [Releases - GitHub](https://github.com/outmindkjg/ngx3js-module/releases)
 - [ISSUE - GitHub](https://github.com/outmindkjg/ngx3js-module/issues)
 - [Email - outmind0@gmail.com](outmind0@gmail.com)


[npm]: https://img.shields.io/npm/v/ngx3js
[npm-url]: https://www.npmjs.com/package/ngx3js
[build-size]: https://badgen.net/bundlephobia/minzip/ngx3js
[build-size-url]: https://bundlephobia.com/result?p=ngx3js
[npm-downloads]: https://img.shields.io/npm/dw/ngx3js
[npmtrends-url]: https://www.npmtrends.com/ngx3js
[buymeacoffee-image]: https://www.buymeacoffee.com/assets/img/custom_images/orange_img.png
[buymeacoffee-url]: https://www.buymeacoffee.com/ngx3js

