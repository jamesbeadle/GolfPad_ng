import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { MerveComponent } from './components/merve/merve.component';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NavigationComponent } from './components/shared/navigation/navigation.component';
import { NavOverlayComponent } from './components/nav-overlay/nav-overlay.component';
import { RouterModule } from '@angular/router';
import { routes } from './app.routes';
import { BrandTextComponent } from './components/shared/brand-text/brand-text.component';
import { RoadmapComponent } from './components/whitepaper/roadmap/roadmap.component';
import { WhitepaperComponent } from './components/whitepaper/whitepaper.component';
import { MarketingComponent } from './components/whitepaper/marketing/marketing.component';
import { SideGamesComponent } from './components/whitepaper/side-games/side-games.component';
import { MerveInfoComponent } from './components/whitepaper/merve-info/merve-info.component';
import { VisionComponent } from './components/whitepaper/vision/vision.component';
import { BombsComponent } from './components/whitepaper/side-games/modals/bombs/bombs.component';
import { PinHighComponent } from './components/whitepaper/side-games/modals/pin-high/pin-high.component';
import { BullseyeComponent } from './components/whitepaper/side-games/modals/bullseye/bullseye.component';
import { NewGamesComponent } from './components/whitepaper/new-games/new-games.component';
import { MulligansComponent } from './components/whitepaper/new-games/modals/mulligans/mulligans.component';
import { BuildItComponent } from './components/whitepaper/new-games/modals/build-it/build-it.component';
import { NextUpComponent } from './components/whitepaper/new-games/modals/next-up/next-up.component';
import { BandsComponent } from './components/whitepaper/new-games/modals/bands/bands.component';
import { SimpleModalComponent } from './components/shared/simple-modal/simple-modal.component';
import { HomeComponent } from './components/home/home.component';

@NgModule({
  declarations: [
    AppComponent,
    MerveComponent,
    HomeComponent,
    NavigationComponent, 
    NavOverlayComponent, 
    BrandTextComponent,
    RoadmapComponent,
    WhitepaperComponent,
    MarketingComponent,
    SideGamesComponent,
    MerveInfoComponent,
    VisionComponent,
    BombsComponent,
    PinHighComponent,
    BullseyeComponent,
    NewGamesComponent,
    MulligansComponent,
    BuildItComponent,
    NextUpComponent,
    BandsComponent,
    SimpleModalComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}