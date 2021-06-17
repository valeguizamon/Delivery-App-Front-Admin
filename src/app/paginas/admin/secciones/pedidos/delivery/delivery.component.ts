import { Component, OnInit } from '@angular/core';
import { PedidosService } from 'src/app/servicios/pedidos.service';
import State from 'src/app/models/statePedido'
@Component({
  selector: 'app-delivery',
  templateUrl: './delivery.component.html',
  styleUrls: ['./delivery.component.scss']
})
export class DeliveryComponent implements OnInit {

  public pedidos= []
  constructor(public servicio: PedidosService) { }

  ngOnInit(): void {
    this.getDonePedidos()
  }

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



}
