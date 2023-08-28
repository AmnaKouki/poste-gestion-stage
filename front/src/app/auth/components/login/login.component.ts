import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HotToastService } from '@ngneat/hot-toast';
import { AuthentificationService } from 'src/app/services/authentification.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  matricule!: string;
  password!: string;

  invalidLogin = false;
  constructor(
    private router: Router,
    private authService: AuthentificationService,
    private toast: HotToastService,
  ) {}

  login() {
    this.authService.authenticate(this.matricule, this.password).subscribe(
      (data) => {
        this.router.navigate(['/app/home']);
        this.invalidLogin = false;
      },
      (error) => {
        this.invalidLogin = true;
        this.toast.error("Matricule / mot de passe incorrect. Réssayez")
      }
    );
  }

  goToHomePage(): void {
    this.router.navigate(['./app/']);
  }
}
