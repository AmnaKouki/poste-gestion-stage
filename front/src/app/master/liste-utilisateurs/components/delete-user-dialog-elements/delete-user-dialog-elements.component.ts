import { Component, Inject } from '@angular/core';
import { Utilisateur } from '../../liste-utilisateurs.component';
import { HttpClient } from '@angular/common/http';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HotToastService } from '@ngneat/hot-toast';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-delete-user-dialog-elements',
  templateUrl: './delete-user-dialog-elements.component.html',
  styleUrls: ['./delete-user-dialog-elements.component.css']
})
export class DeleteUserDialogElements {

  constructor(
    private http: HttpClient,
    public dialogRef: MatDialogRef<DeleteUserDialogElements>,
    @Inject(MAT_DIALOG_DATA) public data: Utilisateur,
    private toastService: HotToastService
  ) {
    this.data = data;
    
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnchange() {
  }
  deleteUser() {
    this.http
      .delete(`${environment.BACKEND_URL}/user/delete/` + this.data.matricule)
      .subscribe(
        (data) => {
          this.toastService.success('تم الحذف بنجاح ');
          this.dialogRef.close({
            event: 'delete'
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
