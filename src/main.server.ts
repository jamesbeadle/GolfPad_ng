import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';

import { provideRouter } from '@angular/router';
import { routes } from './app/app.routes';

import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { environment } from './app/environments/environment';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideHttpClient, withFetch, withInterceptorsFromDi } from '@angular/common/http';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './app/interceptors/auth.interceptor';

const bootstrap = () =>
  bootstrapApplication(AppComponent, {
    providers: [
          provideAuth(() => getAuth()),
          provideAnimations(),
          provideHttpClient(withFetch(), withInterceptorsFromDi()),
          {
            provide: HTTP_INTERCEPTORS,
            useClass: AuthInterceptor,
            multi: true
          },      
          provideRouter(routes),
          provideFirebaseApp(() => initializeApp(environment.firebaseConfig))
    ],
  });

export default bootstrap;
