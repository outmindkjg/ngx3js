import { Component } from '@angular/core';
import { BaseComponent } from '../../three';

@Component({
  selector: 'app-webgl-video-kinect',
  templateUrl: './webgl-video-kinect.component.html',
  styleUrls: ['./webgl-video-kinect.component.scss']
})
export class WebglVideoKinectComponent extends BaseComponent<{}> {

  constructor() {
    super({},[]);
  }

}
