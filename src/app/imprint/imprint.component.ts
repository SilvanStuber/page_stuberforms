import { Component, inject } from '@angular/core';
import { DataService } from '../data.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-imprint',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './imprint.component.html',
  styleUrl: './imprint.component.scss'
})
export class ImprintComponent {
  dataService = inject(DataService);
}
