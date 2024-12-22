import { NgModule } from '@angular/core';
import { provideFirebaseApp, initializeApp as firebaseInitializeApp } from '@angular/fire/app';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { firebase } from './environments/environment';

@NgModule({
  providers: [
    provideFirebaseApp(() => firebaseInitializeApp(firebase.firebaseConfig)),
    provideFirestore(() => getFirestore()),
  ],
})
export class FirebaseModule {}
