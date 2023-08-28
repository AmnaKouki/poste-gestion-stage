import { HttpClient } from '@angular/common/http';
import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HotToastService } from '@ngneat/hot-toast';
import { Utilisateur } from '../../liste-utilisateurs.component';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { environment } from 'src/environments/environment';
import {MatChipsModule} from '@angular/material/chips';

@Component({
  selector: 'app-edit-user-dialog-elements',
  templateUrl: './edit-user-dialog-elements.component.html',
  styleUrls: ['./edit-user-dialog-elements.component.css'],
})
export class EditUserDialogElements {
  constructor(
    private http: HttpClient,
    public dialogRef: MatDialogRef<EditUserDialogElements>,
    @Inject(MAT_DIALOG_DATA) public data: Utilisateur,
    private toastService: HotToastService
  ) {
    this.assignDataToForm(data);
    this.tmpMatricule = data.matricule;
  }

  tmpMatricule = '';
  
  onNoClick(): void {
    this.dialogRef.close();
  }
  updateFormulaire = new FormGroup({
    matricule: new FormControl(),
    nomArabe: new FormControl('', [Validators.required]),
    prenomArabe: new FormControl('', [Validators.required]),
    nomFr: new FormControl('', [Validators.required]),
    prenomFr: new FormControl('', [Validators.required]),
    cin: new FormControl('', [Validators.required]),
    telephone: new FormControl('', [Validators.required]),

    siegeAdministratif: new FormControl('', [Validators.required]),
    administration: new FormControl('', [Validators.required]),
    fonction: new FormControl('', [Validators.required]),
    photoPath: new FormControl(),
    role: new FormControl(),
    password: new FormControl(),
    // password: new FormControl(),
    
  });

  assignDataToForm(data: any) {
    
    
    this.updateFormulaire.patchValue({
      
      matricule: data.matricule,
      nomArabe: data.nomArabe,
      prenomArabe: data.prenomArabe,
      nomFr: data.nomFr,
      prenomFr: data.prenomFr,
      cin: data.cin,
      telephone: data.telephone,
      siegeAdministratif: data.siegeAdministratif,
      administration: data.administration,
      fonction: data.fonction,
      photoPath : data.photoPath,
      role: data.role == "ROLE_USER" ? "user": "admin",
      // password: data.password,

    });
    console.log(this.updateFormulaire.value.role);
    
  }
  ngOnchange() {
  }

  updateUtilisateur() {
    let body = this.updateFormulaire.value;
    let newBody = {
      
        "username": body.matricule,
        "nomArabe": body.nomArabe,
        "prenomArabe": body.prenomArabe,
        "nomFr": body.nomFr,
        "prenomFr": body.prenomFr,
        "cin": body.cin,
        "siegeAdministratif": body.siegeAdministratif,
        "fonction": body.fonction,
        "administration": body.administration,
        "telephone": body.telephone,
        "roles": [
          body.role,
        ],
        "password": body.password,
      
    }
    
  
    this.http
      .post(`${environment.BACKEND_URL}/user/modify/` + this.tmpMatricule , newBody)
      .subscribe(
        (data: any) => {

          if (data.status && data.status === "false") {
            this.toastService.error('الرقم الآلي موجود مسبقا. الرجاء تغيير الرقم')
            return;
          }

          this.toastService.success('تم التعديل بنجاح ');

          this.dialogRef.close({
            event: 'edit'
          });
          
        },

        (err) => {
          console.warn(err);
          this.toastService.error('لقد حدث خطأ ما ');
        }
      );


  }

}
