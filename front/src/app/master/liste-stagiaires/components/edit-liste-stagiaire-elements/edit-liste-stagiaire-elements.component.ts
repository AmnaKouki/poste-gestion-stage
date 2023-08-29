import { HttpClient } from '@angular/common/http';
import { Component, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { HotToastService } from '@ngneat/hot-toast';
import * as moment from 'moment';
import { Stagiaire } from '../../liste-stagiaires.component';

@Component({
  selector: 'app-edit-liste-stagiaire-elements',
  templateUrl: './edit-liste-stagiaire-elements.component.html',
  styleUrls: ['./edit-liste-stagiaire-elements.component.css'],
})
export class EditListeStagiaireElementsComponent {
  constructor(
    public dialogRef: MatDialogRef<EditListeStagiaireElementsComponent>,
    private http: HttpClient,
    private toastService: HotToastService,
    @Inject(MAT_DIALOG_DATA) public data: Stagiaire
  ) {
    this.data = data;
    
  }

  updateFormulaire = new FormGroup({
    id: new FormControl(this.data.id),
    nomFr: new FormControl(this.data.nomFr, [Validators.required]),
    prenomFr: new FormControl(this.data.prenomFr, [Validators.required]),
    nomArabe: new FormControl(this.data.nomArabe, [Validators.required]),
    prenomArabe: new FormControl(this.data.prenomArabe, [Validators.required]),
    cin: new FormControl(this.data.cin, [Validators.required, Validators.minLength(8)]),
    telephone: new FormControl(this.data.telephone, [
      Validators.required,
      Validators.minLength(8),
    ]),
    mail: new FormControl(this.data.mail, [Validators.required, Validators.email]),
    adresse: new FormControl(this.data.adresse, [Validators.required]),
    dateNaissance: new FormControl(this.data.dateNaissance, [Validators.required]),
  });

  // assignDataToForm(row: any) {
  //   this.updateFormulaire.patchValue({
  //     id: row.id,
  //     nomFr: row.nomFr,
  //     prenomFr: row.prenomFr,
  //     nomArabe: row.nomArabe,
  //     prenomArabe: row.prenomArabe,
  //     cin: row.cin,
  //     telephone: row.telephone,
  //     mail: row.mail,
  //     adresse: row.adresse,
  //     dateNaissance: row.dateNaissance,
  //   });
  // }

  ngOnchange() {}

  updated: boolean = false;

  public updateMethode() {
   
    this.updateFormulaire.value.dateNaissance = moment(
      this.updateFormulaire.value.dateNaissance
    ).format('YYYY-MM-DD');
    let body = this.updateFormulaire.value;
    body.dateNaissance = moment(body.dateNaissance).format('YYYY-MM-DD');
    this.http
      .post('http://localhost:9000/stagiaire/update/' + this.data.cin, body)
      .subscribe(
        (data) => {
          this.updated = true;
          
          this.toastService.success('تم التعديل بنجاح ');
          this.dialogRef.close({
            event: 'edit',
          });
        },
        (err) => {
          console.warn(err);
          this.toastService.error('لقد حدث خطأ ما ');
        }
      );
  }

  matcher = new ErrorStateMatcher();
}
