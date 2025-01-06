import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VisionComponent } from "./vision/vision.component";
import { MarketingComponent } from "./marketing/marketing.component";
import { RoadmapComponent } from "./roadmap/roadmap.component";
import { MerveInfoComponent } from "./merve-info/merve-info.component";
import { NewGamesComponent } from "./new-games/new-games.component";
import { SideGamesComponent } from "./side-games/side-games.component";

@Component({
  standalone: true,
  selector: 'app-whitepaper',
  templateUrl: './whitepaper.component.html',
  imports: [CommonModule, VisionComponent, MarketingComponent, RoadmapComponent, MerveInfoComponent, NewGamesComponent, SideGamesComponent]
})
export class WhitepaperComponent {
  activeTab: string = 'vision';

  constructor() {}
}
