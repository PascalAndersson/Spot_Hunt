import { Component, OnInit, ElementRef } from '@angular/core';
import { Http } from '@angular/http';
import { DbService } from '../../services/db.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  // Activated whenever the user clicks anywhere on the page
  host: {
    '(document:click)': 'onDocumentClick($event)',
  },
})
export class HomeComponent implements OnInit {

  //Read data from json file containing design for google map
  constructor(private http: Http, private db: DbService, private _eref: ElementRef) {
    this.http.get('assets/google-maps-design.json')
      .subscribe(result => this.style = result.json());
  }

  // Set custom style
  style: object = []

  onDocumentClick(event) {
    var className = event.target.attributes.class.nodeValue;
    if (className !== "searchbar") {
      this.isVisable = false;
    }
  }

  mapClicked() {
    this.isVisable = false;
  }

  isVisable = false;

  showSearchResults() {
    this.isVisable = true;
  }



  // Set the image and properties of the google maps marker
  icon: object = {
    url: 'assets/SpotHuntPin2.png', // gives a data://<value>
    scaledSize: {
      height: 40,
      width: 30
    }
  }

  //Set starting position and zoom level
  zoom: number = 12;
  lat: number = 59.315305976994274;
  lng: number = 18.079376220703125;

  spots: any;

  searchResult: any;

  ngOnInit() {
    // Center map on the users current position
    this.setCurrentPosition();
    var keys;

    this.db.getAllSpots().subscribe(result => {
      this.spots = result;

      this.db.getSpotKey().subscribe(res => {
        keys = res;
        this.spots.forEach(function (spot, index) {
          spot.key = keys[index].key;
        })
      })
    })
    
  }

  searchSpots(event: any) {
    var search = event.target.value;
    var searchResult = [];

    this.spots.forEach(function (spot, index) {
      if (spot.name.toLowerCase().includes(search.toLowerCase()))
        searchResult.push(spot);
    })
    console.log(searchResult);
    this.searchResult = searchResult;
  }

  private setCurrentPosition() {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.lat = position.coords.latitude;
        this.lng = position.coords.longitude;
      });
    }
  }
}