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
  threeDPrintSections = [
    {
      title: 'Was ist FDM 3D Druck?',
      text: '3D-Druck, auch additive Fertigung genannt, erstellt Bauteile Schicht für Schicht direkt aus einem digitalen 3D-Modell. Statt Material wegzunehmen wie beim Fräsen oder Bohren, wird nur dort aufgebaut, wo es gebraucht wird. So entstehen Prototypen, Einzelteile und kleine Serien schnell, präzise und mit hoher Wiederholgenauigkeit. Ob Gehäuse, Funktionsmuster oder Ersatzteil: Das Ergebnis basiert exakt auf Ihrem Modell, und die Schichthöhe kann je nach Anforderung feiner oder grober gewählt werden.',
      mediaType: 'video',
      src: 'videos/hero.mp4',
      poster: 'videos/hero.mp4'
    },
    {
      title: 'Materialien machen den Unterschied',
      text: 'Im 3D-Druck gibt es nicht das eine „richtige“ Material. Je nach Einsatz unterscheiden sich Kunststoffe in Festigkeit, Zähigkeit, Wärme- und UV-Beständigkeit, Oberfläche und Flexibilität. Das bedeutet: Ein Display-Gehäuse braucht andere Eigenschaften als eine schnappende Klammer, eine Dichtung oder ein Bauteil für draussen. Wir wählen das Material passend zu deinem Anwendungsfall – von starr und detailgenau bis flexibel und griffig, von leicht zu verarbeiten bis hoch belastbar und temperaturfest. So bekommt jedes Teil genau die Performance, die es braucht.',
      mediaType: 'image',
      src: 'img/series.png',
      alt: '3D‑gedruckte Kleinserie'
    },
    {
      title: 'Funktionale Prototypen',
      text: 'Schnelle Iterationen mit stabilen Kunststoffen – perfekt für Tests und Kundenfreigaben.',
      mediaType: 'image',
      src: 'img/proto_fn.png',
      alt: 'Funktionaler 3D‑Prototyp'
    },
    {
      title: 'Kleinserien & Ersatzteile',
      text: 'Kurze Lieferzeiten, konstante Qualität. Wir fertigen Kleinserien und passgenaue Ersatzteile.',
      mediaType: 'image',
      src: 'img/series.png',
      alt: '3D‑gedruckte Kleinserie'
    },



    {
      title: 'Kleinserien & Ersatzteile',
      text: 'Kurze Lieferzeiten, konstante Qualität. Wir fertigen Kleinserien und passgenaue Ersatzteile.',
      mediaType: 'image',
      src: 'img/series.png',
      alt: '3D‑gedruckte Kleinserie'
    },
  ];

}