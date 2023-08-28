import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  constructor(private router: Router, private http: HttpClient) {}

  ngOnInit(){
    this.getUserInfo()
  }

  goToHomePage(): void {
    this.router.navigate(['./app/']);
  }

  user: any;

  getUserInfo() {
    this.http.get('http://localhost:9000/user/me').subscribe((res) => {
      this.user = res;
    });
  }
}
