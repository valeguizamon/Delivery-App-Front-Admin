import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { PedidosComponent } from './secciones/pedidos/pedidos.component';
import { UsuariosComponent } from './secciones/usuarios/usuarios.component';
import { RubrosComponent } from './secciones/rubros/rubros.component';
import { InsumosComponent } from './secciones/insumos/insumos.component';
import { ManufacturadosComponent } from './secciones/manufacturados/manufacturados.component';
import { ModalrubroartComponent } from './secciones/rubros/modales/modalrubroart/modalrubroart.component';
import { ModalrubrogenComponent } from './secciones/rubros/modales/modalrubrogen/modalrubrogen.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [AdminComponent, PedidosComponent, UsuariosComponent, RubrosComponent, InsumosComponent, ManufacturadosComponent, ModalrubroartComponent,ModalrubrogenComponent],
  imports: [
    CommonModule,
    AdminRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class AdminModule { }
