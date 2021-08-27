import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router} from "@angular/router";

import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument, } from '@angular/fire/firestore';
import firebase from 'firebase/app';

import { Observable, of } from 'rxjs';
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


  // public currentUser: any;
  // public userStatus: string = "";
  // public userStatusChanges: BehaviorSubject<string> = new BehaviorSubject<string>(this.userStatus);

  // setUserStatus(userStatus: any): void {
  //   this.userStatus = userStatus;
  //   this.userStatusChanges.next(userStatus)
  // }
  
  //saber si esta logueado
  isAuth(): Observable<any>{
    return this.afsAuth.authState.pipe(map((auth) => auth));
  }

  //loguear con email y contraseña
  async loginEmailUser(email: string, password: string) {
    try {
      // Auth por sesiones
      firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION);
      const { user } = await this.afsAuth.signInWithEmailAndPassword(email, password);
      this.setStatus(true);
      let rol = (await this.getUser()).role;
      this.toast.display(`Bienvenido  ${user.email}`,"user");
      this.loginRedirect(rol);
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
  async logOut() {
    this.setStatus(false);
    try {
      await this.afsAuth.signOut();
    } catch (error) {
      console.error('AUTH : SVC ', error)
    }
  }

  public async getUser(){
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

  //Cambia el estado de un usuario entre online y offline
  private setStatus(online: boolean): void{
    this.isAuth().subscribe(
      user => {
        if( user ){
          const userRef: AngularFirestoreDocument<User> = this.afs.doc(`clients/${user.uid}`);
          const data: any = { online };
          userRef.update(data);
        }
      },
      e => console.error(e)
    );
  }

  private loginRedirect(role: string): void {
    switch (role) {
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
        this.logOut();
        window.location.href = "http://localhost:4200/inicio";
        break;
    }
  }
}