import { Component, OnInit } from '@angular/core';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';
import { DbService } from '../../services/db.service';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'ngbd-carousel-config',
  templateUrl: './details.component.html',
  providers: [NgbCarouselConfig],
  styleUrls: ['./details.component.css'],
})
export class DetailsComponent implements OnInit {

  constructor(
    config: NgbCarouselConfig,
    private dbService: DbService,
    private activatedRoute: ActivatedRoute) {
    config.interval = 10000;
    config.wrap = true;
    config.keyboard = true;
  }

  key: string;

  ngOnInit() {
    this.key = this.activatedRoute.snapshot.params['key'];
    console.log(this.key);
  }

}
