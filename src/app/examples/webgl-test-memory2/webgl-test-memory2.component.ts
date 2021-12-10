import { Component } from '@angular/core';
import { BaseComponent, N3js, RendererTimer } from 'ngx3js';

@Component({
	selector: 'app-webgl-test-memory2',
	templateUrl: './webgl-test-memory2.component.html',
	styleUrls: ['./webgl-test-memory2.component.scss'],
})
export class WebglTestMemory2Component extends BaseComponent<{}> {
	constructor() {
		super({}, []);
	}

	fragmentShader = `
  void main() {

    if ( mod ( gl_FragCoord.x, 4.0001 ) < 1.0 || mod ( gl_FragCoord.y, 4.0001 ) < 1.0 )

      gl_FragColor = vec4( XXX, 1.0 );

    else

      gl_FragColor = vec4( 1.0 );

  }
  `;

	vertexShader = `
  void main() {

    vec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );
    gl_Position = projectionMatrix * mvPosition;

  }
  `;

	generateFragmentShader() {
		return this.fragmentShader.replace(
			'XXX',
			Math.random() + ',' + Math.random() + ',' + Math.random()
		);
	}

	ngOnInit() {
		this.meshPositions = [];
		for (let i = 0; i < 100; i++) {
			this.meshPositions.push({
				x: (0.5 - Math.random()) * 1000,
				y: (0.5 - Math.random()) * 1000,
				z: (0.5 - Math.random()) * 1000,
				fragmentShader: this.generateFragmentShader(),
			});
		}
	}

	meshPositions: { x: number; y: number; z: number; fragmentShader: string }[] =
		[];

	onRender(timer: RendererTimer) {
		super.onRender(timer);
		if (this.meshChildren != null) {
			this.meshChildren.forEach((child) => {
				const mesh = child as any;
				mesh.material.dispose();
				mesh.material = N3js.getShaderMaterial({
					vertexShader: this.vertexShader,
					fragmentShader: this.generateFragmentShader(),
				});
			});
		}
	}
}
