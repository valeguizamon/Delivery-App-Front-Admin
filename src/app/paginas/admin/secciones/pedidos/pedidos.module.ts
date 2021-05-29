import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NuevosComponent } from './nuevos/nuevos.component';
import { CocinaComponent } from './cocina/cocina.component';
import { HistorialComponent } from './historial/historial.component';
import { ModalesComponent } from './modales/modales.component';
import { PedidosRoutingModule } from './pedidos-routing.module';
import { PedidosComponent } from './pedidos.component';
import { GeneradorComponent } from './generador/generador.component';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [PedidosComponent, NuevosComponent,CocinaComponent,HistorialComponent,ModalesComponent, GeneradorComponent],
  imports: [
    
    CommonModule,
    PedidosRoutingModule,
    FormsModule
  ]
})
export class PedidosModule { }
