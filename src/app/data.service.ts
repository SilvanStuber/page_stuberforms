import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { Router } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private router: Router, @Inject(PLATFORM_ID) private platformId: Object) { }

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

  goToAGB() {
    this.router.navigate(['/agb']);
  }

  goToImprint() {
    this.router.navigate(['/imprint']);
  }

  goToPolicy() {
    this.router.navigate(['/policy']);
  }

  goToWebdesign() {
    this.router.navigate(['/webdesign']);
  }

  openExternal(url: string): void {
    if (!isPlatformBrowser(this.platformId)) return; // SSR-Schutz

    window.open(url, '_blank', 'noopener,noreferrer');
  }
}
