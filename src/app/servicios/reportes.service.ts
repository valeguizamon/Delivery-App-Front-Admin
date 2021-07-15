import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReportesService {

  public url: string ="http://localhost:2021/api/v1/reporte"

  constructor(private httpClient: HttpClient) { }

  public getComidaRanking(fecha:any):Observable<any[]>{
    return this.httpClient.post<any[]>(this.url+"/comida/ranking",fecha)
  }

  public getIngresosPorPeriodo(fecha:any,mensual:string,skip:number,limit:number): Observable<any[]>{
    let params = new HttpParams();
    params = params.append('mensual',mensual);
    params = params.append('skip', skip.toString());
    params = params.append('limit', limit.toString());
    return this.httpClient.post<any[]>(this.url+"/ingreso",fecha,{params:params});
  }

  public getGananciasPorPeriodo(fecha:any): Observable<any[]>{
    return this.httpClient.post<any[]>(this.url+"/ganancia",fecha);
  }

  public getPedidosByUser(fecha:any,skip:number,limit:number): Observable<any[]>{
    let params = new HttpParams();
    params = params.append('skip',skip.toString());
    params = params.append('limit',limit.toString());
    return this.httpClient.post<any[]>(this.url+"/pedido",fecha,{params: params});
  }
}
