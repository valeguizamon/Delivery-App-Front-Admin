import { Component, OnInit } from '@angular/core';

import { PedidosService } from 'src/app/servicios/pedidos.service';
import { ToastService } from "src/app/servicios/toast.service";

import State from 'src/app/models/statePedido'


@Component({
  selector: 'app-delivery',
  templateUrl: './delivery.component.html',
  styleUrls: ['./delivery.component.scss']
})
export class DeliveryComponent implements OnInit {
  
  public idCancel= ""
  public motivoCancel = ""
  public pedidos= []
  constructor(public servicio: PedidosService, private toast: ToastService) { }

  ngOnInit(): void {
    this.getDonePedidos()
  }

  //-------------------------DATOS DE API---------------//
  getDonePedidos(){
    this.toast.display("Cargando pedidos . . .","info");
    this.servicio.getPedidosByState(State.LISTO).subscribe(data =>{
      this.pedidos = data.filter( pedido => pedido.envio === "Envio a domicilio");
    });
  }

  refresh(){
    // console.log("actualizando")
    this.getDonePedidos()
  }

  // preUpdateCancel(id){
  //   this.idCancel = id
  // }

  markAsDelivered(id){
    this.servicio.acceptPedido(id,{"status":State.LISTO}).subscribe(
      (res)=>{
        // console.log("respuesta",res)
        this.toast.display("Pedido entregado al cliente","success");
        this.getDonePedidos()
      },
      (err)=> { 
        console.log("Error : ", err); 
        this.toast.display("Error al entregar el pedido","error");
      }
    )
  }

  // cancelPedido(id){
  //   this.servicio.cancelPedido(id,{"motivo":this.motivoCancel}).subscribe(
  //     (res) => {
  //       console.log("respuesta",res)
  //       this.getDonePedidos()
  //     },
  //     (err) => console.log("Error",err)
  //   )
  // }
}