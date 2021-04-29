import { Injectable } from "@angular/core";
import {AngularFireAuth} from "@angular/fire/auth";
import { map} from "rxjs/operators";

@Injectable({
    providedIn:'root'
})
export class AuthService {
    constructor(private afsAuth: AngularFireAuth){}

    isAuth(){
        return this.afsAuth.authState.pipe(map(auth => auth));
    }

    loginEmailUser(email: string, password: string){
        return new Promise((resolve,reject) =>{
            this.afsAuth.signInWithEmailAndPassword(email,password)
            .then(userData => resolve(userData),
            err => reject(err));
        })
    }

    registerUser(email:string,password:string){
        return new Promise((resolve,reject) =>{
            this.afsAuth.createUserWithEmailAndPassword(email,password)
            .then(userData => resolve(userData),
            err =>reject(err));
        })
    }

    logOut(){
        return this.afsAuth.signOut();
    }
}