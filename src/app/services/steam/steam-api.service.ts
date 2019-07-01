import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders, HttpResponse } from '@angular/common/http';
import { SteamApp } from './models/steamApp.model'
import { Observable } from 'rxjs';
import { SteamAppList } from './models/steam-app-list.model';

@Injectable({
  providedIn: 'root'
})
export class SteamApiService {

  readonly api = 'http://api.steampowered.com';

  constructor(private http: HttpClient) { }

  public getSteamGameList() : Observable<HttpResponse<SteamAppList>> {
    let headers = new HttpHeaders().set('Content-Type', 'text/plain');

    //headers = headers.append('Access-Control-Allow-Origin', '*');

    let params  = new HttpParams().set('key', 'FF9EF8B9781E5ECEB5EF98640452607A');
    params      = params.append('format','json');

    let url : string = `${this.api}/ISteamApps/GetAppList/v0002/`;

    return this.http.get<HttpResponse<SteamAppList>>("https://hashmapwebapi20190701031620.azurewebsites.net/api/games", { headers, params });
  }
}
