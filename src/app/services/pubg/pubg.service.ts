import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PubgService {

  readonly api = 'https://api.pubg.com';

  constructor(private http: HttpClient) { }

  getTest() {
    let headers = new HttpHeaders().set('Authorization', 'auth-token');
    let params  = new HttpParams().set('userId', '21');

    let url : string = `${this.api}/shards/steam/`;

    return this.http.get(url, { headers, params } ); 
  }

}
