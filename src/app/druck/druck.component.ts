import { Component, inject } from '@angular/core';
import { DataService } from '../data.service';
import { CommonModule } from '@angular/common';

interface ThreeDPrintSection {
  title: string;
  text: string;
  mediaType: 'image' | 'video';
  src: string;
  poster?: string;
  alt?: string;
  cta?: {
    enabled: boolean;
    label?: string;
    action?: () => void; // <- hier liegt die Funktion
  };
}
@Component({
  selector: 'app-druck',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './druck.component.html',
  styleUrl: './druck.component.scss'
})
export class DruckComponent {
  dataService = inject(DataService);

  threeDPrintSections: ThreeDPrintSection[] = [
    {
      title: 'Was ist FDM 3D Druck?',
      text: '3D-Druck, auch additive Fertigung genannt, erstellt Bauteile Schicht für Schicht direkt aus einem digitalen 3D-Modell. Statt Material wegzunehmen wie beim Fräsen oder Bohren, wird nur dort aufgebaut, wo es gebraucht wird. So entstehen Prototypen, Einzelteile und kleine Serien schnell, präzise und mit hoher Wiederholgenauigkeit. Ob Gehäuse, Funktionsmuster oder Ersatzteil: Das Ergebnis basiert exakt auf Ihrem Modell, und die Schichthöhe kann je nach Anforderung feiner oder grober gewählt werden.',
      mediaType: 'video',
      src: 'videos/hero.mp4',
      poster: 'videos/hero.mp4',
      cta: {
        enabled: true,
        label: 'Fragen zu 3D Druck?',
        action: () => this.dataService.goToContact(),
      },
    },
    {
      title: 'Materialien machen den Unterschied',
      text: 'Im 3D-Druck gibt es nicht das eine „richtige“ Material. Je nach Einsatz unterscheiden sich Kunststoffe in Festigkeit, Zähigkeit, Wärme- und UV-Beständigkeit, Oberfläche und Flexibilität. Das bedeutet: Ein Display-Gehäuse braucht andere Eigenschaften als eine schnappende Klammer, eine Dichtung oder ein Bauteil für draussen. Wir wählen das Material passend zu deinem Anwendungsfall – von starr und detailgenau bis flexibel und griffig, von leicht zu verarbeiten bis hoch belastbar und temperaturfest. So bekommt jedes Teil genau die Performance, die es braucht.',
      mediaType: 'image',
      src: 'img/filament.png',
      alt: 'filament.png',
      cta: {
        enabled: false,
        label: 'Materialtypen ansehen',
        action: () => this.dataService.goToPrintMaterialTypes(),
      },
    },
    {
      title: 'Funktionale Prototypen',
      text: 'Schnelle Iterationen mit Kunststoffen, ideal als Anschauungsmaterial. Wir drucken Prototypen, die Masse, Form und Haptik realistisch zeigen und sich für Design Reviews, Kundenfreigaben und einfache Funktionsprüfungen eignen. Die Teile sind für Handling und Montageproben geeignet, jedoch nicht für hohe Dauerlast oder starke Stosseinwirkung. Für die Fertigung benötigen wir eine saubere STL Datei oder ähnliches. Wir beraten zu Materialwahl, Toleranzen und dezenter Nachbearbeitung, damit Entscheidungen rasch fundiert getroffen werden.',
      mediaType: 'image',
      src: 'img/proto_fn.png',
      alt: 'proto_fn.png',
      cta: {
        enabled: true,
        label: 'Prototyp drucken lassen',
        action: () => this.dataService.goToContact(),
      },
    },
    {
      title: 'Kleinserien & Ersatzteile',
      text: 'Kleinserien und Ersatzteile. Kurze Lieferzeiten, konstante Qualität. Wir fertigen kleine Stückzahlen und passgenaue Ersatzteile für Prototypen, Testaufbauten und den Alltagseinsatz unter moderaten Bedingungen. Massgenau, gut montierbar und reproduzierbar. Nicht für hohe Dauerlast oder starke Stosseinwirkung ausgelegt. Klare Toleranzen und einfache Qualitätsprüfungen nach Absprache. Für die Fertigung benötigen wir eine saubere STL Datei oder ähnliche CAD Daten wie STEP. Auf Wunsch leichte Nachbearbeitung und sachliche Beratung.',
      mediaType: 'image',
      src: 'img/series.png',
      alt: 'series.png',
      cta: {
        enabled: true,
        label: 'Kleinserie oder Ersatzteil drucken lassen',
        action: () => this.dataService.goToContact(),
      },
    },
    {
      title: 'Figuren & Modelle',
      text: 'Wir drucken Figuren, Maskottchen, Architekturmodelle und Requisiten usw. Für die Fertigung benötigen wir eine saubere STL Datei oder vergleichbare Formate wie OBJ. Wichtig ist, dass die Dateien kommerzielle Lizenzen besitzen oder der Auftraggeber die Rechte hat und uns die notwendigen Nutzungsrechte für die Produktion schriftlich freigibt. Wir verfügen zudem über ausgewählte kommerzielle Lizenzen und können auf viele Ideen eingehen, stets lizenzkonform.',
      mediaType: 'image',
      src: 'img/figuren.png',
      alt: 'figuren.png',
      cta: {
        enabled: true,
        label: 'Figuren & Modelle drucken lassen',
        action: () => this.dataService.goToContact(),
      },
    },
  ];
}

