import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {Routes, RouterModule} from "@angular/router";
import { HttpClientModule } from '@angular/common/http';

import { SwService } from './services/sw.service';
import { SwImagesService } from './services/sw.images.service';

import { AppComponent } from './app.component';
import { PlanetsComponent } from './planets/planets.component';
import { PlanetComponent } from './planet/planet.component';

const routes: Routes = [
  { path: '', component: AppComponent },
  { path: 'planets', component: PlanetsComponent },
  { path: 'planets/:name', component: PlanetComponent }
 ];

@NgModule({
  declarations: [
    AppComponent,
    PlanetsComponent,
    PlanetComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(routes, {useHash: false})
  ],
  providers: [SwService, SwImagesService],
  bootstrap: [AppComponent]
})
export class AppModule { }
