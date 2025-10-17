import { HttpClient, HttpHeaders, HttpClientModule } from '@angular/common/http';
import { Component, Directive, HostListener, OnDestroy, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { DataService } from '../data.service';

/* ==========================================
   Sanitize Directive (standalone)
   - Tags entfernen
   - NBSP normalisieren
   - Mehrfach-Spaces/Tabs reduzieren
   - Newlines ERHALTEN
   - kein trim() beim Tippen
   ========================================== */
@Directive({
  selector: '[appSanitizeInput]',
  standalone: true,
})
export class SanitizeInputDirective {
  private cleanTyping(v: string) {
    return v
      .replace(/<[^>]*>/g, '')     // Tags entfernen
      .replace(/\u00A0/g, ' ')     // NBSP -> normales Space
      .replace(/[ \t]{2,}/g, ' '); // nur Space/Tab clustern
    // wichtig: keine Newlines entfernen und kein .trim()
  }

  @HostListener('input', ['$event'])
  onInput(e: Event) {
    const el = e.target as HTMLInputElement | HTMLTextAreaElement;
    const before = el.value;
    const after = this.cleanTyping(before);
    if (after !== before) {
      const pos = el.selectionStart ?? after.length;
      el.value = after;
      try { el.setSelectionRange(pos, pos); } catch { }
      // bewusst KEIN weiteres 'input' dispatchen -> verhindert Loops
    }
  }

  @HostListener('paste', ['$event'])
  onPaste(e: ClipboardEvent) {
    e.preventDefault();
    let text = e.clipboardData?.getData('text/plain') ?? '';
    // CRLF normalisieren, Tabs/Mehrfachspaces eindampfen, Newlines behalten
    text = text.replace(/\r\n?/g, '\n').replace(/[ \t]{2,}/g, ' ');

    const el = e.target as HTMLInputElement | HTMLTextAreaElement;
    const s = el.selectionStart ?? 0, t = el.selectionEnd ?? 0;
    const next = el.value.slice(0, s) + text + el.value.slice(t);
    el.value = next;
    el.dispatchEvent(new Event('input')); // fuer ngModel
  }
}

type ContactPayload = {
  name: string;
  email: string;
  message: string;
  website: string;
};

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule, SanitizeInputDirective],
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
})
export class ContactComponent implements OnInit, OnDestroy {
  dataService = inject(DataService);

  placeholdersName = 'Dein Name';
  placeholdersEmail = 'Deine E-Mail-Adresse';
  placeholdersMessage = 'Deine Nachricht';
  sendeMessageButtonContent = 'Nachricht senden';
  messageSentText = 'Danke! Deine Nachricht wurde gesendet.';

  contactData = {
    name: '',
    email: '',
    message: '',
    website: '' as string, // Honeypot
    checkbox: false,
  };

  privacyPolicyChecked = false;
  messageWasSent = false;
  isSubmitting = false;

  readonly post = { endPoint: 'https://stuberforms.ch/backend/contact.php' };

  private http = inject(HttpClient);

  ngOnInit(): void { }
  ngOnDestroy(): void { }

  private stripAll(v: string): string {
    return v.replace(/<[^>]*>/g, '').replace(/\s{2,}/g, ' ').trim();
  }

  private hardenName(v: string): string {
    const cleaned = this.stripAll(v).replace(/[^A-Za-zÀ-ÖØ-öø-ÿ0-9 .,'-]/g, '');
    return cleaned.slice(0, 120);
  }

  private hardenEmail(v: string): string {
    const cleaned = this.stripAll(v).replace(/[^\w.+\-@]/g, '');
    return cleaned.slice(0, 254);
  }

  // Newline-schonend, CRLF -> LF, Control-Chars raus
  private hardenMessage(v: string): string {
    const noTags = v.replace(/<[^>]*>/g, '');
    const normalized = noTags.replace(/\r\n?/g, '\n');
    const cleaned = normalized
      .replace(/[^\S\n]+/g, ' ') // nur Spaces/Tabs zusammenfassen, \n behalten
      .replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F]/g, '');
    return cleaned.trim().slice(0, 5000);
  }

  private buildSafePayload(): ContactPayload {
    return {
      name: this.hardenName(this.contactData.name),
      email: this.hardenEmail(this.contactData.email),
      message: this.hardenMessage(this.contactData.message),
      website: (this.contactData.website ?? '').trim(),
    };
  }

  onSubmit(ngForm: NgForm) {
    if (this.isSubmitting) return;
    if (!(ngForm.submitted && ngForm.form.valid && this.privacyPolicyChecked)) return;

    const payload = this.buildSafePayload();

    const emailOk = /^[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[A-Za-z]{2,}$/.test(payload.email);
    if (!payload.name || !emailOk || payload.message.length < 4) return;

    // Honeypot: wenn Bots website befuellen -> nicht senden
    if (payload.website) return;

    this.isSubmitting = true;

    this.http.post<{ ok: boolean; error?: string }>(
      this.post.endPoint,
      payload,
      { headers: new HttpHeaders({ 'Content-Type': 'application/json' }), responseType: 'json' } as const
    ).subscribe({
      next: (res) => {
        if (res?.ok) {
          ngForm.resetForm();
          this.privacyPolicyChecked = false;
          this.showMessageSent();
        } else {
          console.error('Serverfehler:', res?.error ?? 'Unbekannt');
        }
        this.isSubmitting = false;
      },
      error: (err) => {
        console.error('Netzwerk-/Serverfehler:', err);
        this.isSubmitting = false;
      },
    });
  }

  private showMessageSent() {
    this.messageWasSent = true;
    setTimeout(() => (this.messageWasSent = false), 4000);
  }

  privacyPolicyValidation() {
    this.privacyPolicyChecked = !this.privacyPolicyChecked;
  }
}
