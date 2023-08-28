import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { HotToastService } from '@ngneat/hot-toast';
import * as moment from 'moment';

@Component({
  selector: 'app-add-stage-elements',
  templateUrl: './add-stage-elements.component.html',
  styleUrls: ['./add-stage-elements.component.css']
})
export class AddStageElementsComponent {

  ipAddress = '';
  recievedCin!: any;
  cin!: any;
  matricule!: any;
  getEncadrantData!: any;
  encadrant = '';
  stagiaire!: any;
  savedStage!: any;
  lieuStageListe!: any;
  nomPrenom!: any;
  savedSuccessfully: boolean = false;
  qrCodeValue: string = 'Hello';
  listeStagiaire: any[] = [];

  // @ViewChild('qr') qr!: ElementRef;
  constructor(
    public dialogRef: MatDialogRef<AddStageElementsComponent>,
    private toastService: HotToastService,
    private http: HttpClient
  ) {}

  formulaire = new FormGroup({
    cinStagiaire: new FormControl('', [Validators.required]),
    objet: new FormControl('', [Validators.required]),
    typeStage: new FormControl('', [Validators.required]),
    lieuStage: new FormControl('', [Validators.required]),
    dateDebut: new FormControl('', [Validators.required]),
    dateFin: new FormControl('', [Validators.required]),
    institutArabe: new FormControl('', [Validators.required]),
    institutFr: new FormControl('', [Validators.required]),
    typeInstitut: new FormControl('', [Validators.required]),
    specialiteFr: new FormControl('', [Validators.required]),
    specialiteArabe: new FormControl('', [Validators.required]),
    matriculeEncardreur: new FormControl('', [Validators.required]),
    encadrant: new FormControl({ value: '', disabled: true }, [
      Validators.required,
    ]),
  });

  onNoClick(): void {
    this.dialogRef.close();
  }

  saveStage() {
    if (this.formulaire.status == 'INVALID') {
      this.toastService.error(' الرجاء تعمير كل الفراغات بدقة ');
    } else {
      this.savedSuccessfully = true;
      this.formulaire.value.dateDebut = moment(
        this.formulaire.value.dateDebut
      ).format('YYYY-MM-DD');
      this.formulaire.value.dateFin = moment(
        this.formulaire.value.dateFin
      ).format('YYYY-MM-DD');
      
      let body = this.formulaire.value;
      body.dateDebut = moment(body.dateDebut).format('YYYY-MM-DD');
      body.dateFin = moment(body.dateFin).format('YYYY-MM-DD');
      console.log(body.lieuStage);
      
      body.lieuStage = (body.lieuStage as any).id;
      
       console.log(body.lieuStage);
       
      this.http
        .post('http://localhost:9000/stage/add', body)
        .subscribe((data) => {
          console.log(data);
          this.savedStage = data;

          this.toastService.success('تمت الإضافة بنجاح');
          
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
  ngOnInit() {
    this.getListeStagiare();
    this.getLieuStage();
    
  }
  
  ngOnchange() {}

  getEncadrant() {
    this.matricule = this.formulaire.value.matriculeEncardreur;
    this.http
      .get('http://localhost:9000/users/find-by-matricule/' + this.matricule)
      .subscribe(
        (data) => {
          this.getEncadrantData = data;
          this.encadrant =
            this.getEncadrantData.prenomArabe +
            ' ' +
            this.getEncadrantData.nomArabe;
          // this.formulaire.value.encadrant = this.getEncadrantData.prenomArabe + this.getEncadrantData.nomArabe
        },
        (err) => {}
      );
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



  getStagiaire(cinStagiaire: string) {
    return this.http
      .get(
        `http://localhost:9000/stagiaire/find-by-cin/${cinStagiaire}`
      )
  }
  getListeStagiare() {
    this.http
      .get('http://localhost:9000/stagiaire/find_all')
      .subscribe((res: any) => {
        this.listeStagiaire = res;
      });
  }



  

  

}
