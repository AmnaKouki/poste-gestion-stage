import { Component } from '@angular/core';
import {
  FormGroup,
  FormGroupDirective,
  FormControl,
  NgForm,
  Validators,
} from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { HttpClient } from '@angular/common/http';
import { HotToastService } from '@ngneat/hot-toast';
import { ProvideCinService } from 'src/app/provide-cin.service';
import { Router } from '@angular/router';

/** Error when invalid control is dirty, touched, or submitted. */
declare var require: any;
const moment = require('moment');

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(
    control: FormControl | null,
    form: FormGroupDirective | NgForm | null
  ): boolean {
    const isSubmitted = form && form.submitted;
    return !!(
      control &&
      control.invalid &&
      (control.dirty || control.touched || isSubmitted)
    );
  }
}

@Component({
  selector: 'app-ajout-stagiaire',
  templateUrl: './ajout-stagiaire.component.html',
  styleUrls: ['./ajout-stagiaire.component.css'],
})
export class AjoutStagiaireComponent implements ErrorStateMatcher {
  constructor(
    private router: Router,
    private provideCinService: ProvideCinService,
    private http: HttpClient,
    private toastService: HotToastService
  ) {}
  getJsonValue: any;
  postJsonValue: any;

  matcher = new MyErrorStateMatcher();
  public getMethode() {
    this.http
      .get('http://localhost:9000/stagiaire/find_all')
      .subscribe((data) => {
        console.log(data);
        this.getJsonValue = data;
      });
  }
  public postMethode() {
    if (this.formulaire.status == 'INVALID') {
      this.toastService.error('لقد وقع خطأ ');
    } else {
      this.formulaire.value.dateNaissance = moment(
        this.formulaire.value.dateNaissance
      ).format('DD/MM/YYYY');
      let body = this.formulaire.value;
      let cin = body.cin;
      this.http
        .get('http://localhost:9000/stagiaire/find-by-cin/' + cin)
        .subscribe(
          (data) => {
            this.toastService.error('هذا المتربص مسجل مسبقا');
          },
          (err) => {
            this.http
              .post('http://localhost:9000/stagiaire/add', body)
              .subscribe((data) => {
                console.log(data);
                this.postJsonValue = data;
                ////////////////////////////////////
              });
            this.toastService.success('تمت الإضافة بنجاح');
            // this.passCinToStage();
          }
        );
    }
  }

  // passCinToStage() {
  //   this.toastService.loading('يمكنك إضافة معلومات التربص الآن');
  //   const cin = this.formulaire.value.cin;
  //   this.provideCinService.cin = cin;
  //   this.router.navigate(['./app/ajout-stage']);
  // }

  isErrorState(
    control: FormControl | null,
    form: FormGroupDirective | NgForm | null
  ): boolean {
    const isSubmitted = form && form.submitted;
    return !!(
      control &&
      control.invalid &&
      (control.dirty || control.touched || isSubmitted)
    );
  }


  nomFr = new FormControl('', [Validators.required]);
  mail = new FormControl('', [Validators.required, Validators.email]);
  prenomFr = new FormControl('', [Validators.required]);
  nomArabe = new FormControl('', [Validators.required]);
  prenomArabe = new FormControl('', [Validators.required]);
  cin = new FormControl('', [
    Validators.required,
    Validators.minLength(8),
    Validators.pattern('^[0-9]{7,9}$'),
  ]);
  telephone = new FormControl('', [
    Validators.required,
    Validators.minLength(8),
    Validators.pattern('^[0-9]{8,12}$'),
  ]);

  adresse = new FormControl('', [Validators.required]);
  dateNaissance = new FormControl('', [Validators.required]);

  formulaire = new FormGroup({
    nomFr: new FormControl('', [Validators.required]),
    prenomFr: new FormControl('', [Validators.required]),
    nomArabe: new FormControl('', [Validators.required]),
    prenomArabe: new FormControl('', [Validators.required]),
    cin: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
      Validators.pattern('^[0-9]{7,9}$'),
    ]),
    telephone: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
      Validators.pattern('^[0-9]{8,12}$'),
    ]),
    mail: new FormControl('', [Validators.required, Validators.email]),
    adresse: new FormControl('', [Validators.required]),
    dateNaissance: new FormControl('', [Validators.required]),
  });


  
}
