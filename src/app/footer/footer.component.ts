import { Component, Input, OnInit} from '@angular/core';
import { PaginationService } from '../pagination.service';
import { DataService } from '../data.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  itemsPerPage: number;
  dropDown = [ 10, 50,100];
  bStartIndex: number;
  bEndIndex: number;
  currentPage: number;
  numberOfItems: number;
  id: number;

  constructor(private planets: DataService,
    private pagination: PaginationService,
    private route: ActivatedRoute) { }

  ngOnInit() {
      this.pagination.getPagination()
      .subscribe (
        data=>{
          this.bStartIndex = data.bStartIndex;
          this.bEndIndex = data.bEndIndex;
          this.currentPage = data.currentPage;
          this.itemsPerPage = data.itemsPerPage;
        }

      );

      this.route.params.subscribe(
      params=>{
        this.id = +params['id'] ? +params['id'] : this.currentPage;
        if(this.planets.getNumberOfItems()>0){
          this.pagination.changePagination(this.id, this.planets.getNumberOfItems())
        }

      }
    )
  }

  numberOfPages(){
    return this.pagination.getNumberOfPages()
  }
  getNext(){
    if(this.currentPage<this.numberOfPages()){
      return this.currentPage + 1
    }else{
      return '/planets'+ this.currentPage
    }
  }

  getPrevious(){
    if(this.currentPage===1){
      return 1
    }else{
      return this.currentPage - 1
    }
  }

  onChangePerPage(event){
    console.log('Fotter component zmieniam ilosc na strone', event.target.value)
    this.pagination.onChangeItemsPerPage(+event.target.value, this.planets.getNumberOfItems())
  }
}
