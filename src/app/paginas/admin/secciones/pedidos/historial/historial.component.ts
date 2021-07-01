import { Component, OnInit } from '@angular/core';
import { PedidosService } from 'src/app/servicios/pedidos.service';
import State from 'src/app/models/statePedido';
@Component({
  selector: 'app-historial',
  templateUrl: './historial.component.html',
  styleUrls: ['./historial.component.scss']
})
export class HistorialComponent implements OnInit {
  public pedidos = []
  constructor(private servicio: PedidosService) { }

  ngOnInit(): void {
    this.getPedidos()
  }

  getPedidos(){
    this.servicio.getPedidosByState(State.CANCELADO).subscribe(
      (data)=>{
        this.pedidos = data;
      }
    )
  }

  refresh(){
    this.getPedidos()
  }

}
