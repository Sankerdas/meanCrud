import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { Router } from '@angular/router';
import { Business } from '../Business'; // business model class imported

@Component({
  selector: 'app-gst-get',
  templateUrl: './gst-get.component.html',
  styleUrls: ['./gst-get.component.css']
})
export class GstGetComponent implements OnInit {

  businesses: Business[]; // using Business model class

  constructor(private ds: DataService, public router: Router ) { }

  callBusinessList() {
    this.ds.getBusiness().subscribe(
      (data: Business[]) => {
        this.businesses = data;
      }
    );
  }

  delBusiness(id) {
    if (confirm('Do you want to delete this Data..?')) {
      this.ds.deleteBusiness(id).subscribe(res => {
        console.log(res);
        this.callBusinessList();
      });
    }

  }

  ngOnInit() {
    this.callBusinessList();
  }

}
