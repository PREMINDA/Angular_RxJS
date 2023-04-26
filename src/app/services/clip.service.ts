import { Injectable } from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection, DocumentReference} from "@angular/fire/compat/firestore";
import IUser from "../modals/user.modal";
import IClip from "../modals/clip.modal";
import {AngularFireAuth} from "@angular/fire/compat/auth";
import {of, switchMap} from "rxjs";


@Injectable({
  providedIn: 'root'
})
export class ClipService {
  private clipCollection: AngularFirestoreCollection<IClip>;

  constructor(
    private db: AngularFirestore,
    private auth: AngularFireAuth
    ) {
    this.clipCollection = db.collection('clips');
  }

  createClip(data : IClip): Promise<DocumentReference<IClip>>{
    return this.clipCollection.add(data);
  }

  getUserClips(){
    this.auth.user.pipe(
      switchMap(user=>{
        if(!user){
          return of([])
        }
       const query = this.clipCollection.ref.where(
          'uid','==',user?.uid
        )
        return query.get();
      })
    )

  }
}
