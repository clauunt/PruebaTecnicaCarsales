import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-not-found',
  standalone: true,
  template: `<div class="not-found"><p>{{ message }}</p></div>`,
  styles: [
    `
    .not-found {
      text-align: center;
      padding: 16px;
      color: #6b7280;
      font-size: 14px;
    }
    `
  ]
})
export class NotFoundComponent {
  @Input() errorType: 'not-found' | 'empty' = 'not-found';
  @Input() customMessage?: string;

  get message(): string {
    if (this.customMessage && this.customMessage.trim().length) {
      return this.customMessage;
    }

    switch (this.errorType) {
      case 'empty':
        return 'No hay elementos para mostrar.';
      case 'not-found':
      default:
        return 'No se encontraron registros.';
    }
  }
}
