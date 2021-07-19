import { Component, OnInit } from '@angular/core';
import { PedidosService } from 'src/app/servicios/pedidos.service';
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
  constructor(public servicio: PedidosService) { }

  ngOnInit(): void {
    this.getDonePedidos()
  }

  //-------------------------DATOS DE API---------------//
  getDonePedidos(){
    this.servicio.getPedidosByState(State.LISTO).subscribe(data =>{
      this.pedidos = data
      console.log(data)
    })
  }

  refresh(){
    console.log("actualizando")
    this.getDonePedidos()
  }

  preUpdateCancel(id){
    this.idCancel = id
  }

  markAsDelivered(id){
    this.servicio.acceptPedido(id,{"status":State.LISTO}).subscribe(
      (res)=>{
        console.log("respuesta",res)
        this.getDonePedidos()
      },
      (err)=>{
        console.log("error",err)
      }
    )
  }

  cancelPedido(id){
    this.servicio.cancelPedido(id,{"motivo":this.motivoCancel}).subscribe(
      (res) => {
        console.log("respuesta",res)
        this.getDonePedidos()
      },
      (err) => console.log("Error",err)
    )
  }



}
