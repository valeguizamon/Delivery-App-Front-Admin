import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuardGuard } from './guards/auth-guard.guard';
import { RoleGuardGuard } from './guards/role-guard.guard';

import { ROLES } from './models/roles';

import { CajeroComponent } from './paginas/admin/secciones/pedidos/cajero/cajero.component';
import { CocinaComponent } from './paginas/admin/secciones/pedidos/cocina/cocina.component';
import { DeliveryComponent } from './paginas/admin/secciones/pedidos/delivery/delivery.component';


const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  {
    path: 'home',
    loadChildren: () =>
      import('./paginas/home/home.module').then((m) => m.HomeModule),
  },
  {
    path: 'panel',
    canActivate: [AuthGuardGuard,RoleGuardGuard],
    data: {
      role: [ROLES.Admin, ROLES.Cocinero, ROLES.Delivery]
    },
    loadChildren: () =>
      import('./paginas/panel/panel.module').then((m) => m.PanelModule),
  },
  {
    path: 'admin',
    canActivate: [AuthGuardGuard, RoleGuardGuard],
    data: {
      role: [ROLES.Admin],
    },
    loadChildren: () =>
      import('./paginas/admin/admin.module').then((m) => m.AdminModule),
  },
  {
    path: 'cajero',
    canActivate: [AuthGuardGuard, RoleGuardGuard],
    data: {
      role: [ROLES.Admin, ROLES.Cajero],
    },
    component: CajeroComponent,
  },
  {
    path: 'cocina',
    canActivate: [AuthGuardGuard, RoleGuardGuard],
    data: {
      role: [ROLES.Admin, ROLES.Cocinero],
    },
    component: CocinaComponent,
  },
  {
    path: 'delivery',
    canActivate: [AuthGuardGuard, RoleGuardGuard],
    data: {
      role: [ROLES.Admin, ROLES.Delivery]
    },
    component: DeliveryComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}