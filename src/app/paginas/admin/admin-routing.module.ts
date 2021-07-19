import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';
import { ConfigComponent } from './secciones/configuracion/config.component';
import { InsumosComponent } from './secciones/insumos/insumos.component';
import { ManufacturadosComponent } from './secciones/manufacturados/manufacturados.component';
import { PedidosComponent } from './secciones/pedidos/pedidos.component';
import { RubrosComponent } from './secciones/rubros/rubros.component';
import { UsuariosComponent } from './secciones/usuarios/usuarios.component';

const routes: Routes = [
  { path: '', component: AdminComponent,
  children:[
    { path: 'pedidos', loadChildren: () => import('./secciones/pedidos/pedidos.module').then(m => m.PedidosModule) },
    { path: 'insumos', component: InsumosComponent},
    { path: 'manufacturados', component: ManufacturadosComponent},
    { path: 'usuarios', component: UsuariosComponent},
    { path: 'rubros', component: RubrosComponent},
    { path: 'config', component: ConfigComponent}
  ]}
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
