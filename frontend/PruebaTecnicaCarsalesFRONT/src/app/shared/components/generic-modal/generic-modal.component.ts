import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-generic-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './generic-modal.component.html',
  styleUrls: ['./generic-modal.component.scss']
})
export class GenericModalComponent {

  @Input() open = false;
  @Input() title?: string;
  @Output() close = new EventEmitter<void>();

  onClose() {
    this.close.emit();
  }

}
