import { Component, inject } from '@angular/core';
import { DataService } from '../data.service';

@Component({
  selector: 'app-imprint',
  standalone: true,
  imports: [],
  templateUrl: './imprint.component.html',
  styleUrl: './imprint.component.scss'
})
export class ImprintComponent {
  dataService = inject(DataService);
}
