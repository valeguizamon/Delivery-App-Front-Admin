import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CocinaComponent } from './cocina/cocina.component';
import { GeneradorComponent } from './generador/generador.component';
import { HistorialComponent } from './historial/historial.component';
import { NuevosComponent } from './nuevos/nuevos.component';
import { PedidosComponent } from './pedidos.component';


const routes: Routes =[
    {path:'', component:PedidosComponent,
    children:[
        {path:'nuevos', component:NuevosComponent},
        {path:'cocina',component:CocinaComponent},
        {path:'historial',component:HistorialComponent},
        {path:'generador',component:GeneradorComponent}
    ]}
]


@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
export class PedidosRoutingModule { }
 