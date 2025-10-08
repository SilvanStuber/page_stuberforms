import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private router: Router) { }

  goTo3dDruck() {
    this.router.navigate(['/3d-druck']);
  }

  goToIt() {
    this.router.navigate(['/it']);
  }

  goToContact() {
    this.router.navigate(['/contact']);
  }

  goToAbout() {
    this.router.navigate(['/about']);
  }

  goToHome() {
    this.router.navigate(['']);
  }
}
