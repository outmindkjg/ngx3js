import { Component, OnInit } from '@angular/core';
import * as TWEEN from '@tweenjs/tween.js';

@Component({
  selector: 'three-tween',
  templateUrl: './tween.component.html',
  styleUrls: ['./tween.component.scss']
})
export class TweenComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  getTween(tween : TWEEN.Tween<any>) : TWEEN.Tween<any> {
    tween.to({x: 10, y: 10}, 5000)
    .easing(TWEEN.Easing.Quadratic.Out)
    .repeat(2)
    // .yoyo(true);
    return tween;
  }

}
