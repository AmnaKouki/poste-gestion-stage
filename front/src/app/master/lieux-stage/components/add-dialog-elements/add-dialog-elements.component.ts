import { HttpClient } from '@angular/common/http';
import { Component, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HotToastService } from '@ngneat/hot-toast';
import { environment } from 'src/environments/environment';
import { LieuStage } from '../../lieux-stage.component';
import { EditDialogElements } from '../edit-dialog-elements/edit-dialog-elements.component';

@Component({
  selector: 'AddDialogElements',
  templateUrl: 'AddDialogElements.html',
  styleUrls: ['./add-dialog-elements.component.css'],
})
export class AddDialogElements {
  // id !:string;

  constructor(
    private http: HttpClient,
    public dialogRef: MatDialogRef<EditDialogElements>,
    @Inject(MAT_DIALOG_DATA) public data: LieuStage,
    private toastService: HotToastService
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnchange() {}

  formulaire = new FormGroup({
    id: new FormControl(),
    adresse: new FormControl('', [Validators.required]),
    adresseFr: new FormControl('', [Validators.required]),
    codePostal: new FormControl('', [
      Validators.required,
      Validators.minLength(4),
      Validators.pattern('^[0-9]{4}$'),
    ]),
  });

  ajoutLieuStage() {
    if (this.formulaire.status == 'INVALID') {
      this.toastService.error('لقد وقع خطأ ');
    } else {
      let data = this.formulaire.value;
      let body = {
        adresse: data.adresse,
        adresseFr: this.formulaire.value.adresseFr,
        codePostal: this.formulaire.value.codePostal,
      };
      this.http
        .post(`${environment.BACKEND_URL}/lieu-de-stage/add`, body)
        .subscribe(
          (data) => {
            this.toastService.success('تم إضافة المقر بنجاح ');

            this.dialogRef.close({
              event: 'add',
            });

            this.ngOnchange();
          },
          (err) => {
            console.warn(err);
            this.toastService.error('لقد حدث خطأ ما ');
          }
        );
    }
  }
}
