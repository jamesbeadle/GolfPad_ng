import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';

import { provideRouter } from '@angular/router';
import { routes } from './app/app.routes';

import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { firebase } from './app/environments/environment';

const bootstrap = () =>
  bootstrapApplication(AppComponent, {
    providers: [
      provideRouter(routes),
      provideFirebaseApp(() => initializeApp(firebase.firebaseConfig)),
      provideAuth(() => getAuth())
    ],
  });

export default bootstrap;
