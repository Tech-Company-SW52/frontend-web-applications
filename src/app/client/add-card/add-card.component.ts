import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { catchError, retry, throwError } from 'rxjs';

interface Vehicle {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-add-card',
  templateUrl: './add-card.component.html',
  styleUrls: ['./add-card.component.css']
})
export class AddCardComponent implements OnInit {
  user_id= 1;
  Cards_user: Array<any> = [];
  form: any;
  AddForm: FormGroup;
  filteredVehicules: any;

  searchForm: FormGroup = this.formBuilder.group({
    Type_s: ['Bus', {updateOn: 'change' }],
    Size_s: ['Bus', {updateOn: 'change' }]
  });

  Type: Vehicle[] = [
    {value: 'vehicle-0', viewValue: 'Bus'},
    {value: 'vehicle-1', viewValue: 'Van'},
    {value: 'vehicle-2', viewValue: 'Cargo Truck'},
    {value: 'vehicle-3', viewValue: 'Truck'},
  ];
  
  basePath = 'http://localhost:3000/api/v1/';

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json' //Solo acepta json
    })
  }

  constructor(private fb: FormBuilder, public formBuilder: FormBuilder, private http: HttpClient, private router:Router) { 
    this.AddForm = this.formBuilder.group({
      region: ['', { validators: [Validators.required], updatedOn: 'change' }],
      phone: ['', { updatedOn: 'change' }],
      title: ['', { validators: [Validators.required], updatedOn: 'change' }],
      type: ['', { validators: [Validators.required], updatedOn: 'change' }],
      email: ['', { validators: [Validators.required, Validators.email], updatedOn: 'change' }],
      Direction: ['', { validators: [Validators.required], updatedOn: 'change' }],
      postal: ['', { validators: [Validators.required], updatedOn: 'change' }],
      name: ['', { validators: [Validators.required], updatedOn: 'change' }],
      Number_Card: ['', { validators: [Validators.required], updatedOn: 'change' }],
      Date: ['', { validators: [Validators.required], updatedOn: 'change' }],
      CVV: ['', { validators: [Validators.required], updatedOn: 'change' }]
    })
  }
  //API error handling
  handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      //Client-side errors || default error handling
      console.error('An error occurred: ${error.error.message}');
    } else {
      //Server-side errors || unsuccesful response error code returned from backend
      console.error(
        `Backend returned code ${error.status}, body was: ${error.error}`);
    }
    //Return observable with error message to client
    return throwError(
      'Something bad happened; please try again later.');
  }
  ngOnInit(): void {
    this.getCards(this.user_id).subscribe((data: any) => {
      this.Cards_user = data;
      console.log(data);
    });
    this.setPhoneValidation();
    // this.form = this.fb.group({
    //   creditCard: [],
    //   creditCardDate: [],
    //   creditCardCvv: [],
    // });
  }
  getCards(id: any) {
    return this.http.get(`${this.basePath}cards?id=${id}`);
  }
  get region() {
    return this.AddForm.get('region');
  }
  get phone() {
    return this.AddForm.get('phone');
  }
  get title(){
    return this.AddForm.get('title');
  }
  get type(){
    return this.AddForm.get('type');
  }
  get email(){
    return this.AddForm.get('email');
  }
  get Direction(){
    return this.AddForm.get('Direction');
  }
  get postal(){
    return this.AddForm.get('postal');
  }
  get name(){
    return this.AddForm.get('name');
  }
  get Number_Card(){
    return this.AddForm.get('Number_Card');
  }
  get Date(){
    return this.AddForm.get('Date');
  }
  get CVV(){
    return this.AddForm.get('CVV');
  }
  onSubmit() {
    console.log(this.AddForm.valid);
  }
  
  setPhoneValidation() {
    const phoneControl = this.AddForm.get('phone');
    phoneControl?.setValidators([Validators.pattern('^[0-9]*$'), Validators.required]);
  }
  // listSearch() {
  //   this.getVehicules().subscribe((data: any) => {
  //     this.filteredVehicules = data;
  //   });
  //   console.log(this.filteredVehicules)
  // }

  // setPhoneValidation() {
  //   const phoneControl = this.signupForm.get('phone');
  //   phoneControl?.setValidators([Validators.pattern('^[0-9]*$'), Validators.required]);
  // }
  // get phone() {
  //   return this.signupForm.get('phone');
  // }

}
