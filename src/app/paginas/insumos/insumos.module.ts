import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InsumosRoutingModule } from './insumos-routing.module';
import { InsumosComponent } from './insumos.component';


@NgModule({
  declarations: [InsumosComponent],
  imports: [
    CommonModule,
    InsumosRoutingModule
  ]
})
export class InsumosModule { }
