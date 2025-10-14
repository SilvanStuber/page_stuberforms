import { Component, inject } from '@angular/core';
import { DataService } from '../data.service';
import { CommonModule } from '@angular/common';



@Component({
  selector: 'app-it',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './it.component.html',
  styleUrl: './it.component.scss'
})
export class ItComponent {
  dataService = inject(DataService);
}
