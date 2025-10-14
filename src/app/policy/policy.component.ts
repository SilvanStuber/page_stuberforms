import { Component, inject } from '@angular/core';
import { DataService } from '../data.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-policy',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './policy.component.html',
  styleUrl: './policy.component.scss'
})
export class PolicyComponent {
  dataService = inject(DataService);
}
