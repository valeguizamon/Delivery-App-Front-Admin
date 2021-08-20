import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router} from "@angular/router";

import { AngularFireAuth } from '@angular/fire/auth';
import {
  AngularFirestore,
  AngularFirestoreDocument,
} from '@angular/fire/firestore';

import { BehaviorSubject, of, Observable } from 'rxjs';
import { first, map, switchMap, take} from 'rxjs/operators';

import { ToastService } from "./toast.service";

import { ROLES } from '../models/roles';
import { User } from '../models/User';


@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private afsAuth: AngularFireAuth,
    private afs: AngularFirestore,
    private router: Router,
    private http: HttpClient,
    private toast: ToastService
  ) {}


  public currentUser: any;
  public userStatus: string = "";
  public userStatusChanges: BehaviorSubject<string> = new BehaviorSubject<string>(this.userStatus);

  setUserStatus(userStatus: any): void {
    this.userStatus = userStatus;
    this.userStatusChanges.next(userStatus)
  }
  
  //saber si esta logueado
  isAuth() {
    return this.afsAuth.authState.pipe(map((auth) => auth));
  }

  //loguear con email y contraseña
  async loginEmailUser(email: string, password: string) {
    try {
      const { user } = await this.afsAuth.signInWithEmailAndPassword(email, password);
      const userData = this.afsAuth.authState.pipe(
        switchMap((data)=>{
          if(data){
            return this.afs.doc<User>(`/clients/${user.uid}`).valueChanges().pipe(take(1));
          }
          return of(null)
        })
      );
      this.toast.display(`Bienvenido  ${user.email}`,"user");

      userData.subscribe( user => {
        switch (user.role) {
          case ROLES.Admin:
            this.router.navigate(['/admin/pedidos/cajero']);
            break;
          case ROLES.Cajero:
            this.router.navigate(['/cajero']);
            break;
          case ROLES.Cocinero:
            this.router.navigate(['/cocina']);
            break;
          case ROLES.Delivery:
            this.router.navigate(['/delivery']);
            break;
          default:
            window.location.href = "http://localhost:4200/inicio";
            break;
        }
      });
    } catch (error) {
      this.toast.display("Error al iniciar sesión","error");
    }
  }

  /**
   * Envio los datos para crear usuarios desde el back y luego crea las colleciones en la base de datos
   */
  public registerEmployee(email: string, password: string, rol: string, nombre: string): Observable<{ uid: string}> {
    return this.http.post<{ uid: string}>("http://localhost:2021/api/v1/auth/create", { email, password, nombre, rol });
  }

  //salir de la sesion
  logOut() {
    this.afsAuth.signOut();
    window.location.href = "http://localhost:5200/home";
  }

  async getUser() {
    let uid = await (await this.isAuth().pipe(first()).toPromise()).uid
    let user = this.afs.doc<User>(`clients/${uid}`);
    let data  = user.snapshotChanges().pipe(
      map((action) => {
        if (action.payload.exists === false) {
          return null;
        } else {
          const data = action.payload.data() as User;
          data.uid = action.payload.id;
          return data;
        }
      })
    );
    return data.pipe(first()).toPromise();
  }


  // private async updateUserData(uid: string, user) {
  //   const userRef: AngularFirestoreDocument<any> = this.afs.doc(
  //     `clients/${uid}`
  //   );
  //   const data: User = {
  //     uid,
  //     email: user.email,
  //     estado: 1,
  //     online: false,
  //     nombre: user.nombre,
  //     role: user.rol
  //   };
  //   return userRef.set(data, { merge: true });
  // }
}