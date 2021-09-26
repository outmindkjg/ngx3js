import { AfterViewInit, Component, ElementRef, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ThreeUtil } from 'ngx3js';

export interface SearchMenu {
  id: string;
  safeId?: string;
  name: string;
  image: string;
  selected: boolean;
  tags: string;
}

export interface SearchMenuTop {
  name: string;
  children: SearchMenu[];
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, AfterViewInit {

  private subscription: Subscription;

  constructor(private router: Router, private ele: ElementRef) {
    this.subscription = this.router.events.subscribe((event: any) => {
    });
  }

  ngOnDestroy(): void {
    if (this.subscription !== null) {
      this.subscription.unsubscribe();
      this.subscription = null;
    }
  }

  ngOnInit(): void {
    ThreeUtil.setAssetUrl('assets/examples/');
  }

  ngAfterViewInit() {}

}
