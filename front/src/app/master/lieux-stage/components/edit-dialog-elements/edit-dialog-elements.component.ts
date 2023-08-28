import { HttpClient } from '@angular/common/http';
import { Component, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HotToastService } from '@ngneat/hot-toast';
import { environment } from 'src/environments/environment';
import { LieuStage } from '../../lieux-stage.component';

@Component({
  selector: 'EditDialogElements',
  templateUrl: 'editDialogElements.html',
  styleUrls: ['./edit-dialog-element.component.css'],
})
export class EditDialogElements {
  // id !:string;

  constructor(
    private http: HttpClient,
    public dialogRef: MatDialogRef<EditDialogElements>,
    @Inject(MAT_DIALOG_DATA) public data: LieuStage,
    private toastService: HotToastService
  ) {
    // console.log(data);
    this.assignDataToForm(data);
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
  updateFormulaire = new FormGroup({
    id: new FormControl(),
    adresse: new FormControl('', [Validators.required]),
    adresseFr: new FormControl('', [Validators.required]),
    codePostal: new FormControl('', [
      Validators.required,
      Validators.minLength(4),
    ]),
  });

  assignDataToForm(data: any) {
    this.updateFormulaire.patchValue({
      id: data.id,
      adresse: data.adresse,
      adresseFr: data.adresseFr,
      codePostal: data.codePostal,
    });
  }
  ngOnchange() {
    console.log('edit change');
    //LieuxStageComponent;
  }
  updateLieuStage() {
    if (this.updateFormulaire.status === 'INVALID') {
      this.toastService.error('لقد حدث خطأ ما ');
    } else {
      let body = this.updateFormulaire.value;
      console.log(body);

      this.http
        .post(
          `${environment.BACKEND_URL}/lieu-de-stage/update/` + body.id,
          body
        )
        .subscribe(
          (data) => {
            this.toastService.success('تم التعديل بنجاح ');

            this.dialogRef.close({
              event: 'edit',
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
