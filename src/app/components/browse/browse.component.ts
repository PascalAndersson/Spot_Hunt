import { Component, OnInit } from '@angular/core';
import { DbService } from '../../services/db.service';
import { Pipe, PipeTransform } from '@angular/core';

@Component({
  selector: 'app-browse',
  templateUrl: './browse.component.html',
  styleUrls: ['./browse.component.css'],
})

export class BrowseComponent implements OnInit {
  allSpots: any;
  constructor(private db: DbService) { }

  ngOnInit() {
    var keys;

    // Get all spot and their key
    this.db.getAllSpots().subscribe(result => {
      this.allSpots = result;
      this.db.getSpotKey().subscribe(res => {
        keys = res;
        this.allSpots.forEach(function (spot, index) {
          spot.key = keys[index].key;
          console.log(spot);
        })
      })
    })
  }
}
