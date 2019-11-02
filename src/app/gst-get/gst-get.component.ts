import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { Business } from '../Business'; // business model class imported

@Component({
  selector: 'app-gst-get',
  templateUrl: './gst-get.component.html',
  styleUrls: ['./gst-get.component.css']
})
export class GstGetComponent implements OnInit {

  businesses: Business[]; // using Business model class

  constructor(private ds: DataService ) { }

  ngOnInit() {
    this.ds.getBusiness().subscribe(
      (data: Business[]) => {
        this.businesses = data;
      }
    );
  }

}
