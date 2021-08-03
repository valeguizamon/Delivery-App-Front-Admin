import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument,
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from '../models/User';

@Injectable({
  providedIn: 'root',
})
export class UsuariosService {
  private userCollection: AngularFirestoreCollection<User>;
  private users: Observable<User[]>;
  private userDoc: AngularFirestoreDocument<User>;
  private user: Observable<User>;
  constructor(private afs: AngularFirestore) {
    this.userCollection = this.afs.collection('clients');
    this.users = this.userCollection.valueChanges();
  }

  getAllUsers() {
    this.userCollection = this.afs.collection<User>('clients', (ref) => ref);
    return this.userCollection.snapshotChanges().pipe(
      map((changes) => {
        return changes.map((action) => {
          const data = action.payload.doc.data() as User;
          data.uid = action.payload.doc.id;
          return data;
        });
      })
    );
  }

  getFiltered(data, textSearch) {
    return data.filter(
      (user) =>
        user.nombre.toLowerCase().includes(textSearch) ||
        user.email.toLowerCase().includes(textSearch) ||
        user.telefono?.toString().includes(textSearch) ||
        user.domicilio?.calle.toLowerCase().includes(textSearch)
    );
  }
}
