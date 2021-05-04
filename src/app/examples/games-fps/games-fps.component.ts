import { Component } from '@angular/core';
import { BaseComponent } from '../../three';

@Component({
  selector: 'app-games-fps',
  templateUrl: './games-fps.component.html',
  styleUrls: ['./games-fps.component.scss']
})
export class GamesFpsComponent extends BaseComponent<{}> {

  constructor() {
    super({},[]);
  }

}
