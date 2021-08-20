import { Component, OnInit } from '@angular/core';

import { PedidosService } from 'src/app/servicios/pedidos.service';
import { ToastService } from "src/app/servicios/toast.service";

import State from 'src/app/models/statePedido';


@Component({
  selector: 'app-cocina',
  templateUrl: './cocina.component.html',
  styleUrls: ['./cocina.component.scss']
})
export class CocinaComponent implements OnInit {
  public pedidos = [];
  constructor(public servicio: PedidosService, private toast: ToastService) { }

  ngOnInit(): void {
    this.getPedidos()
  }
//-------------------------DATOS DE API---------------//
  
  //Cargar los pedidos nuevos
  getPedidos(){
    this.toast.display("Cargando pedidos . . .","info");
    this.servicio.getPedidosByState(State.COCINA).subscribe(data=>{
      this.pedidos = data;
    })
  }
  //-----------------------------------------------------
  //Actualizar el panel de los pedidos
  refresh(){
    console.log("actualizando")
    this.getPedidos()
  }
  //Demorar el pedido 10"
  demorarPedido(id){
    this.servicio.demorarPedido(id).subscribe(
      (res)=>{
        this.toast.display( res,"error", "OK");
        this.getPedidos()
      },
      (err)=> { 
        console.log("Error : ",err); 
        this.toast.display("Error al demorar 10' el pedido","error");
      }
    );
  }
  //Aceptar el pedido
  acceptPedido(id){
    this.servicio.acceptPedido(id,{"status":State.COCINA}).subscribe(
      (res)=>{
        this.toast.display("Pedido listo para entregar","success", 'OK');
        this.getPedidos()
      },
      (err)=> { 
        console.log("Error : ", err); 
        this.toast.display("Error al terminar el pedido","error");
      }
    );
  }
}
