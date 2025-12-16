import { HttpStatusCode } from '@angular/common/http';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-alert-display',
  standalone: true,
  template: `<div class="alert-container {{ errorType }}"><p>{{ message }}</p></div>`,
  styles: [
    `
    .alert-container {
      position: relative;
      padding: .75rem 1.25rem;
      margin-bottom: 1rem;
      border: 1px solid transparent;
      border-radius: .25rem;
    }
    .danger {
      color: #721c24;
      background-color: #f8d7da;
      border-color: #f5c6cb;
    }
    .success {
      color: #155724;
      background-color: #d4edda;
      border-color: #c3e6cb;
    }
    .warning {
      color: #856404;
      background-color: #fff3cd;
      border-color: #ffeeba;
    }
    .info { 
      color: #0c5460;
      background-color: #d1ecf1;
      border-color: #bee5eb;
    }
    `
  ]
})
export class AlertDisplayComponent {

    @Input() code: HttpStatusCode | 0 = HttpStatusCode.Ok;
    errorType: 'danger' | 'info' | 'success' | 'warning'  = 'danger';
    @Input() customTitle?: string;
    @Input() customMessage?: string | null;

    init() {
        console.log(`${this.code}`);
    }

    get message(): string {
        if (this.customMessage && this.customMessage.trim().length) {
            return `${this.customMessage}`;
        }

        switch (this.code) {
          case 0:
            this.errorType = 'danger';
            return 'No se pudo conectar con el servidor. Verifique su conexión a internet e intente nuevamente.';
          case HttpStatusCode.Ok:
            this.errorType = 'danger';
            return 'Ha ocurrido un error.';
          case HttpStatusCode.BadRequest:
            this.errorType = 'warning';
            return 'Solicitud incorrecta. Por favor, verifique los datos ingresados.';
          case HttpStatusCode.NotFound:
            this.errorType = 'info';
            return 'Recurso no encontrado. La información solicitada no está disponible.';
          case HttpStatusCode.InternalServerError:
            this.errorType = 'danger';
            return 'Error interno del servidor. Por favor, intente nuevamente más tarde.';
          case HttpStatusCode.BadGateway:
            this.errorType = 'danger';
            return 'Puerta de enlace incorrecta. El servidor recibió una respuesta inválida.';
          case HttpStatusCode.ServiceUnavailable:
            this.errorType = 'danger';
            return 'Servicio no disponible. El servidor está temporalmente fuera de servicio.';
          default:
            this.errorType = 'info';
            return 'Información importante.';
        }
    }

    get title(): string {
        if (this.customTitle && this.customTitle.trim().length) {
            return this.customTitle;
        }

        switch (this.errorType) {
            case 'danger':
              return 'Error.';
            case 'success':
              return 'Éxito.';
            case 'warning':
              return 'Advertencia.';
            case 'info':
            default:
              return 'Titulo.';
        }
    }
}
