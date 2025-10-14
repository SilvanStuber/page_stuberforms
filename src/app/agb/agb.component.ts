import { Component, inject } from '@angular/core';
import { DataService } from '../data.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-agb',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './agb.component.html',
  styleUrl: './agb.component.scss'
})
export class AgbComponent {
  dataService = inject(DataService);
}
