import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({
    providedIn:'root'
})

export class CommonService<T> {
    public miUrl :string = ""
    constructor(private http : HttpClient){
        
    }

    getAll(): Observable<T[]>{
        return this.http.get<T[]>(this.miUrl)
    }

    getOne(id: string): Observable<T>{
        return this.http.get<T>(this.miUrl+id)
    }

    post(rubro: T): Observable<T>{
        return this.http.post<T>(this.miUrl, rubro)
    }

    put(id: string, rubro: T): Observable<T>{
        return this.http.put<T>(this.miUrl+id,rubro)
    }

    delete(id: string): Observable<any>{
        return this.http.delete(this.miUrl+id)
    }
}