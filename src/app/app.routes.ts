import { Routes } from '@angular/router';
import { TermsComponent } from './components/terms/terms.component';
import { PrivacyComponent } from './components/privacy/privacy.component';
import { WhitepaperComponent } from './components/whitepaper/whitepaper.component';
import { PlansComponent } from './components/plans/plans.component';
import { HomeComponent } from './components/home/home.component';
export const routes: Routes = [
    { path: '', component: HomeComponent}, 
    { path: 'terms', component: TermsComponent},
    { path: 'privacy', component: PrivacyComponent},
    { path: 'whitepaper', component: WhitepaperComponent},
    { path: 'plans', component: PlansComponent}
];