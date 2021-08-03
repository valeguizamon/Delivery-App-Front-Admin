import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import {
  AngularFirestore,
  AngularFirestoreDocument,
} from '@angular/fire/firestore';
import { BehaviorSubject } from 'rxjs';
import { first, map, take} from 'rxjs/operators';
import { ROLES } from '../models/roles';
import { User } from '../models/User';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private afsAuth: AngularFireAuth,
    private afs: AngularFirestore
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
  loginEmailUser(email: string, password: string) {
    return new Promise((resolve, reject) => {
      this.afsAuth.signInWithEmailAndPassword(email, password).then(
        (userData) => resolve(userData),
        (err) => reject(err)
      );
    });
  }

  //registrar con email y contraseña

  registerUser(email: string, password: string) {
    return new Promise((resolve, reject) => {
      this.afsAuth
        .createUserWithEmailAndPassword(email, password)
        .then((userData) => {
          resolve(userData), this.updateUserData(userData.user);
        })
        .catch((err) => console.log(reject(err)));
    });
  }

  //salir de la sesion
  logOut() {
    return this.afsAuth.signOut();
  }
  async getUser() {
    let uid = await (await this.isAuth().pipe(first()).toPromise()).uid
    let user = this.afs.doc<User>(`personal/${uid}`);
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
    return data.pipe(first()).toPromise()
    
  }

  private updateUserData(user) {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(
      `personal/${user.uid}`
    );
    const data: User = {
      uid: user.uid,
      email: user.email,
      estado: 1,
      role: ROLES.admin,
    };
    return userRef.set(data, { merge: true });
  }
}
