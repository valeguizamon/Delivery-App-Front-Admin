import { Injectable } from "@angular/core";
import { HttpClient} from "@angular/common/http";
import { RubroGral} from "../models/RubroGral";
import { Observable} from "rxjs";
@Injectable({
    providedIn:'root'
})
 
export class RubroService {
    public selectedRubro : RubroGral = {
        _id: null,
        denominacion: ''
    }
    miUrl: string = "http://localhost:2021/api/v1/rubrogeneral/";
    constructor(private http: HttpClient){}
    
    //traer todos los rubros
    getAll(): Observable<RubroGral[]>{
        return this.http.get<RubroGral[]>(this.miUrl);
    }
    //traer uno
    getOne(id: string):Observable<RubroGral>{
        return this.http.get<RubroGral>(this.miUrl+id);
    }
    //eliminar rubro
    delete(id: string):Observable<any>{
        return this.http.delete(this.miUrl+id);
    }
    //crear rubro
    post(rubro: RubroGral):Observable<RubroGral>{
        return this.http.post<RubroGral>(this.miUrl, rubro);
    }
    //editar rubro
    put(id: string,rubro:RubroGral) : Observable<RubroGral>{
        return this.http.put<RubroGral>(this.miUrl+id,rubro);
    }
    
}