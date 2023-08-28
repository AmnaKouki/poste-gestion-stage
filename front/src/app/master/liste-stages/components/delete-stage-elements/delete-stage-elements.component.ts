import { HttpClient } from '@angular/common/http';
import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HotToastService } from '@ngneat/hot-toast';
import { DeleteUserDialogElements } from 'src/app/master/liste-utilisateurs/components/delete-user-dialog-elements/delete-user-dialog-elements.component';
import { environment } from 'src/environments/environment';
import { Stage } from '../../liste-stages.component';

@Component({
  selector: 'app-delete-stage-elements',
  templateUrl: './delete-stage-elements.component.html',
  styleUrls: ['./delete-stage-elements.component.css']
})
export class DeleteStageElementsComponent {
  
  constructor(
    private http: HttpClient,
    public dialogRef: MatDialogRef<DeleteStageElementsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Stage,
    private toastService: HotToastService
  ) {
    this.data = data;
    
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnchange() {
  }
  deleteStage() {
    console.log(this.data.stage.id);
    
    this.http
      .delete(`${environment.BACKEND_URL}/stage/delete/` + this.data.stage.id)
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
