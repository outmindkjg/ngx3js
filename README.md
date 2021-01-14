# Install 
```bash
git clone it@github.com:josdirksen/learning-threejs.git
npm install -g @angular/cli
ng new my-app
cd my-app
ng serve --open
ng g c three/scene
ng g c three/camera
ng g c three/renderer
ng g c three/geometry
ng g c three/material
ng g c three/mesh
ng g c three/light
ng g c three/position
ng g c three/rotation
ng g c three/scale
ng g c three/line
ng g c three/lookat
ng g c three/texture

ng g c menu

.+ ([a-zA-Z]+): .+;
case '$1' :\nreturn THREE.$1;

([a-zA-Z]+)\?: ([a-z\[\]]+);
@Input() $1 : $2 = null;


@Input\(\) ([a-zA-Z]+) : ([a-zA-Z\[\]]+) =.+
private get$1(def : $2) : $2 {\nconst $1  = this.$1 === null ? def : this.$1;\nreturn $1;\n}\n

^([a-zA-Z]+)\?:.+
([a-zA-Z]+)[\?]*: .+;
$1 : this.get$1(1),

```

```bash
npm install three –save
npm install stats-js –save
npm install dat.gui –save
npm install @types/three –save-dev
npm install @types/stats-js –save-dev
npm install @types/dat.gui –save-dev
npm install @types/physijs –save-dev
```

