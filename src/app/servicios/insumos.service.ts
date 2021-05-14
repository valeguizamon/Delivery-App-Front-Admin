import { Injectable } from '@angular/core';
import { Insumo } from '../models/Insumo';
import { CommonService } from './common.service';
@Injectable({
  providedIn: 'root',
})
export class InsumoService extends CommonService<Insumo> {
  public selected: Insumo = {
    _id: null,
    denominacion: '',
    precioCompra: 0,
    precioVenta: 0,
    stockActual: 0,
    stockMinimo: 0,
    unidadMedida: '',
    esInsumo: false,
    RubroArt_id: null,
  };
  miUrl: string = 'http://localhost:2021/api/v1/artin/';

  public setNull() {
    this.selected = {
      _id: null,
      denominacion: '',
      precioCompra: 0,
      precioVenta: 0,
      stockActual: 0,
      stockMinimo: 0,
      unidadMedida: '',
      esInsumo: false,
      RubroArt_id: null,
    };
  }
}
