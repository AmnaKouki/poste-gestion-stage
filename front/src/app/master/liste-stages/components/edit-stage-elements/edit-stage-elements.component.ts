import { HttpClient } from '@angular/common/http';
import { Component, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HotToastService } from '@ngneat/hot-toast';
import { environment } from 'src/environments/environment';
import { Stage } from '../../liste-stages.component';
import * as moment from 'moment';

interface LieuStage {
  id: any;
  adresse: string;
  adresseFr: string;
  codePostal: string;
}
@Component({
  selector: 'app-edit-stage-elements',
  templateUrl: './edit-stage-elements.component.html',
  styleUrls: ['./edit-stage-elements.component.css'],
})
export class EditStageElementsComponent {
  lieuStageListe!: any;
  lieuStage!: any;
  savedStage!: any;

  constructor(
    private http: HttpClient,
    public dialogRef: MatDialogRef<EditStageElementsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Stage,
    private toastService: HotToastService
  ) {
    this.data = data;

    this.getLieuStage();
    this.findLieuStage(data.stage.lieuStage);

    // this.assignDataToForm(this.data);
  }

  ngOnInit() {
    // this.getLieuStage();
    // this.findLieuStage(this.data.stage.lieuStage);
    this.assignDataToForm(this.data);
  }
  getLieuStage() {
    this.http
      .get('http://localhost:9000/lieu-de-stage/find-all')
      .subscribe((data) => {
        this.lieuStageListe = data;
        // this.encadrant = this.getEncadrantData.prenomArabe +' ' + this.getEncadrantData.nomArabe;
        // this.formulaire.value.encadrant = this.getEncadrantData.prenomArabe + this.getEncadrantData.nomArabe
      });
  }

  findLieuStage(id: any) {
    this.http
      .get('http://localhost:9000/lieu-de-stage/find-by-id/' + id)
      .subscribe((data) => {
        // this.lieuStage = (data as any).adresse;
        this.lieuStage = data;

        return data;
      });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
  updateFormulaire = new FormGroup({
    id: new FormControl(this.data.stage.id),
    objet: new FormControl(this.data.stage.objet, [Validators.required]),
    typeStage: new FormControl(this.data.stage.typeStage, [
      Validators.required,
    ]),

    lieuStage: new FormControl(this.data.stage.lieuStage, [
      Validators.required,
    ]),
    dateDebut: new FormControl(this.data.stage.dateDebut, [
      Validators.required,
    ]),
    dateFin: new FormControl(this.data.stage.dateFin, [Validators.required]),
    institutArabe: new FormControl(this.data.stage.institutArabe, [
      Validators.required,
    ]),
    institutFr: new FormControl(this.data.stage.institutFr, [
      Validators.required,
    ]),
    typeInstitut: new FormControl(this.data.stage.typeInstitut, [
      Validators.required,
    ]),
    specialiteFr: new FormControl(this.data.stage.specialiteFr, [
      Validators.required,
    ]),
    specialiteArabe: new FormControl(this.data.stage.specialiteArabe),
    cinStagiaire: new FormControl(this.data.stage.cinStagiaire),
    matriculeEncardreur: new FormControl(this.data.stage.matriculeEncardreur),
  });

  assignDataToForm(data: any) {
    this.updateFormulaire.patchValue({
      id: this.data.stage.id,
      objet: this.data.stage.objet,
      typeStage: this.data.stage.typeStage,

      // lieuStage:lieuStage,
      lieuStage: this.data.stage.lieuStage,
      dateDebut: this.data.stage.dateDebut,
      dateFin: this.data.stage.dateFin,
      institutArabe: this.data.stage.institutArabe,
      institutFr: this.data.stage.institutFr,
      typeInstitut: this.data.stage.typeInstitut,
      specialiteFr: this.data.stage.specialiteFr,
      specialiteArabe: this.data.stage.specialiteArabe,
    });
  }
  ngOnchange() {}

  // updateUtilisateur() {
  //   let body = this.updateFormulaire.value;
  //   console.log(body);

  //   this.http
  //     .post(`${environment.BACKEND_URL}/user/update/` + body.matricule, body)
  //     .subscribe(
  //       (data) => {
  //         this.toastService.success('تم التعديل بنجاح ');

  //         this.dialogRef.close({
  //           event: 'edit',
  //         });
  //       },

  //       (err) => {
  //         console.warn(err);
  //         this.toastService.error('لقد حدث خطأ ما ');
  //       }
  //     );

  saveStage() {
    if (this.updateFormulaire.status == 'INVALID') {
      this.toastService.error(' الرجاء تعمير كل الفراغات بدقة ');
    } else {
      this.updateFormulaire.value.dateDebut = moment(
        this.updateFormulaire.value.dateDebut
      ).format('YYYY-MM-DD');
      this.updateFormulaire.value.dateFin = moment(
        this.updateFormulaire.value.dateFin
      ).format('YYYY-MM-DD');

      let body = this.updateFormulaire.value;

      body.dateDebut = moment(body.dateDebut).format('YYYY-MM-DD');
      body.dateFin = moment(body.dateFin).format('YYYY-MM-DD');

      this.http
        .post('http://localhost:9000/stage/update/' + this.data.stage.id, body)
        .subscribe(
          (data) => {
            this.savedStage = data;
            this.toastService.success('تم التعديل بنجاح');

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
  }
}
