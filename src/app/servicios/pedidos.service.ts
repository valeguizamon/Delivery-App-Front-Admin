import { Injectable } from '@angular/core';
import { Pedido } from '../models/Pedido';
import { CommonService } from './common.service';

@Injectable({
  providedIn: 'root'
})
export class PedidosService extends CommonService<Pedido>{
  miUrl:string="http://localhost:2021/api/v1/pedido/"
}
