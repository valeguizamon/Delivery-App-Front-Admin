import { Component, OnInit } from '@angular/core';

import { PedidosService } from 'src/app/servicios/pedidos.service';
import { ToastService } from 'src/app/servicios/toast.service';

import State from 'src/app/models/statePedido';


@Component({
  selector: 'app-historial',
  templateUrl: './historial.component.html',
  styleUrls: ['./historial.component.scss']
})
export class HistorialComponent implements OnInit {
  public pedidos = []
  constructor(private servicio: PedidosService, private toast: ToastService) { }

  ngOnInit(): void {
    this.getPedidos();
  }

  getPedidos(){
    this.servicio.getPedidosByState("ALL").subscribe(
      (data)=> {
        this.pedidos = data;
        this.toast.display("Error al canelar el pedido","error");
      }
    )
  }

  refresh(){
    this.getPedidos()
  }
}
