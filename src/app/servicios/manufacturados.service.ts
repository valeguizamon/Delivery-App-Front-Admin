import { Injectable } from '@angular/core';
import { Manufacturado } from '../models/Manufacturado';
import { CommonService } from './common.service';

@Injectable({
  providedIn: 'root',
})
export class ManufacturadosService extends CommonService<Manufacturado> {
  public selected: Manufacturado = {
    _id: null,
    denominacion: '',
    tiempoEstimado: 0,
    precioVenta: 0,
    img: '',
    ArtManufactDet: [],
    RubroGeneral: '',
  };
  miUrl = 'http://localhost:2021/api/v1/artmanu/';

  public setNull() {
    this.selected = {
      _id: null,
      denominacion: '',
      tiempoEstimado: 0,
      precioVenta: 0,
      img: '',
      ArtManufactDet: [],
      RubroGeneral: '',
    };
  }
}
