import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-landing-page',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss']
})
export class LandingPageComponent implements OnInit, OnDestroy {

  dataService = inject(DataService);

  typedText = '';

  // Double-Buffer für Crossfade
  imgA = '';
  imgB = '';
  showA = true; // steuert, welches Bild sichtbar ist

  private phrases: string[] = [
    'Herzlich willkommen!',
    '3D-Druck & Weblösungen.',
    '3D-Druck: Lassen Sie Ihren Prototypen drucken.',
    'Wir bringen Ihre Idee von der Zeichnung in eine anfassbare Form.',
    'Wir bauen die passende Landingpage für Ihr Angebot.',
    'Fragen zu Windows, Bluescreens, Startfehlern, Performance?',
    'Bei uns sind Sie in besten Händen.',
    'Einfach kostenlosen Kostenvoranschlag anfordern!'
  ];

  private imageFiles: string[] = [
    'img/hero-01-willkommen.png',
    'img/hero-02-3d-it-services.png',
    'img/hero-03-prototyp.png',
    'img/hero-04-idee-zu-form.png',
    'img/hero-05-landingpage.png',
    'img/hero-06-windows-support.png',
    'img/hero-07-beste-haende.png',
    'img/hero-08-kostenvoranschlag.png'
  ];

  // Geschwindigkeiten
  private typeSpeed = 50;
  private deleteSpeed = 50;
  private holdTime = 2500;
  private betweenPause = 300;

  private idx = 0;          // Index der Phrase / des Bilds
  private charIndex = 0;    // Schreibfortschritt
  private isDeleting = false;
  private timer?: any;
  private destroyed = false;

  // Crossfade-Dauer muss zur CSS-Transition passen
  private readonly fadeMs = 1200;

  ngOnInit(): void {
    this.imgA = this.imageFiles[0];
    this.imgB = this.imageFiles[1] ?? this.imageFiles[0];
    this.showA = true; // imgA zuerst sichtbar
    this.preloadImages(this.imageFiles);
    this.startTypingLoop();
  }

  ngOnDestroy(): void {
    this.destroyed = true;
    if (this.timer) clearTimeout(this.timer);
  }

  private startTypingLoop() {
    const current = this.phrases[this.idx];

    if (!this.isDeleting) {
      // tippen
      this.typedText = current.slice(0, this.charIndex + 1);
      this.charIndex++;

      if (this.charIndex === current.length) {
        // komplette Phrase kurz halten
        this.timer = setTimeout(() => {
          this.isDeleting = true;
          this.scheduleNext(this.deleteSpeed);
        }, this.holdTime);
        return;
      }
      this.scheduleNext(this.typeSpeed);
    } else {
      // löschen
      this.typedText = current.slice(0, Math.max(0, this.charIndex - 1));
      this.charIndex--;

      if (this.charIndex === 0) {
        // *** HIER ist der Synchronisationspunkt ***
        // Wechsel auf nächste Phrase und *sofort* Bild-Crossfade starten
        this.isDeleting = false;
        this.idx = (this.idx + 1) % this.phrases.length;
        this.crossfadeTo(this.imageFiles[this.idx]);

        // kleine Atempause vor dem neuen Tippen
        this.timer = setTimeout(() => this.scheduleNext(this.typeSpeed), this.betweenPause);
        return;
      }
      this.scheduleNext(this.deleteSpeed);
    }
  }

  private scheduleNext(delay: number) {
    if (this.destroyed) return;
    this.timer = setTimeout(() => this.startTypingLoop(), delay);
  }

  /**
   * Double-Buffer Crossfade:
   * - befüllt das versteckte Bild
   * - toggelt Sichtbarkeit im nächsten Frame -> sauberes Ein-/Ausblenden
   */
  private crossfadeTo(nextSrc: string | undefined) {
    if (!nextSrc) return;

    // Verstecktes Bild vorbereiten
    if (this.showA) {
      this.imgB = nextSrc;
    } else {
      this.imgA = nextSrc;
    }

    // Nächsten Frame abwarten, dann Sichtbarkeit umschalten -> CSS transition greift
    requestAnimationFrame(() => {
      this.showA = !this.showA;
    });
  }

  private preloadImages(sources: string[]) {
    sources.forEach(src => {
      const img = new Image();
      img.src = src;
      img.decoding = 'async';
    });
  }

  scrollToContent() {
    const el = document.getElementById('content-start');
    if (!el) return;
    el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}
