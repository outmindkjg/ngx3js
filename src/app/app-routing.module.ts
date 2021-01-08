import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Chapter01Component } from './chapter01/chapter01.component';
import { Chapter02Component } from './chapter02/chapter02.component';
import { Chapter03Component } from './chapter03/chapter03.component';
import { Chapter04Component } from './chapter04/chapter04.component';
import { Chapter05Component } from './chapter05/chapter05.component';
import { Chapter06Component } from './chapter06/chapter06.component';
import { Chapter07Component } from './chapter07/chapter07.component';
import { Chapter08Component } from './chapter08/chapter08.component';
import { Chapter09Component } from './chapter09/chapter09.component';
import { Chapter10Component } from './chapter10/chapter10.component';
import { Chapter11Component } from './chapter11/chapter11.component';
import { Chapter12Component } from './chapter12/chapter12.component';
import { Page0101Component } from './chapter01/page0101/page0101.component';
import { Page0102Component } from './chapter01/page0102/page0102.component';
import { Page0103Component } from './chapter01/page0103/page0103.component';
import { Page0104Component } from './chapter01/page0104/page0104.component';
import { Page0105Component } from './chapter01/page0105/page0105.component';
import { Page0106Component } from './chapter01/page0106/page0106.component';

const routes: Routes = [
  { path: '', pathMatch : 'full', redirectTo : 'ch01' },
  { path: 'ch01', 
    component : Chapter01Component,
    children : [
      { path: '', pathMatch : 'full', redirectTo : 'pg01' },
      { path: 'pg01', component: Page0101Component },
      { path: 'pg02', component: Page0102Component },
      { path: 'pg03', component: Page0103Component },
      { path: 'pg04', component: Page0104Component },
      { path: 'pg05', component: Page0105Component },
      { path: 'pg06', component: Page0106Component }
    ]
  },
  { path: 'ch02', component: Chapter02Component },
  { path: 'ch03', component: Chapter03Component },
  { path: 'ch04', component: Chapter04Component },
  { path: 'ch05', component: Chapter05Component },
  { path: 'ch06', component: Chapter06Component },
  { path: 'ch07', component: Chapter07Component },
  { path: 'ch08', component: Chapter08Component },
  { path: 'ch09', component: Chapter09Component },
  { path: 'ch10', component: Chapter10Component },
  { path: 'ch11', component: Chapter11Component },
  { path: 'ch12', component: Chapter12Component },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
