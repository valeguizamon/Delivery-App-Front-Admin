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
import { ComidaComponent } from './secciones/reportes/comida/comida.component';
import { IngresosComponent } from './secciones/reportes/ingresos/ingresos.component';
import { GananciasComponent } from './secciones/reportes/ganancias/ganancias.component';
import { UsuariopedidosComponent } from './secciones/reportes/usuariopedidos/usuariopedidos.component';
import { ConfigComponent } from './secciones/configuracion/config.component';




@NgModule({

  declarations: [AdminComponent, UsuariosComponent, RubrosComponent, InsumosComponent, ManufacturadosComponent, ModalrubroartComponent,ModalrubrogenComponent, ComidaComponent, IngresosComponent, GananciasComponent, UsuariopedidosComponent, ConfigComponent],

  imports: [
  
    CommonModule,
    AdminRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class AdminModule { }
