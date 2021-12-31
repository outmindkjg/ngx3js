import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ApiReadComponent } from './docs/api-read/api-read.component';
import { DocsComponent } from './docs/docs.component';
import { ExamplesIframeComponent } from './examples/examples-iframe.component';
import { ExamplesComponent } from './examples/examples.component';
import { HomeComponent } from './home/home.component';
import { ExampleViewerComponent } from './viewer/viewer.component';

const routes: Routes = [
	{ path: '', pathMatch: 'full', redirectTo: 'home' },
	{
		path: 'docs',
		component: DocsComponent,
		children: [
			{
				path: '',
				pathMatch: 'full',
				redirectTo: 'ngxmanual/en/introduction/Creating-a-scene',
			},
			{ path: '**', component: ApiReadComponent },
		],
	},
	{
		path: 'home',
		component: HomeComponent,
	},
	{
		path: 'examples',
		component: ExamplesComponent,
		children : [
			{ path : '', pathMatch: 'full', redirectTo: 'ngx_scene' },
			{ path : '**', component : ExamplesIframeComponent },
		]		
	},
	{
		path: 'fullviewer',
		component: ExampleViewerComponent,
		loadChildren: () =>
			import('./examples/examples.module').then((m) => m.ExamplesModule),
	},
	{
		path: 'viewer',
		component: ExampleViewerComponent,
		loadChildren: () =>
			import('./examples/examples.module').then((m) => m.ExamplesModule),
	},
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule],
})
export class AppRoutingModule {}
