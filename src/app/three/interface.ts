import * as THREE from 'three';

export interface ApplyMatrix4 {
    applyMatrix4(matrix: THREE.Matrix4): any;
}

export abstract class AbstractGetGeometry {
    abstract getGeometry(): THREE.Geometry | THREE.BufferGeometry;
    abstract resetGeometry(clearGeometry : boolean) ;
}

export abstract class AbstractSvgGeometry {
    meshPositions : THREE.Vector3[] = [];
    meshRotations : THREE.Euler[] = [];
    meshScales : THREE.Vector3[] = [];
    meshTranslations : (THREE.Geometry | THREE.BufferGeometry)[] = [];
    meshMaterials : (THREE.Material | THREE.Material[])[] = [];
}

export abstract class AbstractMeshComponent {
    abstract resetMesh(clearMesh : boolean) : void;
}

