import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { LieuStage } from '../lieux-stage/lieux-stage.component';
import { environment } from 'src/environments/environment';
import { ShowStageComponent } from './components/show-stage/show-stage.component';
import { DeleteStageElementsComponent } from './components/delete-stage-elements/delete-stage-elements.component';
import { EditStageElementsComponent } from './components/edit-stage-elements/edit-stage-elements.component';
import { AddStageElementsComponent } from './components/add-stage-elements/add-stage-elements.component';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
import { HotToastService } from '@ngneat/hot-toast';

const pdfMake = require('pdfmake/build/pdfmake.js');

const moment = require('moment');
(pdfMake as any).vfs = pdfFonts.pdfMake.vfs;
pdfMake.fonts = {
  Arial: {
    normal: `${window.location.origin}/assets/fonts/ARIAL.TTF`,
    bold: `${window.location.origin}/assets/fonts/ARIALBD.TTF`,
  },
};
export interface Stage {
  stage: {
    id: string;
    cinStagiaire: string;
    matriculeEncardreur: string;
    objet: string;
    typeStage: string;
    lieuStage: string;
    dateDebut: string;
    dateFin: string;
    institutFr: string;
    institutArabe: string;
    specialiteArabe: string;
    specialiteFr: string;
    typeInstitut: string;
  };
  stagiaire: {
    id: string;
    adresse: string;
    cin: string;
    dateNaissance: string;
    listeStages: string;
    mail: string;
    nomFr: string;
    nomArabe: string;
    prenomArabe: string;
    prenomFr: string;
    telephone: string;
  };
  lieuStage: {
    id: string;
    adresse: string;
    adresseFr: string;
    codePostal: string;
  };

  encadrant: {
    id: string;
    administration: string;
    cin: string;
    fonction: string;
    matricule: string;
    nomArabe: string;
    prenomArabe: string;
    nomFr: string;
    prenomFr: string;
    photoPath: string;
    roles: string;
    siegeAdministratif: string;
  };
}

@Component({
  selector: 'app-liste-stages',
  templateUrl: './liste-stages.component.html',
  styleUrls: ['./liste-stages.component.css'],
})
export class ListeStagesComponent {
  ipAddress = '';
  isLoading = true;
  @ViewChild(MatSort) sort!: MatSort;
  dataSource!: MatTableDataSource<Stage>;
  getJsonList: any;

  @ViewChild('qr') qr!: ElementRef;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  sortedData!: LieuStage;
  lieuStage!: any;
  displayedColumns: string[] = [
    'nomPrenomStagiaire',
    'nomPrenomEncadrant',
    'dateDebutFin',
    // 'dateFin',
    'typeStage',
    'lieuStage',
    'action',
  ];

  constructor(
    private http: HttpClient,
    public dialog: MatDialog,
    private toastService: HotToastService
  ) {}

  ngOnInit(): void {
    this.getListeDesStageS();
    this.getIPAddress();
  }
  ngOnchange() {}

  getListeDesStageS() {
    this.http.get(environment.BACKEND_URL + '/stage/find_all').subscribe({
      next: (data: any) => {
        this.dataSource = new MatTableDataSource(data.reverse());
        this.isLoading = false;
        this.dataSource.paginator = this.paginator;
      },

      error: console.log,
    });
  }

  showDetails(row: any) {
    let deleteDialogRef = this.dialog.open(ShowStageComponent, {
      autoFocus: false,
      data: row,
    });

    // let body = {data : {
    //   objet : row.stage.objet,
    //   typeStage : row.stage.typeStage,
    //   lieuStage: row.stage.lieuStage,
    //   dateDebut: row.stage.dateDebut,
    //   dateFin: row.stage.dateDebut,
    //   institutArabe: row.stage.institutArabe,
    //   specialiteArabe: row.stage.specialiteArabe,
    //   typeInstitut: row.stage.typeInstitut,
    //   nomStagiaire: row.stagiaire.nomArabe,
    //   PrenomStagiaire: row.stagiaire.prenomArabe,
    //   nomEncadrant: row.encadrant.nomArabe,
    //   prenomEncadrant: row.encadrant.prenomArabe,

    // }}
  }
  addStage() {
    // this.dialog.open(EditDialogElements);
    let ajoutDialogRef = this.dialog.open(AddStageElementsComponent, { autoFocus: false,});
    ajoutDialogRef.afterClosed().subscribe((res) => {
      if (res.event === 'add') {
        // refresh
        this.ngOnInit();
      }
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  openEditDialog(row: any) {
    // this.dialog.open(EditDialogElements);
    let editDialogRef = this.dialog.open(EditStageElementsComponent, {
      autoFocus: false,
      data: row,
    });
    editDialogRef.afterClosed().subscribe((res) => {
      if (res.event === 'edit') {
        // refresh
        this.ngOnInit();
      }
    });
  }
  openDeleteDialog(row: any) {
    let deleteDialogRef = this.dialog.open(DeleteStageElementsComponent, {
      autoFocus: false,
      data: row,
    });
    deleteDialogRef.afterClosed().subscribe((res) => {
      if (res.event === 'delete') {
        // refresh
        this.ngOnInit();
      } else {
      }
    });
  }
  addLieuStage() {
    // let addDialogRef = this.dialog.open(AddDialogElements)
    // addDialogRef.afterClosed().subscribe(res => {
    //   if (res.event === 'add') {
    //     // refresh
    //     this.ngOnInit();
    //   }
    // })
  }

  getIPAddress() {
    this.http
      .get(`${environment.BACKEND_URL}/user/get-ip-address`)
      .subscribe((res: any) => {
        this.ipAddress = res.ip;
      });
  }

  title = 'pdf-gen-amna';

  posteLogoBase64 =
    'data:image/png;base64,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';

  getDocDefinition(params: {
    nomStagiaire: string;
    cin: string;
    dateNaissance: string;
    fac: string;
    typeStage: string;
    lieuStage: string;
    dateDebutStage: string;
    dateFinStage: string;
    pdfGeneratedAtDate: string;
    qrBase64: string;
  }) {
    return {
      info: {
        title: 'attestation_stagaire',
      },
      content: [
        {
          nodeName: 'P',
          stack: [
            {
              nodeName: 'IMG',
              image: this.posteLogoBase64,
              alignment: 'left',
              float: 'left',
              height: 81 * 0.75,
              width: 75 * 0.75,
              style: ['html-img', 'html-p'],
            },
          ],
        },
        {
          text: [
            {
              text: 'Dir. Rég. de Bizerte',
              nodeName: 'SPAN',
              font: 'Arial',
              fontSize: 10,
              style: ['html-span', 'html-p'],
            },
          ],
          nodeName: 'P',
          margin: [0, 7, 0, 0],
          style: ['html-p'],
        },

        {
          text: ' ',
          nodeName: 'P',
          margin: [0, 5, 0, 10],
          style: ['html-p'],
        },
        {
          text: [
            {
              text: [
                {
                  text: [
                    {
                      text: [
                        {
                          text: 'ATTESTATION DE STAGE',
                          nodeName: 'SPAN',
                          alignment: 'center',
                          decoration: ['underline'],
                          bold: true,
                          fontSize: 12,
                          style: [
                            'html-span',
                            'html-strong',
                            'html-u',
                            'html-p',
                          ],
                        },
                      ],
                      nodeName: 'SPAN',
                      alignment: 'center',
                      decoration: ['underline'],
                      bold: true,
                      fontSize: 12,
                      style: ['html-span', 'html-strong', 'html-u', 'html-p'],
                    },
                  ],
                  nodeName: 'STRONG',
                  alignment: 'center',
                  decoration: ['underline'],
                  bold: true,
                  style: ['html-strong', 'html-u', 'html-p'],
                },
              ],
              nodeName: 'U',
              alignment: 'center',
              decoration: ['underline'],
              style: ['html-u', 'html-p'],
            },
          ],
          nodeName: 'P',
          margin: [0, 5, 0, 10],
          alignment: 'center',
          style: ['html-p'],
        },
        {
          text: ' ',
        },
        {
          text: ' ',
          nodeName: 'P',
          margin: [0, 0, 0, 0],
          alignment: 'center',
          style: ['html-p'],
        },
        {
          text: ' ',
        },
        {
          text: [
            {
              text: [
                {
                  text: [
                    {
                      text: "Le Président Directeur Général de l'Office National des Postes,  ",
                      nodeName: 'SPAN',
                      bold: true,
                      fontSize: 11,
                      font: 'Arial',
                      style: ['html-span', 'html-strong', 'html-p'],
                    },
                  ],
                  nodeName: 'SPAN',
                  bold: true,
                  fontSize: 11,
                  style: ['html-span', 'html-strong', 'html-p'],
                },
              ],
              nodeName: 'STRONG',
              bold: true,
              style: ['html-strong', 'html-p'],
            },
            {
              text: [
                {
                  text: [
                    {
                      text: "\nsoussigné, certifie que l'étudiant",
                      nodeName: 'SPAN',
                      bold: true,
                      fontSize: 11,
                      font: 'Arial',
                      style: ['html-span', 'html-strong', 'html-p'],
                    },
                  ],
                  nodeName: 'SPAN',
                  bold: true,
                  fontSize: 11,
                  style: ['html-span', 'html-strong', 'html-p'],
                },
                {
                  text: [
                    {
                      text: ':',
                      nodeName: 'SPAN',
                      bold: true,
                      fontSize: 11,
                      font: 'Arial',
                      style: ['html-span', 'html-strong', 'html-p'],
                    },
                  ],
                  nodeName: 'SPAN',
                  bold: true,
                  fontSize: 11,
                  style: ['html-span', 'html-strong', 'html-p'],
                },
              ],
              nodeName: 'STRONG',
              bold: true,
              style: ['html-strong', 'html-p'],
            },
          ],
          nodeName: 'P',
          margin: [30, 5, 0, 10],
          style: ['html-p'],
        },

        {
          text: ' ',
        },
        {
          text: [
            {
              text: [
                {
                  text: [
                    {
                      text: 'Mr/Mme                                     : ',
                      fontSize: 11,
                      font: 'Arial',
                      style: ['html-span', 'html-p'],
                    },
                    {
                      text: params.nomStagiaire,
                      nodeName: 'STRONG',
                      fontSize: 11,
                      font: 'Arial',
                      bold: true,
                      style: ['html-strong', 'html-span', 'html-p'],
                    },
                  ],
                  nodeName: 'SPAN',
                  fontSize: 11,
                  font: 'Arial',
                  style: ['html-span', 'html-p'],
                },
              ],
              nodeName: 'SPAN',
              fontSize: 11,
              style: ['html-span', 'html-p'],
            },
          ],
          nodeName: 'P',
          margin: [30, 0, 0, 0],
          style: ['html-p'],
        },
        {
          text: ' ',
        },
        {
          text: [
            {
              text: [
                {
                  text: [
                    {
                      text: 'CIN N°                                       : ',
                      fontSize: 11,
                      font: 'Arial',
                      style: ['html-span', 'html-p'],
                    },
                    {
                      text: params.cin,
                      nodeName: 'STRONG',
                      fontSize: 11,
                      font: 'Arial',
                      bold: true,
                      style: ['html-strong', 'html-span', 'html-p'],
                    },
                  ],
                  nodeName: 'SPAN',
                  fontSize: 11,
                  font: 'Arial',
                  style: ['html-span', 'html-p'],
                },
              ],
              nodeName: 'SPAN',
              fontSize: 11,
              style: ['html-span', 'html-p'],
            },
          ],
          nodeName: 'P',
          margin: [30, 0, 0, 0],
          style: ['html-p'],
        },
        {
          text: ' ',
        },
        {
          text: [
            {
              text: [
                {
                  text: [
                    {
                      text: 'Né(e)                                         : ',
                      fontSize: 11,
                      font: 'Arial',
                      style: ['html-span', 'html-p'],
                    },
                    {
                      text: params.dateNaissance,
                      nodeName: 'STRONG',
                      fontSize: 11,
                      font: 'Arial',
                      bold: true,
                      style: ['html-strong', 'html-span', 'html-p'],
                    },
                  ],
                  nodeName: 'SPAN',
                  fontSize: 11,
                  font: 'Arial',
                  style: ['html-span', 'html-p'],
                },
              ],
              nodeName: 'SPAN',
              fontSize: 11,
              style: ['html-span', 'html-p'],
            },
          ],
          nodeName: 'P',
          margin: [30, 0, 0, 0],
          style: ['html-p'],
        },
        {
          text: ' ',
        },
        {
          text: [
            {
              text: [
                {
                  text: [
                    {
                      text: 'Inscrit à                                     : ',
                      fontSize: 11,
                      font: 'Arial',
                      style: ['html-span', 'html-p'],
                    },
                    {
                      text: params.fac,
                      nodeName: 'STRONG',
                      fontSize: 11,
                      font: 'Arial',
                      bold: true,
                      style: ['html-strong', 'html-span', 'html-p'],
                    },
                  ],
                  nodeName: 'SPAN',
                  fontSize: 11,
                  font: 'Arial',
                  style: ['html-span', 'html-p'],
                },
              ],
              nodeName: 'SPAN',
              fontSize: 11,
              style: ['html-span', 'html-p'],
            },
          ],
          nodeName: 'P',
          margin: [30, 0, 0, 0],
          style: ['html-p'],
        },
        {
          text: ' ',
        },
        {
          text: [
            {
              text: [
                {
                  text: [
                    {
                      text: `A effectué un  ${params.typeStage} au sein de l'Office National des Postes`,
                      nodeName: 'SPAN',
                      fontSize: 11,
                      font: 'Arial',
                      style: ['html-span', 'html-p'],
                    },
                    {
                      text: ' ',
                      fontSize: 13,
                      font: 'Arial',
                      style: ['html-span', 'html-p'],
                    },
                  ],
                  nodeName: 'SPAN',
                  fontSize: 13,
                  font: 'Arial',
                  style: ['html-span', 'html-p'],
                },
              ],
              nodeName: 'SPAN',
              fontSize: 13,
              style: ['html-span', 'html-p'],
            },
          ],
          nodeName: 'P',
          margin: [30, 0, 0, 0],
          style: ['html-p'],
        },
        {
          text: ' ',
        },
        {
          text: [
            {
              text: [
                {
                  text: [
                    {
                      text: 'Lieu du Stage                            : ',
                      nodeName: 'SPAN',
                      fontSize: 11,
                      font: 'Arial',
                      style: ['html-span', 'html-p'],
                    },
                  ],
                  nodeName: 'SPAN',
                  fontSize: 13,
                  font: 'Arial',
                  style: ['html-span', 'html-p'],
                },
              ],
              nodeName: 'SPAN',
              fontSize: 13,
              style: ['html-span', 'html-p'],
            },
            {
              text: [
                {
                  text: [
                    {
                      text: params.lieuStage,
                      nodeName: 'SPAN',
                      bold: true,
                      fontSize: 11,
                      font: 'Arial',
                      style: ['html-span', 'html-strong', 'html-p'],
                    },
                  ],
                  nodeName: 'SPAN',
                  bold: true,
                  fontSize: 11,
                  style: ['html-span', 'html-strong', 'html-p'],
                },
              ],
              nodeName: 'STRONG',
              bold: true,
              style: ['html-strong', 'html-p'],
            },
          ],
          nodeName: 'P',
          margin: [30, 0, 0, 0],
          style: ['html-p'],
        },
        {
          text: ' ',
        },
        {
          text: [
            {
              text: [
                {
                  text: [
                    {
                      text: 'Date du Stage                           : DU   ',
                      fontSize: 11,
                      font: 'Arial',
                      style: ['html-span', 'html-p'],
                    },
                    {
                      text: params.dateDebutStage,
                      nodeName: 'STRONG',
                      fontSize: 11,
                      font: 'Arial',
                      bold: true,
                      style: ['html-strong', 'html-span', 'html-p'],
                    },
                    {
                      text: '   AU  ',
                      fontSize: 11,
                      font: 'Arial',
                      style: ['html-span', 'html-p'],
                    },
                    {
                      text: params.dateFinStage,
                      nodeName: 'STRONG',
                      fontSize: 11,
                      font: 'Arial',
                      bold: true,
                      style: ['html-strong', 'html-span', 'html-p'],
                    },
                  ],
                  nodeName: 'SPAN',
                  fontSize: 11,
                  font: 'Arial',
                  style: ['html-span', 'html-p'],
                },
              ],
              nodeName: 'SPAN',
              fontSize: 11,
              style: ['html-span', 'html-p'],
            },
          ],
          nodeName: 'P',
          margin: [30, 0, 0, 0],
          style: ['html-p'],
        },
        {
          text: ' ',
        },
        {
          text: ' ',
          nodeName: 'P',
          margin: [30, 0, 0, 0],
          style: ['html-p'],
        },
        {
          text: ' ',
        },
        {
          text: [
            {
              text: [
                {
                  text: [
                    {
                      text: "Cette attestation est délivrée à l'intéressé(e) pour servir et valoir ce que de droit.",
                      nodeName: 'STRONG',
                      fontSize: 11,
                      font: 'Arial',
                      bold: true,
                      style: ['html-strong', 'html-span', 'html-p'],
                    },
                  ],
                  nodeName: 'SPAN',
                  fontSize: 11,
                  font: 'Arial',
                  style: ['html-span', 'html-p'],
                },
              ],
              nodeName: 'SPAN',
              fontSize: 11,
              style: ['html-span', 'html-p'],
            },
          ],
          nodeName: 'P',
          margin: [30, 0, 0, 10],
          style: ['html-p'],
        },

        {
          text: ' ',
        },
        {
          nodeName: 'P',
          stack: [
            {
              nodeName: 'IMG',
              image: params.qrBase64,
              alignment: 'left',
              float: 'left',
              height: 81 * 1.25,
              width: 75 * 1.25,
              style: ['html-img', 'html-p'],
            },
          ],
          margin: [30, 20, 0, 0],
        },
        {
          text: ' ',
        },
        {
          text: [
            {
              text: [
                {
                  text: '          TUNIS, le    ' + params.pdfGeneratedAtDate,
                  alignment: 'right',
                  bold: true,
                  style: ['html-strong', 'html-p'],
                },
                {
                  text: '\n',
                  nodeName: 'BR',
                },
                {
                  text: ' P/Le Président Directeur Général',
                  alignment: 'right',
                  bold: true,
                  style: ['html-strong', 'html-p'],
                },
              ],
              nodeName: 'STRONG',
              alignment: 'right',
              bold: true,
              style: ['html-strong', 'html-p'],
            },
          ],
          nodeName: 'P',
          margin: [0, -50, 30, 0],
          alignment: 'right',
          style: ['html-p'],
        },
        {
          text: ' ',
        },
      ],
      styles: {
        green: {
          color: 'green',
        },
      },
    };
  }

  downloadPDF(row: any) {
    console.log(row);

    this.generatePDF(row);
  }

  qrCodeValue: string = 'Hello';
  
  
  generatePDF(row: any) {
    
    const now = new Date();
    let dateHourNow = new Date().toLocaleString('fr');

    let dateNow = moment(now.toLocaleDateString()).format('DD/MM/YYYY');
    let dateDebutStage = moment(row.stage.dateDebut).format('DD/MM/YYYY');
    let dateFinStage = moment(row.stage.dateFin).format('DD/MM/YYYY');
    let institutFr = row.stage.institutFr;
    let cin = row.stage.cinStagiaire;
    let nomPrenom = row.stagiaire.prenomFr + ' ' + row.stagiaire.nomFr;
    let formatedDate = moment(row.stagiaire.dateNaissance).format('DD/MM/YYYY');

    this.qrCodeValue = `CIN: ${cin}\nFaculté: ${institutFr}\nDébut Stage: ${dateDebutStage}\nFin Stage: ${dateFinStage}\nDocument Généré Le: ${dateHourNow}\nAdresse IP: ${this.ipAddress}`;

    let c = this.qr;
    
    setTimeout(() => {
      
      let qrImageBase64 = (this.qr as any).qrcElement.nativeElement.firstChild
        .src;
      
      pdfMake
        .createPdf({
          defaultStyle: {
            font: 'Arial',
          },
          ...(this.getDocDefinition({
            cin: cin,
            nomStagiaire: nomPrenom,
            dateDebutStage: dateDebutStage,
            dateFinStage: dateFinStage,
            pdfGeneratedAtDate: dateNow,
            fac: institutFr,
            dateNaissance: formatedDate,
            lieuStage: row.lieuStage.adresseFr,
            typeStage: row.stage.typeStage,
            qrBase64: qrImageBase64,
          }) as any),
        })
        // .open();
        .download('attestation_stagaire');

      this.toastService.success(' لقد تم إستخراج الملف بنجاح');
    }, 2000);
  }
  /**
   * Get QR
   * @returns string
   */
  getQRImgData() {
    return (this.qr as any).qrcElement.nativeElement.firstChild.src;
  }
}
