import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';
import { InsumosComponent } from './secciones/insumos/insumos.component';
import { ManufacturadosComponent } from './secciones/manufacturados/manufacturados.component';
import { RubrosComponent } from './secciones/rubros/rubros.component';
import { UsuariosComponent } from './secciones/usuarios/usuarios.component';

//Reportes
import { ComidaComponent } from './secciones/reportes/comida/comida.component';
import { GananciasComponent } from './secciones/reportes/ganancias/ganancias.component';
import { IngresosComponent } from './secciones/reportes/ingresos/ingresos.component';
import { UsuariopedidosComponent } from './secciones/reportes/usuariopedidos/usuariopedidos.component';

const routes: Routes = [
  { path: '', component: AdminComponent,
  children:[
    { path: 'pedidos', loadChildren: () => import('./secciones/pedidos/pedidos.module').then(m => m.PedidosModule) },
    { path: 'insumos', component: InsumosComponent},
    { path: 'manufacturados', component: ManufacturadosComponent},
    { path: 'usuarios', component: UsuariosComponent},
    { path: 'rubros', component: RubrosComponent},
    { path: 'comida',component: ComidaComponent},
    { path: 'ganancias',component: GananciasComponent},
    { path: 'ingresos',component: IngresosComponent},
    { path: 'usuario/pedidos',component: UsuariopedidosComponent}
  ]}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
