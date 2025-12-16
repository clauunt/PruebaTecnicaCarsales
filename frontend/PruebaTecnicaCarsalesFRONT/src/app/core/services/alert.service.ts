import { Injectable, signal } from '@angular/core';
import { HttpErrorResponse, HttpStatusCode } from '@angular/common/http';

@Injectable({ 
  providedIn: 'root' 
})

export class AlertService {
  message = signal<string | null>(null);
  code = signal<HttpStatusCode | 0>(HttpStatusCode.InternalServerError);
  visible = signal<boolean>(false);

  private timeoutId: ReturnType<typeof setTimeout> | null = null;

  show(msg: string, code: HttpStatusCode | 0 = HttpStatusCode.InternalServerError, delay = 5000) {
    this.message.set(msg);
    this.code.set(code);
    this.visible.set(true);
    if (this.timeoutId) clearTimeout(this.timeoutId);
    this.timeoutId = setTimeout(() => { this.hide(); this.timeoutId = null; }, delay);
  }

  showError(err: HttpErrorResponse, delay = 5000) {
    let msg = 'Error inesperado.';
    let details = '';
    let code: HttpStatusCode | 0 = HttpStatusCode.InternalServerError;

    if (err && typeof err === 'object') {
      if (err.status === 0) {
        msg = 'No se pudo conectar con el servidor. Verifique su conexión a internet o que la API esté activa.';
        code = 0;
      } else if (err.error && err.error.message) {
        msg = err.error.message;
        if (err.error.details) {
          details = ` Detalle: ${err.error.details}`;
        }
        code = err.status ? err.status as HttpStatusCode : HttpStatusCode.InternalServerError;
      } else if (err.error && typeof err.error === 'string') {
        details = ` Detalle: ${err.error}`;
        code = err.status ? err.status as HttpStatusCode : HttpStatusCode.InternalServerError;
      }
    }

    this.show(`${msg}${details}`, code, delay);
  }

  showSuccess(msg: string, delay = 5000) {
    this.show(msg, HttpStatusCode.Ok, delay);
  }

  hide() {
    this.visible.set(false);
    this.message.set(null);
    this.code.set(HttpStatusCode.InternalServerError);

    if (this.timeoutId) {
      clearTimeout(this.timeoutId);
      this.timeoutId = null;
    }
  }
}