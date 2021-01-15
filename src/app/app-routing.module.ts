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
import { Page0201Component } from './chapter02/page0201/page0201.component';
import { Page0202Component } from './chapter02/page0202/page0202.component';
import { Page0203Component } from './chapter02/page0203/page0203.component';
import { Page0204Component } from './chapter02/page0204/page0204.component';
import { Page0205Component } from './chapter02/page0205/page0205.component';
import { Page0206Component } from './chapter02/page0206/page0206.component';
import { Page0207Component } from './chapter02/page0207/page0207.component';
import { Page0208Component } from './chapter02/page0208/page0208.component';

import { Page0301Component } from './chapter03/page0301/page0301.component';
import { Page0302Component } from './chapter03/page0302/page0302.component';
import { Page0303Component } from './chapter03/page0303/page0303.component';
import { Page0304Component } from './chapter03/page0304/page0304.component';
import { Page0305Component } from './chapter03/page0305/page0305.component';
import { Page0306Component } from './chapter03/page0306/page0306.component';
import { Page0307Component } from './chapter03/page0307/page0307.component';

import { Page0401Component } from './chapter04/page0401/page0401.component';
import { Page0402Component } from './chapter04/page0402/page0402.component';
import { Page0403Component } from './chapter04/page0403/page0403.component';
import { Page0404Component } from './chapter04/page0404/page0404.component';
import { Page0405Component } from './chapter04/page0405/page0405.component';
import { Page0406Component } from './chapter04/page0406/page0406.component';
import { Page0407Component } from './chapter04/page0407/page0407.component';
import { Page0408Component } from './chapter04/page0408/page0408.component';
import { Page0409Component } from './chapter04/page0409/page0409.component';
import { Page0410Component } from './chapter04/page0410/page0410.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'ch01' },
  {
    path: 'ch01',
    component: Chapter01Component,
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'pg01' },
      { path: 'pg01', component: Page0101Component },
      { path: 'pg02', component: Page0102Component },
      { path: 'pg03', component: Page0103Component },
      { path: 'pg04', component: Page0104Component },
      { path: 'pg05', component: Page0105Component },
      { path: 'pg06', component: Page0106Component }
    ]
  },
  {
    path: 'ch02',
    component: Chapter02Component,
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'pg01' },
      { path: 'pg01', component: Page0201Component },
      { path: 'pg02', component: Page0202Component },
      { path: 'pg03', component: Page0203Component },
      { path: 'pg04', component: Page0204Component },
      { path: 'pg05', component: Page0205Component },
      { path: 'pg06', component: Page0206Component },
      { path: 'pg07', component: Page0207Component },
      { path: 'pg08', component: Page0208Component }
    ]
  },
  {
    path: 'ch03',
    component: Chapter03Component,
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'pg01' },
      { path: 'pg01', component: Page0301Component },
      { path: 'pg02', component: Page0302Component },
      { path: 'pg03', component: Page0303Component },
      { path: 'pg04', component: Page0304Component },
      { path: 'pg05', component: Page0305Component },
      { path: 'pg06', component: Page0306Component },
      { path: 'pg07', component: Page0307Component }
    ]
  },
  { 
    path: 'ch04',
    component: Chapter04Component,
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'pg01' },
      { path: 'pg01', component: Page0401Component },
      { path: 'pg02', component: Page0402Component },
      { path: 'pg03', component: Page0403Component },
      { path: 'pg04', component: Page0404Component },
      { path: 'pg05', component: Page0405Component },
      { path: 'pg06', component: Page0406Component },
      { path: 'pg07', component: Page0407Component },
      { path: 'pg08', component: Page0408Component },
      { path: 'pg09', component: Page0409Component },
      { path: 'pg10', component: Page0410Component }
    ]
  },
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
