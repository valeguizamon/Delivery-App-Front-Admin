import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from '../models/User';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  private userCollection: AngularFirestoreCollection<User>;
  private users: Observable<User[]>;
  private userDoc: AngularFirestoreDocument<User>;
  private user: Observable<User>;
  constructor(private afs: AngularFirestore) { }

  getAllUsers(){
    this.userCollection = this.afs.collection<User>('clients');
    return this.users = this.userCollection.snapshotChanges()
    .pipe(map(changes => {
      return changes.map(action =>{
        const data = action.payload.doc.data() as User;
        data.uid = action.payload.doc.id;
        return data;
      })
    }))
  }
}
