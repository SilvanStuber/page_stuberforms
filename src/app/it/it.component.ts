import { Component, inject } from '@angular/core';
import { DataService } from '../data.service';



@Component({
  selector: 'app-it',
  standalone: true,
  imports: [],
  templateUrl: './it.component.html',
  styleUrl: './it.component.scss'
})
export class ItComponent {
  dataService = inject(DataService);
}
