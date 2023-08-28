import { HttpClient } from '@angular/common/http';
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { HotToastService } from '@ngneat/hot-toast';
import { Utilisateur } from '../../liste-utilisateurs.component';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-add-user-dialog-elements',
  templateUrl: './add-user-dialog-elements.component.html',
  styleUrls: ['./add-user-dialog-elements.component.css'],
})
export class AddUserDialogElements {
  constructor(
    private http: HttpClient,
    public dialogRef: MatDialogRef<AddUserDialogElements>,
    @Inject(MAT_DIALOG_DATA) public data: Utilisateur,
    private toastService: HotToastService
  ) {
    // this.assignDataToForm(data);
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
  addFormulaire = new FormGroup({
    matricule: new FormControl('', [
      Validators.required,
      Validators.pattern('^[0-9]{4,9}$'),
      Validators.minLength(4),
    ]),
    nomArabe: new FormControl('', [Validators.required]),
    prenomArabe: new FormControl('', [Validators.required]),
    nomFr: new FormControl('', [Validators.required]),
    prenomFr: new FormControl('', [Validators.required]),
    cin: new FormControl('', [
      Validators.required,
      Validators.minLength(7),
      Validators.pattern('^[0-9]{7,9}$'),
    ]),
    telephone: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
      Validators.pattern('^[0-9]{7,9}$'),
    ]),

    siegeAdministratif: new FormControl('', [Validators.required]),
    administration: new FormControl('', [Validators.required]),
    fonction: new FormControl('', [Validators.required]),
    photoPath: new FormControl(''),

    role: new FormControl('admin', [Validators.required]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
    ]),
  });

  addUser() {
    if (this.addFormulaire.status === "INVALID") {
      this.toastService.error('يجب عليك تعمير جميع البيانات');
      return;
    }

    let body: any = this.addFormulaire.value;
    body.role = [body.role];
    body.username = body.matricule;
    delete body.matricule;
    console.log(body);
    
    //check if matricule exists
    this.http
      .get(
        'http://localhost:9000/users/exist/' +
          this.addFormulaire.value.matricule
      )
      .subscribe((data: any) => {
        if (data.status) {
          // user exists
          this.toastService.error('هذا المستعمل موجد مسبقا');
        } else {
          // user not existing

          this.createNewUser(body).subscribe((res) => {
            this.toastService.success('تم إضافة هذا المستعمل');
            this.dialogRef.close({
              event: 'add',
            });

          }, err => {
            this.toastService.error('لقد حدث خطأ ما ');
          });

          // this.createNewUser(body).subscribe((res: any) => {
          //   this.toastService.success('تم إضافة هذا المستعمل');
          //   // this.dialogRef.close({
          //   //   event: 'add',
          //   // });
          // });
          // }, (err: any) => {
          //   this.toastService.error('لقد حدث خطأ ما ');
          // });
        }
      });
  }

  createNewUser(body: any) {
    return this.http.post(`http://localhost:9000/api/auth/signup`, body);
  }

  //       if (data.status ) {
  //         this.toastService.error('هذا المستعمل موجد مسبقا');
  //       } else {
  //         this.http
  //           .post(`${environment.BACKEND_URL}auth/signup/`, body)
  //           .subscribe(
  //             (res) => {
  //               this.toastService.success('تم إضافة هذا المستعمل');
  //               this.dialogRef.close({
  //                 event: 'add',
  //               });
  //             },
  //             (err) => {
  //               console.warn(err);
  //               this.toastService.error('لقد حدث خطأ ما ');
  //             }
  //           );
  //       }
  //     });
  // }
}
