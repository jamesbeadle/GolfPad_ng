import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import firebase from 'firebase/compat/app';

@Injectable({ providedIn: 'root' })
export class AuthService {
  currentUser = new BehaviorSubject<firebase.User | null>(null);

  constructor(private afAuth: AngularFireAuth) {
    this.afAuth.authState.subscribe((user) => this.currentUser.next(user));
  }

  async signInWithGoogle() {
    const provider = new firebase.auth.GoogleAuthProvider();
    await this.afAuth.signInWithPopup(provider);
  }

  signOut() {
    this.afAuth.signOut();
  }
}
