import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardGuard } from './guards/auth-guard.guard';
import { RoleGuardGuard } from './guards/role-guard.guard';
import { ROLES } from './models/roles';
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
    path: 'register',
    loadChildren: () =>
      import('./paginas/register/register.module').then(
        (m) => m.RegisterModule
      ),
  },
  {
    path: 'panel',
    canActivate: [AuthGuardGuard,RoleGuardGuard],
    data: {
      role: [ROLES.admin,ROLES.cocinero,ROLES.delivery]
    },
    loadChildren: () =>
      import('./paginas/panel/panel.module').then((m) => m.PanelModule),
  },
  {
    path: 'admin',
    canActivate: [AuthGuardGuard, RoleGuardGuard],
    data: {
      role: [ROLES.admin],
    },
    loadChildren: () =>
      import('./paginas/admin/admin.module').then((m) => m.AdminModule),
  },
  {
    path: 'cocina',
    canActivate: [AuthGuardGuard, RoleGuardGuard],
    data: {
      role: [ROLES.admin, ROLES.cocinero],
    },
    component: CocinaComponent,
  },
  {
    path: 'delivery',
    canActivate: [AuthGuardGuard, RoleGuardGuard],
    data: {
      role: [ROLES.admin, ROLES.delivery]
    },
    component: DeliveryComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
