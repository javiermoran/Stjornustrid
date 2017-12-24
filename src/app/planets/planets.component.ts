import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import _ from 'lodash';

import { SwService } from '../services/sw.service';
import { SwImagesService } from "../services/sw.images.service";

@Component({
  selector: 'app-planets',
  templateUrl: './planets.component.html',
  styleUrls: ['./planets.component.css']
})
export class PlanetsComponent implements OnInit {
  private planets: any[];

  constructor(private _swService: SwService, private _swImgService: SwImagesService, private router: Router) { 
    this.planets = [];
  }

  ngOnInit() {
    this.getAllPlanets();
  }

  getAllPlanets() {
    this._swService.getAllPlanets().subscribe(
      data => { 
        _.each(data, planet => {
          this.planets.push(planet);
        }); 
      },
      error => { console.log(error); },
      () => { console.log('All planets gotten'); }
    );
  }

  goPlanetDetails(name) {
    this.router.navigate(['planets', name])
  }

  getPicture(name) {
    let picture = this._swImgService.getPlanetPicture(name);
    return !!picture ?  `url(${picture.url})` : '';
  }

}
