import { Component } from '@angular/core';
import { faLocationDot, faChartLine , faUsers, faUserTie, faClockRotateLeft, faMagnifyingGlass, faListUl} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-top-widget',
  templateUrl: './top-widget.component.html',
  styleUrls: ['./top-widget.component.css']
})
export class TopWidgetComponent {
  faLocationDot = faLocationDot;
  faUsers= faUsers;
  faUserTie = faUserTie;

}
