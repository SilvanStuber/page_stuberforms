import { Component, inject } from '@angular/core';
import { DataService } from '../data.service';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-druck',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './druck.component.html',
  styleUrl: './druck.component.scss'
})
export class DruckComponent {
  dataService = inject(DataService);

}
