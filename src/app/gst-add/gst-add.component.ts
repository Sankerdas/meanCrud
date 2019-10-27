import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DataService } from '../data.service';

@Component({
  selector: 'app-gst-add',
  templateUrl: './gst-add.component.html',
  styleUrls: ['./gst-add.component.css']
})
export class GstAddComponent implements OnInit {

  constructor( private fb: FormBuilder, private ds: DataService) { }

  businessForm: FormGroup = this.fb.group({
      prsn_name: ['', Validators.required],
      bsns_name: ['', Validators.required],
      bsns_gst_num: ['', Validators.required],
  });

  businessFormSubmit() {
    this.ds.addBusiness(this.businessForm.value);
  }

  ngOnInit() {
  }

}
