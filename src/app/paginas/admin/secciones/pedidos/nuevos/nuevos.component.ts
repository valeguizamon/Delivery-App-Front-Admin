import { Component, OnInit } from '@angular/core';
import { PedidosService } from 'src/app/servicios/pedidos.service';

@Component({
  selector: 'app-nuevos',
  templateUrl: './nuevos.component.html',
  styleUrls: ['./nuevos.component.scss']
})
export class NuevosComponent implements OnInit {

  public pedidos = []
  constructor(public servicio: PedidosService) { }

  ngOnInit(): void {
    this.getNewPedidos()
  }

  getNewPedidos(){
    this.servicio.getAll().subscribe((data)=>{
      this.pedidos = data
      console.log(this.pedidos)
    })
  }
}
