import { Component, Input, OnInit, OnChanges } from '@angular/core';
import { DataService } from '../data.service';
import { PaginationService } from '../pagination.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

currentPage: number;
startIndex: number;
endIndex: number;
currentPlanets = [];
loading: boolean = false;

  constructor(private dataserv: DataService,
              private pagination: PaginationService) { }

  ngOnInit() {
      this.dataserv.getPlanets()
        .subscribe(
          (data)=>{
                  this.currentPlanets =[...data.planets];
                  this.loading = data.loading;
          //call pagination for changes during loading and later
          if(this.currentPlanets.length){
            this.pagination.changePagination(this.currentPage, this.currentPlanets.length)
          }

            }
      );

      this.pagination.getPagination()
      .subscribe (
        data=>{
          this.currentPage =  data.currentPage;
          this.startIndex = data.startIndex;
          this.endIndex = data.endIndex;
          }

      );

  }

  goThere(url){
              let id = url.match(/[0-9]+/)
              return '/planet/' + id
    }

}
