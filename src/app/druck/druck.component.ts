import { Component, inject } from '@angular/core';
import { DataService } from '../data.service';


@Component({
  selector: 'app-druck',
  standalone: true,
  imports: [],
  templateUrl: './druck.component.html',
  styleUrl: './druck.component.scss'
})
export class DruckComponent {
  dataService = inject(DataService);

}
