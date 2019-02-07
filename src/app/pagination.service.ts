import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { Location } from '@angular/common';
import {Router} from '@angular/router';

@Injectable()
export class PaginationService {

private _itemsPerPage: number = 10;
private _currentPage: number = 1;
private _numberOfPages: number = 1;
private _memPage: number = 0;

  constructor(private location: Location, private router: Router){}

  private paginationSubject = new BehaviorSubject<any>(
      {
          startIndex: 0,
          endIndex: this._itemsPerPage,
          bStartIndex: 0,
          bEndIndex: 7,
          currentPage: 1,
          itemsPerPage: this._itemsPerPage
          }
    );

  getPagination(): Observable<any> {
        return this.paginationSubject.asObservable();
    }

   changePagination(pageNumber: number, totalItems: number){
        //console.log('Wywolanie change Pagin last val', this.paginationSubject.getValue())
        this.paginationSubject.next(this.onChangePageHandler(pageNumber,totalItems))
    }

  getNumberOfPages(): number{
      return this._numberOfPages;
  }

  onChangePageHandler(pageNumber: number, totalItems: number){
    //console.log('Data service paginacja', pageNumber, totalItems)
    this._numberOfPages = Math.ceil( totalItems/this._itemsPerPage)

    if(pageNumber <= this._numberOfPages && pageNumber>=1){
        let startIndex = this._itemsPerPage * (pageNumber-1);
        let endIndex = this._itemsPerPage * (pageNumber);
        this._currentPage = pageNumber;
      //number of Pages
      this.range(1, this._numberOfPages)
       //pagination bar
      let ppages = Math.ceil(pageNumber/7 )
      let ppagesTotal = Math.ceil(this._numberOfPages/7 )

      let bStartIndex = 7 * (ppages - 1);
      let bEndIndex =  7 * (ppages);


      if(bEndIndex === pageNumber){
        bEndIndex = bEndIndex + 1
      }

      if((bStartIndex+1) === pageNumber && bStartIndex>1){
        bStartIndex = bStartIndex- 1
      }
    return {
            startIndex: startIndex,
            endIndex: endIndex,
            bStartIndex: bStartIndex,
            bEndIndex: bEndIndex,
            currentPage: this._currentPage,
            itemsPerPage: this._itemsPerPage
          }
     }
     return this.paginationSubject.getValue();
  }


  onChangeItemsPerPage(newItemsPerPage: number, totalItems: number){

     const currentPage: number = Math.ceil(((this._currentPage -1)  * this._itemsPerPage) /newItemsPerPage)

     if(this._currentPage===1){
       this._currentPage = 1
     }else {
       this._currentPage = currentPage
     }
     console.log('Inside onchange items per page')
     this._itemsPerPage = newItemsPerPage
     this.changePagination(this._currentPage, totalItems)
     //is not the best place but change for current page
     this.router.navigateByUrl('/planets/' + this._currentPage)
  }

  range(lowN: number, highN: number){
    let range_outcome=[];
    for(let i=lowN; i<=highN; i++){
      range_outcome.push(i);
      }
    return [...range_outcome]
  }

  returnRange(){
    return this.range(1, this._numberOfPages)
  }

  setMem(numberOfItems: number){
    if(this._memPage===0){
      this._memPage = this._currentPage;
    }
    this.changePagination(1, numberOfItems);
    this._currentPage = 1;
  }

  getMem(numberOfItems: number){
    this._currentPage = this._memPage;
    this._memPage = 0;
    this.changePagination(this._currentPage, numberOfItems);
  }

  getItemPerPage(){
    return this._itemsPerPage
  }

}
