import { Component } from '@angular/core';
import { BaseComponent, MeshComponent, RendererTimer } from '../../three';
import {
  NodeFrame,
  FloatNode,
  ColorNode,
  ConstNode,
  ExpressionNode,
  MathNode,
  OperatorNode,
  TimerNode,
  PhongNodeMaterial
} from 'three/examples/jsm/nodes/Nodes';
import { Mesh } from 'three';

@Component({
  selector: 'app-webgl-materials-compile',
  templateUrl: './webgl-materials-compile.component.html',
  styleUrls: ['./webgl-materials-compile.component.scss']
})
export class WebglMaterialsCompileComponent extends BaseComponent<{}> {

  constructor() {
    super({},[]);
  }

  ngOnInit() {
    const itemsonrow = 10;
    for ( let i = 0; i < itemsonrow * itemsonrow; i ++ ) {
      this.teapotInfos.push({
        x : 50 * ( i % itemsonrow ) - 50 * itemsonrow / 2,
        y : 0,
        z : 50 * Math.floor( i / itemsonrow ) - 150
      })
    }
  } 
  teapotInfos : { x : number, y : number, z : number} [] = [];

  setMesh(mesh : MeshComponent) {
    super.setMesh(mesh);
    setTimeout(() => {
      this.setMeshChild();
    }, 1000);
  }

  setMeshChild() {
    if (this.meshChildren !== null) {
      this.meshChildren.forEach((mesh : Mesh) => {
				if ( mesh.material ) {
          (mesh.material as any).dispose();
        }
				const mtl = new PhongNodeMaterial();
				const time = new TimerNode();
				const speed = new FloatNode( Math.random() );
				const color = new ColorNode( Math.random() * 0xFFFFFF );
				const timeSpeed = new OperatorNode(
					time,
					speed,
					OperatorNode.MUL
				);
				const sinCycleInSecs = new OperatorNode(
					timeSpeed,
					new ConstNode( ConstNode.PI2 ),
					OperatorNode.MUL
				);
				const cycle = new MathNode( sinCycleInSecs, MathNode.SIN );
				const cycleColor = new OperatorNode(
					cycle,
					color,
					OperatorNode.MUL
				);
				const cos = new MathNode( cycleColor, MathNode.SIN );
				mtl.color = new ColorNode( 0 );
				mtl.emissive = cos;
				const transformer = new ExpressionNode( "position + 0.0 * " + Math.random(), "vec3", [ ] );
				(mtl as any).transform = transformer;
				// build shader ( ignore auto build )
				mtl.build();
				// set material
				mesh.material = mtl;
      });
      this.frame = new NodeFrame(0);
    }
  }
	frame : NodeFrame = null;
  onRender(timer : RendererTimer) {
    super.onRender(timer);
    if (this.frame != null && this.meshChildren !== null) {
      this.frame.update(timer.delta);
      this.meshChildren.forEach((mesh : any) => {
        if (mesh.material) {
          this.frame.updateNode( mesh.material );
        }
      });
    }
  }
}
