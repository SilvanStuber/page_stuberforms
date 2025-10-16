import { HttpClient, HttpHeaders, HttpClientModule } from '@angular/common/http';
import { Component, Directive, HostListener, OnDestroy, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { DataService } from '../data.service';

/* ==========================================
   Sanitize Directive (im selben File, standalone)
   ========================================== */
@Directive({
  selector: '[appSanitizeInput]',
  standalone: true,
})
export class SanitizeInputDirective {
  private stripTags(v: string) {
    return v.replace(/<[^>]*>/g, '').replace(/\s{2,}/g, ' ').trim();
  }

  @HostListener('input', ['$event'])
  onInput(e: Event) {
    const el = e.target as HTMLInputElement | HTMLTextAreaElement;
    const clean = this.stripTags(el.value);
    if (clean !== el.value) {
      const pos = el.selectionStart ?? clean.length;
      el.value = clean;
      try { el.setSelectionRange(pos, pos); } catch { }
      el.dispatchEvent(new Event('input')); // fuer ngModel
    }
  }

  @HostListener('paste', ['$event'])
  onPaste(e: ClipboardEvent) {
    e.preventDefault();
    const text = (e.clipboardData?.getData('text') ?? '')
      .replace(/\s{2,}/g, ' ')
      .trim();
    const el = e.target as HTMLInputElement | HTMLTextAreaElement;
    const s = el.selectionStart ?? 0, t = el.selectionEnd ?? 0;
    el.value = (el.value.slice(0, s) + text + el.value.slice(t)).trim();
    el.dispatchEvent(new Event('input'));
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
    website: '' as string,
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

  private hardenMessage(v: string): string {
    const noTags = v.replace(/<[^>]*>/g, '');
    const cleaned = noTags
      .replace(/[^\S\r\n]+/g, ' ')
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
