"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.GeometryComponent = void 0;
var core_1 = require("@angular/core");
var rxjs_1 = require("rxjs");
var THREE = require("three");
var ConvexGeometry_1 = require("three/examples/jsm/geometries/ConvexGeometry");
var ParametricGeometries_1 = require("three/examples/jsm/geometries/ParametricGeometries");
var curve_component_1 = require("../curve/curve.component");
var interface_1 = require("../interface");
var shape_component_1 = require("../shape/shape.component");
var translation_component_1 = require("../translation/translation.component");
var GeometryComponent = /** @class */ (function () {
    function GeometryComponent(localStorageService) {
        this.localStorageService = localStorageService;
        this.visible = true;
        this.refer = null;
        this.referRef = true;
        this.params = null;
        this.type = 'sphere';
        this.storageName = null;
        this.action = 'none';
        this.name = null;
        this.radius = null;
        this.radiusSegments = null;
        this.radialSegments = null;
        this.width = null;
        this.widthSegments = null;
        this.height = null;
        this.heightSegments = null;
        this.depth = null;
        this.depthSegments = null;
        this.thetaStart = null;
        this.thetaLength = null;
        this.thetaSegments = null;
        this.radiusTop = null;
        this.radiusBottom = null;
        this.detail = null;
        this.innerRadius = null;
        this.outerRadius = null;
        this.openEnded = null;
        this.phiStart = null;
        this.phiLength = null;
        this.segments = null;
        this.phiSegments = null;
        this.tube = null;
        this.tubularSegments = null;
        this.arc = null;
        this.p = null;
        this.q = null;
        this.points = null;
        this.parametric = null;
        this.slices = null;
        this.stacks = null;
        this.text = null;
        this.font = null;
        this.size = null;
        this.weight = null;
        this.vertices = null;
        this.polyVertices = null;
        this.polyIndices = null;
        this.colors = null;
        this.faces = null;
        this.thresholdAngle = null;
        this.curveSegments = null;
        this.steps = null;
        this.bevelEnabled = null;
        this.bevelThickness = null;
        this.bevelSize = null;
        this.bevelOffset = null;
        this.bevelSegments = null;
        this.closed = null;
        this.position = null;
        this.itemSize = null;
        this.onLoad = new core_1.EventEmitter();
        this._geometrySubscribe = null;
        this._geometrySubject = new rxjs_1.Subject();
        this.geometry = null;
        this.parent = null;
    }
    GeometryComponent_1 = GeometryComponent;
    GeometryComponent.prototype.getRadius = function (def) {
        return this.radius === null ? def : this.radius;
    };
    GeometryComponent.prototype.getRadiusSegments = function (def) {
        return this.radiusSegments === null ? def : this.radiusSegments;
    };
    GeometryComponent.prototype.getRadialSegments = function (def) {
        return this.radialSegments === null ? def : this.radialSegments;
    };
    GeometryComponent.prototype.getWidth = function (def) {
        return this.width === null ? def : this.width;
    };
    GeometryComponent.prototype.getWidthSegments = function (def) {
        return this.widthSegments === null ? def : this.widthSegments;
    };
    GeometryComponent.prototype.getHeight = function (def) {
        return this.height === null ? def : this.height;
    };
    GeometryComponent.prototype.getHeightSegments = function (def) {
        return this.heightSegments === null ? def : this.heightSegments;
    };
    GeometryComponent.prototype.getDepth = function (def) {
        return this.depth === null ? def : this.depth;
    };
    GeometryComponent.prototype.getDepthSegments = function (def) {
        return this.depthSegments === null ? def : this.depthSegments;
    };
    GeometryComponent.prototype.getThetaStart = function (def) {
        return ((this.thetaStart === null ? def : this.thetaStart) / 180) * Math.PI;
    };
    GeometryComponent.prototype.getThetaLength = function (def) {
        return (((this.thetaLength === null ? def : this.thetaLength) / 180) * Math.PI);
    };
    GeometryComponent.prototype.getThetaSegments = function (def) {
        return this.thetaSegments === null ? def : this.thetaSegments;
    };
    GeometryComponent.prototype.getRadiusTop = function (def) {
        return this.radiusTop === null ? def : this.radiusTop;
    };
    GeometryComponent.prototype.getRadiusBottom = function (def) {
        return this.radiusBottom === null ? def : this.radiusBottom;
    };
    GeometryComponent.prototype.getDetail = function (def) {
        return this.detail === null ? def : this.detail;
    };
    GeometryComponent.prototype.getInnerRadius = function (def) {
        return this.innerRadius === null ? def : this.innerRadius;
    };
    GeometryComponent.prototype.getOuterRadius = function (def) {
        return this.outerRadius === null ? def : this.outerRadius;
    };
    GeometryComponent.prototype.getOpenEnded = function (def) {
        return this.openEnded === null ? def : this.openEnded;
    };
    GeometryComponent.prototype.getPhiStart = function (def) {
        return ((this.phiStart === null ? def : this.phiStart) / 180) * Math.PI;
    };
    GeometryComponent.prototype.getPhiLength = function (def) {
        return ((this.phiLength === null ? def : this.phiLength) / 180) * Math.PI;
    };
    GeometryComponent.prototype.getSegments = function (def) {
        return this.segments === null ? def : this.segments;
    };
    GeometryComponent.prototype.getPhiSegments = function (def) {
        return this.phiSegments === null ? def : this.phiSegments;
    };
    GeometryComponent.prototype.getTube = function (def) {
        return this.tube === null ? def : this.tube;
    };
    GeometryComponent.prototype.getTubularSegments = function (def) {
        return this.tubularSegments === null ? def : this.tubularSegments;
    };
    GeometryComponent.prototype.getArc = function (def) {
        return ((this.arc === null ? def : this.arc) / 180) * Math.PI;
    };
    GeometryComponent.prototype.getP = function (def) {
        return this.p === null ? def : this.p;
    };
    GeometryComponent.prototype.getQ = function (def) {
        return this.q === null ? def : this.q;
    };
    GeometryComponent.prototype.getSlices = function (def) {
        return this.slices === null ? def : this.slices;
    };
    GeometryComponent.prototype.getStacks = function (def) {
        return this.stacks === null ? def : this.stacks;
    };
    GeometryComponent.prototype.getText = function (def) {
        return this.text === null ? def : this.text;
    };
    GeometryComponent.prototype.getFont = function (def, callBack) {
        var font = this.font === null ? def : this.font;
        var weight = this.weight === null ? '' : this.weight;
        var fontPath = '';
        switch ((font + '_' + weight).toLowerCase()) {
            case 'helvetiker_':
            case 'helvetiker_regular':
                fontPath = '/assets/fonts/helvetiker_regular.typeface.json';
                break;
            case 'helvetiker_bold':
                fontPath = '/assets/fonts/helvetiker_bold.typeface.json';
                break;
            case 'gentilis_':
            case 'gentilis_regular':
                fontPath = '/assets/fonts/gentilis_regular.typeface.json';
                break;
            case 'gentilis_bold':
                fontPath = '/assets/fonts/gentilis_bold.typeface.json';
                break;
            case 'optimer_':
            case 'optimer_regular':
                fontPath = '/assets/fonts/optimer_regular.typeface.json';
                break;
            case 'optimer_bold':
                fontPath = '/assets/fonts/optimer_bold.typeface.json';
                break;
            case 'sans_bold':
            case 'droid_sans_bold':
                fontPath = '/assets/fonts/droid/droid_sans_bold.typeface.json';
                break;
            case 'sans_mono_':
            case 'sans_mono_regular':
            case 'sans_mono_bold':
            case 'droid_sans_mono_':
            case 'droid_sans_mono_regular':
            case 'droid_sans_mono_bold':
                fontPath = '/assets/fonts/droid/droid_sans_mono_regular.typeface.json';
                break;
            case 'serif_':
            case 'serif_regular':
            case 'droid_serif_':
            case 'droid_serif_regular':
                fontPath = '/assets/fonts/droid/droid_serif_regular.typeface.json';
                break;
            case 'serif_bold':
            case 'droid_serif_bold':
                fontPath = '/assets/fonts/droid/droid_serif_bold.typeface.json';
                break;
            case 'nanumgothic_':
            case 'nanumgothic_regular':
            case 'nanumgothic_bold':
                fontPath = '/assets/fonts/nanum/nanumgothic_regular.typeface.json';
                break;
            case 'do_hyeon_':
            case 'do_hyeon_regular':
            case 'do_hyeon_bold':
                fontPath = '/assets/fonts/nanum/do_hyeon_regular.typeface.json';
                break;
            case 'sans_':
            case 'sans_regular':
            case 'droid_sans_':
            case 'droid_sans_regular':
            default:
                fontPath = '/assets/fonts/droid/droid_sans_regular.typeface.json';
                break;
        }
        var loader = new THREE.FontLoader();
        loader.load(fontPath, function (responseFont) {
            callBack(responseFont);
        });
    };
    GeometryComponent.prototype.getSize = function (def) {
        return this.size === null ? def : this.size;
    };
    GeometryComponent.prototype.getPointsV3 = function (def) {
        var points = [];
        (this.points === null ? def : this.points).forEach(function (p) {
            points.push(new THREE.Vector3(p.x, p.y, p.z));
        });
        return points;
    };
    GeometryComponent.prototype.getPointsV2 = function (def) {
        var points = [];
        (this.points === null ? def : this.points).forEach(function (p) {
            points.push(new THREE.Vector2(p.x, p.y));
        });
        return points;
    };
    GeometryComponent.prototype.getParametric = function (def) {
        var parametric = this.parametric === null ? def : this.parametric;
        switch (parametric) {
            case 'mobius3d':
                return ParametricGeometries_1.ParametricGeometries.mobius3d;
            case 'klein':
                return ParametricGeometries_1.ParametricGeometries.klein;
            case 'plane':
                return ParametricGeometries_1.ParametricGeometries.plane;
            case 'mobius':
                return ParametricGeometries_1.ParametricGeometries.mobius;
            default:
                if (parametric !== null && typeof parametric === 'function') {
                    return function (u, v, dest) {
                        var ov = parametric(u, v);
                        dest.set(ov.x, ov.y, ov.z);
                    };
                }
        }
        return ParametricGeometries_1.ParametricGeometries.klein;
    };
    GeometryComponent.prototype.getVertices = function (def) {
        var vertices = [];
        (this.vertices === null ? def : this.vertices).forEach(function (p) {
            vertices.push(new THREE.Vector3(p.x, p.y, p.z));
        });
        return vertices;
    };
    GeometryComponent.prototype.getPolyVertices = function (def) {
        var vertices = [];
        (this.polyVertices === null ? def : this.polyVertices).forEach(function (p) {
            vertices.push(p);
        });
        return vertices;
    };
    GeometryComponent.prototype.getPolyIndices = function (def) {
        var indices = [];
        (this.polyIndices === null ? def : this.polyIndices).forEach(function (p) {
            indices.push(p);
        });
        return indices;
    };
    GeometryComponent.prototype.getColors = function (def) {
        var colors = [];
        (this.colors === null ? def : this.colors).forEach(function (c) {
            colors.push(new THREE.Color(c));
        });
        return colors;
    };
    /*
     private getFaces(def: GeometriesVector3[]): THREE.Face3[] {
       const faces: THREE.Face3[] = [];
       (this.faces === null ? def : this.faces).forEach((p) => {
         faces.push(new THREE.Face3(p.a, p.b, p.c));
       });
       return faces;
     }
   */
    GeometryComponent.prototype.getThresholdAngle = function (def) {
        return this.thresholdAngle === null ? def : this.thresholdAngle;
    };
    GeometryComponent.prototype.getSubGeometry = function () {
        if (this.subGeometry !== null && this.subGeometry.length > 0) {
            return this.subGeometry.first.getGeometry();
        }
        else {
            return new THREE.PlaneGeometry(1, 1, 1, 1);
        }
    };
    GeometryComponent.prototype.getCurveSegments = function (def) {
        return this.curveSegments === null ? def : this.curveSegments;
    };
    GeometryComponent.prototype.getSteps = function (def) {
        return this.steps === null ? def : this.steps;
    };
    GeometryComponent.prototype.getBevelEnabled = function (def) {
        return this.bevelEnabled === null ? def : this.bevelEnabled;
    };
    GeometryComponent.prototype.getBevelThickness = function (def) {
        return this.bevelThickness === null ? def : this.bevelThickness;
    };
    GeometryComponent.prototype.getBevelSize = function (def) {
        return this.bevelSize === null ? def : this.bevelSize;
    };
    GeometryComponent.prototype.getBevelOffset = function (def) {
        return this.bevelOffset === null ? def : this.bevelOffset;
    };
    GeometryComponent.prototype.getBevelSegments = function (def) {
        return this.bevelSegments === null ? def : this.bevelSegments;
    };
    GeometryComponent.prototype.getShapes = function () {
        var shape = new THREE.Shape();
        if (this.shapes != null && this.shapes.length > 0) {
            this.shapes.forEach(function (path) {
                path.getShape(shape);
            });
        }
        return shape;
    };
    GeometryComponent.prototype.getClosed = function (def) {
        return this.closed === null ? def : this.closed;
    };
    GeometryComponent.prototype.getCurve = function () {
        if (this.curves !== null && this.curves.length > 0) {
            return this.curves.first.getCurve();
        }
        return new THREE.LineCurve3(new THREE.Vector3(0, 0, 0), new THREE.Vector3(0, 0, 0));
    };
    GeometryComponent.prototype.getPosition = function (def) {
        var position = interface_1.ThreeUtil.getTypeSafe(this.position, def);
        var itemSize = interface_1.ThreeUtil.getTypeSafe(this.itemSize, 3);
        return new THREE.Float32BufferAttribute(position, itemSize);
    };
    GeometryComponent.prototype.ngOnInit = function () { };
    GeometryComponent.prototype.ngAfterContentInit = function () {
        var _this = this;
        this.curves.changes.subscribe(function (e) {
            _this.resetGeometry(true);
        });
    };
    GeometryComponent.prototype.ngOnChanges = function (changes) {
        var _this = this;
        if (changes) {
            this.geometry = null;
        }
        if (changes.params) {
            Object.entries(this.params).forEach(function (_a) {
                var key = _a[0], value = _a[1];
                switch (key) {
                    case 'type':
                        _this.type = value;
                        break;
                    case 'radius':
                        _this.radius = value;
                        break;
                    case 'radialSegments':
                        _this.radialSegments = value;
                        break;
                    case 'width':
                        _this.width = value;
                        break;
                    case 'widthSegments':
                        _this.widthSegments = value;
                        break;
                    case 'height':
                        _this.height = value;
                        break;
                    case 'heightSegments':
                        _this.heightSegments = value;
                        break;
                    case 'depth':
                        _this.depth = value;
                        break;
                    case 'depthSegments':
                        _this.depthSegments = value;
                        break;
                    case 'thetaStart':
                        _this.thetaStart = value;
                        break;
                    case 'thetaLength':
                        _this.thetaLength = value;
                        break;
                    case 'thetaSegments':
                        _this.thetaSegments = value;
                        break;
                    case 'radiusTop':
                        _this.radiusTop = value;
                        break;
                    case 'radiusBottom':
                        _this.radiusBottom = value;
                        break;
                    case 'detail':
                        _this.detail = value;
                        break;
                    case 'innerRadius':
                        _this.innerRadius = value;
                        break;
                    case 'openEnded':
                        _this.openEnded = value;
                        break;
                    case 'outerRadius':
                        _this.outerRadius = value;
                        break;
                    case 'phiStart':
                        _this.phiStart = value;
                        break;
                    case 'phiLength':
                        _this.phiLength = value;
                        break;
                    case 'segments':
                        _this.segments = value;
                        break;
                    case 'phiSegments':
                        _this.phiSegments = value;
                        break;
                    case 'tube':
                        _this.tube = value;
                        break;
                    case 'tubularSegments':
                        _this.tubularSegments = value;
                        break;
                    case 'arc':
                        _this.arc = value;
                        break;
                    case 'p':
                        _this.p = value;
                        break;
                    case 'q':
                        _this.q = value;
                        break;
                    case 'points':
                        _this.points = value;
                        break;
                    case 'parametric':
                        _this.parametric = value;
                        break;
                    case 'slices':
                        _this.slices = value;
                        break;
                    case 'stacks':
                        _this.stacks = value;
                        break;
                    case 'vertices':
                        _this.vertices = value;
                        break;
                    case 'faces':
                        _this.faces = value;
                        break;
                }
            });
        }
        this.resetGeometry();
    };
    GeometryComponent.prototype.geometrySubscribe = function () {
        return this._geometrySubject.asObservable();
    };
    GeometryComponent.prototype.resetGeometry = function (clearGeometry) {
        var _this = this;
        if (clearGeometry === void 0) { clearGeometry = false; }
        if (this.parent !== null && this.visible) {
            if (this.parent instanceof THREE.Mesh) {
                if (clearGeometry && this.geometry !== null) {
                    this.geometry = null;
                }
                if (this._geometrySubscribe !== null) {
                    this._geometrySubscribe.unsubscribe();
                    this._geometrySubscribe = null;
                }
                if (this.refer !== null && this.referRef && this.refer.geometrySubscribe) {
                    this._geometrySubscribe = this.refer.geometrySubscribe().subscribe(function (geometry) {
                        if (_this.parent instanceof THREE.Mesh && _this.visible) {
                            if (_this.parent.geometry !== geometry) {
                                _this.parent.geometry = geometry;
                            }
                        }
                    });
                }
                else {
                    this.parent.geometry = this.getGeometry();
                }
                this.parent.geometry = this.getGeometry();
            }
            else if (this.parent instanceof THREE.Points) {
                this.parent.geometry = this.getGeometry();
            }
            else if (this.parent instanceof THREE.Group) {
                this.parent.children.forEach(function (mesh) {
                    if (mesh instanceof THREE.Mesh) {
                        mesh.geometry = _this.getGeometry();
                    }
                });
            }
            else if (this.parent.resetMesh) {
                this.parent.resetMesh(true);
            }
        }
        else if (this.geometry === null && this.subGeometry !== null && this.subGeometry !== undefined) {
            this.geometry = this.getGeometry();
        }
    };
    GeometryComponent.prototype.setParent = function (parent, isRestore) {
        if (isRestore === void 0) { isRestore = false; }
        if (isRestore) {
            if (this.parent !== parent) {
                this.parent = parent;
                if (this.parent instanceof THREE.Mesh) {
                    this.geometry = this.parent.geometry;
                }
            }
        }
        else {
            if (this.parent !== parent) {
                this.parent = parent;
                this.resetGeometry();
            }
        }
    };
    GeometryComponent.prototype.applyChanges3D = function (changes) {
        var _this = this;
        if (this.geometry !== null && this.subGeometry !== null && this.subGeometry !== undefined) {
            changes.forEach(function (change) {
                switch (change) {
                    case 'geometry':
                        _this.subGeometry.forEach(function (subGeometry) {
                            subGeometry.setParent(_this);
                        });
                        break;
                    case 'shape':
                        _this.shapes.forEach(function (shape) {
                            shape.setParent(_this);
                        });
                        break;
                    case 'curve':
                        _this.curves.forEach(function (curve) {
                            curve.setParent(_this);
                        });
                        break;
                    case 'translation':
                        _this.translation.forEach(function (translation) {
                            translation.setParent(_this);
                        });
                        break;
                }
            });
        }
    };
    GeometryComponent.prototype.getGeometry = function () {
        var _this = this;
        if (this.geometry === null) {
            if (this.refer !== null && this.refer !== undefined) {
                if (this.refer.getGeometry) {
                    this.geometry = this.refer.getGeometry();
                }
                else if (this.refer instanceof THREE.BufferGeometry) {
                    this.geometry = this.refer;
                }
            }
            if (this.geometry === null) {
                switch (this.type.toLowerCase()) {
                    case 'storage':
                        this.geometry = new THREE.BufferGeometry();
                        this.localStorageService.getGeometry(this.storageName, function (geometry) {
                            _this.geometry = geometry;
                            _this.resetGeometry();
                        });
                        break;
                    case 'custom':
                    case 'geometry':
                        this.geometry = new THREE.BufferGeometry();
                        if (interface_1.ThreeUtil.isNotNull(this.position)) {
                            this.geometry.setAttribute("position", this.getPosition([]));
                        }
                        /*
                        todo
                        this.geometry.setAttribute("vertices", this.getVertices([]));
                        this.geometry.vertices = this.getVertices([]);
                        this.geometry.faces = this.getFaces([]);
                        this.geometry.colors = this.getColors([]);
                        if (this.geometry.faces && this.geometry.faces.length > 0) {
                          this.geometry.computeFaceNormals();
                        }
                        */
                        break;
                    case 'boxbuffer':
                        this.geometry = new THREE.BoxBufferGeometry(this.getWidth(1), this.getHeight(1), this.getDepth(1), this.getWidthSegments(1), this.getHeightSegments(1), this.getDepthSegments(1));
                        break;
                    case 'box':
                        this.geometry = new THREE.BoxGeometry(this.getWidth(1), this.getHeight(1), this.getDepth(1), this.getWidthSegments(1), this.getHeightSegments(1), this.getDepthSegments(1));
                        break;
                    case 'circlebuffer':
                        this.geometry = new THREE.CircleBufferGeometry(this.getRadius(1), this.getSegments(8), this.getThetaStart(0), this.getThetaLength(360));
                        break;
                    case 'circle':
                        this.geometry = new THREE.CircleGeometry(this.getRadius(1), this.getSegments(8), this.getThetaStart(0), this.getThetaLength(360));
                        break;
                    case 'conebuffer':
                        this.geometry = new THREE.ConeBufferGeometry(this.getRadius(1), this.getHeight(1), this.getRadialSegments(8), this.getHeightSegments(1), this.getOpenEnded(false), this.getThetaStart(0), this.getThetaLength(360));
                        break;
                    case 'cone':
                        this.geometry = new THREE.ConeGeometry(this.getRadius(1), this.getHeight(1), this.getRadialSegments(8), this.getHeightSegments(1), this.getOpenEnded(false), this.getThetaStart(0), this.getThetaLength(360));
                        break;
                    case 'cylinderbuffer':
                        this.geometry = new THREE.CylinderBufferGeometry(this.getRadiusTop(1), this.getRadiusBottom(1), this.getHeight(1), this.getRadialSegments(8), this.getHeightSegments(1), this.getOpenEnded(false), this.getThetaStart(0), this.getThetaLength(360));
                        break;
                    case 'cylinder':
                        this.geometry = new THREE.CylinderGeometry(this.getRadiusTop(1), this.getRadiusBottom(1), this.getHeight(1), this.getRadialSegments(8), this.getHeightSegments(1), this.getOpenEnded(false), this.getThetaStart(0), this.getThetaLength(360));
                        break;
                    case 'dodecahedronbuffer':
                        this.geometry = new THREE.DodecahedronBufferGeometry(this.getRadius(1), this.getDetail(0));
                        break;
                    case 'dodecahedron':
                        this.geometry = new THREE.DodecahedronGeometry(this.getRadius(1), this.getDetail(0));
                        break;
                    case 'edges':
                        this.geometry = new THREE.EdgesGeometry(this.getSubGeometry(), this.getThresholdAngle(0));
                        break;
                    case 'extrudebuffer':
                        this.geometry = new THREE.ExtrudeBufferGeometry(this.getShapes(), {
                            curveSegments: this.getCurveSegments(12),
                            steps: this.getSteps(1),
                            depth: this.getDepth(100),
                            bevelEnabled: this.getBevelEnabled(true),
                            bevelThickness: this.getBevelThickness(6),
                            bevelSize: this.getBevelSize(0),
                            bevelOffset: this.getBevelOffset(0),
                            bevelSegments: this.getBevelSegments(3),
                            extrudePath: new THREE.Curve(),
                            UVGenerator: null // THREE.UVGenerator;
                        });
                        break;
                    case 'extrude':
                        this.geometry = new THREE.ExtrudeGeometry(this.getShapes(), {
                            curveSegments: this.getCurveSegments(12),
                            steps: this.getSteps(1),
                            depth: this.getDepth(100),
                            bevelEnabled: this.getBevelEnabled(true),
                            bevelThickness: this.getBevelThickness(6),
                            bevelSize: this.getBevelSize(0),
                            bevelOffset: this.getBevelOffset(0),
                            bevelSegments: this.getBevelSegments(3),
                            extrudePath: new THREE.Curve(),
                            UVGenerator: null // THREE.UVGenerator;
                        });
                        break;
                    case 'icosahedronbuffer':
                        this.geometry = new THREE.IcosahedronBufferGeometry(this.getRadius(1), this.getDetail(0));
                        break;
                    case 'icosahedron':
                        this.geometry = new THREE.IcosahedronGeometry(this.getRadius(1), this.getDetail(0));
                        break;
                    case 'lathebuffer':
                        this.geometry = new THREE.LatheBufferGeometry(this.getPointsV2([]), this.getSegments(12), this.getPhiStart(0), this.getPhiLength(360));
                        break;
                    case 'lathe':
                        this.geometry = new THREE.LatheGeometry(this.getPointsV2([]), this.getSegments(12), this.getPhiStart(0), this.getPhiLength(360));
                        break;
                    case 'octahedronbuffer':
                        this.geometry = new THREE.OctahedronBufferGeometry(this.getRadius(1), this.getDetail(0));
                        break;
                    case 'octahedron':
                        this.geometry = new THREE.OctahedronGeometry(this.getRadius(1), this.getDetail(0));
                        break;
                    case 'parametricbuffer':
                        this.geometry = new THREE.ParametricBufferGeometry(this.getParametric('mobius3d'), this.getSlices(20), this.getStacks(10));
                        break;
                    case 'parametric':
                        this.geometry = new THREE.ParametricGeometry(this.getParametric('mobius3d'), this.getSlices(20), this.getStacks(10));
                        break;
                    case 'planebuffer':
                        this.geometry = new THREE.PlaneBufferGeometry(this.getWidth(1), this.getHeight(1), this.getWidthSegments(1), this.getHeightSegments(1));
                        break;
                    case 'plane':
                        this.geometry = new THREE.PlaneGeometry(this.getWidth(1), this.getHeight(1), this.getWidthSegments(1), this.getHeightSegments(1));
                        break;
                    case 'polyhedronbuffer':
                        this.geometry = new THREE.PolyhedronBufferGeometry(this.getPolyVertices([]), this.getPolyIndices([]), this.getRadius(1), this.getDetail(0));
                        break;
                    case 'polyhedron':
                        this.geometry = new THREE.PolyhedronGeometry(this.getPolyVertices([]), this.getPolyIndices([]), this.getRadius(1), this.getDetail(0));
                        break;
                    case 'ringbuffer':
                        this.geometry = new THREE.RingBufferGeometry(this.getInnerRadius(0.5), this.getOuterRadius(1), this.getThetaSegments(8), this.getPhiSegments(1), this.getThetaStart(0), this.getThetaLength(360));
                        break;
                    case 'ring':
                        this.geometry = new THREE.RingGeometry(this.getInnerRadius(0.5), this.getOuterRadius(1), this.getThetaSegments(8), this.getPhiSegments(1), this.getThetaStart(0), this.getThetaLength(360));
                        break;
                    case 'shapebuffer':
                        this.geometry = new THREE.ShapeBufferGeometry(this.getShapes(), this.getCurveSegments(12));
                        break;
                    case 'shape':
                        this.geometry = new THREE.ShapeGeometry(this.getShapes(), this.getCurveSegments(12));
                        break;
                    case 'spherebuffer':
                        this.geometry = new THREE.SphereBufferGeometry(this.getRadius(50), this.getWidthSegments(8), this.getHeightSegments(6), this.getPhiStart(0), this.getPhiLength(360), this.getThetaStart(0), this.getThetaLength(360));
                        break;
                    case 'sphere':
                        this.geometry = new THREE.SphereGeometry(this.getRadius(50), this.getWidthSegments(8), this.getHeightSegments(6), this.getPhiStart(0), this.getPhiLength(360), this.getThetaStart(0), this.getThetaLength(360));
                        break;
                    case 'tetrahedronbuffer':
                        this.geometry = new THREE.TetrahedronBufferGeometry(this.getRadius(1), this.getDetail(0));
                        break;
                    case 'tetrahedron':
                        this.geometry = new THREE.TetrahedronGeometry(this.getRadius(1), this.getDetail(0));
                        break;
                    case 'textbuffer':
                    case 'text':
                        this.geometry = new THREE.BufferGeometry();
                        this.getFont('helvetiker', function (font) {
                            var textParameters = {
                                font: font,
                                size: _this.getSize(1),
                                height: _this.getHeight(1),
                                curveSegments: _this.getCurveSegments(1),
                                bevelEnabled: _this.getBevelEnabled(true),
                                bevelThickness: _this.getBevelThickness(1),
                                bevelSize: _this.getBevelSize(1),
                                bevelOffset: _this.getBevelOffset(1),
                                bevelSegments: _this.getBevelSegments(1)
                            };
                            switch (_this.type.toLowerCase()) {
                                case 'textbuffer':
                                    _this.geometry = new THREE.TextBufferGeometry(_this.getText('test'), textParameters);
                                    break;
                                case 'text':
                                    _this.geometry = new THREE.TextGeometry(_this.getText('test'), textParameters);
                                    break;
                            }
                            _this.resetGeometry();
                        });
                        break;
                    case 'torusbuffer':
                        this.geometry = new THREE.TorusBufferGeometry(this.getRadius(1), this.getTube(0.4), this.getRadialSegments(8), this.getTubularSegments(6), this.getArc(360));
                        break;
                    case 'torus':
                        this.geometry = new THREE.TorusGeometry(this.getRadius(1), this.getTube(0.4), this.getRadialSegments(8), this.getTubularSegments(6), this.getArc(360));
                        break;
                    case 'torusknotbuffer':
                        this.geometry = new THREE.TorusKnotBufferGeometry(this.getRadius(1), this.getTube(0.4), this.getRadialSegments(64), this.getTubularSegments(8), this.getP(2), this.getQ(3));
                        break;
                    case 'torusknot':
                        this.geometry = new THREE.TorusKnotGeometry(this.getRadius(1), this.getTube(0.4), this.getRadialSegments(64), this.getTubularSegments(8), this.getP(2), this.getQ(3));
                        break;
                    case 'tubebuffer':
                        this.geometry = new THREE.TubeBufferGeometry(this.getCurve(), this.getTubularSegments(64), this.getRadius(1), this.getRadiusSegments(8), this.getClosed(false));
                        break;
                    case 'tube':
                        this.geometry = new THREE.TubeGeometry(this.getCurve(), this.getTubularSegments(64), this.getRadius(1), this.getRadiusSegments(8), this.getClosed(false));
                        break;
                    case 'wireframe':
                        this.geometry = new THREE.WireframeGeometry(this.getSubGeometry());
                        break;
                    case 'convexbuffer':
                    case 'convex':
                        this.geometry = new ConvexGeometry_1.ConvexGeometry(this.getPointsV3([]));
                        break;
                    default:
                        this.geometry = new THREE.PlaneGeometry(this.getWidth(1), this.getHeight(1), this.getWidthSegments(1), this.getHeightSegments(1));
                        break;
                }
                if (this.name !== null) {
                    this.geometry.name = this.name;
                }
                if (interface_1.ThreeUtil.isNull(this.geometry.userData.component)) {
                    this.geometry.userData.component = this;
                }
                this.applyChanges3D(['geometry', 'shape', 'curve', 'translation']);
            }
            this.onLoad.emit(this);
            this._geometrySubject.next(this.geometry);
        }
        return this.geometry;
    };
    var GeometryComponent_1;
    __decorate([
        core_1.Input()
    ], GeometryComponent.prototype, "visible");
    __decorate([
        core_1.Input()
    ], GeometryComponent.prototype, "refer");
    __decorate([
        core_1.Input()
    ], GeometryComponent.prototype, "referRef");
    __decorate([
        core_1.Input()
    ], GeometryComponent.prototype, "params");
    __decorate([
        core_1.Input()
    ], GeometryComponent.prototype, "type");
    __decorate([
        core_1.Input()
    ], GeometryComponent.prototype, "storageName");
    __decorate([
        core_1.Input()
    ], GeometryComponent.prototype, "action");
    __decorate([
        core_1.Input()
    ], GeometryComponent.prototype, "name");
    __decorate([
        core_1.Input()
    ], GeometryComponent.prototype, "radius");
    __decorate([
        core_1.Input()
    ], GeometryComponent.prototype, "radiusSegments");
    __decorate([
        core_1.Input()
    ], GeometryComponent.prototype, "radialSegments");
    __decorate([
        core_1.Input()
    ], GeometryComponent.prototype, "width");
    __decorate([
        core_1.Input()
    ], GeometryComponent.prototype, "widthSegments");
    __decorate([
        core_1.Input()
    ], GeometryComponent.prototype, "height");
    __decorate([
        core_1.Input()
    ], GeometryComponent.prototype, "heightSegments");
    __decorate([
        core_1.Input()
    ], GeometryComponent.prototype, "depth");
    __decorate([
        core_1.Input()
    ], GeometryComponent.prototype, "depthSegments");
    __decorate([
        core_1.Input()
    ], GeometryComponent.prototype, "thetaStart");
    __decorate([
        core_1.Input()
    ], GeometryComponent.prototype, "thetaLength");
    __decorate([
        core_1.Input()
    ], GeometryComponent.prototype, "thetaSegments");
    __decorate([
        core_1.Input()
    ], GeometryComponent.prototype, "radiusTop");
    __decorate([
        core_1.Input()
    ], GeometryComponent.prototype, "radiusBottom");
    __decorate([
        core_1.Input()
    ], GeometryComponent.prototype, "detail");
    __decorate([
        core_1.Input()
    ], GeometryComponent.prototype, "innerRadius");
    __decorate([
        core_1.Input()
    ], GeometryComponent.prototype, "outerRadius");
    __decorate([
        core_1.Input()
    ], GeometryComponent.prototype, "openEnded");
    __decorate([
        core_1.Input()
    ], GeometryComponent.prototype, "phiStart");
    __decorate([
        core_1.Input()
    ], GeometryComponent.prototype, "phiLength");
    __decorate([
        core_1.Input()
    ], GeometryComponent.prototype, "segments");
    __decorate([
        core_1.Input()
    ], GeometryComponent.prototype, "phiSegments");
    __decorate([
        core_1.Input()
    ], GeometryComponent.prototype, "tube");
    __decorate([
        core_1.Input()
    ], GeometryComponent.prototype, "tubularSegments");
    __decorate([
        core_1.Input()
    ], GeometryComponent.prototype, "arc");
    __decorate([
        core_1.Input()
    ], GeometryComponent.prototype, "p");
    __decorate([
        core_1.Input()
    ], GeometryComponent.prototype, "q");
    __decorate([
        core_1.Input()
    ], GeometryComponent.prototype, "points");
    __decorate([
        core_1.Input()
    ], GeometryComponent.prototype, "parametric");
    __decorate([
        core_1.Input()
    ], GeometryComponent.prototype, "slices");
    __decorate([
        core_1.Input()
    ], GeometryComponent.prototype, "stacks");
    __decorate([
        core_1.Input()
    ], GeometryComponent.prototype, "text");
    __decorate([
        core_1.Input()
    ], GeometryComponent.prototype, "font");
    __decorate([
        core_1.Input()
    ], GeometryComponent.prototype, "size");
    __decorate([
        core_1.Input()
    ], GeometryComponent.prototype, "weight");
    __decorate([
        core_1.Input()
    ], GeometryComponent.prototype, "vertices");
    __decorate([
        core_1.Input()
    ], GeometryComponent.prototype, "polyVertices");
    __decorate([
        core_1.Input()
    ], GeometryComponent.prototype, "polyIndices");
    __decorate([
        core_1.Input()
    ], GeometryComponent.prototype, "colors");
    __decorate([
        core_1.Input()
    ], GeometryComponent.prototype, "faces");
    __decorate([
        core_1.Input()
    ], GeometryComponent.prototype, "thresholdAngle");
    __decorate([
        core_1.Input()
    ], GeometryComponent.prototype, "curveSegments");
    __decorate([
        core_1.Input()
    ], GeometryComponent.prototype, "steps");
    __decorate([
        core_1.Input()
    ], GeometryComponent.prototype, "bevelEnabled");
    __decorate([
        core_1.Input()
    ], GeometryComponent.prototype, "bevelThickness");
    __decorate([
        core_1.Input()
    ], GeometryComponent.prototype, "bevelSize");
    __decorate([
        core_1.Input()
    ], GeometryComponent.prototype, "bevelOffset");
    __decorate([
        core_1.Input()
    ], GeometryComponent.prototype, "bevelSegments");
    __decorate([
        core_1.Input()
    ], GeometryComponent.prototype, "closed");
    __decorate([
        core_1.Input()
    ], GeometryComponent.prototype, "position");
    __decorate([
        core_1.Input()
    ], GeometryComponent.prototype, "itemSize");
    __decorate([
        core_1.Output()
    ], GeometryComponent.prototype, "onLoad");
    __decorate([
        core_1.ContentChildren(GeometryComponent_1, { descendants: false })
    ], GeometryComponent.prototype, "subGeometry");
    __decorate([
        core_1.ContentChildren(shape_component_1.ShapeComponent, { descendants: false })
    ], GeometryComponent.prototype, "shapes");
    __decorate([
        core_1.ContentChildren(curve_component_1.CurveComponent, { descendants: false })
    ], GeometryComponent.prototype, "curves");
    __decorate([
        core_1.ContentChildren(translation_component_1.TranslationComponent, { descendants: false })
    ], GeometryComponent.prototype, "translation");
    GeometryComponent = GeometryComponent_1 = __decorate([
        core_1.Component({
            selector: 'three-geometry',
            templateUrl: './geometry.component.html',
            styleUrls: ['./geometry.component.scss']
        })
    ], GeometryComponent);
    return GeometryComponent;
}());
exports.GeometryComponent = GeometryComponent;
