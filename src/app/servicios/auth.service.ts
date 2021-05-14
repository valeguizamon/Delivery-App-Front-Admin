import { Injectable } from "@angular/core";
import {AngularFireAuth} from "@angular/fire/auth";
import { AngularFirestore, AngularFirestoreDocument } from "@angular/fire/firestore";
import { map} from "rxjs/operators";
import { User} from '../models/User';
@Injectable({
    providedIn:'root'
})
export class AuthService {
    constructor(private afsAuth: AngularFireAuth, private afs: AngularFirestore){}

    //saber si esta logueado
    isAuth(){
        return this.afsAuth.authState.pipe(map(auth => auth));
    }

    //loguear con email y contraseña
    loginEmailUser(email: string, password: string){
        return new Promise((resolve,reject) =>{
            this.afsAuth.signInWithEmailAndPassword(email,password)
            .then(userData => resolve(userData),
            err => reject(err));
        })
    }

    //registrar con email y contraseña

    registerUser(email:string,password:string){
        return new Promise((resolve,reject) =>{
            this.afsAuth.createUserWithEmailAndPassword(email,password)
            .then(userData => {
                resolve(userData),
                this.updateUserData(userData.user)
            }).catch(err => console.log(reject(err)))
        })
    }

    //salir de la sesion
    logOut(){
        return this.afsAuth.signOut();
    }

    private updateUserData(user){
        const userRef: AngularFirestoreDocument<any> = this.afs.doc(`clients/${user.uid}`)
        const data: User = {
            uid: user.uid,
            email: user.email,
            estado: 1,
            role: 1
        }
        return userRef.set(data,{merge: true})
    }
}