import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css'],
})
export class AddComponent implements OnInit {

  addSpotFormGroup = new FormGroup({
    name: new FormControl(),
    description: new FormControl()
  })

  constructor() { }

  ngOnInit() {
  }
 
}
