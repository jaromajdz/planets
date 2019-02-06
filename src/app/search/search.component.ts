import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  constructor(private planets: DataService) { }

  onChangeFilter(event){
    this.planets.onSearch(event.target.value);
  }

  ngOnInit() {
  }

}
