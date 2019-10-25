import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-gst-add',
  templateUrl: './gst-add.component.html',
  styleUrls: ['./gst-add.component.css']
})
export class GstAddComponent implements OnInit {

  constructor( private fb: FormBuilder) { }

  gstForm: FormGroup = this.fb.group({
      prsn_name: ['', Validators.required],
      bsns_name: ['', Validators.required],
      bsns_gst_num: ['', Validators.required],
  });

  gstFormSubmit() {
    console.log(this.gstForm);
  }

  ngOnInit() {
  }

}
