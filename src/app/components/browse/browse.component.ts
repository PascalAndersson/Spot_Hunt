import { Component, OnInit } from '@angular/core';
import { DbService } from '../../services/db.service';

@Component({
  selector: 'app-browse',
  templateUrl: './browse.component.html',
  styleUrls: ['./browse.component.css'],
})
export class BrowseComponent implements OnInit {

  allSpots: any;

  constructor(private db: DbService) { }

  ngOnInit() {
    this.db.getAllSpots().subscribe(result => {
      this.allSpots = result;
      this.allSpots = this.db.getSpotsIncludingKey();
      console.log(this.allSpots);
    });
  }

}
