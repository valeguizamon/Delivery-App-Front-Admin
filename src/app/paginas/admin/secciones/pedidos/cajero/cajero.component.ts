import { Component, OnInit } from '@angular/core';

import { PedidosService } from 'src/app/servicios/pedidos.service';
import { ToastService } from "src/app/servicios/toast.service";

import State from 'src/app/models/statePedido';


@Component({
  selector: 'app-cajero',
  templateUrl: './cajero.component.html',
  styleUrls: ['./cajero.component.scss']
})
export class CajeroComponent implements OnInit {
  public idCancel = "";
  public motivoCancel: string = "";

  public nuevosPedidos = [];
  public paraFacturarEntregar = [];


  constructor(private servicio: PedidosService, private toast: ToastService) { }

  ngOnInit(): void {
    this.getPedidos();
  }


  //Cargar los pedidos nuevos
  getPedidos(){
    this.toast.display("Cargando pedidos . . .","info");

    this.servicio.getPedidosByState(State.ESPERA).subscribe(data=>{
      this.nuevosPedidos = data;
    });
    this.servicio.getPedidosByState(State.LISTO).subscribe( data => {
      this.paraFacturarEntregar = data.filter( pedido => pedido.envio === "Retiro en local");
    });
    this.servicio.getPedidosByState(State.ENTREGADO).subscribe( data => {
      this.paraFacturarEntregar.push(...data);
    });
  }

  public refresh() {
    this.getPedidos();
  }

  acceptPedido(id){
    this.servicio.acceptPedido(id,{"status": State.ESPERA}).subscribe(
      (res) => {
        this.toast.display("Pedido enviado a cocina","success", 'OK');
        this.getPedidos();
      },
      (err) => { 
        console.log("Error : ", err); 
        this.toast.display("Error al aceptar el pedido","error");
      }
    );
  }

  facturarPedido(id) {
    this.servicio.acceptPedido(id,{"status": State.ENTREGADO}).subscribe(
      (res)=>{
        this.toast.display("Pedido Facturado","success", 'OK');
        this.getPedidos();
      },
      (err)=> { 
        console.log("Error : ",err); 
        this.toast.display("Error al facturar el pedido","error");
      }
    );
  }

  preUpdateCancel(id){
    this.idCancel = id;
  }

  cancelPedido(id){
    this.servicio.cancelPedido(id,{"motivo": this.motivoCancel}).subscribe(
      (res) => {
        // console.log("Cancelado", res);
        this.toast.display("Pedido cancelado ","error", "OK");
        this.getPedidos();
      },
      (err) => { 
        console.log("Error : ",err); 
        this.toast.display("Error al canelar el pedido","error");
      }
    )
  }
}
