import { Component, OnInit } from '@angular/core';
import { PedidosService } from 'src/app/servicios/pedidos.service';

@Component({
  selector: 'app-cocina',
  templateUrl: './cocina.component.html',
  styleUrls: ['./cocina.component.scss']
})
export class CocinaComponent implements OnInit {
  public pedidos=[]
  constructor(public servicio: PedidosService) { }

  ngOnInit(): void {
    this.getNewPedidos()
  }
//-------------------------DATOS DE API---------------//
  
  //Cargar los pedidos nuevos
  getNewPedidos(){
    this.servicio.getAll().subscribe((data)=>{
      this.pedidos = data.filter((pedido)=>pedido.estado == "en cocina")
      console.log(this.pedidos)
      this.prepareTime()
    })
  }
  //-----------------------------------------------------
  //Horario de entrada del pedido
  prepareTime(){
    this.pedidos.forEach((pedido) => {
      let date: Date = new Date(pedido.fecha)
      pedido['horaE'] = date.getHours()+':'+date.getMinutes()
    })
  }
  //Actualizar el panel de los pedidos
  refresh(){
    console.log("actualizando")
    this.getNewPedidos()
  }

  //Aceptar el pedido
  acceptPedido(pedido){
    this.servicio.put(pedido._id,{estado:"en cocina"}).subscribe((data)=>{
      console.log("pedido aceptado")
      this.refresh()
    })
  }
}
