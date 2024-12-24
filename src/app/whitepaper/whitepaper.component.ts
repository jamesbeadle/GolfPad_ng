import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VisionComponent } from "./vision/vision.component";
import { PrivacyComponent } from "../privacy/privacy.component";
import { ProductComponent } from "./product/product.component";
import { MarketingComponent } from "./marketing/marketing.component";
import { RoadmapComponent } from "./roadmap/roadmap.component";

@Component({
  standalone: true,
  selector: 'app-whitepaper',
  templateUrl: './whitepaper.component.html',
  imports: [CommonModule, VisionComponent, ProductComponent, MarketingComponent, RoadmapComponent]
})
export class WhitepaperComponent {
  activeTab: string = 'vision';

  constructor() {}
}
