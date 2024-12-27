import { bootstrapApplication } from '@angular/platform-browser';
import { provideHttpClient, withFetch } from '@angular/common/http';

import { AppComponent } from './app/app.component';
import { provideRouter } from '@angular/router';
import { routes } from './app/app.routes';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { provideAnimations } from '@angular/platform-browser/animations';
import { firebase } from './app/environments/environment';

bootstrapApplication(AppComponent, {
  providers: [
    provideAuth(() => getAuth()),
    provideAnimations(),
    provideHttpClient(withFetch()),
    provideRouter(routes),
    provideFirebaseApp(() => initializeApp(firebase.firebaseConfig))
  ],
}).then(() => {
  const spinner = document.getElementById('global-spinner');
  if (spinner) {
    spinner.remove();
  }
}).catch(err => console.error(err));