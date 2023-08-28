import { HttpClient } from '@angular/common/http';
import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HotToastService } from '@ngneat/hot-toast';
import { Stage } from '../../liste-stages.component';

@Component({
  selector: 'app-show-stage',
  templateUrl: './show-stage.component.html',
  styleUrls: ['./show-stage.component.css'],
})
export class ShowStageComponent {
  typeStage: any;
  constructor(
    private http: HttpClient,
    public dialogRef: MatDialogRef<ShowStageComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Stage,
    private toastService: HotToastService
  ) {
    this.data = data;
    this.convertTypeStage();
  }

  //change the name to arabic
  convertTypeStage() {
    switch (this.data.stage.typeStage) {
      case 'Stage Ouvrier': {
        this.typeStage = 'تربص عامل ';
        break;
      }
      case 'Stage Perfectionnement': {
        this.typeStage = 'تربص تحسيني ';
        break;
      }

      case 'Stage niveau Mastere': {
        this.typeStage = ' تربص مستوى ماجيستير';
        break;
      }
      case "Projet de Fin d'Etudes": {
        this.typeStage = ' مشروع ختم الدروس ';
        break;
      }
      case "Stage en Cycle d'Ingénieur": {
        this.typeStage = 'تربص مستوى هندسة ';
        break;
      }
    }
  }
}
