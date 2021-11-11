ngx3js
========

[![NPM Package][npm]][npm-url]
[![NPM Downloads][npm-downloads]][npmtrends-url]

#### JavaScript 3D library ####

The aim of the project is to create an easy to use, lightweight, cross-browser, general purpose 3D library. The current builds only include a WebGL renderer but WebGPU (experimental), SVG and CSS3D renderers are also available in the examples.

[Examples](https://outmindkjg.github.io/ngx3js-doc/#/examples/) &mdash;
[Documentation](https://outmindkjg.github.io/ngx3js-doc/#/docs) &mdash;
[API Documentation](https://outmindkjg.github.io/ngx3js-doc/docs)

### Usage ###

This code creates a scene, a camera, and a geometric cube, and it adds the cube to the scene. It then creates a `WebGL` renderer for the scene and camera, and it adds that viewport to the `document.body` element. Finally, it animates the cube within the scene for the camera.

```sh
npm install -g @angular/cli
npm install ngx3js
npm install three@0.134.0
npm install --save-dev @types/three@0.134.0
npm install gsap
npm install ammojs-typed
npm install lil-gui
npm install chroma-js
npm install --save-dev @types/chroma-js
npm install fs
npm install fs-web
```

OR

```sh
npm install -g @angular/cli
npm install ngx3js
node ./node_modules/ngx3js/bin/patch.js
npm install 
```

```sh
# prettier format change
npx prettier --write src/**/*.json
npx prettier --write src/**/*.ts
npx prettier --write src/**/*.html
npx prettier --write src/**/*.scss
```

```javascript
// src/app/app.module.ts

import { Ngx3JsModule } from 'ngx3js';

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
              "ammojs-typed"
            ],
		    ......
            "assets": [
    		    ......
                {
                    "glob": "**/*",
                    "input": "./node_modules/ngx3js/assets",
                    "output": "/assets/examples/"
                }
	    	    ......
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

// src/app/app.component.html
~~~html
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
~~~

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
