import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { DataService } from '../data.service';


@Component({
  selector: 'app-gst-edit',
  templateUrl: './gst-edit.component.html',
  styleUrls: ['./gst-edit.component.css']
})
export class GstEditComponent implements OnInit {

  business: any = {};
  editBusinessForm: FormGroup;

  constructor( private route: ActivatedRoute, private router: Router, private ds: DataService, private fb: FormBuilder ) {
    this.editForm();
   }

  editForm() {
    this.editBusinessForm = this.fb.group({
      prsn_name: ['', Validators.required],
      bsns_name: ['', Validators.required],
      bsns_gst_num: ['', Validators.required]
    });
  }

  editBusiness() {
    this.route.params.subscribe(params => {
      this.ds.updateBusiness(this.editBusinessForm.value, params['id']);
    });
  }

  ngOnInit() {
    // Activated route is use to get params
    this.route.params.subscribe(params => {
      const id = params['id']; // params is extracted from request url then passed as arguiment
      this.ds.editBusiness(id).subscribe(res => {
        this.business = res; // response contains single record that matches the id
      });
    });
  }


}
