import { Component, OnInit } from '@angular/core';
import { PedidosService } from 'src/app/servicios/pedidos.service';
import State from 'src/app/models/statePedido';
@Component({
  selector: 'app-cocina',
  templateUrl: './cocina.component.html',
  styleUrls: ['./cocina.component.scss']
})
export class CocinaComponent implements OnInit {
  public pedidos=[]
  constructor(public servicio: PedidosService) { }

  ngOnInit(): void {
    this.getPedidos()
  }
//-------------------------DATOS DE API---------------//
  
  //Cargar los pedidos nuevos
  getPedidos(){
    this.servicio.getPedidosByState(State.COCINA).subscribe(data=>{
      this.pedidos = data
    })
  }
  //-----------------------------------------------------
  //Actualizar el panel de los pedidos
  refresh(){
    console.log("actualizando")
    this.getPedidos()
  }

  //Aceptar el pedido
  acceptPedido(id){
    this.servicio.acceptPedido(id,{"status":State.COCINA}).subscribe(
      (res)=>{
        console.log("respuesta",res)
        this.getPedidos()
      },
      (err)=> console.log("Error",err)
    )
  }
}
