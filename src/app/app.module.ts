import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HighlightModule, HIGHLIGHT_OPTIONS } from 'ngx-highlightjs';
import { Ngx3JsModule } from 'ngx3js';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ApiReadComponent } from './docs/api-read/api-read.component';
import { DocsComponent } from './docs/docs.component';
import { ExamplesComponent } from './examples/examples.component';
import { HomeComponent } from './home/home.component';
import { MenuComponent } from './menu/menu.component';
import { ExampleViewerComponent } from './viewer/viewer.component';

@NgModule({
	declarations: [
		AppComponent,
		MenuComponent,
		DocsComponent,
		ApiReadComponent,
		ExamplesComponent,
		HomeComponent,
		ExampleViewerComponent,
	],
	imports: [
		BrowserModule,
		AppRoutingModule,
		HttpClientModule,
		HighlightModule,
		Ngx3JsModule,
	],
	providers: [
		{ provide: LocationStrategy, useClass: HashLocationStrategy },
		{
			provide: HIGHLIGHT_OPTIONS,
			useValue: {
				fullLibraryLoader: () => import('highlight.js'),
			},
		},
	],
	bootstrap: [AppComponent],
})
export class AppModule {}
