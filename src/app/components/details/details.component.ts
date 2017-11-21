import { Component, OnInit } from '@angular/core';
import {NgbCarouselConfig} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'ngbd-carousel-config',
  templateUrl: './details.component.html',
  providers: [NgbCarouselConfig],
  styleUrls: ['./details.component.css'],
})
export class DetailsComponent implements OnInit {

  constructor(config: NgbCarouselConfig) {
    config.interval = 10000;
    config.wrap = true;
    config.keyboard = true;
   }

  ngOnInit() {
  }

}
