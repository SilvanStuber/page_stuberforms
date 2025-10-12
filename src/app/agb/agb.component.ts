import { Component, inject } from '@angular/core';
import { DataService } from '../data.service';

@Component({
  selector: 'app-agb',
  standalone: true,
  imports: [],
  templateUrl: './agb.component.html',
  styleUrl: './agb.component.scss'
})
export class AgbComponent {
  dataService = inject(DataService);
}
