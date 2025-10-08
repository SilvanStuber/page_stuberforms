import { Routes } from '@angular/router';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { DruckComponent } from './druck/druck.component';
import { ItComponent } from './it/it.component';
import { ContactComponent } from './contact/contact.component';
import { AboutComponent } from './about/about.component';

export const routes: Routes = [
    { path: '', component: LandingPageComponent },
    { path: '3d-druck', component: DruckComponent },
    { path: 'it', component: ItComponent },
    { path: 'contact', component: ContactComponent },
    { path: 'about', component: AboutComponent },
];
