import { Routes } from '@angular/router';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { DruckComponent } from './druck/druck.component';
import { ItComponent } from './it/it.component';
import { ContactComponent } from './contact/contact.component';
import { AboutComponent } from './about/about.component';
import { ImprintComponent } from './imprint/imprint.component';
import { AgbComponent } from './agb/agb.component';
import { PolicyComponent } from './policy/policy.component';
import { PrintMaterialTypesComponent } from './print-material-types/print-material-types.component';

export const routes: Routes = [
    { path: '', component: LandingPageComponent },
    { path: '3d-druck', component: DruckComponent },
    { path: 'it', component: ItComponent },
    { path: 'contact', component: ContactComponent },
    { path: 'about', component: AboutComponent },
    { path: 'imprint', component: ImprintComponent },
    { path: 'agb', component: AgbComponent },
    { path: 'policy', component: PolicyComponent },
    { path: 'print-material-types', component: PrintMaterialTypesComponent },
];
