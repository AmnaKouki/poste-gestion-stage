import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { faFileClipboard } from '@fortawesome/free-regular-svg-icons';
import {
  faCoffee,
  faChartLine,
  faUsers,
  faFileCirclePlus,
  faClockRotateLeft,
  faMagnifyingGlass,
  faListUl,
  faLocationDot,
  faArrowRightFromBracket,
  faPlus,
  faClipboardList,
  faFile,
} from '@fortawesome/free-solid-svg-icons';

import { AuthentificationService } from 'src/app/services/authentification.service';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.css'],
})
export class SideNavComponent {
  constructor(
    private router: Router,
    public authService: AuthentificationService
  ) {}
  faCoffee = faCoffee;
  faChart = faChartLine;
  faUsers = faUsers;
  faFileCirclePlaus = faFileCirclePlus;
  faClockRotate = faClockRotateLeft;
  faMagnifyingGlass = faMagnifyingGlass;
  faListUl = faListUl;
  faLocationDot= faLocationDot;
  faArrowRightFromBracket=faArrowRightFromBracket;
  faPlus= faPlus;
  faList = faFileClipboard;


  logout() {
    this.authService.logOut();
    this.router.navigate(['/']);
  }

  goTo(route: string) {
    this.router.navigate([route]);
  }


  
}
