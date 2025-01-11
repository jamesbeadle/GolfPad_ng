// auth.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import {
  Auth,
  user,                // an observable that tracks the current user
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  User,
} from '@angular/fire/auth';

/**
 * Modern AngularFire Auth Service (no 'compat').
 * Tracks the currently logged-in user using a BehaviorSubject.
 */
@Injectable({ providedIn: 'root' })
export class AuthService {
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  /** Expose the current user as an observable for components to subscribe to. */
  currentUser$ = this.currentUserSubject.asObservable();

  constructor(private auth: Auth) {
    // Subscribe to the 'user' observable from AngularFire, which emits the active User or null.
    user(this.auth).subscribe((usr) => this.currentUserSubject.next(usr));
  }

  async signInWithGoogle(): Promise<void> {
    const provider = new GoogleAuthProvider();
    await signInWithPopup(this.auth, provider);
  }

  async signOut(): Promise<void> {
    await signOut(this.auth);
  }
}
