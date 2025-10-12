import { Component, inject } from '@angular/core';
import { DataService } from '../data.service';

@Component({
  selector: 'app-policy',
  standalone: true,
  imports: [],
  templateUrl: './policy.component.html',
  styleUrl: './policy.component.scss'
})
export class PolicyComponent {
  dataService = inject(DataService);
}
