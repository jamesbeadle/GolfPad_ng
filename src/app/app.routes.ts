import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { TermsComponent } from './terms/terms.component';
import { PrivacyComponent } from './privacy/privacy.component';
import { WhitepaperComponent } from './whitepaper/whitepaper.component';
import { MerveComponent } from './components/merve/merve.component';
export const routes: Routes = [
    { path: '', component: HomeComponent}, 
    { path: 'terms', component: TermsComponent},
    { path: 'privacy', component: PrivacyComponent},
    { path: 'whitepaper', component: WhitepaperComponent}
];