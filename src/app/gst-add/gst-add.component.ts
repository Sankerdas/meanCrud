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
      bsns_logo: ['', Validators.required],
  });

  imagePreview: any;

  fileSelect(e) {
    if (e.target.files && e.target.files.length) {
      const uploadedFiles = e.target.files[0]; // getting file
      this.businessForm.patchValue({bsns_logo: uploadedFiles}); // patching form group and adding value
      this.businessForm.get('bsns_logo').updateValueAndValidity(); //  validating
      const reader = new FileReader(); // file reading for previewing
      reader.onload = () => {
        this.imagePreview = reader.result;
      };
      reader.readAsDataURL(uploadedFiles);
    }
   }

  businessFormSubmit() {
    this.ds.addBusiness(this.businessForm.value).subscribe(res => {
      this.businessForm.reset();
      this.imagePreview = '';
      console.log(res);
    } );
    // console.log(this.businessForm.value);
  }

  ngOnInit() {
  }

}
