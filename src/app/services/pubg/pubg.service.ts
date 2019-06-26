import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PubgService {

  readonly api = 'https://api.pubg.com';

  constructor(private http: HttpClient) { }

  getTest() {
    var url : string = `${this.api}/shards/steam/players?filter`;
    return this.http.get(url);
  }

}
