import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ApiReadComponent } from './docs/api-read/api-read.component';
import { DocsComponent } from './docs/docs.component';
import { ExamplesComponent } from './examples/examples.component';
import { ExampleViewerComponent } from './viewer/viewer.component';

const routes: Routes = [
	{ path: '', pathMatch: 'full', redirectTo: 'examples' },
	{
		path: 'docs',
		component: DocsComponent,
		children: [
			{
				path: '',
				pathMatch: 'full',
				redirectTo: 'manual/en/introduction/Creating-a-scene',
			},
			{ path: '**', component: ApiReadComponent },
		],
	},
	{
		path: 'examples',
		component: ExamplesComponent,
		loadChildren: () => import('./examples/examples.module').then((m) => m.ExamplesModule ),
	},
	{
		path: 'viewer',
		component: ExampleViewerComponent,
		loadChildren: () => import('./examples/examples.module').then((m) => m.ExamplesModule ),
	},
];



@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule],
})
export class AppRoutingModule {}
