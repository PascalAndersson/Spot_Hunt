import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormArray, FormBuilder } from '@angular/forms';
import { Observable } from 'rxjs/Observable'; // ?
import { DbService } from '../../services/db.service';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Http } from '@angular/http';
@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css'],
})


export class AddComponent implements OnInit {

  constructor(
    private modalService: NgbModal,
    private dbService: DbService,
    private http: Http
  ) {
    this.http.get('assets/google-maps-design.json')
      .subscribe(res => this.style = res.json());
  }
  // Set custom style
  style: object = []

  //Set starting position and zoom level
  zoom: number = 12;
  lat: number = 59.315305976994274;
  lng: number = 18.079376220703125;


  icon: object = {
    url: 'assets/SpotHuntPin2.png', // gives a data://<value>
    scaledSize: {
      height: 30,
      width: 30
    }
  }

  markerLat;
  markerLng;

  // marker: object = {
  //   lat: null,
  //   lng: null,
  // };

  mapClicked($event) {
    console.log("lat: " + $event.coords.lat + " | lng: " + $event.coords.lng);
    this.markerLat = $event.coords.lat;
    this.markerLng = $event.coords.lng;
    this.addSpotFormGroup.controls['lat'].setValue($event.coords.lat);
    this.addSpotFormGroup.controls['lng'].setValue($event.coords.lng);
  }


  // This string does something with the modal x'DDD
  closeResult: string;


  open(content) {
    this.modalService.open(content).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  addSpotFormGroup = new FormGroup({
    name: new FormControl(),
    lat: new FormControl(),
    lng: new FormControl(),
    description: new FormControl(),
    curbs: new FormControl(false),
    rails: new FormControl(false),
    stairs: new FormControl(false),
    plaza: new FormControl(false),
    transition: new FormControl(false)
  });

  newSpot: any;



  ngOnInit() { 
       // Center map on the users current position
       this.setCurrentPosition();
     } 
    
     private setCurrentPosition() {
       if ("geolocation" in navigator) {
         navigator.geolocation.getCurrentPosition((position) => {
           this.markerLat = position.coords.latitude;
           this.lat = position.coords.latitude;
           this.markerLng = position.coords.longitude;
           this.lng = position.coords.longitude;
         });
       }
     }

  submitFormValue() {
    this.newSpot = this.addSpotFormGroup.value;
    this.dbService.addSpot(this.newSpot);
  }
}


