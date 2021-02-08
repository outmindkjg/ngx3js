import { Component, Input, OnInit } from '@angular/core';
import * as THREE from 'three';
import { AbstractThreeController, ThreeUtil } from './../interface';

@Component({
  selector: 'three-controller',
  templateUrl: './controller.component.html',
  styleUrls: ['./controller.component.scss']
})
export class ControllerComponent implements OnInit {

  @Input() controller : AbstractThreeController;
  constructor() { }

  
  ngOnInit(): void {
  }

}
