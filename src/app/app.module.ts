import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppRoutingModule } from './app-routing.module';

import { DataService } from './data.service';
import { FetchDataService } from './fetch-data.service';
import { PaginationService } from './pagination.service';

import { AppComponent } from './app.component';
import { SearchComponent } from './search/search.component';
import { ListComponent } from './list/list.component';
import { FooterComponent } from './footer/footer.component';
import { NotFoundComponent } from './not-found-component/not-found-component.component';
import { PlanetDetailsComponent } from './planet-details/planet-details.component'

@NgModule({
  declarations: [
    AppComponent,
    SearchComponent,
    ListComponent,
    FooterComponent,
    PlanetDetailsComponent,
    NotFoundComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [
    DataService,
    FetchDataService,
    PaginationService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
