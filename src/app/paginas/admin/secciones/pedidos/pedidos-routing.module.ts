import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CajeroComponent } from './cajero/cajero.component';
import { CocinaComponent } from './cocina/cocina.component';
import { DeliveryComponent } from './delivery/delivery.component';
import { GeneradorComponent } from './generador/generador.component';
import { HistorialComponent } from './historial/historial.component';
// import { NuevosComponent } from './nuevos/nuevos.component';
import { PedidosComponent } from './pedidos.component';


const routes: Routes =[
    { path:'', component:PedidosComponent,
    children:[
        // { path:'nuevos', component: NuevosComponent },
        { path:'cocina', component: CocinaComponent },
        { path:'cajero', component: CajeroComponent },
        { path:'historial', component: HistorialComponent },
        { path:'generador', component: GeneradorComponent },
        { path:'delivery', component: DeliveryComponent }
    ]}
]


@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
export class PedidosRoutingModule { }
 