import { Injectable } from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection, DocumentReference} from "@angular/fire/compat/firestore";
import IUser from "../modals/user.modal";
import IClip from "../modals/clip.modal";


@Injectable({
  providedIn: 'root'
})
export class ClipService {
  private clipCollection: AngularFirestoreCollection<IClip>;

  constructor(
    private db: AngularFirestore
    ) {
    this.clipCollection = db.collection('clips');
  }

  createClip(data : IClip): Promise<DocumentReference<IClip>>{
    return this.clipCollection.add(data);
  }

}
