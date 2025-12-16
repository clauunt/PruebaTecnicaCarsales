import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ICardData } from '@shared/models/card-data.interface';

@Component({
  selector: 'app-generic-card',
  imports: [],
  templateUrl: './generic-card.component.html',
  styleUrl: './generic-card.component.scss'
})
export class GenericCardComponent {

  @Input() data!: ICardData;
  @Output() select = new EventEmitter<number>();
  @Input() selectable: boolean = true;

  onClick() {
    this.select.emit(this.data.id);
  }

}
