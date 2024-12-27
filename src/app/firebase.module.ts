import { NgModule } from '@angular/core';
import { provideFirebaseApp, initializeApp as firebaseInitializeApp } from '@angular/fire/app';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { environment } from './environments/environment';

@NgModule({
  providers: [
    provideFirebaseApp(() => firebaseInitializeApp(environment.firebaseConfig)),
    provideFirestore(() => getFirestore()),
  ],
})
export class FirebaseModule {}
