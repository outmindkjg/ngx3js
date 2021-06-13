import { Component } from '@angular/core';
import { BaseComponent, MeshComponent, RendererTimer } from '../../three';

@Component({
  selector: 'app-webaudio-timing',
  templateUrl: './webaudio-timing.component.html',
  styleUrls: ['./webaudio-timing.component.scss']
})
export class WebaudioTimingComponent extends BaseComponent<{
  position? : any;
}> {

  constructor() {
    super({
      position : null
    },[
      { name : 'position', type : 'folder', control : 'position', children : [
        { name : 'x', type : 'number', min : -2, max : 2, listen : true },
        { name : 'y', type : 'number', min : -2, max : 2, listen : true },
        { name : 'z', type : 'number', min : -2, max : 2, listen : true },
      ]}
    ]);
  }

  count = 5;
  radius = 3;

  ngOnInit() {
    this.ballInfos = [];
    for ( let i = 0; i < this.count; i ++ ) {
      const s = i / this.count * Math.PI * 2;
      this.ballInfos.push({
        x : this.radius * Math.cos( s ),
        y : 0,
        z : this.radius * Math.sin( s )
      })
    }
  }

  ballInfos : { x : number, y : number, z : number}[] = [];
  
  setMesh(mesh : MeshComponent) {
    super.setMesh(mesh);
    this.controls.position = this.meshObject3d.position;
  }

  speed = 2.5;
  height = 3;
  offset = 0.5;

  onRender(timer  : RendererTimer) {
    super.onRender(timer);
    if (this.meshChildren && this.meshChildren.length > 0) {
      const time = timer.elapsedTime;
      this.meshChildren.forEach((ball, i) => {
				const previousHeight = ball.position.y;
				ball.position.y = Math.abs( Math.sin( i * this.offset + ( time * this.speed ) ) * this.height );
				if ( ball.position.y < previousHeight ) {
					ball.userData.down = true;
				} else {
					if ( ball.userData.down === true ) {
						// ball changed direction from down to up
						// const audio = ball.children[ 0 ];
						// audio.play(); // play audio with perfect timing when ball hits the surface
						ball.userData.down = false;
					}
				}
      });
    }
  }
}
