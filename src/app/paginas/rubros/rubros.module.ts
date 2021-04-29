import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RubrosRoutingModule } from './rubros-routing.module';
import { RubrosComponent } from './rubros.component';
import { ModalrubrogenComponent } from 'src/app/componentes/modales/modalrubrogen/modalrubrogen.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    RubrosComponent,
    ModalrubrogenComponent,
  ],
  imports: [
    CommonModule,
    RubrosRoutingModule,
    FormsModule
  ]
})
export class RubrosModule { }
