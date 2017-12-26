import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { findIndex } from 'rxjs/operator/findIndex';
import _ from 'lodash';

@Injectable()
export class SwService {
  private basepath:string = "";
  private planets = [];

  constructor(private http:HttpClient) { 
    this.basepath = "https://swapi.co/api";
  }

  getResource(name, params = {}) {
    let resources = {
      planets: '/planets/',
      planet: '/planets/{id}',
      people: '/people',
      person: '/people/{id}'
    }

    return this.basepath + resources[name];
  }

  getPlanetByName(name) {
    let endpoint = this.getResource('planets');
    let params = {
      search: name
    };

    return this.http.get(endpoint, { params: params });
  }

  getAllPlanets() {
    let endpoint = this.getResource('planets');

    let planetsOvservable = new Observable((observer) => {
      if(this.planets.length > 0) {
        observer.next(this.planets);
        observer.complete();
      } else {
        this.getCallRecursive(endpoint, observer);
      }
    });
    return planetsOvservable;
  }

  getCallRecursive(url, observer) {    
    this.http.get(url).subscribe(
      data => {
        observer.next(data['results']);
        
        _.each(data['results'], p => { this.planets.push(p) });

        if(data['next']) {
          this.getCallRecursive(data['next'], observer);
        } else {
          observer.complete();
        }
      }
    );
  }
}
