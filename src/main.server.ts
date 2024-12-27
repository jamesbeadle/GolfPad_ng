import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';

import { provideRouter } from '@angular/router';
import { routes } from './app/app.routes';

import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { firebase } from './app/environments/environment';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideHttpClient, withFetch } from '@angular/common/http';

const bootstrap = () =>
  bootstrapApplication(AppComponent, {
    providers: [
          provideAuth(() => getAuth()),
          provideAnimations(),
          provideHttpClient(withFetch()),
          provideRouter(routes),
          provideFirebaseApp(() => initializeApp(firebase.firebaseConfig))
    ],
  });

export default bootstrap;
