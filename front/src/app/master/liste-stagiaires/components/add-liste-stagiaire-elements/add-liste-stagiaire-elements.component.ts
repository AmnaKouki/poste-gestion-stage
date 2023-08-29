import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, Validators, FormGroup, FormGroupDirective, NgForm } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { MatDialogRef } from '@angular/material/dialog';
import { HotToastService } from '@ngneat/hot-toast';

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
  selector: 'app-add-liste-stagiaire-elements',
  templateUrl: './add-liste-stagiaire-elements.component.html',
  styleUrls: ['./add-liste-stagiaire-elements.component.css']
})
export class AddListeStagiaireElementsComponent {
  constructor(
    public dialogRef: MatDialogRef<AddListeStagiaireElementsComponent>,
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
            this.toastService.error('رقم ب.ت.و مسجل مسبقا. الرجاء التثبت ');
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
            this.dialogRef.close({
              event: 'add',
            });

            this.ngOnchange();
            
          }
        );
    }

  }
ngOnchange() {}
  
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
