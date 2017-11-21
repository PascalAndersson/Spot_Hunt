import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';

@Component({
 selector: 'app-home',
 templateUrl: './home.component.html',
 styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
 // export class HomeComponent {

 //Read data from json file containing design for google map
 constructor(private http: Http) {
   this.http.get('assets/google-maps-design.json')
     .subscribe(res => this.style = res.json());
 }

 // Set the image and properties of the google maps marker
 icon: object = {
   url: 'assets/SpotHuntPin2.png', // gives a data://<value>
   scaledSize: {
     height: 30,
     width: 30
   }
 }

 //Set starting position and zoom level
 zoom: number = 12;
 lat: number = 59.315305976994274;
 lng: number = 18.079376220703125;

 // Set custom style
 style: object = []

 // Array containing all markers and their props
 markers: markers[] = [
   {
     name: "Grävskopan",
     lat: 59.312485,
     lng: 18.079257,
     draggable: false,
   },
   {
     name: "Kräftan",
     lat: 59.325341,
     lng: 18.063053,
     draggable: false
   },
   {
     name: "gr8 gr4jnd",
     lat: 59.306106,
     lng: 18.030910,
     draggable: false
   }
 ];

 filteredMarkers: markers[] = [];

 filterMarkersNameSearch(event: any) {
   var searchResult = [];
   var testName = event.target.value;

   this.markers.forEach(function (item, index) {
     if (item.name.toLowerCase().includes(testName.toLowerCase())) {
       searchResult.push(item);
     }
   })
   this.filteredMarkers = searchResult;
 }

 ngOnInit() {
   this.filteredMarkers = this.markers;
   // Center map on the users current position
   this.setCurrentPosition();
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

//   clickedMarker(marker: markers, index: number) {
//     console.log("clicked marker: " + marker.name + " at index " + index);
//   }

//   mapClicked($event: any) {
//     console.log('lat: ' + $event.coords.lat + " | lng: " + $event.coords.lng)
//     var newMarker = {
//       name: "Untitled",
//       lat: $event.coords.lat,
//       lng: $event.coords.lng,
//       draggable: true
//     }

//     console.log(newMarker);
//     this.markers.push(newMarker);
//   }

//   markerDragEnd(marker: any, $event: any) {
//     console.log("dragend", marker, $event);

//     var updMarker = {
//       name: marker.name,
//       lat: parseFloat(marker.lat),
//       lng: parseFloat(marker.lng),
//       draggable: false
//     }

//     var newLat = $event.coords.lat;
//     var newLng = $event.coords.lng;
//   }