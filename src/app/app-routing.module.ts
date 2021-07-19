import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardGuard } from './guards/auth-guard.guard';
import { CocinaComponent } from './paginas/admin/secciones/pedidos/cocina/cocina.component';
import { DeliveryComponent } from './paginas/admin/secciones/pedidos/delivery/delivery.component';

const routes: Routes = [
  { path: '', redirectTo:'/home',pathMatch:'full'},
  { path: 'home', loadChildren: () => import('./paginas/home/home.module').then(m => m.HomeModule) },
  { path: 'register', loadChildren: () => import('./paginas/register/register.module').then(m => m.RegisterModule) },
  { path: 'panel',canActivate:[AuthGuardGuard], loadChildren: () => import('./paginas/panel/panel.module').then(m => m.PanelModule) },
  { path: 'admin', loadChildren: () => import('./paginas/admin/admin.module').then(m => m.AdminModule) },
  { path: 'cocina', component: CocinaComponent}
  ,
  { path: 'delivery', component: DeliveryComponent}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
