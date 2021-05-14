import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo:'/home',pathMatch:'full'},
  { path: 'home', loadChildren: () => import('./paginas/home/home.module').then(m => m.HomeModule) },
  { path: 'register', loadChildren: () => import('./paginas/register/register.module').then(m => m.RegisterModule) },
  { path: 'panel', loadChildren: () => import('./paginas/panel/panel.module').then(m => m.PanelModule) },
  { path: 'admin', loadChildren: () => import('./paginas/admin/admin.module').then(m => m.AdminModule) }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
