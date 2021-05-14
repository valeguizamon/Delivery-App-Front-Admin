import { Injectable } from '@angular/core';
import { RubroArt} from "../models/RubroArt";
import { CommonService } from './common.service';
@Injectable({
  providedIn: 'root',
})
export class RubrosartService extends CommonService<RubroArt>{
  public selectedRubro: RubroArt = {
    _id: null,
    denominacion: '',
  };
  miUrl: string = 'http://localhost:2021/api/v1/rubroarticulo/';
  
}
