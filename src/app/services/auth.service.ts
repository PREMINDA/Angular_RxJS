import { Injectable } from '@angular/core';
import {AngularFireAuth} from '@angular/fire/compat/auth';
import {AngularFirestore, AngularFirestoreCollection} from '@angular/fire/compat/firestore';
import IUser from '../modals/user.modal';
import {delay, filter, Observable, of, switchMap} from 'rxjs';
import { map } from 'rxjs/operators'
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';
import {data} from 'autoprefixer';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private usersCollection: AngularFirestoreCollection<IUser>;
  public isAuthenticated$: Observable<boolean>;
  public isAuthenticatedWitDelay$: Observable<boolean>;
  private redirect: boolean = false
  constructor(
    private  auth : AngularFireAuth,
    private db: AngularFirestore,
    private router: Router,
    private route:ActivatedRoute

  ) {
    this.usersCollection = db.collection('users');
    this.isAuthenticated$ = auth.user.pipe(map(user=>!!user));
    this.isAuthenticatedWitDelay$ = this.isAuthenticated$.pipe(delay(1000));
    this.router.events.pipe(
      filter(e=>e instanceof NavigationEnd),
      map(e=>this.route.firstChild),
      switchMap(route=>route?.data ?? of({}))
    ).subscribe(data => this.redirect = data.authOnly ?? false)
  }

  public async createUser(userData: IUser) {
    if(!userData.password) {
      throw new Error("Password not provided!");
    }

    const userCred = await this.auth.createUserWithEmailAndPassword(
      userData.email, userData.password
    )

    if(!userCred.user) {
      throw new Error("User can't be found");
    }

    await this.usersCollection.doc(userCred.user.uid).set({
      name: userData.name,
      email: userData.email,
      age: userData.age,
      phoneNumber: userData.phoneNumber
    });

    await userCred.user.updateProfile({
      displayName: userData.name
    });
  }
  async signOut(){
    await this.auth.signOut();
    if(this.redirect){
      await this.router.navigateByUrl('/')
    }
  }

}
