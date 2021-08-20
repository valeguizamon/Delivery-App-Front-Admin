import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { Config } from '../models/config';


@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  private API_URL: string = 'http://localhost:2021/api/v1/config';


  constructor(private http: HttpClient) { }


  public getConfigData(): Observable<Config> {
    return this.http.get<Config>(`${this.API_URL}`)
  }

  public saveConfigData(config: Config, _id: string, fid: string = ""): Observable<Config> {
    return this.http.put<Config>(`${this.API_URL}/${_id}`, config);
  }
}
