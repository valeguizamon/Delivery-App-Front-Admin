import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NuevosComponent } from './nuevos/nuevos.component';
import { CocinaComponent } from './cocina/cocina.component';
import { HistorialComponent } from './historial/historial.component';

import { PedidosRoutingModule } from './pedidos-routing.module';
import { PedidosComponent } from './pedidos.component';
import { GeneradorComponent } from './generador/generador.component';
import { FormsModule } from '@angular/forms';
import { ModalDetalleComponent } from './modales/modal-detalle/modal-detalle.component';
import { ModalcancelComponent } from './modales/modalcancel/modalcancel.component';



@NgModule({
  declarations: [PedidosComponent, NuevosComponent,CocinaComponent,HistorialComponent, GeneradorComponent, ModalDetalleComponent, ModalcancelComponent],
  imports: [
    
    CommonModule,
    PedidosRoutingModule,
    FormsModule
  ]
})
export class PedidosModule { }
