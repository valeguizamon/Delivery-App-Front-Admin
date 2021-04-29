import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo:'/home',pathMatch:'full'},
  { path: 'home', loadChildren: () => import('./paginas/home/home.module').then(m => m.HomeModule) },
  { path: 'register', loadChildren: () => import('./paginas/register/register.module').then(m => m.RegisterModule) },
  { path: 'usuarios', loadChildren: () => import('./paginas/usuarios/usuarios.module').then(m => m.UsuariosModule) },
  { path: 'pedidos', loadChildren: () => import('./paginas/pedidos/pedidos.module').then(m => m.PedidosModule) },
  { path: 'insumos', loadChildren: () => import('./paginas/insumos/insumos.module').then(m => m.InsumosModule) },
  { path: 'articulos', loadChildren: () => import('./paginas/articulos/articulos.module').then(m => m.ArticulosModule) },
  { path: 'rubros', loadChildren: () => import('./paginas/rubros/rubros.module').then(m => m.RubrosModule) }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
