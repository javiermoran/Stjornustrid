import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { SwService } from '../services/sw.service';
import { SwImagesService } from '../services/sw.images.service';

@Component({
  selector: 'app-planet',
  templateUrl: './planet.component.html',
  styleUrls: ['./planet.component.css']
})
export class PlanetComponent implements OnInit {
  private details: any;

  constructor(private route: ActivatedRoute, 
              private _swService: SwService,
              private _swImagesService: SwImagesService) { }

  ngOnInit() {
    this.details = { picture: { url: '' } };
    this.route.params.subscribe(
      params => { this.getPlanetData(params.name) }
    )
  }

  getPlanetData(name) {
    this._swService.getPlanetByName(name).subscribe(
      data => { 
        this.details = data['results'][0];

        let url = this._swImagesService.getPlanetPicture(name).url;
        this.details.picture = `url(${url})`;
      },
      error => { console.log(error); }
    );
  }

}
