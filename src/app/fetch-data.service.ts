import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { map } from 'rxjs/operators';
import { timeout } from 'rxjs/operators/timeout';


@Injectable()
export class FetchDataService {

  constructor(private http: Http){}

  getPlanets(url: string){
    return this.http
          .get(url)
          .pipe(
            timeout(3000),
            map((response)=>response.json())
          );

  }

}
