// import { Component, OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { Http } from '@angular/http';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
// export class HomeComponent implements OnInit {
export class HomeComponent {

  //Read data from json file containing design for google map
  constructor(private http: Http) {
    this.http.get('assets/google-maps-design.json')
      .subscribe(res => this.style = res.json());
  }

  //Set starting position and zoom level
  zoom: number = 10;
  lat: number = 59.315305976994274;
  lng: number = 18.079376220703125;

  // Set custom style
  style: object = []


  // Set the image and properties of the google maps marker
  icon: object = {
    url: 'https://vignette.wikia.nocookie.net/zombie/images/1/1d/Skateboard-0.jpg/revision/latest?cb=20150924103844', // gives a data://<value>
    scaledSize: {
      height: 40,
      width: 40
    }
  }

  markers: markers[] = [
    {
      name: "compnay one",
      lat: 59.312485,
      lng: 18.079257,
      draggable: true,
    },
    {
      name: "compnay two",
      lat: 59.325341,
      lng: 18.063053,
      draggable: false
    },
    {
      name: "compnay three",
      lat: 59.306106,
      lng: 18.030910,
      draggable: false
    }
  ];



  clickedMarker(marker: markers, index: number) {
    console.log("clicked marker: " + marker.name + " at index " + index);
  }

  mapClicked($event: any) {
    console.log('lat: ' + $event.coords.lat + " | lng: " + $event.coords.lng)
    var newMarker = {
      name: "Untitled",
      lat: $event.coords.lat,
      lng: $event.coords.lng,
      draggable: true
    }

    this.markers.push(newMarker);
  }

  markerDragEnd(marker: any, $event: any) {
    console.log("dragend", marker, $event);

    var updMarker = {
      name: marker.name,
      lat: parseFloat(marker.lat),
      lng: parseFloat(marker.lng),
      draggable: false
    }

    var newLat = $event.coords.lat;
    var newLng = $event.coords.lng;
  }
}

interface markers {
  name?: string;
  lat: number;
  lng: number;
  draggable: boolean;
  // icon?: any;

  // Skate lingo
  curbs?: boolean;
  rails?: boolean;
  stairs?: boolean;
  ledges?: boolean;
  plaza?: boolean;
  transition?: boolean;

}
