import { Injectable } from "@angular/core";
import { RubroGral} from "../models/RubroGral";
import { CommonService } from "./common.service";
@Injectable({
    providedIn:'root'
})
 
export class RubroService extends CommonService<RubroGral>{
    public selectedRubro : RubroGral = {
        _id: null,
        denominacion: ''
    }
    miUrl: string = "http://localhost:2021/api/v1/rubrogeneral/";
}