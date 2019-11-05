import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  uri = 'http://localhost:4000/business';

  constructor(private http: HttpClient) { }

  addBusiness(fmVal) {
    const obj = {
      prsn_name: fmVal.prsn_name,
      bsns_name: fmVal.bsns_name,
      bsns_gst_num: fmVal.bsns_gst_num
    };
    // sending to node using post method in http
    this.http.post(`${this.uri}/add`, obj)
    .subscribe( res => console.log('Done') );
  }

  getBusiness() {
    return this.http.get(`${this.uri}`);
  }

  editBusiness(id) {
    return this.http.get(`${this.uri}/edit/${id}`);
  }

  updateBusiness(data, id) {
    const dataObj = {
      prsn_name: data.prsn_name,
      bsns_name: data.bsns_name,
      bsns_gst_num: data.bsns_gst_num
    };
    return this.http.post(`${this.uri}/update/${id}`, dataObj);
  }

  deleteBusiness(id) {
    return this.http.get(`${this.uri}/delete/${id}`);
  }

}
