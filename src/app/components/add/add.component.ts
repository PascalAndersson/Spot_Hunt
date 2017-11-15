import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormArray, FormBuilder } from '@angular/forms';
import { Observable } from 'rxjs/Observable'; // ?
import { DbService } from '../../services/db.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css'],
})


export class AddComponent implements OnInit {


  addSpotFormGroup = new FormGroup({
    name: new FormControl(),
    description: new FormControl(),
    categories: new FormArray([
      
    ])
  });

  newSpot: any;

  constructor(
    private dbService: DbService
  ) { }

  ngOnInit() {
  }

  submitFormValue(){
    this.newSpot = this.addSpotFormGroup.value;
    this.dbService.addSpot(this.newSpot);
  }
}


