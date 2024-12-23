import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { TermsComponent } from './terms/terms.component';
import { PrivacyComponent } from './privacy/privacy.component';
export const routes: Routes = [
    { path: '', component: HomeComponent}, 
    { path: 'terms', component: TermsComponent},
    { path: 'privacy', component: PrivacyComponent}
];