import { HttpClient } from '@angular/common/http';
import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HotToastService } from '@ngneat/hot-toast';
import { environment } from 'src/environments/environment';
import { Stagiaire } from '../../liste-stagiaires.component';

@Component({
  selector: 'app-delete-liste-stagiaire-elements',
  templateUrl: './delete-liste-stagiaire-elements.component.html',
  styleUrls: ['./delete-liste-stagiaire-elements.component.css']
})


export class DeleteListeStagiaireElementsComponent {
  
  constructor(
    private http: HttpClient,
    public dialogRef: MatDialogRef<DeleteListeStagiaireElementsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Stagiaire,
    private toastService: HotToastService
  ) {
    this.data = data;
    
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnchange() {
  }
  deleteStagiaire() {
    

    this.http
      .delete(`${environment.BACKEND_URL}/stagiaire/delete/` + this.data.id)
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
