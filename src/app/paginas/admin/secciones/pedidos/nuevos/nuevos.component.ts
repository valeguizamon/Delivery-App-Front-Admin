import { Component, OnInit } from '@angular/core';
import { Pedido } from 'src/app/models/Pedido';
import { PedidosService } from 'src/app/servicios/pedidos.service';
import State from 'src/app/models/statePedido';
@Component({
  selector: 'app-nuevos',
  templateUrl: './nuevos.component.html',
  styleUrls: ['./nuevos.component.scss']
})
export class NuevosComponent implements OnInit {

  public pedidos=[]
  constructor(public servicio: PedidosService) { }

  ngOnInit(): void {
    this.getNewPedidos()
  }
//-------------------------DATOS DE API---------------//
  
  //Cargar los pedidos nuevos
  getNewPedidos(){
    this.servicio.getPedidosByState(State.ESPERA).subscribe((data)=>{
      this.pedidos = data;
    })
  }
  //-----------------------------------------------------
  
  //Actualizar el panel de los pedidos
  refresh(){
    console.log("actualizando")
    this.getNewPedidos()
  }

  //Aceptar el pedido
  acceptPedido(id){
    this.servicio.acceptPedido(id,{"status":State.ESPERA}).subscribe(
      (res)=>{
        console.log("respuesta",res)
        this.getNewPedidos()
      },
      (err)=> console.log("Error",err)
    )
    
  }
}
