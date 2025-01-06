import { Component } from '@angular/core';
import { BrandTextComponent } from '../../shared/brand-text/brand-text.component';
import { MulligansComponent } from './modals/mulligans/mulligans.component';
import { BandsComponent } from './modals/bands/bands.component';
import { BuildItComponent } from './modals/build-it/build-it.component';
import { NextUpComponent } from './modals/next-up/next-up.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-new-games',
  templateUrl: './new-games.component.html',
  styleUrl: './new-games.component.css',
  imports: [BrandTextComponent, MulligansComponent, BandsComponent, BuildItComponent, NextUpComponent, CommonModule],
  standalone: true
})
export class NewGamesComponent {
  showMulligans = false;
  showBands = false;
  showBuildIt = false;
  showNextUp = false;

  openMulligans() { this.showMulligans = true; }
  closeMulligans() { 
    this.showMulligans = false; 
  }

  openBands() { this.showBands = true; }
  closeBands() { this.showBands = false; }

  openBuildIt() { this.showBuildIt = true; }
  closeBuildIt() { this.showBuildIt = false; }

  openNextUp() { this.showNextUp = true; }
  closeNextUp() { this.showNextUp = false; }
}
