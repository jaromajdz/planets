import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {Location} from '@angular/common';
import { DataService} from '../data.service';


@Component({
  selector: 'app-planet-details',
  templateUrl: './planet-details.component.html',
  styleUrls: ['./planet-details.component.css']
})
export class PlanetDetailsComponent implements OnInit {

  details: Array<any> = [];
  id: number;

  constructor(private planets: DataService,
              private route: ActivatedRoute,
              private location: Location
              ) { }

  ngOnInit() {

    this.route.params.subscribe(
      params=>{
        this.id = +params['id']
      }
    );

      this.details =[...this.planets.getPlanetsDetails(this.id)]
  }

  goBack(){
      this.location.back();
    }

}
