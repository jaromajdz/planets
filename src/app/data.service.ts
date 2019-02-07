import { Injectable } from '@angular/core';
import { FetchDataService } from './fetch-data.service';
import { PaginationService } from './pagination.service';

import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { allPlanets } from './data'

@Injectable()
export class DataService {

 private _allPlanets: any = [];
 private _currentPlanets: any = [];
 private _loading: boolean = false;
 private _allData: boolean = false;
 private _error: any = false;

 main_url = `https://swapi.co/api/planets/?page=1`;

 constructor(private fetchData: FetchDataService,
            private pagination: PaginationService){
   this.getAllPlanets();
 }

//private numberOfItems = new BehaviorSubject<any>(0);
private planetsData = new BehaviorSubject<any>(
    {
      planets: this._allPlanets,
      loading: this._loading
    }
  );

  getPlanets(): Observable<any> {
        return this.planetsData.asObservable();
    };

  sendAllPlanets(){
    this.planetsData.next({
        planets: this._currentPlanets,
        loading: this._loading
      }
    );
  };

 getAllPlanets(url: string = this.main_url){
      this._loading =  true
  if(url && !this._allData){
    this.fetchData.getPlanets(url)
      .subscribe(
        data=>{

          this._allPlanets = [...this._allPlanets, ...data.results]
          this._currentPlanets = [...this._allPlanets]
          this.sortItems();
          this.sendAllPlanets();
          this.getAllPlanets(data.next)
        },
        error=>{
          console.log(error);
          this._loading =  false;
          this._error = error;
          this._allPlanets = [...allPlanets['results']];
          this._currentPlanets = [...allPlanets['results']];
          this.sendAllPlanets();
        }
      )

    }else {
      this._loading =  false;
      this._allData = true;
      this.sendAllPlanets();
      this.sortItems();
      //this.sendNumberOfItems();
        }
}

 sortItems(){
    this._currentPlanets.sort(
      (a: any,b: any)=>{
        if(a.name<b.name)
            return -1;
        if(a.name > b.name)
            return 1;
       return 0
      }
    )
  }

//best match search
 bestMatchSort(search: string){
   this._currentPlanets.sort(
     (a: any,b: any)=>{
       a.name.toLowerCase();
       b.name.toLowerCase();
       let an = a.name.indexOf(search);
       let bn = b.name.indexOf(search);

       if(an < bn)
           return -1;
       if(bn < an)
           return 1;
      return 0
      //return a - b
     }
   )
  }

  //search save current page number using setMem
  //after empted search input call the saved page number using getMem
 onSearch(search: string){

    let reg =  new RegExp(`^.*(${search})+`, "i")
    let filtered = this._allPlanets.filter((item)=>{
        return reg.test(item.name)
      });

      this._currentPlanets = [...filtered]

      //sort best match
      this.bestMatchSort(search);

      //sort data to component
      this.sendAllPlanets();
      //Save the number of current page for later

      if(search.length>0){
        this.pagination.setMem(this.getNumberOfItems());
      }else{
        this.sortItems();
        this.sendAllPlanets();
        //getMem recall the number pages befor searching
        this.pagination.getMem(this.getNumberOfItems());
      }
  }

  getNumberOfItems(){
    return this._currentPlanets.length
  }

  getPlanetsDetails(id: number){
    let _id: any;
    let cache: any;
    let details = [];

      for (let planet in this._allPlanets){
        _id = this._allPlanets[planet].url.match(/[0-9]+/)
        if(+id === +_id[0]){
          cache = this._allPlanets[planet];
          break;
        }
      }
      if(cache){
        for(let key in cache){
          details.push({'type': key.replace('_',' '), 'param': cache[key]})
        }

      }

      return details;
    }
}
