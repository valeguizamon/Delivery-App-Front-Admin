import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Pedido } from '../models/Pedido';
import { CommonService } from './common.service';
import { HttpClient } from "@angular/common/http";
@Injectable({
  providedIn: 'root'
})
export class PedidosService extends CommonService<Pedido>{
  miUrl:string="http://localhost:2021/api/v1/pedido/"

  constructor(private https : HttpClient){
    super(https)
  }
  getPedidosByState(state: string): Observable<any>{
    return this.https.get<any>(this.miUrl+"byState/"+state)
  }

  acceptPedido(pedidoId: string,status): Observable<any>{
    return this.https.put<any>(this.miUrl+"accept/"+pedidoId,status)
  }

  demorarPedido(pedidoId: string): Observable<any>{
    return this.https.get<any>(this.miUrl+"demorar/"+pedidoId)
  }
}
