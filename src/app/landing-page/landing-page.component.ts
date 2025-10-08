import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { DataService } from '../data.service';

@Component({
  selector: 'app-landing-page',
  standalone: true,
  imports: [],
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.scss'
})
export class LandingPageComponent implements OnInit, OnDestroy {

  dataService = inject(DataService);

  typedText = '';

  private phrases: string[] = [
    'Herzlich willkommen!',
    '3D-Druck & IT-Services.',
    '3D-Druck: Lassen Sie Ihren Prototypen drucken.',
    'Wir bringen Ihre Idee von der Zeichnung in eine anfassbare Form.',
    'Wir bauen die passende Landingpage für Ihr Angebot.',
    'Fragen zu Windows, Bluescreens, Startfehlern, Performance?',
    'Bei uns sind Sie in besten Händen.',
    'Einfach kostenlosen Kostenvoranschlag anfordern!'
  ];

  // Einstellungen
  private typeSpeed = 45;         // ms pro Zeichen
  private deleteSpeed = 22;       // ms pro Zeichen beim Loeschen
  private holdTime = 5000;        // 5 Sekunden Pause, wenn Satz fertig
  private betweenPause = 400;     // kurze Verschnaufpause vor dem Loeschen

  private idx = 0;
  private charIndex = 0;
  private isDeleting = false;
  private raf?: number;               // optional, falls man per rAF steuern moechte
  private timer?: any;                // setTimeout / setInterval Handle
  private destroyed = false;

  ngOnInit(): void {
    this.startTypingLoop();
  }

  ngOnDestroy(): void {
    this.destroyed = true;
    if (this.timer) clearTimeout(this.timer);
    cancelAnimationFrame(this.raf ?? 0);
  }

  private startTypingLoop() {
    const current = this.phrases[this.idx];

    if (!this.isDeleting) {
      // tippen
      this.typedText = current.slice(0, this.charIndex + 1);
      this.charIndex++;

      if (this.charIndex === current.length) {
        // Satz fertig -> 5s halten, dann Loeschen starten
        this.timer = setTimeout(() => {
          this.isDeleting = true;
          this.scheduleNext(this.deleteSpeed);
        }, this.holdTime);
        return;
      }

      this.scheduleNext(this.typeSpeed);
    } else {
      // loeschen
      this.typedText = current.slice(0, Math.max(0, this.charIndex - 1));
      this.charIndex--;

      if (this.charIndex === 0) {
        // kurzer Stopp, dann naechster Satz
        this.isDeleting = false;
        this.idx = (this.idx + 1) % this.phrases.length;
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

  scrollToContent() {
    const el = document.getElementById('content-start');
    if (!el) return;
    el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}
