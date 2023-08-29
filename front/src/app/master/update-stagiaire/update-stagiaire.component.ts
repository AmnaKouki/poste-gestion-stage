import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DateAdapter, ErrorStateMatcher } from '@angular/material/core';
import { HotToastService } from '@ngneat/hot-toast';

declare var require: any;
const moment = require('moment');
@Component({
  selector: 'app-update-stagiaire',
  templateUrl: './update-stagiaire.component.html',
  styleUrls: ['./update-stagiaire.component.css'],
})
export class UpdateStagiaireComponent {
  constructor(
    private http: HttpClient,
    private toastService: HotToastService
  ) {}
  getJsonValue: any;
  postJsonValue: any;
  getCin!: string;
  found: boolean = false;
  notFound: boolean = false;
  updated: boolean = false;

  public getCinMethode(cin: string) {
    this.http
      .get('http://localhost:9000/stagiaire/find-by-cin/' + cin)
      .subscribe(
        (data) => {
          this.getJsonValue = data;
          console.log("get data : "+ this.getJsonValue.dateNaissance);
          
          this.found = true;
          this.notFound = false;
          this.getCin = this.getJsonValue.cin;

          let formatedDate = moment(
            this.getJsonValue.dateNaissance
          ).format('YYYY-MM-DD');

          this.updateFormulaire.patchValue({
            nomArabe: this.getJsonValue.nomArabe,
            prenomArabe: this.getJsonValue.prenomArabe,
            nomFr: this.getJsonValue.nomFr,
            prenomFr: this.getJsonValue.prenomFr,
            adresse: this.getJsonValue.adresse,
            telephone: this.getJsonValue.telephone,
            mail: this.getJsonValue.mail,
            cin: this.getJsonValue.cin,
            dateNaissance: formatedDate,
          });
        },
        (error) => {
          if (error.status === 404) {
            this.toastService.error('هذا المتربص غير موجود');
            this.found = false;
            this.notFound = true;
          } else {
            // Handle other errors
            this.toastService.error('هذا المتربص غير موجود');
            this.notFound = true;
          }
        }
      );
  }
 
  public updateMethode() {
    let body = this.updateFormulaire.value;
    this.updateFormulaire.value.dateNaissance = moment(
      this.updateFormulaire.value.dateNaissance
    ).format('YYYY-MM-DD');
    this.http
      .post('http://localhost:9000/stagiaire/update/' + this.getCin, body)
      .subscribe(
        (data) => {
          this.postJsonValue = data;
          this.updated = true;
          console.log('updated successfully');
          this.toastService.success('تم التعديل بنجاح ');
        },
        (err) => {
          console.warn(err);
          this.toastService.error('لقد حدث خطأ ما ');
        }
      );
  }

  updateFormulaire = new FormGroup({
    nomFr: new FormControl('', [Validators.required]),
    prenomFr: new FormControl('', [Validators.required]),
    nomArabe: new FormControl('', [Validators.required]),
    prenomArabe: new FormControl('', [Validators.required]),
    cin: new FormControl('', [Validators.required, Validators.minLength(8)]),
    telephone: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
    ]),
    mail: new FormControl('', [Validators.required, Validators.email]),
    adresse: new FormControl('', [Validators.required]),
    dateNaissance: new FormControl('', [Validators.required]),
  });

  matcher = new ErrorStateMatcher();

  showToast() {
    this.toastService.show('Hello World!');
    this.toastService.success('Successfully toasted!');
  }
}
